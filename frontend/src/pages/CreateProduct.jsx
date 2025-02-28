import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ใช้เพื่อนำทางหลังจากสร้างเสร็จ
import "./../styles/CreateCustomer.css"; // Import CSS

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
    const navigate = useNavigate(); // ใช้เปลี่ยนหน้าเมื่อบันทึกเสร็จ

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        setFormData({
            ...formData,
            [name]: name === "price" || name === "product_id" ? Number(value) : value // ✅ แปลงเป็นตัวเลขเฉพาะฟิลด์ที่ต้องการ
        });
    };
    

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        console.log("Submitting Product Data:", formData); // Debug ดูข้อมูลก่อนส่ง
        


        try {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify(
                formData
            );

            const requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
            };

            const response = await fetch("http://localhost:8800/api/v1/products", requestOptions)
            const result = await response.json();
            console.log("Server Response:", result); // Debug ดูข้อมูลที่ได้จาก server
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
        <div className="create-customer-container">
            <h2>Create Product</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Product ID:</label>
                <input type="text" name="product_id" value={formData.product_id} onChange={handleChange} required />
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                <label>description:</label>
                <input type="text" name="description" value={formData.description} onChange={handleChange} required />

                <label>price:</label>
                <input type="text" name="price" value={formData.price} onChange={handleChange} required />

                <label>category:</label>
                <input type="text" name="category" value={formData.category} onChange={handleChange} required />

                <label>image_url:</label>
                <input type="text" name="image_url" value={formData.image_url} onChange={handleChange} required />

                <button type="submit">Create Product</button>
            </form>
        </div>
    );
}

export default CreateProduct;
