// src/index.ts

// ============================================================
//  D — Dependency Inversion Principle
//  "Los modulos de alto nivel no deben depender de modulos
//   de bajo nivel. Ambos deben depender de abstracciones."
// ============================================================
//
//  CAMBIOS APLICADOS:
//  ─────────────────
//  Antes, servicios creaban dependencias internamente.
//  Ahora, este archivo es el Composition Root:
//  instancia clases concretas e inyecta interfaces.
// ============================================================

import "dotenv/config";
import express from "express";
import cors from "cors";
import { PrismaOrderRepository } from "./repositories/OrderRepository";
import { PrismaProductRepository } from "./repositories/ProductRepository";
import { NotificationService } from "./services/NotificationService";
import { OrderValidator } from "./validators/OrderValidator";
import { OrderService } from "./services/OrderService";
import { OrderController } from "./controllers/OrderController";

const app = express();
app.use(cors());
app.use(express.json());

// ── ❌ ANTES — las dependencias se crean dentro de los servicios ──
// Funciona, pero OrderService está acoplado a Prisma y nodemailer.
// No se puede testear ni cambiar de BD sin modificar OrderService.

// class NotificationServiceBefore {
//   async notify(email: string, orderId: number, total: number) {
//     console.log(`[Email directo] -> ${email} | Orden #${orderId} | $${total}`);
//   }
// }
//
// class OrderServiceBefore {
//   private notifier = new NotificationServiceBefore();
//
//   async createOrder(customerEmail: string, total: number, items: any[]) {
//     // acoplado a Prisma
//     return { customerEmail, total, items };
//   }
// }

// ── ✅ DESPUES — aplicando D (Composition Root) ───────────────
const orderRepo = new PrismaOrderRepository();
const productRepo = new PrismaProductRepository();
const notifier = new NotificationService();
const validator = new OrderValidator();

const orderService = new OrderService(orderRepo, productRepo, notifier, validator);
const orderController = new OrderController(orderService, orderRepo);

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.get("/products",  async (_req, res) => res.json(await productRepo.findAll()));
app.post("/products", async (req, res) => {
  const { name, price, stock } = req.body;
  res.status(201).json(await productRepo.create({ name, price, stock }));
});

app.get("/orders", (req, res) => orderController.getOrders(req, res));
app.post("/orders", (req, res) => orderController.createOrder(req, res));
app.post("/orders/:orderId/payment", (req, res) => orderController.processPayment(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
