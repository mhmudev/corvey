import styles from "./Newsletter.module.css";

export default function Newsletter() {
  return (
    <section className={styles.newsletter}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Join our newsletter. Enjoy big discounts.{" "}
        </h2>
        <p className={styles.paragraph}>Hear what they say about us</p>
        <form>
          <input type="text" name="" id="" placeholder="mahmoud@gmail.com" />
          <button>Signup</button>
        </form>
      </div>
      <div className={styles.imageContainer}>
        <img
          src="https://framerusercontent.com/images/Tek3QDXYTGhHVcXeJcr9nVReM.png"
          alt="Experience"
          className={styles.image}
        />
      </div>
    </section>
  );
}
