import { ThemeProvider } from "./ThemeContext";
import Categories from "./Categories";
import { Section } from "./Section";
import { ThemeToggle } from "./ThemeToggle";
function Home() {
  return (
    <>
      <ThemeProvider>
        <Categories />
        <ThemeToggle />
      </ThemeProvider>
      <Section />
    </>
  );
}

export default Home;

// Section component is consuming the context using useContext Even though it is not a child of the provider
// When you create a context (createContext(defaultValue)), any component that calls useContext(ThemeContext) outside a Provider will get the defaultValue.
// In this case, the defaultValue is "yellow".
// So, the Section component will receive "yellow" as the value of the context.
// The Categories component is consuming the context using useContext and it is a child of the provider
// So, the Categories component will receive "blue" as the value of the context.
// The Section component is consuming the context using useContext and it is not a child of the provider
// So, the Section component will receive "yellow" as the value of the context.

// How Product and Footer Access the Context Even Though They're Not Direct Children of the Provider
// In your code, Categories is wrapped inside <ThemeContext.Provider value="blue">, and Product and Footer are rendered inside Categories.

// Key Concept: React Context Propagates Down the Component Tree
// The Provider makes the context value ("blue") available to all components inside it, no matter how deeply nested they are.

// This means:
// Categories (direct child of Provider)
// Product (child of Categories)
// Footer (child of Categories)

// All can access the context value ("blue") using useContext(ThemeContext).

{
  /* <ThemeContext.Provider value="blue">
  │
  └── <Categories>  
        │
        ├── <Product />   ✅ Gets "blue" (inside Provider)
        │
        └── <Footer />   ✅ Gets "blue" (inside Provider)
</ThemeContext.Provider>

<Section />               ❌ Gets default (outside Provider) */
}

// ✅ Context flows downward to all children of the Provider.
// ✅ Any component inside the Provider subtree can access the context.
// ✅ Components outside the Provider get the default value (or undefined).

// If a component is inside a Provider (anywhere in its subtree), it gets the Provider's value.
// If it’s outside, it gets the default (or undefined).

// function Home() {
//   return (
//     <>
//       <ThemeContext.Provider value="blue">
//         <ThemeContext.Provider value="green">
//           <ThemeContext.Provider value="grey">
//             <Categories />
//           </ThemeContext.Provider>
//         </ThemeContext.Provider>
//       </ThemeContext.Provider>
//       <Section />
//     </>
//   );
// }

// How React Chooses the Context Value
// React Context Uses the Closest Provider

// When a component calls useContext(ThemeContext), React looks up the component tree and uses the value from the nearest (closest) Provider above it.

// In this case, Categories is wrapped in three nested Providers, but it will use the innermost one (value="grey").
