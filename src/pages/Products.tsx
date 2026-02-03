import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import type { Product } from "../types/Product";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editDescription, setEditDescription] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await getDocs(collection(db, "products"));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as Omit<Product, "id">),
        }));
        setProducts(data);
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "products", id));
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;

    await updateDoc(doc(db, "products", editingProduct.id), {
      title: editTitle,
      price: Number(editPrice),
      description: editDescription,
    });

    setProducts((prev) =>
      prev.map((p) =>
        p.id === editingProduct.id
          ? {
              ...p,
              title: editTitle,
              price: Number(editPrice),
              description: editDescription,
            }
          : p,
      ),
    );

    setEditingProduct(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Products</h2>

      {editingProduct && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <h3>Edit Product</h3>

          <input
            placeholder="Title"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <input
            placeholder="Price"
            type="number"
            value={editPrice}
            onChange={(e) => setEditPrice(e.target.value)}
          />

          <input
            placeholder="Description"
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
          />

          <br />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditingProduct(null)}>Cancel</button>
        </div>
      )}

      {products.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <p>${p.price}</p>

          <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>

          <button
            onClick={() => {
              setEditingProduct(p);
              setEditTitle(p.title);
              setEditPrice(String(p.price));
              setEditDescription(p.description);
            }}
          >
            Edit
          </button>

          <button onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Products;
