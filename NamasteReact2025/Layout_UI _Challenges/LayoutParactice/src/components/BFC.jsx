// block formatting context
export default function BFC() {
  return (
    <div style={{ padding: 20 }}>
      <h3>WITHOUT BFC</h3>

      {/* THIS is parent */}
      <div style={{ background: "#b3e5fc", marginBottom: 40 }}>
        <div
          style={{
            float: "left",
            width: 120,
            height: 120,
            background: "tomato",
          }}
        ></div>
        This is some text...
      </div>
      <p>Notice: blue background height is 0 (collapsed)</p>
    </div>
  );
}

// export default function BFC() {
//   return (
//     <div style={{ padding: 20 }}>
//       <h3>WITH BFC (display: flow-root)</h3>

//       <div
//         style={{
//           background: "#b3e5fc",
//           display: "flow-root", // BFC created here
//         }}
//       >
//         <div
//           style={{
//             float: "left",
//             width: 120,
//             height: 120,
//             background: "tomato",
//           }}
//         ></div>
//         This is some text...
//       </div>
//       <p>Now: blue wrapping height is correct ✅</p>
//     </div>
//   );
// }
