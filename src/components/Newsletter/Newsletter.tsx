import { useNewsletterStore } from "../../store/newsletterStore";
import styles from "./Newsletter.module.css";
import BtnSpinner from "../UI/BtnSpinner/BtnSpinner";
import { useEffect } from "react";

export default function Newsletter() {
  const {
    emailInput,
    errorMessage,
    successMessage,
    isLoading,
    setEmailInput,
    setErrorMessage,
    setSuccessMessage,
    setIsLoading,
    resetMessages,
  } = useNewsletterStore();

  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    resetMessages();
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://corvey-backend-production.up.railway.app/api/newsfeed/subscribe",
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
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.newsletter}>
      <div className={styles.content}>
        <h2 className={styles.title}>
          Join our newsletter. Enjoy big discounts.
        </h2>
        <p className={styles.paragraph}>Hear what they say about us</p>
        <form onSubmit={handleSignup}>
          <input
            type="email"
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
