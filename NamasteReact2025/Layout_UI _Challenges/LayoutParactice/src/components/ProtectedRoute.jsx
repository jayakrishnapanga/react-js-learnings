import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  let isAuthenticated = localStorage.getItem("token");
  console.log("isAuthenticated", isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
}
