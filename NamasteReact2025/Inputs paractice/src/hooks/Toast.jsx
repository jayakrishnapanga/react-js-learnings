import React, { useEffect } from "react";

export function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), 3000); // auto remove
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: "green",
    error: "red",
    warning: "orange",
    info: "blue",
  };

  return (
    <div style={{
      ...styles.toast,
      background: colors[type] || "gray"
    }}>
      {message}
    </div>
  );
}

const styles = {
  toastContainer: {
    position: "fixed",
    top: 20,
    right: 20,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    zIndex: 1000,
  },
  toast: {
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "6px",
    minWidth: "180px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
};
// import React, { useEffect, useState } from "react";

// export function Toast({ message, type, onClose, duration = 3000 }) {
//   const [progress, setProgress] = useState(100);

//   const colors = {
//     success: "green",
//     error: "red",
//     warning: "orange",
//     info: "blue",
//   };

//   // Countdown progress
//   useEffect(() => {
//     const interval = 10; // update every 10ms
//     const decrement = (interval / duration) * 100;

//     const timer = setInterval(() => {
//       setProgress((prev) => {
//         if (prev <= 0) {
//           clearInterval(timer);
//           return 0;
//         }
//         return prev - decrement;
//       });
//     }, interval);

//     const timeout = setTimeout(() => onClose(), duration);

//     return () => {
//       clearInterval(timer);
//       clearTimeout(timeout);
//     };
//   }, [onClose, duration]);

//   return (
//     <div
//       style={{
//         ...styles.toast,
//         background: "#fff",
//         borderLeft: `6px solid ${colors[type] || "gray"}`,
//       }}
//     >
//       <div style={{ color: "#333", marginBottom: 4 }}>{message}</div>
//       <div
//         style={{
//           ...styles.progress,
//           background: colors[type] || "gray",
//           width: `${progress}%`,
//         }}
//       />
//     </div>
//   );
// }

// const styles = {
//   toast: {
//     color: "#fff",
//     padding: "10px 16px",
//     borderRadius: "6px",
//     minWidth: "200px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//   },
//   progress: {
//     height: "4px",
//     borderRadius: "2px",
//     transition: "width 0.01s linear",
//   },
// };
