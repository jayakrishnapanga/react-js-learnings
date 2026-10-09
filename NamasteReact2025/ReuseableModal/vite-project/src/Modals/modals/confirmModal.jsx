// modals/ConfirmModal.js
import BaseModal from "./BaseModal.jsx";

export default function ConfirmModal({
  title,
  message,
  onConfirm,
  onClose,
}) {
  return (
    <BaseModal onClose={onClose}>
      <h2>{title}</h2>
      <p>{message}</p>

      <button onClick={onClose}>Cancel</button>
      <button
        onClick={() => {
          onConfirm();
          onClose();
        }}
      >
        Confirm
      </button>
    </BaseModal>
  );
}
