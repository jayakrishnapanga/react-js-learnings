import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProfile } from "./components/userProfile";
import { Products } from "./components/Products";
import { Login } from "./components/Login";
import { InputField } from "./components/inputfield";
import { RadioExample } from "./components/radioinput";
import { CheckBox } from "./components/checkBox";
import { Parent } from "./components/Parent";
import { Forms } from "./components/Forms";
import DropdownExample from "./components/DropDown";
import ToastExample from "./components/Toastexample";
import { ModalsDemo } from "./components/ModalsLearnings";
import BFC from "./components/BFC";
import MasterPositions from "./components/MasterPositions";
import PositionComponents from "./components/MasterPositions2";
import CreatePortal from "./components/ReactPortal";
import ReactHelmet from "./components/Helmet";
import Loader from "./components/Loader";
import KeyFrames from "./components/keyFrames";
import PsudeoElements from "./components/psudeoElements";
import { Table } from "./components/Table";
import { Grid } from "./components/Grid";
import { NavBar_with_Dropdown } from "./Layouts/Nav_Dropdown";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/user/:jk_id/:ca" element={<UserProfile />} />
          <Route path="/" element={<InputField />} />
          <Route path="/radio" element={<RadioExample />} />
          <Route path="/product/:category/:id" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/checkbox" element={<CheckBox />} />
          <Route path="/render/learning" element={<Parent />} />
          <Route path="/forms" element={<Forms />} />
          <Route path="/dropdown" element={<DropdownExample />} />
          <Route path="/toast" element={<ToastExample />} />
          <Route path="/modals" element={<ModalsDemo />} />
          <Route path="/positions" element={<MasterPositions />} />
          <Route path="/positions2" element={<PositionComponents />} />
          <Route path="/portal" element={<CreatePortal />} />
          <Route path="/bfc" element={<BFC />} />
          <Route path="/helmet" element={<ReactHelmet />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/keyframes" element={<KeyFrames />} />
          <Route path="/psudeoelements" element={<PsudeoElements />} />
          <Route path="/table" element={<Table />} />
          <Route path="/grid" element={<Grid />} />
          <Route path="/navbar" element={<NavBar_with_Dropdown/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
