// import React, { useState } from "react";
// import { createPortal } from "react-dom";

// function NormalModal({ show, onClose }) {
//   if (!show) return null;
//   return (
//     <div style={styles.overlay} onClick={onClose}>
//       <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
//         <h3>Normal Modal (No Portal)</h3>
//         <p>This modal might get hidden by z-index issues!</p>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>
//   );
// }

// function PortalModal({ show, onClose }) {
//   if (!show) return null;
//   return createPortal(
//     <div style={styles.overlay} onClick={onClose}>
//       <div style={{ ...styles.modal, background: "#c2f0c2" }} onClick={(e) => e.stopPropagation()}>
//         <h3>Portal Modal (Uses createPortal)</h3>
//         <p>This modal always stays on top ✅</p>
//         <button onClick={onClose}>Close</button>
//       </div>
//     </div>,
//     document.body
//   );
// }

// export default function CreatePortal() {
//   const [showNormal, setShowNormal] = useState(false);
//   const [showPortal, setShowPortal] = useState(false);

//   return (
//     <div style={styles.page}>
//       <h2>React Portal Practical Example</h2>

//       <div style={styles.zParent}>
//         <p>
//           This parent has <b>z-index: 1</b> and <b>overflow: hidden</b>.
//           A normal modal rendered inside will get clipped!
//         </p>

//         <button onClick={() => setShowNormal(true)}>Open Normal Modal ❌</button>
//         <NormalModal show={showNormal} onClose={() => setShowNormal(false)} />
//       </div>

//       <button onClick={() => setShowPortal(true)} style={{ marginTop: "20px" }}>
//         Open Portal Modal ✅
//       </button>
//       <PortalModal show={showPortal} onClose={() => setShowPortal(false)} />
//     </div>
//   );
// }

// const styles = {
//   page: {
//     height: "100vh",
//     overflow: "auto",
//     padding: "40px",
//     background: "#f5f5f5",
//   },
//   zParent: {
//     position: "relative",
//     zIndex: 1,
//     overflow: "hidden", // 👈 this creates a stacking context & clipping issue
//     height: "200px",
//     background: "#ddd",
//     padding: "20px",
//     borderRadius: "8px",
//   },
//   overlay: {
//     position: "fixed",
//     inset: 0,
//     background: "rgba(0,0,0,0.5)",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 1000, // but if it's inside a low stacking context, this doesn't matter
//   },
//   modal: {
//     background: "#fff",
//     padding: "20px",
//     borderRadius: "8px",
//     minWidth: "300px",
//   },
// };

import { useState } from "react";
import { createPortal } from "react-dom";

function NormalModal({ show, onClose }) {
  if (!show) return null;
  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>Normal Modal (No Portal)</h3>
        <p>This modal is rendered INSIDE the grey box and can be clipped.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

function PortalModal({ show, onClose }) {
  if (!show) return null;
  return createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div
        style={{ ...styles.modal, background: "#c2f0c2" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3>Portal Modal (Uses createPortal)</h3>
        <p>This modal is rendered under document.body and stays on top.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>,
    document.body
  );
}

export default function CreatePortal() {
  const [showNormal, setShowNormal] = useState(false);
  const [showPortal, setShowPortal] = useState(false);

  return (
    <div style={styles.page}>
      {/* Fixed header that sits above many things */}
      <div style={styles.header}>
        <strong>Fixed Header (z-index: 50)</strong>
      </div>
      <div style={{ height: 80 }} />{" "}
      {/* spacer so header doesn't cover controls */}
      <h2>React Portal Practical Example — make clipping obvious</h2>
      <div style={styles.zParent}>
        <p>
          This grey box has <b>z-index: 1</b> and <b>overflow: hidden</b>.
          Normal modal is rendered <i>inside</i> this box.
        </p>

        <button onClick={() => setShowNormal(true)}>
          Open Normal Modal (inside box)
        </button>
        <NormalModal show={showNormal} onClose={() => setShowNormal(false)} />
      </div>
      <div style={{ marginTop: 24 }}>
        <button onClick={() => setShowPortal(true)}>
          Open Portal Modal (document.body)
        </button>
        <PortalModal show={showPortal} onClose={() => setShowPortal(false)} />
      </div>
      <div style={{ height: 800 }} />{" "}
      {/* page content so you can scroll and see clipping */}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    padding: "20px",
    background: "#f5f5f5",
    fontFamily: "system-ui, sans-serif",
  },
  header: {
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    height: 56,
    background: "#b00020",
    color: "white",
    display: "flex",
    alignItems: "center",
    paddingLeft: 20,
    zIndex: 50, // header above most app elements
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  zParent: {
    position: "relative",
    zIndex: 1, // creates a stacking context with low z
    overflow: "hidden", // clips children that try to escape
    height: 200,
    background: "#ddd",
    padding: 20,
    borderRadius: 8,
    marginTop: 8,
  },
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // this number is local to the stacking context it's rendered in
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: 8,
    minWidth: 300,
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
  },
};
