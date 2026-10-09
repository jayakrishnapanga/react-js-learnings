// without using the memo
const Child = ({ label }) => {
  console.log("❌ Child rendered (no memo)");
  return <p>{label}</p>;
};

export default Child;

// // using the memo
// import React from "react";
// const Child = ({ hclick }) => {
//   console.log("hclick", hclick);
//   // console.log("props", props);
//   // console.log("✅ Child rendered (with memo)");
//   return <p>heloo</p>;
// };

// export default React.memo(Child);
