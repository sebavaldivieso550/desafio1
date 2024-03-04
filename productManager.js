const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './products.json';
        this.productIdCounter = 1;
        this.products = [];
        this.initialize();
    }
    
    initialize = async () => {
        try {
            await this.loadProducts();

            this.addProduct("Producto1", "Producto1-description", 15.50, "thumbnail-producto1", "001", 120);
            this.addProduct("Producto2", "Producto2-description", 28.00, "thumbnail-producto2", "002", 75);
            this.addProduct("Producto3", "Producto3-description", 7.80, "thumbnail-producto3", "003", 185);
            this.addProduct("Producto4", "Producto4-description", 89.80, "thumbnail-producto4", "003", 178);

            console.log(this.getProducts());
            console.log(this.getProductById(2));
            console.log(this.getProductById(4));

            this.updateProduct(1, { price: 30.00, stock: 35 });

            this.deleteProduct(3);

        } catch (err) {
            console.log(err);
        }
    }

    loadProducts = async () => {

        try {
            const data = await fs.promises.readFile(this.path, 'utf-8');
            this.products = JSON.parse(data);
        } catch (err) {
            console.log(err);
            this.products = [];
        }

    }

    saveProducts = async () => {
        
        try {
            const data =  JSON.stringify(this.products, null, 2);
            await fs.promises.writeFile(this.path, data);
        } catch (err) {
            console.log(err);
        }

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
        this.saveProducts();
        console.log("Producto agregado correctamente:", newProduct);

    }

    updateProduct = async (id, updatedProps) => {
        try {
            const productToUpdate = this.products.findIndex(product => product.id === id);

            if (productToUpdate !== -1) {
                Object.keys(updatedProps).forEach(key => {
                    if (this.products[productToUpdate].hasOwnProperty(key)) {
                        this.products[productToUpdate][key] = updatedProps[key];
                    }
                });

                await this.saveProducts();
                console.log(`Product with the ID: ${id} succesfully updated.`);
            } else {
                console.log("Not found");
            }
        } catch (err) {
            console.log(err);
        }
    }

    deleteProduct = async (id) => {
        try {
            const productToDelete = this.products.findIndex(product => product.id === id);
            
            if (productToDelete !== -1) {
                this.products.splice(productToDelete, 1);
                await this.saveProducts();
                console.log(`Product with ID: ${id} succesfully removed.`);
            } else {
                console.log("Not found");
            }

        } catch (err) {
            console.log(err);
        }
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

module.exports = ProductManager;