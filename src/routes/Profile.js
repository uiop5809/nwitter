import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { authService } from "./../fbase";

export default function Profile() {
  const navigate = useNavigate();

  const onLogOutClick = () => {
    authService.signOut();
    navigate("/");
  };
  return <button onClick={onLogOutClick}>Logout</button>;
}
