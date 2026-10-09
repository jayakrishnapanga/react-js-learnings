// ModalProvider.js
import { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import ModalContext from "./modal-context";
import ModalRenderer from "./modal-renderer.jsx";
export default function ModalProvider({ children }) {
  const [modal, setModal] = useState(null);

  const openModal = useCallback((type, props = {}) => {
    setModal({ type, props });
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}

      {modal &&
        ReactDOM.createPortal(
          <ModalRenderer modal={modal} onClose={closeModal} />,
          document.body,
        )}
    </ModalContext.Provider>
  );
}
