// Objetivo: flujo real de negocio, crear producto y luego orden.
// Comandos clave: visit, type, click, select, contains.
describe("03 - Flujo real: crear orden", () => {
  it("El usuario crea producto y luego registra una orden", () => {
    const productName = `Kit E2E ${Date.now()}`; //Usamos Date.now para evitar que los datos se repitan y fallen las pruebas.
    const customerEmail = "estudiante.e2e@correo.com";

    cy.visit("/");

    // Paso 1: crear un producto para usarlo en la orden.
    cy.getByDataCy("tab-products").click();
    cy.getByDataCy("product-name").type(productName);
    cy.getByDataCy("product-price").type("50");
    cy.getByDataCy("product-stock").type("3");
    cy.getByDataCy("create-product").click();

    // Acá confirmamos que sí se creó
    cy.getByDataCy("products-table").contains(productName).should("be.visible");

    // Paso 2: ir a ordenes y completar formulario.
    // nos vamos órdenes  
    cy.getByDataCy("tab-orders").click();
    //Llenar formulario con email, cantidad y producto seleccionado.
    cy.getByDataCy("order-email").type(customerEmail);
    cy.getByDataCy("order-qty").clear().type("2");

    // cy.get() + then(): tomamos el valor del option cuyo texto contiene productName.
    // No usa texto directamente
    // Busca el <option> con el nombre del producto
    // Extrae su value
    // Lo selecciona

    cy.getByDataCy("order-product")
      .find("option") 
      .contains(productName)
      .then(($option) => {
        const optionValue = $option.val();
        cy.getByDataCy("order-product").select(String(optionValue));
      });

      // Crear orden
    cy.getByDataCy("create-order").click();

    // Validar resultado: La orden debe aparecer en la tabla con el correo ingresado.
    cy.getByDataCy("orders-table").contains(customerEmail).should("be.visible");
  });
});
