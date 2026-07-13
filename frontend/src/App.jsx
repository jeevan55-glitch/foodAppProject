import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Components/Home";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";
 import Menu from "./Components/Menu";
import Cart from "./Components/Cart";
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/actions/userActions";
import { fetchCartItems } from "./redux/actions/cartActions";
import Payment from "./Components/Payment";
import Orders from "./Components/Orders";
import Success from "./Components/Success";


function App() {
  const dispatch = useDispatch();

useEffect(() => {
  console.log("App mounted");
  dispatch(loadUser());
  dispatch(fetchCartItems());
}, []);

  return (
    <>
      <ToastContainer />
      <Router>
        <div className="App">
          <Header />
          <div className="container container-fluids">
            <Routes>
              <Route path="/" element={<Home />} exact />
              <Route
                path="/eats/stores/search/:keyword"
                element={<Home />}
                exact
              />
              <Route path="/eats/stores/:id/menus" element={<Menu />} />
              <Route path="/cart" element={<Cart />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/me" element={<Profile />} />
              <Route path="/success" element={<Success />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/orders" element={<Orders />} />

              
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
