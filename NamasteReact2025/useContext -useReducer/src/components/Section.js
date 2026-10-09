// this is one way if consuming the context using ThemeContextContext.Consumer
// it is will take function as a child and that function will take the value of the context as a parameter and render the children

// import { ThemeContextContext } from "./LevelContext";
// export function Section() {

//   return (
//     <section className="section">
//       <h1>Section</h1>
//       <ThemeContextContext.Consumer>
//         {({ theme }) => (
//           <div style={{ backgroundColor: theme, padding: "20px", margin: "50px", height: "100px", border: "1px solid black" }}>
//             <h1>Section</h1>
//           </div>
//         )}
//       </ThemeContextContext.Consumer>
//     </section>
//   );
// }

// this is one way if consuming the context using useContext
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
export function Section() {
  const {theme }= useContext(ThemeContext);
  return (
    <section className="section">
      <h1>Section</h1>
      <div
        style={{
          padding: "20px",
          margin: "50px",
          height: "100px",
          border: theme === "white" ? "1px solid black" : "1px solid white",
        }}
      >
        <h1>Section</h1>
      </div>
    </section>
  );
}
