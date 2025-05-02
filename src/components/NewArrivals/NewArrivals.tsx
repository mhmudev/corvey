import { useProductsStore } from "../../store/productsStore";
import ProductItem from "../UI/ProductItem/ProductItem";
import styles from "./NewArrivals.module.css";

export default function NewArrivals() {
  const products = useProductsStore((state) => state.products);
  return (
    <section className={styles.newArrivals}>
      {products.slice(0, 4).map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </section>
  );
}
