import styles from "./Order.module.css";
import { useCartStore } from "../../store/cartStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Order() {
  const totalPrice = useCartStore((state) => state.totalPrice);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const validateCoupon = useCartStore((state) => state.validateCoupon);

  const [coupon, setCoupon] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [phone, setPhone] = useState("");
  const [gov, setGov] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const shippingCost = 15;

  useEffect(() => {
    setDisabledBtn(false);
  }, [coupon]);

  const handleCreateOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!cart.length) return;

    // Simple validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !street ||
      !city ||
      !gov ||
      !phone
    ) {
      alert("Please fill out all fields.");
      return;
    }

    const products = cart.map((item) => ({
      product: item.productId,
      quantity: item.quantity,
    }));

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://corvey-backend-production.up.railway.app/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products,
            paymentMethod: "COD",
            couponCode: coupon,
            person: { firstName, lastName, email, phone, city, street, gov },
          }),
        }
      );

      if (!response.ok) throw new Error("Network response was not ok");

      navigate("/order-success");
      clearCart();
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleApplyCoupon = () => {
    setDisabledBtn(true);
    validateCoupon(coupon);
  };

  return (
    <form className={styles.container} onSubmit={handleCreateOrder}>
      {/* Left Side */}
      <div className={styles.left}>
        <div className={styles.title}>
          <h3>Delivery Information</h3>
        </div>
        <div className={styles.row}>
          <input
            id="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className={styles.input}
            required
          />
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className={styles.input}
            required
          />
        </div>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
          className={styles.input}
          required
        />
        <input
          id="street"
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          placeholder="Street"
          className={styles.input}
          required
        />
        <div className={styles.row}>
          <input
            id="city"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            className={styles.input}
            required
          />
          <input
            id="gov"
            type="text"
            value={gov}
            onChange={(e) => setGov(e.target.value)}
            placeholder="Gov"
            className={styles.input}
            required
          />
        </div>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone"
          className={styles.input}
          required
        />
      </div>

      {/* Right Side */}
      <div className={styles.right}>
        <div className={styles.cartTotal}>
          <div className={styles.cartInfo}>
            <div className={styles.title}>
              <h3>Order Summary</h3>
            </div>
            <div className={styles.orderSummary}>
              <div className={styles.subtotal}>
                <p>Subtotal</p>
                <p>{totalPrice} EGP</p>
              </div>
              <div className={styles.shipping}>
                <p>Shipping</p>
                <p>{shippingCost} EGP</p>
              </div>
              <hr />
              <div className={styles.total}>
                <p>Total</p>
                <p>{totalPrice + shippingCost} EGP</p>
              </div>
              <div className={styles.couponSection}>
                <input
                  type="text"
                  placeholder="Coupon Code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className={styles.couponInput}
                />
                <button
                  type="button"
                  disabled={disabledBtn}
                  onClick={handleApplyCoupon}
                  className={styles.couponButton}
                >
                  Apply
                </button>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={styles.checkoutButton}
              >
                {isSubmitting ? "Processing..." : "Proceed to checkout"}
              </button>
              <div className={styles.paymentSection}>
                <div className={styles.paymentMethods}>
                  <div className={`${styles.paymentOption} ${styles.selected}`}>
                    <p className={`${styles.radio} ${styles.checked}`}></p>
                    <p className={styles.codText}>CASH ON DELIVERY</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
