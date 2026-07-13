import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import api from "../utils/api";

const Success = () => {

  const location = useLocation();

  useEffect(() => {
    const createOrder = async () => {
      const session_id = new URLSearchParams(location.search).get(
        "session_id"
      );

      if (session_id) {
        try {
          await api.post("/v1/eats/orders/new", {
            session_id,
          });

          console.log("Order created successfully");

        } catch (error) {
          console.log("Order creation failed");
          console.log(error.response?.data);
          console.log(error.response?.status);
          console.log(error);
        }
      }
    };

    createOrder();

  }, [location]);

  return (
    <div className="container mt-5 text-center">
      <h2>🎉 Order Placed Successfully!</h2>
      <p>Your payment was successful.</p>
      <p>Thank you for ordering.</p>
    </div>
  );
};

export default Success;