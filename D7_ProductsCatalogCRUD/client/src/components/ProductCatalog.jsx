import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductCatalog({ productAdded }) {
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null); // State to hold the product to edit

    const fetchProducts = async () => {
        const response = await axios.get('http://localhost:5000/api/product');
        setProducts(response.data);
    };

    const removeProduct = async (productID) => {
        try {
            await axios.delete(`http://localhost:5000/api/product/${productID}`);
            setProducts(products.filter(product => product.productID !== productID));
        } catch (error) {
            console.error('Error deleting product', error);
        }
    };

    const updateProduct = async (productID, updatedData) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/product/${productID}`, updatedData);
            setProducts(products.map(product => (product.productID === productID ? response.data : product)));
            setEditProduct(null); // Close the edit form/modal
        } catch (error) {
            console.error('Error updating product', error);
        }
    };

    const handleEdit = (product) => {
        setEditProduct(product); // Set the product to edit
    };

    useEffect(() => {
        fetchProducts();
    }, [productAdded]);

    return (
        <>
            {Array.isArray(products) && products.length > 0 ? (
                products.map(product => (
                    <div key={product.productID} className="bg-slate-200 p-8 m-3 rounded-md border border-slate-300 relative">
                        <button className="font-extralight text-sm p-1 absolute top-0 right-0" onClick={() => removeProduct(product.productID)}>Cancel</button>
                        <button className="font-extralight text-sm p-1 absolute top-0 left-0" onClick={() => handleEdit(product)}>Edit</button>
                        <p className="text-left font-bold py-2">Product ID: {product.productID}</p>
                        <p className="text-left font-bold py-2">Product Name: {product.name}</p>
                        <p className="text-left font-bold py-2">Description: {product.description}</p>
                        <p className="text-left font-bold py-2">Category: {product.category}</p>
                        <p className="text-left font-bold py-2">Price: {product.price}</p>
                    </div>
                ))
            ) : (
                <p className="font-bold text-lg">No products found</p>
            )}

            {editProduct && (
                <div className="edit-form">
                    <h2>Edit Product</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        defaultValue={editProduct.name}
                        onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        defaultValue={editProduct.description}
                        onChange={(e) => setEditProduct({ ...editProduct, description: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        defaultValue={editProduct.price}
                        onChange={(e) => setEditProduct({ ...editProduct, price: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        defaultValue={editProduct.stock}
                        onChange={(e) => setEditProduct({ ...editProduct, stock: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        defaultValue={editProduct.category}
                        onChange={(e) => setEditProduct({ ...editProduct, category: e.target.value })}
                    />
                    <button onClick={() => updateProduct(editProduct.productID, editProduct)}>Update</button>
                    <button onClick={() => setEditProduct(null)}>Cancel</button>
                </div>
            )}
        </>
    );
}
