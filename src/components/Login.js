import React, { useState } from "react";

function Login() {
  const [username, setuserName] = useState("");
  const [password, setpassWord] = useState("");

  const handleSubmit = (e) => {
    e.pventDefault();
    console.log(username);
  };
  return (
    <div>
      <div className="login_container">
        <img src="./img/Logo.png" alt="pokemon" />
        <form className="login_form" onSubmit={handleSubmit}>
          <input
            className="login_input"
            value={username}
            onChange={(e) => setuserName(e.target.value)}
            type="username"
            placeholder="Username"
          />
          <input
            className="login_input"
            value={password}
            onChange={(e) => setpassWord(e.target.value)}
            type="text"
            placeholder="Password"
            name="password"
          />
          <h2>Sign Up</h2>
          <button className="login_button" type="submit">
            GO!
          </button>
        </form>
        <button>Don't have an account? Register here!</button>
      </div>
    </div>
  );
}

export default Login;
