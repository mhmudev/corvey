import { Outlet } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import CartDrawer from "../../components/Cart/CartDrawer";

export default function Layout() {
  return (
    <div className="container">
      <Navbar />
      <Outlet />
      <Footer />
      <CartDrawer />
    </div>
  );
}
