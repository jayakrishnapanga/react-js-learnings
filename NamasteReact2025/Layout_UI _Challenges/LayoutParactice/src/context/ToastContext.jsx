import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // ✅ Add new toast
  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto remove after 3 seconds
    setTimeout(() => removeToast(id), 3000);
  }, []);

  // ❌ Remove toast manually
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={styles.toastContainer}>
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              ...styles.toast,
              ...styles[t.type],
            }}
          >
            <span>{t.message}</span>
            <button style={styles.closeBtn} onClick={() => removeToast(t.id)}>
              ✖
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

// 🎨 Basic styling
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
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 16px",
    borderRadius: "8px",
    minWidth: "220px",
    color: "#fff",
    fontWeight: "500",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
    animation: "fadeIn 0.3s ease",
  },
  info: { backgroundColor: "#007bff" },
  success: { backgroundColor: "#28a745" },
  error: { backgroundColor: "#dc3545" },
  closeBtn: {
    background: "transparent",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
};
