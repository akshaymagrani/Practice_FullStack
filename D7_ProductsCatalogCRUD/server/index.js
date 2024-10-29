const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Middleware to parse JSON bodies


// Connect to MongoDB (replace <your_connection_string> with your MongoDB URI)
mongoose.connect("mongodb://localhost:27017/userDB")
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));

// Define the product schema
const productSchema = new mongoose.Schema({
    productID: {type: Number, required: true},
    name: { type: String, required: true },
    description: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true }
});

// Create a model for users
const Product = mongoose.model('Product', productSchema);

// POST endpoint to post all users
app.post('/api/product', async (req, res) => {
    const {productID, name, description, price, stock, category} = req.body;
    console.log("Product Details: \nProduct: " + name + "\nDescription: " + description + "\nRs. " + price);
    try {
        const newProduct = new Product({ productID, name, description, price, stock, category });
        await newProduct.save();
        res.status(201).json(newProduct); // Respond with the created product
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send('Error saving user'); // Respond with error
    }
});

// GET endpoint to fetch all users
app.get('/api/product', async (req, res) => {
    try {
        const product = await Product.find();
        res.json(product);
    } catch (err) {
        console.log("Error: " + err);
        res.status(500).send('Error fetching product.'); // Respond with error
    }
});

// PUT endpoint to update a product
app.put('/api/product/:productID', async (req, res) => {
    const { name, description, price, stock, category } = req.body;
    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { productID: req.params.productID },
            { name, description, price, stock, category },
            { new: true } // Return the updated document
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedProduct); // Respond with the updated product
    } catch (err) {
        res.status(400).json({ error: 'Error updating product' });
    }
});

app.delete('/api/product/:productID', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ productID: req.params.productID });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(400).json({ error: 'Error deleting product' });
    }
});

PORT = 5000;
app.listen(PORT, () => {
    console.log("App is listening on PORT: ", PORT);
})