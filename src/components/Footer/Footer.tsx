import styles from "./Footer.module.css";
import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className={styles.linksFooter}>
      <div className={styles.linksFooterLeft}>
        <ul>
          <li>
            <a href="#">Terms and Conditions</a>
          </li>
          <li>
            <a href="#">Privacy Policy</a>
          </li>
          <li>
            <a href="#">Cookies Policy</a>
          </li>
          <li>
            <a href="#">Complaints Book</a>
          </li>
        </ul>
      </div>
      <div className={styles.copyrights}>
        <p>@CORVEY 2025</p>
        <div className={styles.icons}>
          <FaFacebook className={styles.icon} />
          <FaInstagram className={styles.icon} />
          <FaTiktok className={styles.icon} />
        </div>
      </div>
    </footer>
  );
}
