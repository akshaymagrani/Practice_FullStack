import { useState } from "react";
import axios from "axios";

export default function ProductForm({ onProductAdded }) { // Accept onProductAdded as a prop
    const [productID, setProductID] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/product", { productID, name, description, category, price, stock });
            console.log('Product added:', response.data);
            onProductAdded(); // Call the function to notify that a Product was added
            setProductID('');
            setName(''); // Clear the input fields
            setDescription('');
            setCategory('');
            setPrice('');
            setStock('');
        } catch (error) {
            console.error('Error adding Product', error);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    name="ProductID"
                    value={productID}
                    placeholder="Product ID"
                    onChange={(e) => setProductID(e.target.value)}
                />
                <input
                    type="text"
                    name="ProductName"
                    value={name}
                    placeholder="name"
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    name="Description"
                    value={description}
                    placeholder="Description"
                    onChange={(e) => setDescription(e.target.value)}></textarea>
                <input
                    type="text"
                    name="category"
                    value={category}
                    placeholder="category"
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="number"
                    name="price"
                    value={price}
                    placeholder="price"
                    onChange={(e) => setPrice(e.target.value)}
                />
                <input
                    type="number"
                    name="stock"
                    value={stock}
                    placeholder="stock"
                    onChange={(e) => setStock(e.target.value)}
                />
                <button type="submit">Add Product</button>
            </form>
        </>
    );
}
