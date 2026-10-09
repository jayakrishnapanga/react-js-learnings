// without using the createPortal

// export function Modal({ show, onClose, children }) {
//   if (!show) return null;

//   return (
//     <div style={styles.overlay}>
//       <div style={styles.modal}>
//         <button onClick={onClose} style={styles.closeBtn}>
//           ✕
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// }

import { createPortal } from "react-dom";
export function Modal({ show, onClose, children }) {
  if (!show) return null;

  return createPortal(
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} style={styles.closeBtn}>
          ✕
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(22, 213, 28, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#fff",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "300px",
    position: "relative",
  },
  closeBtn: {
    position: "absolute",
    right: "10px",
    top: "10px",
    background: "none",
    border: "none",
    fontSize: "18px",
    cursor: "pointer",
  },
};
