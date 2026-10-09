// ModalRenderer.js
import ConfirmModal from "./modals/confirmModal.jsx";
import InfoModal from "./modals/InfoModal.jsx";

export default function ModalRenderer({ modal, onClose }) {
  const { type, props } = modal;

  switch (type) {
    case "confirm":
      return <ConfirmModal {...props} onClose={onClose} />;

    case "info":
      return <InfoModal {...props} onClose={onClose} />;

    default:
      return null;
  }
}
