// src/interfaces/index.ts

// ============================================================
//  I — Interface Segregation Principle
//  "Los clientes no deben depender de interfaces que no usan"
// ============================================================
//
//  CAMBIOS APLICADOS:
//  ─────────────────
//  En la version anterior habia una sola interfaz IOrderRepository
//  con todos los metodos: findAll, findById, create, updateStatus.
//
//  Problema:
//    ReportService solo necesita leer ordenes (findAll, findById).
//    Pero si implementa IOrderRepository, TypeScript le exige
//    tambien create() y updateStatus() — metodos que nunca va a usar.
//
//  Despues de aplicar I:
//    IOrderReader  -> findAll, findById       (solo lectura)
//    IOrderWriter  -> create, updateStatus    (solo escritura)
//    IOrderRepository extiende ambas          (acceso completo)
// ============================================================

import { Order, OrderItem, Product } from "@prisma/client";

export type OrderWithItems = Order & {
  items: (OrderItem & { product: Product })[];
};

export type CreateOrderDTO = {
  customerEmail: string;
  items: { productId: number; quantity: number }[];
};

export type OrderFilters = {
  status?: string;
  customerEmail?: string;
};

// ── ❌ ANTES — una interfaz gigante obliga a implementar todo ──
// Funciona si todos los que la implementan necesitan todo,
// pero obliga a clases de solo-lectura a tener métodos de escritura.

// export interface IOrderRepositoryBefore {
//   findAll(filters?: OrderFilters): Promise<OrderWithItems[]>;
//   findById(id: number): Promise<Order | null>;
//   create(data: CreateOrderDTO, total: number, items: any[]): Promise<OrderWithItems>;
//   updateStatus(id: number, status: string): Promise<Order>;
// }

// ── ✅ DESPUES — aplicando I ─────────────────────────────────
// Solo lectura — ReportService implementa solo esto.
export interface IOrderReader {
  findAll(filters?: OrderFilters): Promise<OrderWithItems[]>;
  findById(id: number): Promise<Order | null>;
}

// Solo escritura — quien necesite crear/actualizar implementa esto.
export interface IOrderWriter {
  create(data: CreateOrderDTO, total: number, items: any[]): Promise<OrderWithItems>;
  updateStatus(id: number, status: string): Promise<Order>;
}

// Repositorio completo = las dos juntas.
export interface IOrderRepository extends IOrderReader, IOrderWriter {}

// Interfaces de Producto — mismo patron.
export interface IProductReader {
  findAll(): Promise<Product[]>;
  findById(id: number): Promise<Product | null>;
}

export interface IProductWriter {
  create(data: { name: string; price: number; stock: number }): Promise<Product>;
  updateStock(id: number, newStock: number): Promise<Product>;
}

export interface IProductRepository extends IProductReader, IProductWriter {}

// Abstraccion para notificaciones (apoya D tambien).
export interface INotificationService {
  notifyOrderCreated(email: string, orderId: number, total: number): Promise<void>;
}
