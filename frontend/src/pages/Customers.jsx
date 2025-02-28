import React, { useState, useEffect } from "react";
import "./../styles/Customers.css"; // 👈 Import CSS
import { useNavigate } from "react-router-dom";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ ใช้ useNavigate() ใน component

  // ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/v1/customers");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setCustomers(data);
      } catch (error) {
        setError(error.message);
      } 
    };

    fetchCustomers();
  }, []);

  console.log(customers);

  if (error) return <p className="error">Error: {error}</p>;

  // ฟังก์ชัน Edit ที่ใช้งานได้
  const handleEdit = (id) => {
    navigate(`/update/${id}`); //  ไปที่ /update/{id}
  };

  const handleDelete = (id) => {
    // ลบข้อมูล
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      fetch(`http://localhost:8800/api/v1/customers/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete customer");
          }
          alert("Customer deleted successfully!");
          setCustomers(customers.filter((customer) => customer.customer_id !== id));
        })
        .catch((error) => {
          alert(error.message);
        });
    }

  };
  

  return (
    <div className="customers-container">
      <h2>Customers List</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customer_id}>
              <td>{customer.customer_id}</td>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.address}</td>
              <td>{customer.email}</td>
              <td>{customer.phone_number}</td>
              <td>
                <button className="edit" onClick={() => handleEdit(customer.customer_id)}>
                  Edit
                </button>
                <button className="delete" onClick={() => handleDelete(customer.customer_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Customers;
