import styles from "./Product.module.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsStore } from "../../store/productsStore";
import Spinner from "../../components/UI/Spinner/Spinner";
import { useCartStore } from "../../store/cartStore";
import { nanoid } from "nanoid";

const Product = function () {
  const [current, setCurrent] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  console.log("rerender...");
  const { productSlug } = useParams<{ productSlug: string }>();
  const fetchProduct = useProductsStore((state) => state.fetchProductBySlug);
  const product = useProductsStore((state) => state.product)!;
  const resetProduct = useProductsStore((state) => state.resetProduct);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    if (productSlug) {
      fetchProduct(productSlug);
    }
    return () => {
      resetProduct();
    };
  }, [productSlug]);

  useEffect(() => {
    if (!product || !product.images || product.images.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % product.images.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [product?.images?.length]);

  const handleAddToCart = () => {
    setErrorMessage("");

    const cartItem = {
      id: nanoid(),
      productId: product._id,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      title: product.title,
    };

    if (selectedColor && selectedSize) {
      addToCart(cartItem);
    } else {
      setErrorMessage("Please select size and color");
    }
  };

  if (!product) {
    return <Spinner />;
  }

  return (
    <div className={styles.productPage}>
      <div className={styles.productImagesSection}>
        <div className={styles.mainImageWrapper}>
          <img
            src={product.images[current]}
            alt=""
            className={styles.mainImage}
          />
        </div>
      </div>
      <div className={styles.productDetails}>
        {product.quantity <= 0 && <h3 className={styles.out}>out of stock</h3>}
        <h1 className={styles.productName}>{product.title}</h1>
        <p className={styles.productPrice}>{product.price} EGP</p>
        <p className={styles.productDescription}>{product.description}</p>
        <div className={styles.sizeSelector}>
          <p>Select Size</p>
          <div className={styles.sizeOptions}>
            {product.sizes.map((item, index) => (
              <button
                disabled={product.quantity <= 0}
                key={index}
                onClick={() => {
                  setSelectedSize(item);
                  console.log(item);
                }}
                className={`${styles.sizeButton} ${
                  selectedSize === item ? styles.selectedSize : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.sizeSelector}>
          <p>Select Color</p>
          <div className={styles.sizeOptions}>
            {product.colors.map((item, index) => (
              <button
                disabled={product.quantity <= 0}
                key={index}
                onClick={() => {
                  setSelectedColor(item);
                  console.log(item);
                }}
                className={`${styles.sizeButton} ${
                  selectedColor === item ? styles.selectedSize : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          {errorMessage ? (
            <p className={styles.errorMessage}>{errorMessage}</p>
          ) : null}
        </div>
        <button
          disabled={product.quantity <= 0}
          className={styles.addToCartBtn}
          onClick={handleAddToCart}
        >
          ADD TO CART
        </button>
        <hr className={styles.divider} />
        <div className={styles.infoList}>
          <p>100% Original Products</p>
          <p>Cash On Delivery is available on this products</p>
          <p>Easy Return and Replacement Policy within 7 days</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
