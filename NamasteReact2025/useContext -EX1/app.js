import ReactDOM from "react-dom/client";
import React, { useContext } from "react";
import { Header } from "./src/components/Header";
import { Section } from "./src/components/Section";
import "./src/css/section.css";
const Page = () => {
  return (
    <div>
      <Section level={1}>
        <Header>Welcome to the App</Header>
        <Section level={5}>
          <Header>This is a subheader</Header>
          <Header>This is a subheader</Header>
          <Header>This is a subheader</Header>
          <Header>This is a subheader</Header>

          <Section level={6}>
            <Header>This is a smaller subheader</Header>
            <Header>This is a smaller subheader</Header>
            <Header>This is a smaller subheader</Header>
            <Header>This is a smaller subheader</Header>
          </Section>
        </Section>
      </Section>
    </div>
  );
};

const App = () => <Page />;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
