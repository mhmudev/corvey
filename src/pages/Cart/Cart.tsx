import { Link } from "react-router-dom";
import { useCartStore } from "../../store/cartStore";
import styles from "./Cart.module.css";
import { MdDeleteOutline } from "react-icons/md";

export default function Cart() {
  const cartItems = useCartStore((state) => state.cart);
  const addQuantity = useCartStore((state) => state.addQuantity);
  const removeQuantity = useCartStore((state) => state.removeQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  const totalPrice = cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={styles.cartContainer}>
      <h3 className={styles.title}>Your Cart</h3>
      <div className={styles.cart}>
        <div className={styles.cartItems}>
          {cartItems.map((cartItem) => {
            return (
              <div className={styles.cartItem}>
                <div className={styles.left}>
                  <img src={cartItem.image} alt="" />
                  <div className={styles.details}>
                    <h3>{cartItem.title}</h3>
                    <div className={styles.addQuantity}>
                      <button
                        onClick={() => {
                          addQuantity(cartItem.id);
                        }}
                      >
                        +
                      </button>
                      <p>{cartItem.quantity}</p>
                      <button
                        onClick={() => {
                          removeQuantity(cartItem.id);
                        }}
                      >
                        -
                      </button>
                    </div>
                  </div>
                </div>
                <div className={styles.options}>
                  <p className={styles.option}>{cartItem.size}</p>
                  <p className={styles.option}>{cartItem.color}</p>
                </div>
                <div className={styles.right}>
                  <p>{cartItem.price} EGP</p>
                  <button onClick={() => removeFromCart(cartItem.id)}>
                    <MdDeleteOutline />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.cartInfo}>
          <h3>Order Summary</h3>
          <div className={styles.orderSummary}>
            <div className={styles.subtotal}>
              <p>Subtotal</p>
              <p>{totalPrice} EGP</p>
            </div>
            <div className={styles.shipping}>
              <p>Shipping</p>
              <p>15.00 EGP</p>
            </div>
            <hr />
            <div className={styles.total}>
              <p>Total</p>
              <p>{cartItems.length > 0 ? totalPrice + 15 : 0} EGP</p>
            </div>
            {cartItems.length > 0 && (
              <Link className={styles.btnCheckout} to="/order">
                Proceed to checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
