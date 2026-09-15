class OrderService {
  constructor({ db = new Database(), paymentGateway = new PaymentGateway() } = {}) {
    this.db = db;
    this.paymentGateway = paymentGateway;
  }

  placeOrder({ userId, items }) {
    // Regla de negocio: calcular total del pedido.
    const total = items.reduce((sum, item) => sum + item.price, 0);
    if (total <= 0) {
      // Regla de validacion del dominio.
      throw new Error("INVALID_TOTAL");
    }

    const paymentId = this.paymentGateway.charge({ userId, total });
    return this.db.saveOrder({ userId, items, total, paymentId });
  }
}

class Database {
  saveOrder(order) {
    // Simulacion minima de guardado.
    return { id: 1, ...order };
  }
}

class PaymentGateway {
  charge({ total }) {
    // Regla de ejemplo del gateway: montos altos se rechazan.
    if (total > 1000) {
      throw new Error("PAYMENT_REJECTED");
    }
    return "pay-001";
  }
}

module.exports = { OrderService, Database, PaymentGateway };
