import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"; // ใช้ useParams เพื่อดึง id
import "./../styles/CreateCustomer.css"; 

function UpdateCustomer() {
  const { id } = useParams(); //  ดึง id จาก URL
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    address: "",
    email: "",
    phone_number: "",
  });

  const [error, setError] = useState(null);

  //  ดึงข้อมูลลูกค้าจาก API
  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch(`http://localhost:8800/api/v1/customers/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch customer data");
        }
        const data = await response.json();
        setFormData(data); // เติมข้อมูลลงฟอร์ม
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCustomer();
  }, [id]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //  Handle form submit (PUT Request)
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
      navigate("/customers"); //  กลับไปที่หน้า Customers หลังอัปเดตสำเร็จ
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="create-customer-container">
      <h2>Update Customer</h2>
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

        <button type="submit">Update Customer</button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
