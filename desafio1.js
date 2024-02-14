class ProductManager {
    constructor() {
        this.products = [];
        this.productIdCounter = 1;
    }
    
    addProduct(title, description, price, thumbnail, code, stock) {
        
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios");
            return;
        }
        
        const existingProduct = this.products.find(product => product.code === code);

        if (existingProduct) {
            console.log("Ya existe un producto con este codigo.");
            return;
        }

        const newProduct = {
            id: this.productIdCounter++,
            title: title,
            description: description,
            price: price,
            thumbnail: thumbnail,
            code: code,
            stock: stock
        };

        this.products.push(newProduct);
        console.log("Producto agregado correctamente:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (product) {
            return product;
        } else {
            console.log("Not found")
        }
    }
}

let manager = new ProductManager();

manager.addProduct("Producto1", "Producto1-description", 15.50, "thumbnail-producto1", "001", 120)
manager.addProduct("Producto2", "Producto2-description", 28.00, "thumbnail-producto2", "002", 75)
manager.addProduct("Producto3", "Producto3-description", 7.80, "thumbnail-producto3", "003", 185)
manager.addProduct("Producto4", "Producto4-description", 89.80, "thumbnail-producto4", "003", 178)

console.log(manager.getProducts());
console.log(manager.getProductById(2));
console.log(manager.getProductById(4));
