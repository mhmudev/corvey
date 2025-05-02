import styles from "./CartDrawer.module.css";
import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { IoClose } from "react-icons/io5";

const CartDrawer = () => {
  const isOpen = useCartStore((state) => state.isOpen);
  const setIsOpen = useCartStore((state) => state.setIsOpen);

  const cartItems = useCartStore((state) => state.cart);
  const addQuantity = useCartStore((state) => state.addQuantity);
  const removeQuantity = useCartStore((state) => state.removeQuantity);
  const setTotalPrice = useCartStore((state) => state.setTotalPrice);
  const totalPrice = useCartStore((state) => state.totalPrice);

  useEffect(() => {
    setTotalPrice(
      cartItems?.reduce((total, item) => total + item.price * item.quantity, 0)
    );
  }, [cartItems]);

  return (
    <>
      {isOpen && (
        <div className={styles.backdrop} onClick={() => setIsOpen(false)} />
      )}
      <div
        className={`${styles.drawer} ${isOpen ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.drawerHeader}>
          <h2 className={styles.title}>Your Cart</h2>
          <IoClose
            className={styles.closeIcon}
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className={styles.items}>
          {cartItems.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} className={styles.image} />
              <div className={styles.details}>
                <h3 className={styles.name}>{item.title}</h3>
                <p className={styles.info}>Size: {item.size}</p>
                <p className={styles.info}>Color: {item.color}</p>
                <div className={styles.addQuantity}>
                  <button
                    onClick={() => {
                      addQuantity(item.id);
                    }}
                  >
                    +
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => {
                      removeQuantity(item.id);
                    }}
                  >
                    -
                  </button>
                </div>
              </div>
              <div className={styles.price}>${item.price * item.quantity}</div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <div className={styles.totalRow}>
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>

          <Link to="/order">
            <button
              onClick={() => setIsOpen(false)}
              className={styles.checkoutButton}
            >
              Checkout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
