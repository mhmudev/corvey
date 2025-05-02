import { useState } from "react";
import styles from "./Newsletter.module.css";
import BtnSpinner from "../UI/BtnSpinner/BtnSpinner";

export default function Newsletter() {
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    try {
      setIsLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/newsfeed/subscribe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: emailInput,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to subscribe.");
      } else {
        setSuccessMessage("Thanks for subscribing!, please check your mail");
        setEmailInput("");
      }

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
        setIsLoading(false);
      } else {
        setErrorMessage("An unknown error occurred.");
        setIsLoading(false);
      }
    }
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Join our newsletter. Enjoy big discounts.{" "}
        </h2>
        <p className={styles.paragraph}>Hear what they say about us</p>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            name=""
            id=""
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="mahmoud@gmail.com"
            required
          />
          <button>{isLoading ? <BtnSpinner /> : "Signup"}</button>
        </form>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        {successMessage && <p className={styles.success}>{successMessage}</p>}
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
