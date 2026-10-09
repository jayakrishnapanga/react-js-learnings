// RootLayout.js
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Dashboard from "./Dashboard";
export default function RootLayout() {
  return (
    <div className="root-layout">
      <Navbar/>
      <main>
        <Outlet /> {/* ← Nested routes render here */}
      </main>
    </div>
  );
}
