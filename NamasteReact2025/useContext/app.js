import ReactDOM from "react-dom/client";
import React, { useContext } from "react";
import { ThemeProvider, ThemeContext } from "./src/components/ThemeContext.js";
import ThemeToggleButton from "./src/components/ThemeToggleButton.js";

const Page = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#111" : "#f2f2f2",
        color: theme === "dark" ? "#fff" : "#000",
        minHeight: "100vh",
        padding: "50px",
        transition: "0.3s",
      }}
    >
      <h1>React Theme Switcher</h1>
      <ThemeToggleButton />
    </div>
  );
};

const App = () => (
  <ThemeProvider>
    <Page />
  </ThemeProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
