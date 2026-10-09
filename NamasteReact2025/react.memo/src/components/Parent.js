import React, { useCallback, useState } from "react";
import Child from "./child";
// const Parent = (props) => {
//   const [count, setCount] = useState(0);
//   const obj = { name: "jk" };
//   const HandleClick = useCallback(() => {
//     console.log("cliked");
//   },[]);
//   return (
//     <div>
//       <h2>Parent Count: {count}</h2>
//       <button onClick={() => setCount(count + 1)}>Increment</button>
//       <Child hclick={HandleClick} />
//     </div>
//   );
// };

function Parent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState({ name: "jk" });
  console.log("Parent Rendered");

  return (
    <>
      <Child count={count} />
      <button onClick={() => setName({ name: "suresh" })}>Change Name</button>
    </>
  );
}

export default Parent;
