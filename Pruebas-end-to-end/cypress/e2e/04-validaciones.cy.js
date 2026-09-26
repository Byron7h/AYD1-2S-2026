// Objetivo: probar casos negativos de validacion y reglas de negocio.
// Comandos clave: visit, click, type, select, assertions de error.
describe("04 - Validaciones y errores", () => {
  it("Muestra error si se intenta crear orden sin datos", () => {
    cy.visit("/");

    cy.getByDataCy("tab-orders").click();
    cy.getByDataCy("create-order").click();

    cy.getByDataCy("error-message")
      .should("be.visible")
      .and("contain", "Completa todos los campos");
  });

  it("Muestra error de stock insuficiente", () => {
    const productName = `Stock Bajo ${Date.now()}`;

    cy.visit("/");

    // Creamos un producto con stock 1.
    cy.getByDataCy("tab-products").click();
    cy.getByDataCy("product-name").type(productName);
    cy.getByDataCy("product-price").type("99");
    cy.getByDataCy("product-stock").type("1");
    cy.getByDataCy("create-product").click();

    // Intentamos comprar 2 unidades para provocar el error de backend.
    cy.getByDataCy("tab-orders").click();
    cy.getByDataCy("order-email").type("stock@test.com");
    cy.getByDataCy("order-qty").clear().type("2");

    cy.getByDataCy("order-product")
      .find("option")
      .contains(productName)
      .then(($option) => {
        const optionValue = $option.val();
        cy.getByDataCy("order-product").select(String(optionValue));
      });

    cy.getByDataCy("create-order").click();

    cy.getByDataCy("error-message")
      .should("be.visible")
      .and("contain", "Stock insuficiente");
  });
});
