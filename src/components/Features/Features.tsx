import { LiaShippingFastSolid } from "react-icons/lia";
import { RiCustomerServiceLine } from "react-icons/ri";
import { MdOutlinePayment } from "react-icons/md";
import { TbTruckReturn } from "react-icons/tb";

import styles from "./Features.module.css";

export default function Features() {
  return (
    <section className={styles.features}>
      <div className={styles.feature}>
        <LiaShippingFastSolid className={styles.icon} />
        <h3>Fast Shipping</h3>
        <p>Get your product in 4-7 business days.</p>
      </div>
      <div className={styles.feature}>
        <RiCustomerServiceLine className={styles.icon} />
        <h3>Here to help</h3>
        <p>Customer service is available 24/7</p>
      </div>
      <div className={styles.feature}>
        <MdOutlinePayment className={styles.icon} />
        <h3>Secure Payment</h3>
        <p>We keep your payment information safe.</p>
      </div>
      <div className={styles.feature}>
        <TbTruckReturn className={styles.icon} />
        <h3>10-Days Return Policy</h3>
        <p>We think you’ll love it. If you don’t, let us know!</p>
      </div>
    </section>
  );
}
