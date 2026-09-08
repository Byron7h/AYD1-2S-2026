// src/services/PaymentProcessors.ts

// ============================================================
//  L — Liskov Substitution Principle
//  "Las subclases deben ser sustituibles por su clase base"
// ============================================================
//
//  CAMBIOS APLICADOS:
//  ─────────────────
//  En la version anterior, el controller tenia un if/else
//  por cada metodo de pago. Dos problemas:
//
//  Problema 1 — Liskov:
//    No habia una clase base. Cada metodo de pago era una rama
//    de un if/else. No habia garantia de contrato comun.
//
//  Problema 2 — Open/Closed:
//    Agregar CryptoPayment = abrir/modificar el bloque if/else.
//
//  Despues de aplicar L:
//    - Todos extienden PaymentProcessor (abstracta).
//    - TypeScript fuerza process() y getMethodName().
//    - El caller usa processor.process() sin saber cual es.
// ============================================================


// ── ❌ ANTES — if/else por cada método de pago en el controller ──
// (Esto estaba dentro de OrderController.processPayment)
// Funciona, pero no hay contrato común entre métodos de pago.
// Agregar uno nuevo = modificar el controller.

// export async function processPaymentBefore(
//   orderId: number,
//   total: number,
//   paymentMethod: string,
//   data: any
// ) {
//   let result;
//
//   if (paymentMethod === "credit_card") {
//     if (!data.cardNumber || data.cardNumber.length !== 16)
//       throw new Error("Número de tarjeta inválido");
//     result = { success: true, transactionId: `CC-${Date.now()}` };
//
//   } else if (paymentMethod === "paypal") {
//     if (!data.paypalEmail)
//       throw new Error("Email de PayPal requerido");
//     result = { success: true, transactionId: `PP-${Date.now()}` };
//
//   } else {
//     throw new Error(`Método de pago no soportado: ${paymentMethod}`);
//     // Para agregar "crypto" hay que abrir este archivo
//     // y agregar otro else if. El código existente se modifica.
//   }
//
//   return result;
// }

// ── ✅ DESPUES — aplicando L ─────────────────────────────────
export type PaymentResult = { success: boolean; transactionId: string };

// Contrato base comun para todos los metodos de pago.
abstract class PaymentProcessor {
  abstract getMethodName(): string;
  abstract process(
    orderId: number,
    amount: number,
    data: Record<string, any>
  ): Promise<PaymentResult>;
}

export class CreditCardProcessor extends PaymentProcessor {
  getMethodName(): string {
    return "credit_card";
  }

  async process(orderId: number, amount: number, data: { cardNumber: string }): Promise<PaymentResult> {
    if (!data.cardNumber || data.cardNumber.length !== 16)
      throw new Error("Número de tarjeta inválido");
    return { success: true, transactionId: `CC-${orderId}-${Math.round(amount)}-${Date.now()}` };
  }
}

export class PayPalProcessor extends PaymentProcessor {
  getMethodName(): string {
    return "paypal";
  }

  async process(orderId: number, amount: number, data: { paypalEmail: string }): Promise<PaymentResult> {
    if (!data.paypalEmail)
      throw new Error("Email de PayPal requerido");
    return { success: true, transactionId: `PP-${orderId}-${Math.round(amount)}-${Date.now()}` };
  }
}

export class CryptoProcessor extends PaymentProcessor {
  getMethodName(): string {
    return "crypto";
  }

  async process(orderId: number, amount: number, data: { wallet: string }): Promise<PaymentResult> {
    if (!data.wallet)
      throw new Error("Wallet requerida");
    return { success: true, transactionId: `CRYPTO-${orderId}-${Math.round(amount)}-${Date.now()}` };
  }
}

export class PaymentProcessorFactory {
  private static processors: PaymentProcessor[] = [
    new CreditCardProcessor(),
    new PayPalProcessor(),
    new CryptoProcessor(),
  ];

  static get(methodName: string): PaymentProcessor {
    const processor = this.processors.find((p) => p.getMethodName() === methodName);
    if (!processor) throw new Error(`Método de pago no soportado: ${methodName}`);
    return processor;
  }
}
