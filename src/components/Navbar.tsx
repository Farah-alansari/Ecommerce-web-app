import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import type { User } from "firebase/auth";
import "./Navbar.css";

function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    alert("Logged out");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-link">
          🏠 Home
        </Link>
      </div>

      <div className="nav-right">
        <Link to="/cart" className="nav-link">
          🛒 Cart
        </Link>

        {!user && (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </>
        )}

        <Link to="/products" className="nav-link">
          Products
        </Link>

        {user && (
          <>
            <Link to="/orders" className="nav-link">
              Orders
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
