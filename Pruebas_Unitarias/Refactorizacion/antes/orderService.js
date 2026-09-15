class OrderService {
  placeOrder({ userId, items }) {
    // Problema 1: dependencias hard-coded.
    // El servicio crea sus propias instancias y no permite inyectar mocks.
    // Consecuencia: pruebas unitarias aisladas son dificiles o imposibles.
    const db = new Database();
    const paymentGateway = new PaymentGateway();

    // Regla de negocio: calcular total del pedido.
    const total = items.reduce((sum, item) => sum + item.price, 0);
    if (total <= 0) {
      // Regla de validacion del dominio.
      throw new Error("INVALID_TOTAL");
    }

    // Acoplamiento fuerte: si charge falla, no hay forma simple de simularlo.
    const paymentId = paymentGateway.charge({ userId, total });
    // Persistencia directa con dependencia interna.
    return db.saveOrder({ userId, items, total, paymentId });
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

module.exports = { OrderService };
