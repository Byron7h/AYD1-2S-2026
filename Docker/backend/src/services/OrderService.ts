// src/services/OrderService.ts
// ============================================================
//  D — Dependency Inversion Principle
//  OrderService depende de abstracciones, no de Prisma ni nodemailer.
// ============================================================

import { OrderValidator } from "../validators/OrderValidator";
import {
  CreateOrderDTO,
  INotificationService,
  IOrderRepository,
  IProductReader,
  OrderFilters,
} from "../interfaces";

export class OrderService {
  constructor(
    private orderRepo: IOrderRepository,
    private productRepo: IProductReader,
    private notifier: INotificationService,
    private validator: OrderValidator
  ) {}

  async createOrder(data: CreateOrderDTO) {
    // Delega validación — OrderService no conoce las reglas, solo llama al validador
    this.validator.validate(data.customerEmail, data.items);

    // Responsabilidad de negocio: verificar stock y calcular total
    let total = 0;
    const orderItems: { productId: number; quantity: number; unitPrice: number }[] = [];
    for (const item of data.items) {
      const product = await this.productRepo.findById(item.productId);
      if (!product) throw new Error(`Producto ${item.productId} no encontrado`);
      if (product.stock < item.quantity) throw new Error(`Stock insuficiente para ${product.name}`);
      total += product.price * item.quantity;
      orderItems.push({ productId: item.productId, quantity: item.quantity, unitPrice: product.price });
    }

    // Persistir la orden
    const order = await this.orderRepo.create(data, total, orderItems);

    // Delega notificación — OrderService no sabe cómo se envían emails
    await this.notifier.notifyOrderCreated(data.customerEmail, order.id, total);
    return order;
  }

  async getOrders(filters?: OrderFilters) {
    return this.orderRepo.findAll(filters);
  }
}
