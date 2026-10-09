import React, { useState } from "react";

function BadList() {
  const [items, setItems] = useState(["A", "B", "C"]);

  const reverse = () => setItems([...items].reverse());

  return (
    <div>
      <button onClick={reverse}>BadReverse</button>
      {items.map((item, index) => (
        <div>{item}</div> // ❌ No `key`!
      ))}
    </div>
  );
}

function GoodList() {
  const [items, setItems] = useState(["A", "B", "C"]);

  const reverse = () => setItems([...items].reverse());

  return (
    <div>
      <button on Click={reverse}>
        GoodReverse
      </button>
      {items.map((item) => (
        <div key={item}>{item}</div> // ✅ Stable `key`!
      ))}
    </div>
  );
}

export const Body = () => {
  return (
    <div style={{ padding: "40px" }}>
      <GoodList />
      <BadList />
    </div>
  );
};
