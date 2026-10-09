// import { useToast } from "../hooks/useToast";
import { useState } from "react";
export default function ToastExample() {
  // const { addToast, ToastContainer } = useToast();
  let [open, setOpen] = useState(false);
  function handleToast() {
    setOpen((prev) => !prev);
  }

  function Toast({ msg }) {
    return (
      <div
        className="parent"
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>{msg}</p>
        <button
          className="child"
          style={{ position: "absolute", right: "10px", top: "10px" }}
        >
          X
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <button
        onClick={() => {
          handleToast();
        }}
      >
        show toast
      </button>
      {open && <Toast msg={"success"} />}
      {/* <button onClick={() => addToast("✅ Success!", "success")}>
        Success
      </button>
      <button onClick={() => addToast("⚠️ Warning!", "warning")}>
        Warning
      </button>
      <button onClick={() => addToast("❌ Error!", "error")}>Error</button>
      <button onClick={() => addToast("ℹ️ Info!", "info")}>Info</button> */}

      {/* <ToastContainer /> */}
    </div>
  );
}
