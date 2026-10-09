// without using the memo
import React from "react";
const Child = React.memo(({ count }) => {
  console.log("Child Rendered");
  return <h1>{count}</h1>;
});

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
