import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../store/store";
import { removeFromCart, clearCart } from "../store/cartSlice";

import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const [checkedOut, setCheckedOut] = useState(false);
  const [loading, setLoading] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = async () => {
    try {
      setLoading(true);

      await addDoc(collection(db, "orders"), {
        items: items,
        totalItems: totalItems,
        totalPrice: totalPrice,
        createdAt: Timestamp.now(),
      });

      dispatch(clearCart());
      setCheckedOut(true);
    } catch (error) {
      console.error(error);
      alert("Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  if (checkedOut) {
    return <h2 style={{ color: "green" }}>✅ Order placed successfully!</h2>;
  }

  if (items.length === 0) {
    return <h2>🛒 Cart is empty</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>🛒 Shopping Cart</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h4>{item.title}</h4>
          <p>Price: ${item.price}</p>
          <p>Quantity: {item.quantity}</p>

          <button onClick={() => dispatch(removeFromCart(item.id))}>
            ❌ Remove
          </button>
        </div>
      ))}

      <hr />

      <p>
        <strong>Total Items:</strong> {totalItems}
      </p>
      <p>
        <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
      </p>

      <button
        onClick={handleCheckout}
        disabled={loading}
        style={{ marginTop: "10px" }}
      >
        {loading ? "Processing..." : "✅ Checkout"}
      </button>
    </div>
  );
}

export default Cart;
