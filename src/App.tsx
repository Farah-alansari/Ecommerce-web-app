import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./components/Cart";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Products from "./pages/Products";
import AddProduct from "./pages/addProduct";
import OrderHistory from "./pages/OrderHistory";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
