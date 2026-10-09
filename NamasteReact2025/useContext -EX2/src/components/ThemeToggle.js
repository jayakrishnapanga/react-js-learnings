import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
export function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      onClick={() => setTheme((prev) => (prev === "yellow" ? "red" : "yellow"))}
    >
      changeTheme
    </button>
  );
}
