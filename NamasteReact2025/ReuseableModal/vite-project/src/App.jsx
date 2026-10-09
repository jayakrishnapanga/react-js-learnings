import "./App.css";
import ModalProvider from "./Modals/modal-provider";
import { DeleteButton } from "./components/DeleteButton";
import { InfoButton } from "./components/InfoButton";

function App() {
  return (
    <ModalProvider>
      <DeleteButton />
      <InfoButton />
    </ModalProvider>
  );
}

export default App;
