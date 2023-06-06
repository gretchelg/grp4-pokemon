import React, { useContext } from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../contexts/DataContext";
import "../App.css";

export default function Login() {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginMsg, setLoginMsg] = useState("");

  const { setisLoggedIn, isLoggedIn, userData, setUserData } =
    useContext(DataContext);

  const submitHandler = (e) => {
    console.log("form submitted", user_name, password);
    e.preventDefault();
    fetch("http://localhost:4000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name: user_name,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
        setisLoggedIn(data.success);
        setLoginMsg(data.msg);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login_container">
      <img
        className="login_pokemon"
        src="../../img/Logo.png"
        alt="pokemon"
      ></img>

      <form onSubmit={submitHandler} className="login_form ">
        <input
          className="login_input"
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          value={user_name}
          placeholder="username"
          required
        />
        <input
          className="login_input"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          value={password}
          placeholder="password"
          required
        />
        <NavLink className="login_signup" to="/registration">
          <h2>
            Not registered yet ? <span className="reg_here">SIGN UP</span> here
            now
          </h2>
        </NavLink>
        <button type="submit" className="login_button">
          GO!
        </button>
        <div className="reg_msg">{loginMsg}</div>
      </form>
    </div>
  );
}
