// Aquí se definen comandos personalizados para Cypress
// Creamos nuestros propios comandos para que el código sea más limpio y reutilizable

// Agrega un nuevo comando llamado "getByDataCy"
Cypress.Commands.add("getByDataCy", (value) => {

  // Este comando busca elementos en el DOM usando el atributo data-cy
  // Ejemplo: data-cy="refresh-data"

  // En lugar de escribir:
  // cy.get('[data-cy="refresh-data"]')
  
  // Puedes escribir:
  // cy.getByDataCy("refresh-data")

  return cy.get(`[data-cy="${value}"]`);
});

// Para que Cypress funcione bien, necesitamos ayudarlo un poco en el Frontend. A veces los selectores CSS pueden ser frágiles (si cambias la estructura del HTML, los selectores se rompen).
// Por eso agregamos atributos data-cy, que son como etiquetas invisibles para pruebas.
// No afectan la app, pero hacen que las pruebas sean estables.


// Puedes agregar más comandos personalizados aquí si lo necesitas