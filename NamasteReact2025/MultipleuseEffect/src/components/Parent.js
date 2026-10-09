import React, { useCallback, useState } from "react";
import Child from "./child";
const Parent = (props) => {
  const [count, setCount] = useState(0);
  const obj = { name: "jk" };
  const HandleClick = useCallback(() => {
    console.log("cliked");
  },[]);
  return (
    <div>
      <h2>Parent Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Child hclick={HandleClick} />
    </div>
  );
};

export default Parent;
