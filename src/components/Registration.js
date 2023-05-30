import "./styles/Registration.css";
import "../../src/App.css";
import { useState, useContext } from "react";

import { DataContext } from "../contexts/DataContext.jsx";

export default function Registration() {
  const { setisRegistered, isRegistered } = useContext(DataContext);

  const [regMsg, setRegMsg] = useState("");

  // ===================================
  // create Users Object and POST request
  // ===================================
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const changeHandler = function (event) {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const submitHandler = function (event) {
    event.preventDefault();
    console.log(formData);

    fetch("http://localhost:4000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        setisRegistered(data.success);
        setRegMsg(data.msg);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="registration">
      <div className="header">
        <h2>Register</h2>
      </div>
      <form onSubmit={submitHandler} className="reg_form">
        <label htmlFor="reg_username">Create a username</label>
        <input
          onChange={changeHandler}
          name="user_name"
          type="text"
          id="reg_username"
          required
        />

        <label htmlFor="reg_email">Add your email</label>
        <input
          onChange={changeHandler}
          type="email"
          id="reg_email"
          name="email"
        />

        <label htmlFor="reg_password">Create a password</label>
        <input
          name="password"
          onChange={changeHandler}
          type="password"
          id="reg_password"
          required
        />

        <button type="submit">Register</button>
        <div className="reg_msg">{regMsg}</div>
      </form>
    </div>
  );
}
