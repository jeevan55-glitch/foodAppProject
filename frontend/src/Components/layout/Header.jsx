import React from "react";
import { useSelector } from "react-redux";
import { Link, Route, Routes } from "react-router-dom";
import Search from "./Search";
import "../../App.css";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  return (
    <>
      <nav className="navbar row sticky-top">
        {/* logo */}
        <div className="col-12 col-md-3">
          <Link to="/">
            <img src="/images/logo.webp" alt="logo" className="logo" />
          </Link>
        </div>

        {/* search bar and search icon */}

        <div className="col-12 col-md-6 mt-2 mt-md-0">
          <Routes>
            <Route path="/" element={<Search />} />
            <Route path="/eats/stores/search/:keyword" element={<Search />} />
          </Routes>
        </div>

        {/* Login */}
        <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
          {/* ml-> margin left (3unit from left) */}
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span className="ml-3" id="cart">
              Cart
            </span>
            <span className="ml-1" id="cart_count">
            {cartItems.length}
            </span>
          </Link>
          <Link
          to="/orders"
          style={{ textDecoration: "none", marginLeft: "15px", marginRight: "15px" }}>
          <span className="ml-3"style={{ color: "#dafc19", fontWeight: "bold", fontSize:22 }}>Orders
          </span>
          
          </Link>

              <Link to="/me" className="material-symbols-outlined web_logo" >  
           account_circle
              </Link>
            
         
        </div>
      </nav>
    </>
  );
};

export default Header;