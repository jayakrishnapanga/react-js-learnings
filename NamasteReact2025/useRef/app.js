import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./src/components/header";
import { Body } from "./src/components/body";
import { StopWatch } from "./src/components/StopWatch";
import UseRefDemo from "./src/components/demo";
import { ForwardRefDemo } from "./src/components/forwaredRef";
import { ParentComponent } from "./src/components/useImperativeHandle1";
const AppLayOut = () => {
  return (
    <div className="app">
      <Header/>
            <Body/>
            <StopWatch/>
      {/* <UseRefDemo /> */}
      {/* <ForwardRefDemo /> */}
      {/* <ParentComponent /> */}
    </div>
  );
};
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<AppLayOut />);
