import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../store/userSlice";
const User = () => {
  console.log("this also renderd");
  const user = useSelector((state) => state.user.loggedIn);
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(logout());
  }
  function handleLogIn() {
    dispatch(login());
  }
  return (
    <div>
      <>
        <h1>{user ? "logged" : "logout"}</h1>
        <button onClick={handleLogIn}>login</button>
        <button onClick={handleLogout}>logout</button>
      </>
    </div>
  );
};

export default User;
