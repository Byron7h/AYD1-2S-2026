// Este archivo es como las reglas del juego para Cypress
const { defineConfig } = require("cypress");

// Exporta la configuración principal
module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",  // URL base de la aplicación (para no repetir en cada test)
    specPattern: "cypress/e2e/**/*.cy.js", // Indica dónde están los archivos de prueba
    supportFile: "cypress/support/e2e.js", // Archivo que se ejecuta antes de cada test
    video: false, // Desactiva grabación de video de los tests
    screenshotOnRunFailure: true,  // Toma capturas de pantalla cuando un test falla
    setupNodeEvents(on, config) { // Configuración de eventos (no se está usando nada aquí)
      return config;
    },
  },

  // Tamaño del navegador simulado
  viewportWidth: 1366,
  viewportHeight: 768,

  // Tiempo máximo de espera por defecto (en milisegundos)
  defaultCommandTimeout: 8000,

  // Reintentos en caso de fallo
  retries: {
    runMode: 1,  // cuando se ejecuta en modo CI
    openMode: 0, // cuando está en modo interactivo
  },
});
