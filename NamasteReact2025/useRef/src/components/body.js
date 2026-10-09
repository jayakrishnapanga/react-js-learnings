import React, { useRef, useEffect, useState } from "react";
// export const Body = () => {
//   const [searchText, setSearchText] = React.useState("");
//   const [renderCount, setRenderCount] = React.useState(0);
//   // if we using this useEffect without dependency array then it will be called on every render and it will run infinitely and it will create an infinite loop
//   // useEffect(() => {
//   //   setRenderCount(renderCount + 1);
//   //   console.log("useEffect called");
//   // });
//   // if we using this useEffect with dependency array then it will be called only when the component is mounted and when the searchText is changed but it will not be called on every render , called only when the searchText is changed and it will unnecessarily increase the render count due to the state change of the renderCount
//   useEffect(() => {
//     setRenderCount(renderCount + 1);
//     console.log("useEffect called");
//   },[searchText]);

//   return (
//     <div style={{ padding: "40px" }}>
//       <input
//         filed="search"
//         type="text"
//         placeholder="Search..."
//         onChange={(e) => {
//           setSearchText(e.target.value);
//         }}
//       />
//       <h1>{searchText}</h1>
//       <h2>Render Count: {renderCount}</h2>
//     </div>
//   );
// };

// export const Body = () => {
//   const [searchText, setSearchText] = React.useState("");

//   const renderCount = useRef(1); // Start at 1 since the component is rendered once on mount
//   console.log("rendered");
//   // here i am using the useEffect hook to increment the render count on every render
//   //i am trying to update the render count on serachText change but it is will not work if any other state is changed
//   // that's why is it not a good approach
//   return (
//     <div style={{ padding: "40px" }}>
//       <input
//         filed="search"
//         type="text"
//         placeholder="Search..."
//         onChange={(e) => {
//           setSearchText(e.target.value);
//           renderCount.current += 1; // Increment the render count on every change
//         }}
//       />
//       <h1>{searchText}</h1>
//       <h2>Render Count: {renderCount.current}</h2>
//     </div>
//   );
// };

export const Body = () => {
  const [searchText, setSearchText] = React.useState("");
  // using the useRef hook to keep track of the render count

  //1 approach is used to keep track of the render count
  // const renderCount = useRef(0);
  // renderCount.current++;
  // approach 1 is correct but we have to consider this point
  // Do not write or read ref.current during rendering, except for initialization. This makes your component’s behavior unpredictable.
  // so i am not using this approach

  //2 approach is used to keep track of the render count
  const renderCount = useRef(1);  // Start at 1 since the component is rendered once on mount
  useEffect(() => {
    renderCount.current += 1;
    console.log("Component rendered");
  });
  console.log("rendered");
  return (
    <div style={{ padding: "40px" }}>
      <input
        filed="search"
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
      />
      <h1>{searchText}</h1>
      <h2>Render Count: {renderCount.current}</h2>
    </div>
  );
};
