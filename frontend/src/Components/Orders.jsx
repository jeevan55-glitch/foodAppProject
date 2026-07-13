import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myOrders } from "../redux/actions/orderActions";

const Orders = () => {
  const dispatch = useDispatch();

const { orders } = useSelector((state) => state.order);

useEffect(() => {
  dispatch(myOrders());
}, [dispatch]);
  return (
  <div className="container mt-5">
    <h2>My Orders</h2>
    <hr />

    {orders && orders.length > 0 ? (
      orders.map((order) => (
        <div key={order._id} className="card mb-3">
          <div className="card-body">
            <h5>Restaurant: {order.restaurant?.name}</h5>

            <p>
              <strong>Status:</strong> {order.orderStatus}
            </p>

            <p>
              <strong>Total:</strong> ₹{order.finalTotal}
            </p>

            <p>
              <strong>Items:</strong>
            </p>

            <ul>
              {order.orderItems.map((item) => (
                <li key={item.fooditem}>
                  {item.name} × {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))
    ) : (
      <div className="alert alert-info">
        You have not placed any orders yet.
      </div>
    )}
  </div>
);
};

export default Orders;