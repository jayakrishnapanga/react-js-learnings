import React, { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
const ToggleTheme1 = () => {
  const { dispatch } = useContext(ThemeContext);
  console.log(useContext(ThemeContext));
  return (
    <div>
      <button
        className="btn btn-primary"
        onClick={() => {
          dispatch({ type: "changeTheme", payload: "white" });
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
};

export default ToggleTheme1;
