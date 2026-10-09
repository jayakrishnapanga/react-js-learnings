// ThemeContext.js
import { createContext, useState } from "react";

export const ThemeContext = createContext();
console.log("the value of theme context", ThemeContext);
console.log("the value of theme context provider", ThemeContext.Provider);
console.log("the value of theme context consumer", ThemeContext.Consumer);
// console.log("the value of theme context", ThemeContext.displayName);
// console.log("the value of theme context", ThemeContext.Provider.displayName);
// console.log("the value of theme context", ThemeContext.Consumer.displayName);
// console.log("the value of theme context", ThemeContext.Provider._context);
// console.log("the value of theme context", ThemeContext.Provider._context2);
console.log(typeof ThemeContext);
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () =>
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

console.log("the value of theme context after adding the provider", ThemeContext);
console.log("the value of theme provider",ThemeContext.Provider );