// src/services/NotificationService.ts
// ============================================================
//  S — Single Responsibility Principle
//  Responsabilidad única: enviar notificaciones por email.
//  Nada de BD, nada de validaciones, nada de lógica de órdenes.
// ============================================================

import { INotificationService } from "../interfaces";

export class NotificationService implements INotificationService {
  async notifyOrderCreated(email: string, orderId: number, total: number): Promise<void> {
    console.log(
      `[Simulacion de email] -> ${email} | Orden #${orderId} | Total: $${total}`
    );
  }
}
