import React from "react";
import ReactDOM from "react-dom/client";
// case-1
// const Title = (
//   <div id="titlediv">
//     <h1> hello jk</h1>
//     <HeadingComponent />
//   </div>
// );

// const HeadingComponent = () => {
//   return (
//     <div id="heading">
//       {/* <Title></Title> */}
//       <h2>hello form namaste react </h2>
//     </div>
//   );
// };

// const root = ReactDOM.createRoot(document.getElementById("root"));

// // root.render(<HeadingComponent/>)

// root.render(Title);

// ReferenceError: Cannot access 'HeadingComponent' before initialization
// if you try to access that like you get error because you can not access the const variable before the declaration

// case-2
// calling react component inside a react element
// this is fix for case1 issue 
//   const HeadingComponent = () => {
//     return (
//       <div id="heading">
//         {/* <Title></Title> */}
//         <h2>hello form namaste react </h2>
//       </div>
//     );
//   };

//   const Title = (
//     <div id="titlediv">
//       <h1> hello jk</h1>
//       <HeadingComponent />
//     </div>
//   );
  
  
//   const root = ReactDOM.createRoot(document.getElementById("root"));
  
//   // root.render(<HeadingComponent/>)
  
//   root.render(Title);

// case-3
// calling react element inside a react element
// const Headingelement =  (
//       <div id="heading">
//         {/* <Title></Title> */}
//         <h2>hello form namaste react </h2>
//       </div>
//     );

//   const Title = (
//     <div id="titlediv">
//       <h1> hello jk</h1>
//       {Headingelement}
//     </div>
//   );
  
  
//   const root = ReactDOM.createRoot(document.getElementById("root"));
  
//   // root.render(<HeadingComponent/>)
  
//   root.render(Title);


//  case-4
//   calling react element inside the react component/

  const Title = (
    <div id="titlediv">
      <h1> hello jk</h1>

    </div>
  );
  const HeadingComponent = () => {
    return (
      <div id="heading">
          {Title}
        <h2>hello form namaste reacthmr34 neelmamni</h2>
      </div>
    );
  };


  
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  
  root.render(<HeadingComponent/>)
  
//   root.render(Title);