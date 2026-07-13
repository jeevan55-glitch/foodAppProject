import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateCartQuantity } from "../redux/actions/cartActions";
import { removeItemFromCart } from "../redux/actions/cartActions";

const Cart = () => {

  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalPrice = cartItems.reduce(
  (total, item) => total + item.foodItem.price * item.quantity, 0);
  const updateQuantity = (foodItemId, quantity) => {
  if (quantity < 1) {
    if (quantity < 1) {
  dispatch(removeItemFromCart(foodItemId));
  return;
}
  }

  dispatch(updateCartQuantity(foodItemId, quantity));
};

  return (
    <div className="container mt-5">
      <h2>My Cart</h2>
      <hr />

      {cartItems.length === 0 ? (
        <div className="alert alert-info">
          Your cart is empty.
        </div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.foodItem._id} className="card p-3 mb-3">
              <h5>{item.foodItem.name}</h5>
              <p>Price: ₹{item.foodItem.price}</p>
              <div className="d-flex align-items-center">
              <button
              className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.foodItem._id, item.quantity - 1)}> -
            </button>
              <span className="mx-3">{item.quantity}</span>

             <button
             className="btn btn-sm btn-outline-secondary"  onClick={() => updateQuantity(item.foodItem._id, item.quantity + 1)}> +
             </button>
            </div>

            </div>
          ))}
          <div className="text-end mt-4">
            <h4 className="text-end mb-3">
            Total: ₹{totalPrice}
         </h4>
          <button
          className="btn btn-success"
          onClick={() => navigate("/payment")} >
          Proceed to Payment
          </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;