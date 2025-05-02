import styles from "./OrderSuccess.module.css";
import { useNavigate } from "react-router-dom";

function OrderSuccess() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>🎉 Order Successful!</h1>
        <p className={styles.message}>
          Thank you for your purchase. Your order has been placed successfully.
        </p>
        <button className={styles.button} onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default OrderSuccess;
