(() => {

    interface Product {
        id: number;
        name: string;
    }

    class ProductService {
        saveProduct(product: Product) {
            console.log('Se inserto el producto:', product);
        }

        getProduct(id: number) {
            console.log('Producto:', { id, name: 'TV' })
        }
    }

    class Mailer {
        private masterMail: String = 'example@gmail.com'

        sendMail(mail: string[], template: 'to-client' | 'to-admin') {
            console.log('Eviando correo electronico', template);
        }
    }

    // Usualmente, esto es una clase para controlar la vista que es desplegada al usuario
    // Recuerden que podemos tener muchas vistas que realicen este mismo trabajo.
    class ProductBloc {

        private productoService: ProductService;
        private mailer: Mailer;

        constructor(productService: ProductService, mailer: Mailer) {
            this.productoService = productService;
            this.mailer = mailer;
        }

        loadProduct(id: number) {
            this.productoService.getProduct(id);
        }

        saveProduct(product: Product) {
            this.productoService.saveProduct(product);
        }

        notifyClients(mail: string[]) {
            this.mailer.sendMail(mail, 'to-admin')
        }

    }


    const productService = new ProductService();
    const mailer = new Mailer();

    const productBloc = new ProductBloc(productService, mailer);

    productBloc.loadProduct(10);
    productBloc.saveProduct({ id: 10, name: 'OLED TV' });
    productBloc.notifyClients(['example@gmail.com']);




})();