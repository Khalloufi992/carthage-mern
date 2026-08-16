import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import Atelier from "./pages/Atelier";
import Lookbook from "./pages/Lookbook";
import "./index.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <div className="curtain" aria-hidden="true" />
          <div className="site-shell">
            <Navbar />
            <Routes>
              <Route path="/"          element={<Home />} />
              <Route path="/products"  element={<Products />} />
              <Route path="/cart"      element={<Cart />} />
              <Route path="/checkout"  element={<Checkout />} />
              <Route path="/login"     element={<Login />} />
              <Route path="/orders"    element={<Orders />} />
              <Route path="/atelier"   element={<Atelier />} />
              <Route path="/lookbook"  element={<Lookbook />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;