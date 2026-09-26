// Objetivo: crear un producto desde la UI y validarlo en tabla.
// Comandos clave: click, type, getByDataCy, contains.
describe("02 - Gestion de productos", () => {
  it("Crea un producto desde la UI", () => {

    // Genera nombre único
    // type Producto Cypress 1776114073491
    const productName = `Producto Cypress ${Date.now()}`;

    cy.visit("/");

    // cy.click(): hace clic como lo haria una persona.
    cy.getByDataCy("tab-products").click();

    // cy.type(): escribe texto en inputs o textareas.
    cy.getByDataCy("product-name").type(productName);
    cy.getByDataCy("product-price").type("150");
    cy.getByDataCy("product-stock").type("7");

    cy.getByDataCy("create-product").click();

    // Validamos que el nuevo producto aparezca en la tabla.
    cy.getByDataCy("products-table").contains(productName).should("be.visible");
  });
});
