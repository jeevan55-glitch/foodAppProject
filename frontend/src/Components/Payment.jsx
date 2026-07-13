import React from "react";
import api from "../utils/api";
import { useSelector } from "react-redux";

const Payment = () => {

  const { cartItems } = useSelector((state) => state.cart);

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post("/v1/payment/process", {
        items: cartItems,
      });

      window.location.href = data.url;

    } catch (error) {
  console.log("Status:", error.response?.status);
  console.log("Response:", error.response?.data);
  alert(error.response?.data?.message || "Payment failed");
}
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Payment</h2>
      <hr />

      <form onSubmit={handlePayment}>

        <p className="text-center">
          Click below to continue to secure Stripe payment.
        </p>

        <button type="submit" className="btn btn-success w-100 mt-4">
          Pay Now
        </button>

      </form>
    </div>
  );
};

export default Payment;