import { useModal } from "../Modals/modal-context";

export function InfoButton() {
  const { openModal } = useModal();

  return (
    <button
      onClick={() =>
        openModal("info", {
          title: "user Details ?",
          message: "jk age 25 ",
          onConfirm: () => console.log("user details "),
        })
      }
    >
      Info
    </button>
  );
}
