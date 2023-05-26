import { useState, useEffect, useContext, createContext } from "react";

export const DataContext = createContext();

export default function DataContextProvider(props) {
  const [data, setData] = useState(true);

  return (
    <DataContext.Provider value={data}>{props.childern}</DataContext.Provider>
  );
}
