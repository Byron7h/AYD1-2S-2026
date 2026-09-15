# Principios SOLID - Guia y Ejemplos 📚

## Índice
1. [¿Qué son los principios SOLID?](#qué-son-los-principios-solid)
2. [S - Single Responsibility Principle (SRP)](#s---single-responsibility-principle-srp)
3. [O - Open/Closed Principle](#o---openclosed-principle)
4. [L - Liskov Substitution Principle](#l---liskov-substitution-principle)
5. [I - Interface Segregation Principle](#i---interface-segregation-principle)
6. [D - Dependency Inversion Principle](#d---dependency-inversion-principle)
7. [Resumen y Mejores Prácticas](#resumen-y-mejores-prácticas)
8. [Archivos de Apoyo en el Repositorio](#archivos-de-apoyo-en-el-repositorio)

---

## ¿Qué son los principios SOLID?

Los principios SOLID son **5 principios fundamentales** para el diseño de software orientado a objetos que nos ayudan a:

- ✅ Escribir código más mantenible
- ✅ Facilitar la extensión de funcionalidades
- ✅ Reducir el acoplamiento entre componentes
- ✅ Hacer el código más testeable
- ✅ Prevenir errores al modificar código existente

> **Importante:** Estos principios NO están grabados en piedra. Son guías que debes aplicar con criterio según el contexto de tu proyecto.

---

## S - Single Responsibility Principle (SRP)

### 📖 Definición
**"Una clase debe tener una sola razón para cambiar"**

Esto significa que cada clase debe tener **una única responsabilidad** o propósito bien definido.

### 🎯 ¿Por qué es importante?
- Si una clase hace muchas cosas, un cambio en una funcionalidad puede romper otras
- Es más difícil de entender y mantener
- Dificulta las pruebas unitarias

### 💡 Ejemplo 

**❌ ANTES (Violando SRP):**
```typescript
class ProductBloc {
    saveProduct(product: Product) {
        // 1. Guarda en base de datos
        console.log('Guardando producto en DB...');
        
        // 2. Envía email
        console.log('Enviando email a admin...');
    }
}
```
**Problema:** Esta clase tiene 2 responsabilidades:
1. Gestionar productos (persistencia)
2. Enviar correos electrónicos

**✅ DESPUÉS (Aplicando SRP):**
```typescript
// Clase 1: Solo maneja productos
class ProductService {
    saveProduct(product: Product) {
        console.log('Se insertó el producto:', product);
    }

    getProduct(id: number) {
        console.log('Producto:', { id, name: 'TV' });
    }
}

// Clase 2: Solo maneja emails
class Mailer {
    private masterMail: string = 'example@gmail.com';

    sendMail(mail: string[], template: 'to-client' | 'to-admin') {
        console.log('Enviando correo electrónico', template);
    }
}

// Clase 3: Coordina las operaciones (Controller/Bloc)
class ProductBloc {
    constructor(
        private productService: ProductService,
        private mailer: Mailer
    ) {}

    saveProduct(product: Product) {
        this.productService.saveProduct(product);
    }

    notifyClients(mail: string[]) {
        this.mailer.sendMail(mail, 'to-admin');
    }
}
```

**Ahora cada clase tiene UNA sola responsabilidad:**
- `ProductService`: gestionar productos
- `Mailer`: enviar correos
- `ProductBloc`: coordinar las operaciones (actúa como controlador)

### 🔑 Puntos clave
- Si necesitas cambiar cómo se envían los emails, solo modificas `Mailer`
- Si cambias la base de datos, solo modificas `ProductService`
- Cada clase es más fácil de testear individualmente

---

## O - Open/Closed Principle

### 📖 Definición
**"Las entidades de software deben estar abiertas para extensión, pero cerradas para modificación"**

- **Abiertas para extensión:** Puedes agregar nuevas funcionalidades
- **Cerradas para modificación:** No debes modificar el código existente que ya funciona

### 🎯 ¿Por qué es importante?
- Cada vez que modificas código existente, arriesgas introducir bugs
- El código que ya está en producción y funciona NO debe tocarse si es posible

### 💡 Ejemplo del Auxiliar

**❌ ANTES (Violando Open/Closed):**
```typescript
class TodoService {
    async getTodoItems() {
        const resp = await fetch('https://jsonplaceholder.typicode.com/todos/');
        const data = await resp.json();
        return data;
    }
}

class PostService {
    async getPosts() {
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await resp.json();
        return data;
    }
}
```

**Problema:** Si queremos agregar logging, manejo de errores, o cambiar la forma de hacer peticiones HTTP, tenemos que modificar CADA servicio.

**✅ DESPUÉS (Aplicando Open/Closed):**
```typescript
// Clase base compartida (abstracción)
class HttpClient {
    async get(url: string) {
        const resp = await fetch(url);
        const data = await resp.json();
        return { data: data, status: resp.status };
    }
}

// Los servicios EXTIENDEN la funcionalidad sin modificar HttpClient
class TodoService {
    private httpClient = new HttpClient();

    async getTodoItems() {
        const { data } = await this.httpClient.get(
            'https://jsonplaceholder.typicode.com/todos/'
        );
        return data;
    }
}

class PostService {
    private httpClient = new HttpClient();

    async getPosts() {
        const { data } = await this.httpClient.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
        return data;
    }
}

class PhotosService {
    private httpClient = new HttpClient();

    async getPhotos() {
        const { data } = await this.httpClient.get(
            'https://jsonplaceholder.typicode.com/photos'
        );
        return data;
    }
}
```

### 🔑 Puntos clave
- `HttpClient` está **cerrada para modificación**: su código no cambia
- Los servicios están **abiertos para extensión**: podemos crear nuevos servicios sin tocar el código existente
- **centralizando comportamiento compartido y este se cierra**
- Si necesitas mejorar el manejo de errores en todas las peticiones HTTP, solo modificas `HttpClient` una vez


### 🎓 Caso de uso real
Este patrón es perfecto para **librerías** que publicas. Los usuarios pueden extender tu código sin que tengas que modificar la librería constantemente.

---

## L - Liskov Substitution Principle

### 📖 Definición
**"Las subclases deben ser sustituibles por sus clases base sin alterar el correcto funcionamiento del programa"**

Si la clase `B` hereda de la clase `A`, deberías poder usar un objeto de tipo `B` en cualquier lugar donde se espere un objeto de tipo `A` **sin que nada se rompa**.

### 🎯 ¿Por qué es importante?
- Garantiza que la herencia se use correctamente
- Evita sorpresas cuando sustituyes objetos
- Mantiene el contrato entre clases padre e hijas

### 💡 Ejemplo del Auxiliar

**❌ ANTES (Violando Liskov):**
```typescript
class Vehicle {
    getNumberOfSeats(): number {
        throw Error('Method not implemented');
    }
}

class Tesla extends Vehicle {
    constructor(private numberOfSeats: number) {
        super();
    }
    
    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

// Problema: Vehicle lanza un error si la llamas directamente
const printCarSeats = (cars: Vehicle[]) => {
    for (const car of cars) {
        // Si algún car no implementó el método, explota aquí
        console.log(car.constructor.name, car.getNumberOfSeats());
    }
}
```

**✅ DESPUÉS (Aplicando Liskov):**
```typescript
// Clase abstracta que FUERZA a las subclases a implementar el método
export abstract class Vehicle {
    abstract getNumberOfSeats(): number;
}

export class Tesla extends Vehicle {
    constructor(private numberOfSeats: number) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Audi extends Vehicle {
    constructor(private numberOfSeats: number) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

export class Toyota extends Vehicle {
    constructor(private numberOfSeats: number) {
        super();
    }

    getNumberOfSeats() {
        return this.numberOfSeats;
    }
}

// Ahora funciona perfectamente
const printCarSeats = (cars: Vehicle[]) => {
    cars.forEach(car => {
        console.log(car.constructor.name, car.getNumberOfSeats());
    });
}

const cars = [
    new Tesla(7),
    new Audi(2),
    new Toyota(5)
];

printCarSeats(cars); // ✅ Funciona sin problemas
```

### 🔑 Puntos clave
- Usa `abstract class` cuando quieras **forzar** a las subclases a implementar ciertos métodos
- Todas las subclases (Tesla, Audi, Toyota) **se pueden sustituir** por `Vehicle` sin problemas
- El método `printCarSeats` no necesita saber el tipo específico de auto, solo que es un `Vehicle`

### 📝 Regla de oro
**"La clase hija EXTIENDE el comportamiento, nunca lo REDUCE"**

Si la clase padre tiene un método que devuelve un número, la clase hija no puede devolver `null` o lanzar un error. Debe cumplir el contrato.

---

## I - Interface Segregation Principle

### 📖 Definición
**"Los clientes no deberían verse obligados a depender de interfaces que no usan"**

Es mejor tener **muchas interfaces pequeñas y específicas** que una interfaz gigante con muchos métodos que no todos necesitan.

### 🎯 ¿Por qué es importante?
- Evitas forzar a las clases a implementar métodos que no necesitan
- Cada clase implementa solo lo que realmente usa
- Código más limpio y mantenible

### 💡 Ejemplo

**❌ ANTES (Violando ISP):**
```typescript
// Interfaz DEMASIADO GRANDE
interface Bird {
    eat(): void;
    fly(): void;
    swim(): void;
    run(): void;
}

// El pingüino NO VUELA, pero se ve obligado a implementar fly()
class Penguin implements Bird {
    eat() { /* ... */ }
    fly() { 
        // ¿Qué pongo aquí? Los pingüinos no vuelan!
        throw new Error("Penguins can't fly!");
    }
    swim() { /* ... */ }
    run() { /* ... */ }
}
```

**✅ DESPUÉS (Aplicando ISP):**
```typescript
// Interfaces pequeñas y específicas
interface Bird {
    eat(): void;
}

interface FlyingBird {
    fly(): number;
}

interface RunningBird {
    run(): void;
}

interface SwimmerBird {
    swim(): void;
}

// Cada ave implementa SOLO lo que necesita
class Tucan implements Bird, FlyingBird {
    public fly() { return 100; }
    public eat() {}
}

class Hummingbird implements Bird, FlyingBird {
    public fly() { return 200; }
    public eat() {}
}

class Ostrich implements Bird, RunningBird {
    public eat() {}
    public run() {}
}

class Penguin implements Bird, SwimmerBird {
    public eat() {}
    public swim() {}
}
```

### 🔑 Puntos clave
- El pingüino **no está obligado** a implementar `fly()` porque no implementa `FlyingBird`
- Cada ave implementa **solo las capacidades que tiene**
- Si agregas una nueva ave, solo implementas las interfaces que necesites

### 🎓 Aplicación práctica

**En DTOs (Data Transfer Objects):**
```typescript
// ❌ MAL: Una interfaz gigante para todo
interface UserDTO {
    id: number;
    name: string;
    email: string;
    dpi: string;
    address: string;
    bankAccount: string;
    // ... 20 campos más
}

// ✅ BIEN: Interfaces específicas según necesidad
interface UserBasicInfo {
    id: number;
    name: string;
    email: string;
}

interface UserIdentification {
    id: number;
    dpi: string;
}

interface UserFinancialInfo {
    id: number;
    bankAccount: string;
}
```

**Ventaja:** Si solo necesitas mostrar el nombre del usuario, solo pides `UserBasicInfo`, no traes 20 campos que no usarás.

---

## D - Dependency Inversion Principle

### 📖 Definición
**"Los módulos de alto nivel no deben depender de módulos de bajo nivel. Ambos deben depender de abstracciones"**

- **Módulos de alto nivel:** Lógica compleja del negocio
- **Módulos de bajo nivel:** Utilidades, detalles de implementación (DB, API, archivos)
- **Abstracción:** Interfaz o clase abstracta

### 🎯 ¿Por qué es importante?
- Facilita cambiar la implementación sin afectar la lógica del negocio
- Permite testear con mocks fácilmente
- Reduce el acoplamiento entre componentes

### 💡 Ejemplo

Este es uno de los ejemplos MÁS importantes para entender:

**❌ ANTES (Violando DIP):**
```typescript
// PostService DEPENDE DIRECTAMENTE de una implementación específica
class PostService {
    private posts: Post[] = [];

    async getPosts() {
        // Acoplado a JsonDataBaseService
        const jsonDB = new JsonDataBaseService();
        this.posts = await jsonDB.getPosts();
        return this.posts;
    }
}
```

**Problema:** Si quieres cambiar de `JsonDataBaseService` a `WebApiPostService`, tienes que modificar `PostService`.

**✅ DESPUÉS (Aplicando DIP):**

**Paso 1: Crear la abstracción**
```typescript
// Abstracción (contrato)
export abstract class PostProvider {
    abstract getPosts(): Promise<Post[]>
}
```

**Paso 2: Las implementaciones de bajo nivel dependen de la abstracción**

```typescript
// Implementación 1: Base de datos local
export class LocalDataBaseService implements PostProvider {
    async getPosts() {
        return [
            {
                userId: 1,
                id: 1,
                title: 'sunt aut facere...',
                body: 'quia et suscipit...'
            },
            // ...
        ];
    }
}

// Implementación 2: JSON file
export class JsonDataBaseService implements PostProvider {
    async getPosts() {
        return localPosts; // lee de un archivo JSON
    }
}

// Implementación 3: API externa
export class WebApiPostService implements PostProvider {
    async getPosts(): Promise<Post[]> {
        const resp = await fetch('https://jsonplaceholder.typicode.com/posts');
        return await resp.json();
    }
}
```

**Paso 3: El módulo de alto nivel depende de la abstracción**
```typescript
export class PostService {
    private posts: Post[] = [];

    // Recibe la abstracción, NO la implementación concreta
    constructor(private postProvider: PostProvider) {}

    async getPosts() {
        this.posts = await this.postProvider.getPosts();
        return this.posts;
    }
}
```

**Paso 4: Usar el código (Dependency Injection)**
```typescript
// Puedes cambiar fácilmente la implementación sin tocar PostService
const provider = new JsonDataBaseService();
// const provider = new LocalDataBaseService();
// const provider = new WebApiPostService();

const postService = new PostService(provider);
const posts = await postService.getPosts();
```

### 🔑 Puntos clave
- `PostService` **NO sabe** si los datos vienen de un archivo, una BD local o una API
- Para cambiar la fuente de datos, solo cambias qué `provider` pasas al constructor
- Puedes crear un `MockPostProvider` para testing sin tocar `PostService`

### 📊 Diagrama de dependencias

```
ANTES:
PostService → JsonDataBaseService (acoplamiento directo)

DESPUÉS:
PostService → PostProvider (abstracción) ← JsonDataBaseService
                    ↑
                    ├── LocalDataBaseService
                    └── WebApiPostService
```

### 🎓 Caso de uso real
Imagina que estás desarrollando una app que inicialmente usa Firebase, pero luego quieres migrar a Supabase:

```typescript
// Abstracción
abstract class DatabaseService {
    abstract saveUser(user: User): Promise<void>;
    abstract getUser(id: string): Promise<User>;
}

// Implementaciones
class FirebaseService implements DatabaseService {
    async saveUser(user: User) { /* código de Firebase */ }
    async getUser(id: string) { /* código de Firebase */ }
}

class SupabaseService implements DatabaseService {
    async saveUser(user: User) { /* código de Supabase */ }
    async getUser(id: string) { /* código de Supabase */ }
}

// Tu lógica de negocio
class UserService {
    constructor(private db: DatabaseService) {}
    
    async registerUser(user: User) {
        await this.db.saveUser(user);
    }
}

// Para cambiar de Firebase a Supabase:
// const db = new FirebaseService(); // ANTES
const db = new SupabaseService();    // DESPUÉS
const userService = new UserService(db);
```

**Solo cambias UNA línea** para migrar toda tu app de Firebase a Supabase. Eso es el poder del DIP.

---

## Resumen y Mejores Prácticas

### 📝 Tabla resumen SOLID

| Principio                 | Pregunta clave                               | Solución                                                |
| ------------------------- | -------------------------------------------- | ------------------------------------------------------- |
| **S**RP                   | ¿Esta clase hace demasiadas cosas?           | Divide en clases con una sola responsabilidad           |
| **O**pen/Closed           | ¿Estoy modificando código que ya funciona?   | Extiende con herencia o composición, no modifiques      |
| **L**iskov                | ¿Puedo sustituir la clase hija por la padre? | Usa clases abstractas, cumple los contratos             |
| **I**nterface Segregation | ¿Esta interfaz tiene métodos que no uso?     | Crea interfaces pequeñas y específicas                  |
| **D**ependency Inversion  | ¿Dependo de implementaciones concretas?      | Depende de abstracciones (interfaces/clases abstractas) |

### ✅ Mejores prácticas

1. **Nombres significativos**: Usa nombres que expliquen qué hace el código
2. **Código autodocumentado**: El mejor código es el que no necesita comentarios
3. **No hardcodear valores**: Usa constantes o variables de entorno
4. **Funciones pequeñas**: Cada función debe hacer una cosa
5. **Testing**: Prueba todo lo que hagas
6. **Refactorización continua**: Paga la deuda técnica poco a poco

### 🎯 Cuándo aplicar SOLID

**SÍ aplicar:**
- ✅ Proyectos grandes o que crecerán
- ✅ Código que se mantendrá por años
- ✅ Equipos de varios desarrolladores
- ✅ Librerías o frameworks

**NO sobre-aplicar:**
- ❌ Scripts pequeños de una sola vez
- ❌ Prototipos rápidos
- ❌ Proyectos de aprendizaje muy simples

> **Recuerda:** Los principios SOLID son guías, no leyes absolutas. Úsalos con criterio.

---