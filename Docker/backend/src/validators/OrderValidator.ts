// src/validators/OrderValidator.ts
// ============================================================
//  S — Single Responsibility Principle
//  Responsabilidad única: validar los datos de entrada de una orden.
//  Nada de BD, nada de emails, nada de cálculos.
// ============================================================

export class OrderValidator {
  validate(customerEmail: string, items: any[]): void {
    if (!customerEmail || !items || items.length === 0)
      throw new Error("Datos incompletos");
    if (!customerEmail.includes("@"))
      throw new Error("Email inválido");
  }
}
