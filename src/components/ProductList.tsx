import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../api/products";
import type { Product } from "../api/products";

function ProductList() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const { data: categories = [] } = useQuery<string[]>({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products", selectedCategory],
    queryFn: () =>
      selectedCategory === "all"
        ? fetchProducts()
        : fetchProductsByCategory(selectedCategory),
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h3>🛍 Product List</h3>

      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={{ marginBottom: "20px", padding: "5px" }}
      >
        <option value="all">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "15px",
              textAlign: "center",
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              style={{ height: "150px", objectFit: "contain" }}
            />

            <h4>{product.title}</h4>
            <p>${product.price}</p>

            <p style={{ fontSize: "14px", color: "#555" }}>
              ⭐ {product.rating.rate} ({product.rating.count})
            </p>

            <button
              onClick={() => dispatch(addToCart(product))}
              style={{
                marginTop: "10px",
                padding: "8px 12px",
                backgroundColor: "green",
                color: "black",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
