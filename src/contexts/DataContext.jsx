import { useState, useEffect, useContext, createContext } from "react";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  // ===================================
  // store fetched Pokemons on Context
  // ===================================
  const [pokemonData, setPokemonData] = useState();

  // ===================================
  // store Registered sensor
  // ===================================

  const [isRegistered, setisRegistered] = useState(false);
  // console.log("Is registered:", isRegistered);

  return (
    <DataContext.Provider
      value={{
        isRegistered,
        setisRegistered,
        pokemonData,
        setPokemonData,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}
