import { useState } from "react";

import { Toast } from "./Toast";
// ----------------------
// Custom Hook
// ----------------------
export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const ToastContainer = () => (
    <div style={styles.toastContainer}>
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          onClose={() => removeToast(t.id)}
        />
      ))}
    </div>
  );

  return { addToast, ToastContainer };
}

// ----------------------
// Styles
// ----------------------
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
