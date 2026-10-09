import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
export function Product() {
  const {theme }= useContext(ThemeContext);
  console.log("Product component rendered with theme:", theme);
  return (
    <div
      style={{
        backgroundColor: theme,
        padding: "20px",
        height: "100px",
        border: "1px solid black",
      }}
    >
      <h1>Product</h1>
    </div>
  );
}
