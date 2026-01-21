import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { removeFromCart, clearCart } from "../store/cartSlice";
import { useState } from "react";

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const [checkedOut, setCheckedOut] = useState(false);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const handleCheckout = () => {
    dispatch(clearCart());
    setCheckedOut(true);
  };

  if (checkedOut) {
    return (
      <h2 style={{ color: "green" }}>
        ✅ Checkout successful! Your cart has been cleared.
      </h2>
    );
  }

  if (items.length === 0) {
    return <h2>🛒 Cart is empty</h2>;
  }

  return (
    <div>
      <h2>🛒 Shopping Cart</h2>

      {items.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          <img
            src={item.image}
            alt={item.title}
            width={80}
            onError={(e) =>
              ((e.target as HTMLImageElement).src =
                "https://via.placeholder.com/80")
            }
          />

          <div>
            <p>
              <strong>{item.title}</strong>
            </p>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>

            <button onClick={() => dispatch(removeFromCart(item.id))}>
              ❌ Remove
            </button>
          </div>
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
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        ✅ Checkout
      </button>
    </div>
  );
}

export default Cart;
