// src/services/NotificationService.ts
// ============================================================
//  S — Single Responsibility Principle
//  Responsabilidad única: enviar notificaciones por email.
//  Nada de BD, nada de validaciones, nada de lógica de órdenes.
// ============================================================

import nodemailer from "nodemailer";
import { INotificationService } from "../interfaces";

export class NotificationService implements INotificationService {
  async notifyOrderCreated(email: string, orderId: number, total: number): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: `Orden #${orderId} confirmada`,
      text: `Tu orden por $${total} fue recibida.`,
    });
  }
}
