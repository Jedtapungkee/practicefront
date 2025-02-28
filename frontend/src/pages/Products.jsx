import React, { useState, useEffect } from "react";
import "./../styles/Customers.css"; // 👈 Import CSS
import { useNavigate } from "react-router-dom";

function Products() {
  const [products, setproducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // ✅ ใช้ useNavigate() ใน component

  // ดึงข้อมูลจาก API
  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/v1/products");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setproducts(data);
      } catch (error) {
        setError(error.message);
      } 
    };

    fetchproducts();
  }, []);

  console.log(products);

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
      <h2>Products List</h2>
      <table className="customers-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>description</th>
            <th>price</th>
            <th>category</th>
            <th>image_url</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>{product.image_url}</td>
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

export default Products;
