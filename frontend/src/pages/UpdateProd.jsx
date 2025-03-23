import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProd() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        product_id: "",
        name: "",
        description: "",
        price: "",
        category: "",
        image_url: "",
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8800/api/v1/products/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch product data");
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "price" || name === "product_id"
                ? Number.isNaN(Number(value)) ? "" : Number(value)
                : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`http://localhost:8800/api/v1/products/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to update product");
            }

            alert("Product updated successfully!");
            navigate("/products");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-teal-400 p-4 rounded-lg text-center">
                    Update Product
                </h2>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-gray-700">Product ID:</label>
                            <input type="text" name="product_id" value={formData.product_id} readOnly
                                className="w-full p-2 border rounded-lg bg-gray-100 text-gray-500" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Name:</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Description:</label>
                            <input type="text" name="description" value={formData.description} onChange={handleChange} required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Price:</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Category:</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Image URL:</label>
                            <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                        </div>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={() => navigate("/products")}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition-all">
                            Cancel
                        </button>

                        <button type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all">
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateProd;
