import styles from "./LastArrivalTitle.module.css";

export default function LastArrivalTitle() {
  return (
    <div className={styles.lastArrival}>
      <div className={styles.left}>
        <h2>New Arrivals</h2>
        <p>
          Shop the Latest Styles: Stay ahead of the curve with our newest
          arrivals
        </p>
      </div>
      {/* <a href="#">All Products</a> */}
    </div>
  );
}
