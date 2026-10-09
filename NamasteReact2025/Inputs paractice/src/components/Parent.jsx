import { useState } from "react";
import { Child } from "./child";
export function Parent() {
  let [count, setCount] = useState(0);
  let [input, setInput] = useState("");
  return (
    <div>
      <p>count:{count}</p>
      <Child setCount={setCount} />
      <label>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
      </label>
    </div>
  );
}
