import { useState } from "react";
import { Modal } from "./Modal";
export function ModalsDemo() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(true)}>Open Modal</button>
      <Modal show={show} onClose={() => setShow(false)}>
        <h2>Hello Modal!</h2>
        <p>This is a simple modal example.</p>
      </Modal>
    </div>
  );
}
