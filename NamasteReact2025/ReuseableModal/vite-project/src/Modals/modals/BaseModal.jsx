// BaseModal.js
import { useEffect, useRef } from "react";

export default function BaseModal({ children, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    // prevent background scroll
    document.body.style.overflow = "hidden";

    // close on escape
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="overlay">
      <div className="modal" ref={modalRef}>
        {children}
      </div>
    </div>
  );
}
