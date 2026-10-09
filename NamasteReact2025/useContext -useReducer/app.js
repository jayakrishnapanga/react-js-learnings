import ReactDOM from "react-dom/client";
import React from "react";
import Home from "./src/components/Home";
import "./src/css/section.css";
import { ThemeContext } from "./src/components/ThemeContext";

const Page = () => {
  return (
      <Home />
  );
};

const App = () => <Page />;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
