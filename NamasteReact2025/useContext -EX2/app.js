import ReactDOM from "react-dom/client";
import Home from "./src/components/Home";
import "./src/css/section.css";
const Page = () => {
  return (
      <Home />
  );
};

const App = () => <Page />;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
