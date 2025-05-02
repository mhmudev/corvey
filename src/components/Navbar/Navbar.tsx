import { useState } from "react";
import styles from "./Navbar.module.css";
import { FiSearch, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.cart);
  const setIsOpen = useCartStore((state) => state.setIsOpen);

  return (
    <nav className={styles.navbar}>
      <div
        className={styles.mobileMenuIcon}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </div>

      <div className={styles.center}>
        <h1 className={styles.logo}>
          <Link to="/">CORVEY</Link>
        </h1>
      </div>

      <div className={`${styles.left} ${menuOpen ? styles.showMenu : ""}`}>
        <NavLink to="/">Home</NavLink>
        <a href="#">Collection</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
      </div>

      <div className={styles.right}>
        <FiSearch className={styles.icon} />
        {/* <Link to="/cart"> */}
        <div className={styles.cartIcon} onClick={() => setIsOpen(true)}>
          <FiShoppingCart className={styles.icon} />
          <p className={styles.cartQuantity}>{cartItems.length}</p>
        </div>
        {/* </Link> */}
      </div>
    </nav>
  );
}
