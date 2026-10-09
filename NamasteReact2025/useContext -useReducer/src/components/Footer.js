import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
export function Footer() {
  const {theme} = useContext(ThemeContext);
  return (
    <div
      style={{
        padding: "20px",
        margin: "50px",
        height: "100px",
        border: theme === "white" ? "1px solid black" : "1px solid white",
      }}
    >
      <h1>FooTER</h1>
    </div>
  );
}
