import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
export function Footer() {
  const theme=useContext(ThemeContext)
  return(
    <div style={{backgroundColor:theme, padding: "20px",margin:"50px", height: "100px", border: "1px solid black"}}>
      <h1>FooTER</h1>
    </div>
  )
}

