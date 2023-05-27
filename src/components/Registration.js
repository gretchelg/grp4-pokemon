import "./styles/Registration.css";
import { useState, useContext } from "react";

import { DataContext } from "../contexts/DataContext";

export default function Registration() {
  const { submitHandler, changeHandler } = useContext(DataContext);

  return (
    <div className="reg_container">
      <div className="reg_header">
        <h2>Register</h2>
      </div>
      <form onSubmit={submitHandler} className="reg_form">
        <label for="reg_username">Create a username</label>
        <input
          onChange={changeHandler}
          name="user_name"
          type="text"
          id="reg_username"
          required
        />

        <label for="reg_email">Add your email</label>
        <input
          onChange={changeHandler}
          type="email"
          id="reg_email"
          name="email"
        />

        <label for="reg_password">Create a username</label>
        <input
          name="password"
          onChange={changeHandler}
          type="password"
          id="reg_password"
          required
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}
