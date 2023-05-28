<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { createContext } from "react";
import { useState } from "react";
=======
import { useState, useEffect, useContext, createContext } from "react";
>>>>>>> Stashed changes
=======
import { useState, useEffect, useContext, createContext } from "react";
>>>>>>> Stashed changes

export const DataContext = createContext();

export default function DataContextProvider(props) {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  // ===================================
  // store fetched Pokemons on Context
  // ===================================
  const [data, setData] = useState(true);

  // ===================================
  // create Users Object and POST request
  // ===================================
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    password: "",
  });

  const [isloggedIn, setIsLoggedIn] = useState(true);

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
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
=======
=======
>>>>>>> Stashed changes
  const [data, setData] = useState(true);

  // ===================================
  // store login sensor
  // ===================================

  const [isloggedIn, setLoggedIn] = useState(false);
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes

  return (
    <DataContext.Provider
      value={{
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        formData,
        changeHandler,
        submitHandler,
=======
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        isloggedIn,
        data,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
