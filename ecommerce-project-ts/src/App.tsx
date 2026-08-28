import axios from "axios";
// expose axios on window for debugging; declare property on Window to satisfy TypeScript
declare global {
  interface Window {
    axios: typeof axios;
  }
}
import { Routes, Route } from "react-router";
import { useState, useEffect } from "react";
import { HomePage } from "./pages/home/HomePage";
import { CheckoutPage } from "./pages/checkout/CheckoutPage";
import { OrderPage } from "./pages/orders/OrderPage";
import { TrackingPage } from "./pages/tracking/TrackingPage";
import { Error404Page } from "./pages/Error404Page";
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const loadCart = async () => {
    const response = await axios.get("/api/cart-items?expand=product");
    setCart(response.data);
  };

  useEffect(() => {
    loadCart();
  }, []);

  window.axios = axios;

  return (
    <div className="ecommerce-app">
      <Routes>
        <Route index element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route
          path="checkout"
          element={<CheckoutPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="orders"
          element={<OrderPage cart={cart} loadCart={loadCart} />}
        />
        <Route
          path="tracking/:orderId/:productId"
          element={<TrackingPage cart={cart} />}
        />
        <Route path="*" element={<Error404Page cart={cart} />} />
      </Routes>
    </div>
  );
}

export default App;