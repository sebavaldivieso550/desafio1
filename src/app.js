const express = require('express');
const ProductManager = require('../productManager');


const app = express();

app.listen(8080, () => {
    console.log('Servidor corriendo en puerto 8080')
})

app.use(express.urlencoded({extended:true}));

app.use(express.json());

const productManager = new ProductManager();

app.get('/products', async (req, res) => {
   
    await productManager.loadProducts();

    const limit = req.query.limit ? parseInt(req.query.limit) : null;

    let products = productManager.getProducts();

    if (limit) {
        products = products.slice(0, limit);
    }

    res.json(products);

});

app.get('/products/:pid',(req, res) => {
    const { pid } = req.params;
    const product = productManager.getProductById(parseInt(pid));
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});