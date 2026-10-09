import React from "react";
import { ToastProvider, useToast } from "./ToastContext";

function Home() {
  const { addToast } = useToast();

  return (
    <div style={{ padding: "20px" }}>
      <h2>Custom Toast Example</h2>
      <button onClick={() => addToast("Info message", "info")}>Info Toast</button>
      <button onClick={() => addToast("Success!", "success")}>Success Toast</button>
      <button onClick={() => addToast("Error occurred!", "error")}>Error Toast</button>
      <button onClick={() => addToast("Another notification", "info")}>
        Add Another Toast
      </button>
    </div>
  );
}
