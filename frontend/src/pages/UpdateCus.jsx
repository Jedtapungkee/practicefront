import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UpdateCustomer() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        address: "",
        email: "",
        phone_number: "",
    });

    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const response = await fetch(`http://localhost:8800/api/v1/customers/${id}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch customer data");
                }
                const data = await response.json();
                setFormData(data);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchCustomer();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await fetch(`http://localhost:8800/api/v1/customers/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.message || "Failed to update customer");
            }

            alert("Customer updated successfully!");
            navigate("/customers");
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-500 to-teal-400 p-4 rounded-lg text-center">
                    Update Customer
                </h2>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-gray-700">Customer ID:</label>
                            <input type="text" name="customer_id" value={formData.customer_id} readOnly
                                className="w-full p-2 border rounded-lg bg-gray-100 text-gray-500" />
                        </div>

                        <div>
                            <label className="block text-gray-700">First Name:</label>
                            <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Last Name:</label>
                            <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Address:</label>
                            <input type="text" name="address" value={formData.address} onChange={handleChange} required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                        </div>

                        <div>
                            <label className="block text-gray-700">Phone Number:</label>
                            <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400" />
                        </div>
                    </div>

                    <div className="flex justify-between mt-4">
                        <button type="button" onClick={() => navigate("/")}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-500 transition-all">
                            Cancel
                        </button>

                        <button type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 transition-all">
                            Update Customer
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdateCustomer;
