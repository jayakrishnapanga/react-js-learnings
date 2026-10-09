import React, { useRef, useEffect, useState } from "react";
import Parent from "./Parent";
// export const Body = () => {
//   return <Parent obj={{ name: "pk" }} />;
// };

export const Body = () => {
  const [A, setA] = useState(null);
  const [B, setB] = useState(null);
  const [C, setC] = useState(null);
  const [D, setD] = useState(null);
  const [E, setE] = useState(null);
  const prevERef = useRef(null);

  // 1️⃣ Initialize A once
  useEffect(() => {
    console.log("Effect 1: Initializing A");
    setA("jk");
  }, []);

  // 2️⃣ Compute B when A changes
  useEffect(() => {
    console.log("Effect 2: Computing B from A");
    setB("mahesh");
  }, []);

  // 3️⃣ Compute C when A or B changes
  useEffect(() => {
    console.log("Effect 3: Initializing C");
    setC("satish");
  }, []);

  // 4️⃣ Compute D based on C (simmulate async API)
  useEffect(() => {
    console.log("Effect 4: Initializing D");
    setD("umesh");
  }, [C]);

  // 5️⃣ Compute E from all states
  useEffect(() => {
    console.log("Effect 5: Initializing E");
    setE("biswajit");
  }, []);

  return (
    <div style={{ fontFamily: "monospace", padding: 20 }}>
      <h2>🧩 Five useEffects Demo</h2>
      <p>A: {A ?? "..."}</p>
      <p>B: {B ?? "..."}</p>
      <p>C: {C ?? "..."}</p>
      <p>D: {D ?? "..."}</p>
      <p>E: {E ?? "..."}</p>
    </div>
  );
};
