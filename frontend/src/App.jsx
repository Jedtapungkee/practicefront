import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Customers from "./pages/Customers";
import Create from "./pages/CreateCustomer";
import Update from "./pages/UpdateCus";
import Products from "./pages/Products";
import Createprod from "./pages/CreateProduct";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Customers />} />
        <Route path="/create" element={<Create />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/products" element={<Products />} />
        <Route path="/createprod" element={<Createprod />} />
      </Routes>
      </Router>
  );
}

export default App;
