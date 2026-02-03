import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

type aOrderItem = {
  title: string;
  price: number;
  quantity: number;
};
type Order = {
  id: string;
  totalPrice: number;
  totalItems: number;
  createdAt?: { seconds: number; nanoseconds: number };
  items: aOrderItem[];
};

function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const snapshot = await getDocs(collection(db, "orders"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Order[];

      setOrders(data);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Order History</h2>

      {orders.length === 0 && <p>No orders found</p>}

      {orders.map((order) => (
        <div
          key={order.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p>
            <b>Order ID:</b> {order.id}
          </p>
          <p>
            <b>Total Items:</b> {order.totalItems}
          </p>
          <p>
            <b>Total Price:</b> ${order.totalPrice}
          </p>

          <details>
            <summary>View items</summary>
            <ul>
              {order.items.map((item, index) => (
                <li key={index}>
                  {item.title} - ${item.price} × {item.quantity}
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
