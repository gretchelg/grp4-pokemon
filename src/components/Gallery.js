import fetchAPI from './Utils'
import { useState, useEffect } from 'react';

export default function Gallery() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchAPI.fetchAllPokemons()
    .then(res => {
      console.log("I'm in the Gallery:", res.data)
      setPokemons(res.data)
    })
  }, [])

  

  return (
    <div>
      <div className="header">
        <h2>Register</h2>
      </div>
    </div>
  );
}
