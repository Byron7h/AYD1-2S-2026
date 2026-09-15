const { OrderService } = require("./orderService");

describe("OrderService unit tests", () => {
  test("creates order when total is valid (using mocks)", () => {
    // Caso real: usuario crea un pedido con productos validos.
    // Objetivo: validar la logica de OrderService sin DB real ni gateway real.

    // Arrange (preparacion): se mockean dependencias externas.
    const dbMock = {
      saveOrder: jest.fn().mockReturnValue({
        id: 99,
        userId: 7,
        items: [{ price: 100 }, { price: 50 }],
        total: 150,
        paymentId: "pay-mock-001",
      }),
    };

    const paymentGatewayMock = {
      charge: jest.fn().mockReturnValue("pay-mock-001"),
    };

    const service = new OrderService({
      db: dbMock,
      paymentGateway: paymentGatewayMock,
    });

    // Act (ejecucion): se invoca el caso de uso placeOrder.
    const result = service.placeOrder({
      userId: 7,
      items: [{ price: 100 }, { price: 50 }],
    });

    // Assert (verificaciones):
    // 1) se cobra con el total calculado
    // 2) se guarda el pedido con paymentId
    // 3) se devuelve la respuesta de persistencia
    expect(paymentGatewayMock.charge).toHaveBeenCalledWith({ userId: 7, total: 150 });
    expect(dbMock.saveOrder).toHaveBeenCalledWith({
      userId: 7,
      items: [{ price: 100 }, { price: 50 }],
      total: 150,
      paymentId: "pay-mock-001",
    });
    expect(result).toEqual({
      id: 99,
      userId: 7,
      items: [{ price: 100 }, { price: 50 }],
      total: 150,
      paymentId: "pay-mock-001",
    });
  });

  test("throws INVALID_TOTAL when order total is zero or negative", () => {
    // Caso de falla: el pedido no tiene monto valido.
    // Se valida la regla de dominio que impide procesar totales <= 0.
    const service = new OrderService({
      db: { saveOrder: jest.fn() },
      paymentGateway: { charge: jest.fn() },
    });

    // Salida esperada: error INVALID_TOTAL.
    expect(() =>
      service.placeOrder({
        userId: 7,
        items: [{ price: 0 }, { price: 0 }],
      })
    ).toThrow("INVALID_TOTAL");
  });

  test("throws PAYMENT_REJECTED when gateway rejects charge", () => {
    // Caso de falla: el gateway rechaza el cobro.
    // Se mockea charge para forzar el error y validar propagacion.
    const service = new OrderService({
      db: { saveOrder: jest.fn() },
      paymentGateway: {
        charge: jest.fn(() => {
          throw new Error("PAYMENT_REJECTED");
        }),
      },
    });

    // Salida esperada: error PAYMENT_REJECTED.
    expect(() =>
      service.placeOrder({
        userId: 7,
        items: [{ price: 1200 }],
      })
    ).toThrow("PAYMENT_REJECTED");
  });
});
