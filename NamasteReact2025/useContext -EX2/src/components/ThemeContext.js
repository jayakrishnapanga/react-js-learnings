import { createContext } from "react";
import { useState } from "react";
export const ThemeContext = createContext("green");
export function ThemeProvider({ children }) {
  let [theme, setTheme] = useState("yellow");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
