import { Route, Routes } from "react-router-dom";
import Product from "../pages/Product/Product";
import { useProductsStore } from "../store/productsStore";
import { useEffect } from "react";
import Layout from "../pages/Layout/Layout";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Order from "../pages/Order/Order";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";

export default function App() {
  const fetchProducts = useProductsStore((state) => state.fetchProducts);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/product/:productSlug" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Route>
    </Routes>
  );
}
