import { useModal } from "../Modals/modal-context";

export function DeleteButton() {
  const { openModal } = useModal();

  return (
    <button
      onClick={() =>
        openModal("confirm", {
          title: "Delete item?",
          message: "This action cannot be undone",
          onConfirm: () => console.log("Deleted"),
        })
      }
    >
      Delete
    </button>
  );
}
