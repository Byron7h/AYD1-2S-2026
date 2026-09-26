describe('Frontend - Login', () => {
  // ============================================
  // CONFIGURACIÓN INICIAL
  // ============================================
  // Antes de cada test, navegamos a la página principal
  // de SaludPlus para asegurar un estado limpio
  
  beforeEach(() => {
    cy.visit("/")
  });

  // ============================================
  // TEST 1: VERIFICACIÓN DEL FRONTEND
  // ============================================
  // Descripción: Validar que la aplicación carga correctamente
  //              y que el título "SaludPlus" es visible
  // Técnica: Smoke test (verificación básica de carga)
  // Por qué: Asegurar que la aplicación está disponible
  
  it('Se muestra el frontend', () => {
    // ============ ARRANGE ============
    // No requiere setup adicional (beforeEach cubre visita)

    // ============ ACT ============
    // Validamos que el título "SaludPlus" es visible en la página
    
    // ============ ASSERT ============
    cy.contains("SaludPlus").should('be.visible');
    cy.wait(1500);
  });

  // ============================================
  // TEST 2: LOGIN EXITOSO CON CREDENCIALES VÁLIDAS
  // ============================================
  // Descripción: Verificar que un administrador puede iniciar sesión
  //              con credenciales correctas
  // Técnica: Form interaction + URL validation
  // Por qué: Validar flujo principal de autenticación
  
  it('Inicio de Sesión con credenciales administrador', () => {
    // ============ ARRANGE ============
    // Credenciales válidas del administrador
    const adminEmail = 'admin@hospital.com';
    const adminPassword = '123';

    // ============ ACT ============
    // Rellenamos el formulario de login
    cy.get('input[type="email"]').type(adminEmail);
    cy.get('input[type="password"]').type(adminPassword);
    
    // Enviamos el formulario haciendo click en el botón submit
    cy.get('button[type="submit"]').click();
    
    // Esperamos a que se procese la autenticación y redirija
    cy.wait(3000);

    // ============ ASSERT ============
    // Validamos que fuimos redirigidos al dashboard
    cy.url().should('include', '/dash');
  });

  // ============================================
  // TEST 3: LOGIN FALLIDO CON CREDENCIALES INCORRECTAS
  // ============================================
  // Descripción: Validar que el sistema rechaza credenciales inválidas
  //              y muestra un mensaje de error apropiado
  // Técnica: Form interaction + Error message validation
  // Por qué: Asegurar que el sistema maneja errores de autenticación
  
  it('Inicio de Sesión con credenciales incorrectas', () => {
    // ============ ARRANGE ============
    // Credenciales inválidas (contraseña incorrecta)
    const validEmail = 'admin@hospital.com';
    const wrongPassword = 'contraseñaIncorrecta';

    // ============ ACT ============
    // Rellenamos el formulario con credenciales inválidas
    cy.get('input[type="email"]').type(validEmail);
    cy.get('input[type="password"]').type(wrongPassword);
    cy.get('button[type="submit"]').click();

    // ============ ASSERT ============
    // Validamos que se muestra el mensaje de error
    cy.get('.alert-danger')
      .should('be.visible')
      .and('contain', 'Credenciales incorrectas');
    cy.wait(1500);
  });

  // ============================================
  // TEST 4: VALIDACIÓN DE CAMPOS VACIOS
  // ============================================
  // Descripción: Verificar que el formulario no se envía
  //              cuando los campos requeridos están vacíos
  // Técnica: HTML5 form validation (browser-level)
  // Por qué: Asegurar que el frontend valida datos antes de enviar
  
  it('Validar que no se pueda enviar el formulario con campos vacíos', () => {
    // ============ ARRANGE ============
    // Sin setup adicional - solo validamos el estado inicial

    // ============ ACT ============
    // Intentamos hacer click en submit sin rellenar nada
    cy.get('button[type="submit"]').click();

    // ============ ASSERT ============
    // Validamos que seguimos en la página de login (no se envió)
    // y que el contenido del login sigue visible
    cy.contains("Iniciar Sesión").should('be.visible');
    cy.wait(1500);
  });
});


// ============================================
// MÓDULO 2: REGISTRO DE PACIENTE
// ============================================
describe('Registrar Paciente', () => {
  // ============================================
  // CONFIGURACIÓN INICIAL
  // ============================================
  // Antes de cada test MOCKEAMOS la respuesta exitosa
  // del backend usando cy.intercept()
  // Esto simula que el servidor acepta el registro
  
  beforeEach(() => {
    // Técnica: API mocking con cy.intercept()
    // Por qué: Evitar dependencia del backend real durante tests
    // Intercepta POST a /api/auth/registrar/paciente y devuelve 201
    
    cy.intercept('POST', '/api/auth/registrar/paciente', {
      statusCode: 201,
      body: { message: 'Paciente registrado exitosamente!' },
    }).as('registroPaciente');
  });

  // ============================================
  // TEST 5: FLUJO COMPLETO DE REGISTRO DE PACIENTE
  // ============================================
  // Descripción: Validar el flujo end-to-end completo de registro
  //              incluyendo datos personales, documentos y credenciales
  // Técnica: Multi-step form + file uploads + API mocking
  // Por qué: Asegurar que todo el proceso de onboarding funciona
  
  it('Flujo correcto de registro de un paciente', () => {
    // ============ ARRANGE ============
    // Datos del paciente a registrar (caso real de prueba)
    const dataPaciente = {
      nombre: 'Juan3',
      apellido: 'Pérez',
      dpi: '1234567890125',
      sexo: 'M',
      direccion: 'Zona 1, Ciudad',
      telefono: '22345671',
      fechaNacimiento: '1990-01-01',
      fotoPath: 'cypress/fixtures/foto.jpg',
      docPath: 'cypress/fixtures/doc.pdf',
      email: 'juan.perez2@example.com',
      password: 'Password123'
    };

    // Navegamos a la página de registro
    cy.visit('/registrarPaciente');

    // ============ ACT - PASO 1: Datos Personales ============
    // Rellenamos nombre, apellido y DPI
    cy.get('input[type="text"]').eq(0).type(dataPaciente.nombre);
    cy.get('input[type="text"]').eq(1).type(dataPaciente.apellido);
    cy.get('input[type="text"]').eq(2).type(dataPaciente.dpi);

    // ============ ACT - PASO 2: Información Demográfica ============
    // Seleccionamos sexo del dropdown
    cy.get('select').select(dataPaciente.sexo);

    // Rellenamos dirección y teléfono
    cy.get('input[type="text"]').eq(3).type(dataPaciente.direccion);
    cy.get('input[type="text"]').eq(4).type(dataPaciente.telefono);

    // ============ ACT - PASO 3: Fecha de Nacimiento ============
    cy.get('input[type="date"]').type(dataPaciente.fechaNacimiento);

    // ============ ACT - PASO 4: Carga de Archivos ============
    // Técnica: cy.selectFile() + force: true paras archivos difíciles
    // Por qué: simulamos selección de archivos como lo haría un usuario
    
    // Seleccionamos foto (eq(0) = primer input[type="file"])
    cy.get('input[type="file"]').eq(0).selectFile(dataPaciente.fotoPath, { force: true });
    
    // Seleccionamos documento de identidad (eq(1) = segundo input[type="file"])
    cy.get('input[type="file"]').eq(1).selectFile(dataPaciente.docPath, { force: true });

    // ============ ACT - PASO 5: Credenciales de Acceso ============
    // Rellenamos email y contraseña para la cuenta
    cy.get('input[type="email"]').type(dataPaciente.email);
    cy.get('input[type="password"]').type(dataPaciente.password);

    // ============ ACT - PASO 6: Envío del Formulario ============
    // Hacemos click en el botón submit para enviar el registro
    cy.get('button[type="submit"]').click();

    // ============ ASSERT ============
    // Validamos que se muestra el mensaje de éxito
    cy.get('.alert-success')
      .should('be.visible')
      .and('contain', 'Paciente registrado exitosamente!');
    
    cy.wait(1500);
  });
});

