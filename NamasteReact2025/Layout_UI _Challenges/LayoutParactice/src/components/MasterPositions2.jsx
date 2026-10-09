import "../css/positions2.css";
import { useState } from "react";

export default function PositionComponents() {
  const [open, setOpen] = useState(false);

  return (
    <div className="page">
      {/* TOOLTIP */}
      <div className="section">
        <h3>1️⃣ Tooltip (position: absolute)</h3>
        <div className="tooltip-wrapper">
          <button className="btn">Hover me</button>
          <span className="tooltip">I am a tooltip</span>
        </div>
      </div>

      {/* DROPDOWN */}
      <div className="section">
        <h3>2️⃣ Dropdown (absolute inside relative parent)</h3>
        <div className="dropdown">
          <button className="btn" onClick={() => setOpen(!open)}>
            Toggle Dropdown
          </button>
          {open && (
            <ul className="menu">
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          )}
        </div>
      </div>

      {/* MODAL */}
      <div className="section">
        <h3>3️⃣ Modal (position: fixed)</h3>
        <button className="btn" onClick={() => setOpen(true)}>
          Open Modal
        </button>

        {open && (
          <div className="modal-overlay" onClick={() => setOpen(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <h2>Modal</h2>
              <p>This modal is centered using position: fixed</p>
              <button className="btn" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
