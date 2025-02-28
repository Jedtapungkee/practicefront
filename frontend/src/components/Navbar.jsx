import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "./../styles/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [underlineStyle, setUnderlineStyle] = useState({});
  const navRef = useRef(null);

  useEffect(() => {
    // Set underline style
    const activeLink = document.querySelector(".containers a.active");
    if (activeLink && navRef.current) { 
      const { offsetLeft, offsetWidth } = activeLink;
      setUnderlineStyle({
        left: offsetLeft + "px",
        width: offsetWidth + "px",
      });
    }
  }, [location.pathname]);


  return (
    <nav className="Nav">
      <Link to="/" className="LOGO">mini store</Link>
      <div className="containers" ref={navRef}>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Customers
        </Link>
        <Link to="/create" className={location.pathname === "/create" ? "active" : ""}>
          create customers
        </Link>
        <Link to="/products" className={location.pathname === "/products" ? "active" : ""}>
          product
        </Link>
        <Link to="/createprod" className={location.pathname === "/createprod" ? "active" : ""}>
          create product
        </Link>
        <div className="nav-underline" style={underlineStyle}></div>
      </div>
    </nav>
  );
};

export default Navbar;
