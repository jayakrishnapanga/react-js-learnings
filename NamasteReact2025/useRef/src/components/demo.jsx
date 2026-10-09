import { useEffect, useRef, useState } from "react";
let list = [];
function UseRefDemo() {
  const user = { name: "jk" };
  const useref = useRef({ name: "jk" });
  list.push(user);
  //400
  const [count, setCount] = useState(0);

  if (list.length === 2) {
    console.log(list);
    console.log("the vaLUE", list[0] === list[1]);
  } else {
    console.log("the value is 1", list);
  }
  //   console.log("count", count);
  const element = useRef(null)
  useEffect(() => {
    useref.current.name = "haristh";
    // console.log("element", element);
    element.current.innerHTML = "neelmani";
    // console.log("user data", user);
    // user.name="neeelmani"
    setCount(count + 1);
  }, []);
  return <h1 ref={element}>{useref.current.name}</h1>;
}

export default UseRefDemo;
