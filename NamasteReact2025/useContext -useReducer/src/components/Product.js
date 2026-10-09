import { useContext } from "react"
import { ThemeContext } from "./ThemeContext";
export function Product(){
    const {theme}= useContext(ThemeContext);
    console.log("Product component rendered with theme:", theme);
    return(
        <div style={{padding: "20px",margin:"10px", height: "100px", border:theme === "white" ? "1px solid black" : "1px solid white"}}>
            <h1 >Product</h1>
        </div>
    )
}