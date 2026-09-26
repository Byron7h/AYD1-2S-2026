// Objetivo: laboratorio rapido de comandos basicos de Cypress.
// Comandos clave: visit, contains, click, get, type, select.
describe("05 - Demo comandos basicos", () => {
  it("Demuestra visit, contains, click, get, type y select", () => {
    const productName = `Demo Cmd ${Date.now()}`;

    // visit: abre la aplicacion
    cy.visit("/");

    // contains: encuentra por texto visible
    cy.contains("SOLID Orders").should("be.visible");

    // click: cambia a la pestana de productos
    cy.getByDataCy("tab-products").click();

    // get + type: selecciona inputs y escribe
    cy.getByDataCy("product-name").type(productName);
    cy.getByDataCy("product-price").type("200");
    cy.getByDataCy("product-stock").type("4");
    cy.getByDataCy("create-product").click();

    // click: vuelve a ordenes
    cy.getByDataCy("tab-orders").click();

    // type: completa correo
    cy.getByDataCy("order-email").type("comandos@demo.com");

    // select: elige producto desde el select
    cy.getByDataCy("order-product")
      .find("option")
      .contains(productName)
      .then(($option) => {
        cy.getByDataCy("order-product").select(String($option.val()));
      });

    cy.getByDataCy("order-qty").clear().type("1");
    cy.getByDataCy("create-order").click();

    cy.getByDataCy("orders-table").contains("comandos@demo.com").should("be.visible");
  });
});
