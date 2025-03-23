import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
    const [formData, setFormData] = useState({
        product_id: "",
        name: "",
        description: "",
        price: "",
        category: "",
        image_url: "",
    });

    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: name === "price" || name === "product_id" ? Number(value) : value 
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:8800/api/v1/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to create product");
            }
            alert("Product created successfully!");
            navigate("/products");          
        }
        catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-4">Create Product</h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-medium">Product ID:</label>
                    <input type="text" name="product_id" value={formData.product_id} onChange={handleChange} required className="w-full p-2 border rounded"/>
                </div>
                <div>
                    <label className="block font-medium">Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-2 border rounded"/>
                </div>
                <div>
                    <label className="block font-medium">Description:</label>
                    <input type="text" name="description" value={formData.description} onChange={handleChange} required className="w-full p-2 border rounded"/>
                </div>
                <div>
                    <label className="block font-medium">Price:</label>
                    <input type="text" name="price" value={formData.price} onChange={handleChange} required className="w-full p-2 border rounded"/>
                </div>
                <div>
                    <label className="block font-medium">Category:</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full p-2 border rounded"/>
                </div>
                <div>
                    <label className="block font-medium">Image URL:</label>
                    <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required className="w-full p-2 border rounded"/>
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Create Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;
