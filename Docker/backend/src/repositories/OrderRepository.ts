// src/repositories/OrderRepository.ts
// ============================================================
//  O — Open / Closed Principle
//  "Abierto para extension, cerrado para modificacion"
// ============================================================
//
//  CAMBIOS APLICADOS:
//  ─────────────────
//  Dos problemas en la version anterior:
//
//  Problema 1 — Filtros con if/else:
//    Cada vez que necesitabamos un filtro nuevo (por fecha,
//    por monto minimo, por ciudad) habia que abrir este archivo
//    y agregar otro bloque if/else. El codigo existente que
//    funcionaba se tocaba con cada nueva necesidad.
//
//  Problema 2 — Acoplamiento a Prisma en el controller:
//    El controller llamaba a prisma.order.findMany() directo.
//    Cambiar de Neon a MongoDB = reescribir el controller.
//
//  Despues de aplicar O:
//    - Los filtros se construyen con un objeto dinamico:
//      agregar un filtro = una linea, nada existente cambia.
//    - El controller depende de IOrderRepository (interfaz).
//      Cambiar de BD = crear una nueva clase aqui,
//      cambiar una linea en index.ts. El controller no se toca.
// ============================================================

import { PrismaClient } from "@prisma/client";
import {
  CreateOrderDTO,
  IOrderRepository,
  OrderFilters,
  OrderWithItems,
} from "../interfaces";

const prisma = new PrismaClient();

// ── ❌ ANTES — getOrders con if/else por cada filtro ──────────
// Funciona, pero cada filtro nuevo obliga a modificar
// el código existente que ya funcionaba.

// export async function getOrdersBefore(status?: string, email?: string) {
//   if (status && email) {
//     return prisma.order.findMany({
//       where: { status: status as any, customerEmail: email },
//       include: { items: { include: { product: true } } },
//     });
//   } else if (status) {
//     return prisma.order.findMany({
//       where: { status: status as any },
//       include: { items: { include: { product: true } } },
//     });
//   } else if (email) {
//     return prisma.order.findMany({
//       where: { customerEmail: email },
//       include: { items: { include: { product: true } } },
//     });
//   } else {
//     return prisma.order.findMany({
//       include: { items: { include: { product: true } } },
//     });
//   }
//   // Si necesitamos filtrar por fecha, agregamos otro else if aquí.
//   // Si necesitamos filtrar por monto mínimo, otro else if.
//   // El bloque crece sin control y tocamos código que ya funciona.
// }

// export async function createOrderBefore(
//   customerEmail: string,
//   total: number,
//   items: { productId: number; quantity: number; unitPrice: number }[]
// ) {
//   return prisma.order.create({
//     data: { customerEmail, total, status: "PENDING", items: { create: items } },
//     include: { items: { include: { product: true } } },
//   });
// }

// ── ✅ DESPUES — aplicando O ─────────────────────────────────
export class PrismaOrderRepository implements IOrderRepository {
  // Para agregar nuevos filtros solo se agregan lineas en `where`.
  async findAll(filters?: OrderFilters): Promise<OrderWithItems[]> {
    const where: any = {};
    if (filters?.status) where.status = filters.status;
    if (filters?.customerEmail) where.customerEmail = filters.customerEmail;

    return prisma.order.findMany({
      where,
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    }) as Promise<OrderWithItems[]>;
  }

  async findById(id: number) {
    return prisma.order.findUnique({ where: { id } });
  }

  async create(data: CreateOrderDTO, total: number, items: any[]): Promise<OrderWithItems> {
    return prisma.order.create({
      data: {
        customerEmail: data.customerEmail,
        total,
        status: "PENDING",
        items: { create: items },
      },
      include: { items: { include: { product: true } } },
    }) as Promise<OrderWithItems>;
  }

  async updateStatus(id: number, status: string) {
    return prisma.order.update({ where: { id }, data: { status: status as any } });
  }
}
