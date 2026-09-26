// Objetivo: smoke test para verificar que la app carga.
// Comandos clave: visit, contains, getByDataCy.
// Nota: cy.visit("/") usa baseUrl definido en cypress.config.js.
describe("01 - Mi primera prueba en Cypress", () => {
  it("Visita la pagina principal y valida elementos base", () => {
    // cy.visit(): abre la URL indicada en el navegador que Cypress controla.
    cy.visit("/");

    // cy.contains(): busca un texto visible en pantalla.
    cy.contains("SOLID Orders").should("be.visible");

    // cy.get(): selecciona elementos usando un selector CSS.
    cy.getByDataCy("tab-orders").should("be.visible");
    cy.getByDataCy("tab-products").should("be.visible");
  });
});
