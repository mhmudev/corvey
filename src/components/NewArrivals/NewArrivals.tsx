import { useProductsStore } from "../../store/productsStore";
import ProductItem from "../UI/ProductItem/ProductItem";
import Spinner from "../UI/Spinner/Spinner";
import styles from "./NewArrivals.module.css";

export default function NewArrivals() {
  const products = useProductsStore((state) => state.products);
  const isLoading = useProductsStore((state) => state.isLoading);

  if (isLoading)
    return (
      <div className={styles.spinnerContainer}>
        <Spinner />
      </div>
    );

  return (
    <section className={styles.newArrivals}>
      {products.slice(0, 4).map((product) => (
        <ProductItem key={product._id} product={product} />
      ))}
    </section>
  );
}
