import { useEffect, useState } from "react";
import { Products } from "./Products";

export function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched products:", data);
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h1>redux-Learning</h1>
      <p>Welcome to the Redux Learning App!</p>
      <Products productsdata={products} />
    </>
  );
}
