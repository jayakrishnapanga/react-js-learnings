import { ThemeContext } from "./ThemeContext";
import Categories from "./Categories";
import { Section } from "./Section";
import { useReducer, useState } from "react";
import ToggleTheme1 from "./ToggleTheme";


function reducer(state,action){
  console.log("Reducer called with state:", state, "and action:", action);
  if(action.type==="changeTheme"){
    if(state==="white"){
      console.log(state);
      return "dark" 
    }else{
      console.log(state);
      return "white"
    }
  }
}
function Home() {
  // using the useState hook to manage the theme state
  // const [theme, setTheme] = useState("white");
  // function ToogleTheme() {
  //   setTheme((prevTheme) => {
  //     return prevTheme === "white" ? "dark" : "white";
  //   });
  // }
  const initailValue = "white";
  const[theme,dispatch] = useReducer(reducer,initailValue);
  return (
    <>
      <ThemeContext.Provider value={{theme ,dispatch }}>
        <div
          className="container"
          style={{
            marginTop: "50px",
            backgroundColor: theme === "white" ? "white" : "black",
            color: theme === "white" ? "black" : "white",
          }}
        >
          <ToggleTheme1 />
          <Categories />
          <Section />
        </div>
      </ThemeContext.Provider>
    </>
  );
}

export default Home;
