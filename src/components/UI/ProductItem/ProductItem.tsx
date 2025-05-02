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
      <h4>{product.title}</h4>
      <p className={styles.price}>{product.price} EGP</p>
    </Link>
  );
}
