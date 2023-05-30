import React from "react";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [user_name, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_name,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
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
        />
        <input
          className="login_input"
          onChange={(e) => setUserName(e.target.value)}
          type="text"
          value={password}
          placeholder="password"
        />
        <NavLink className="login_signup" to="/registration">
          <h2>SIGN UP</h2>
        </NavLink>
      </form>
      <button className="login_button">GO!</button>
    </div>
  );
}
