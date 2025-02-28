import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ใช้เพื่อนำทางหลังจากสร้างเสร็จ
import "./../styles/CreateCustomer.css"; // Import CSS

function CreateCustomer() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone_number: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ใช้เปลี่ยนหน้าเมื่อบันทึกเสร็จ

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        
        const raw = JSON.stringify(formData);
        
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
        
        const response = await fetch("http://localhost:8800/api/v1/customers/", requestOptions)
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Failed to create customer");
          }
    
          alert("Customer created successfully!");
          navigate("/");
        }
        catch (error) {
          setError(error.message);
    }
  };

  return (
    <div className="create-customer-container">
      <h2>Create Customer</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>First Name:</label>
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />

        <label>Last Name:</label>
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />

        <label>Address:</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Phone Number:</label>
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} required />

        <button type="submit">Create Customer</button>
      </form>
    </div>
  );
}

export default CreateCustomer;
