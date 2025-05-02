import { Link } from "react-router-dom";
import { TProductItem } from "../../../lib/types";
import styles from "./ProductItem.module.css";

type ProductItemProps = {
  product: TProductItem;
};

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <Link to={`product/${product.slug}`} className={styles.product}>
      <img src={product.images[0]} alt="Product image" />
      {product.quantity <= 0 && (
        <div className={styles.badge}>
          <p>out of stock</p>
        </div>
      )}
      <div className={styles.bottomInfo}>
      <h4>{product.title}</h4>
      {product.discount > 0 && (
        <p className={styles.discount}>
          EGP {product.price - (product.price * product.discount) / 100}
          <span className={styles.discountValue}> -{product.discount}%</span>
        </p>
      )}
      <p
        className={`${styles.price} ${
          product.discount > 0 ? styles.oldPrice : ""
        }`}
      >
        EGP {product.price}
      </p>
      </div>
    </Link>
  );
}
