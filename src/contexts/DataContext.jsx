import { useState, useEffect, useContext, createContext } from "react";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  // ===================================
  // store fetched Pokemons on Context
  // ===================================
  const [data, setData] = useState(true);

  // ===================================
  // store login sensor
  // ===================================

  const [isloggedIn, setLoggedIn] = useState(false);

  return (
    <DataContext.Provider
      value={{
        formData,
        changeHandler,
        submitHandler,

        isloggedIn,
        data,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
