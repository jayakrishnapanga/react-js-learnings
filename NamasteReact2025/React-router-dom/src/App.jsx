import Counter from "./components/Counter";
import User from "./components/user";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProfile } from "./components/userProfile";
import { Products } from "./components/Products";
import { Login } from "./components/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/user/:jk_id/:ca" element={<UserProfile />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:category/:id" element={<Products />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
