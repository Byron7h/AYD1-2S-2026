// src/controllers/OrderController.ts

// ============================================================
//  S — Single Responsibility Principle
//  Responsabilidad única: recibir el HTTP request y devolver la respuesta.
//  Nada de validaciones, nada de lógica de órdenes, nada de acceso a BD.
// ============================================================

//  CAMBIOS APLICADOS:
//  ─────────────────
//  El método createOrder tenía 4 responsabilidades mezcladas:
//    1. Validar el request (email, items)
//    2. Consultar productos y calcular el total
//    3. Guardar la orden en la base de datos
//    4. Enviar el email de confirmación
//
//  Si cambiaban las reglas de validación   → tocabas este archivo.
//  Si cambiabas de Gmail a SendGrid        → tocabas este archivo.
//  Si cambiabas de Prisma a otra BD        → tocabas este archivo.
//  Tres razones para cambiar = viola SRP.
//
//  Después de aplicar S:
//    - Validación       → OrderValidator
//    - Lógica/cálculos  → OrderService
//    - Acceso a BD      → OrderRepository
//    - Notificación     → NotificationService
//    Este controller ahora solo decide qué status HTTP devolver.
//    Una sola razón para cambiar.
// ============================================================

import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";
import { IOrderRepository } from "../interfaces";
import { PaymentProcessorFactory } from "../services/PaymentProcessors";

// import { PrismaClient } from "@prisma/client";
// import nodemailer from "nodemailer";
// const prisma = new PrismaClient();

// ── ❌ ANTES — createOrder hace TODO ─────────────────────────
// Funciona, pero viola SRP: valida, accede a BD, calcula y notifica
// en un solo método. Cualquier cambio en cualquiera de esas
// responsabilidades obliga a modificar este archivo.

// export class OrderControllerBefore {
//
//   async createOrder(req: Request, res: Response) {
//     const { customerEmail, items } = req.body;
//
//     // Responsabilidad 1: Validar
//     if (!customerEmail || !items || items.length === 0) {
//       return res.status(400).json({ error: "Datos incompletos" });
//     }
//     if (!customerEmail.includes("@")) {
//       return res.status(400).json({ error: "Email inválido" });
//     }
//
//     // Responsabilidad 2: Consultar BD y calcular total
//     let total = 0;
//     const orderItems = [];
//     for (const item of items) {
//       const product = await prisma.product.findUnique({ where: { id: item.productId } });
//       if (!product) return res.status(404).json({ error: `Producto ${item.productId} no encontrado` });
//       if (product.stock < item.quantity) return res.status(400).json({ error: `Stock insuficiente para ${product.name}` });
//       total += product.price * item.quantity;
//       orderItems.push({ productId: item.productId, quantity: item.quantity, unitPrice: product.price });
//     }
//
//     // Responsabilidad 3: Guardar en BD
//     const order = await prisma.order.create({
//       data: { customerEmail, total, status: "PENDING", items: { create: orderItems } },
//       include: { items: { include: { product: true } } },
//     });
//
//     // Responsabilidad 4: Enviar email
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST, port: Number(process.env.SMTP_PORT),
//       auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
//     });
//     await transporter.sendMail({
//       from: process.env.SMTP_USER, to: customerEmail,
//       subject: `Orden #${order.id} confirmada`, text: `Tu orden por $${total} fue recibida.`,
//     });
//
//     return res.status(201).json(order);
//   }
//
//   async getOrders(req: Request, res: Response) {
//     const orders = await prisma.order.findMany({
//       include: { items: { include: { product: true } } },
//     });
//     return res.json(orders);
//   }
// }

// ── ✅ DESPUÉS — aplicando S ──────────────────────────────────
// El controller ahora tiene UNA sola responsabilidad:
// recibir el HTTP request y devolver la respuesta.
// Toda la lógica está delegada a sus clases especializadas.

export class OrderController {
  constructor(
    private orderService: OrderService,
    private orderRepo: IOrderRepository
  ) {}

  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const order = await this.orderService.createOrder(req.body);
      res.status(201).json(order);
    } catch (error: any) {
      const status = error.message.includes("no encontrado") ? 404 : 400;
      res.status(status).json({ error: error.message });
    }
  }

  async getOrders(req: Request, res: Response): Promise<void> {
    try {
      const orders = await this.orderService.getOrders({
        status:        req.query.status as string | undefined,
        customerEmail: req.query.email  as string | undefined,
      });
      res.json(orders);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async processPayment(req: Request, res: Response): Promise<void> {
    try {
      const orderId = Number(req.params.orderId ?? req.body.orderId);
      const { paymentMethod, ...paymentData } = req.body;

      if (!Number.isInteger(orderId) || orderId <= 0) {
        res.status(400).json({ error: "orderId inválido" });
        return;
      }
      if (!paymentMethod) {
        res.status(400).json({ error: "paymentMethod es requerido" });
        return;
      }

      const order = await this.orderRepo.findById(orderId);
      if (!order) {
        res.status(404).json({ error: "Orden no encontrada" });
        return;
      }

      const processor = PaymentProcessorFactory.get(paymentMethod);
      const result = await processor.process(orderId, order.total, paymentData);

      if (result.success) {
        await this.orderRepo.updateStatus(orderId, "CONFIRMED");
      }

      res.json({ orderId, payment: result });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}