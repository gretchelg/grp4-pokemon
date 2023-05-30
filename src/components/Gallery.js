import { useContext, useEffect } from "react";
import "./styles/Gallery.css";
import { DataContext } from "../contexts/DataContext";
import { useState } from "react";

export default function Gallery() {
  const { pokemonData, setPokemonData } = useContext(DataContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:4000/api/pokemons?page=${page}`)
      .then((res) => res.json())
      .then((data) => setPokemonData(data.data));
  }, []);
  console.log(typeof pokemonData, pokemonData);

  return (
    <div className="gallery">
      <div className="header">
        <h2>Collect a Pokémon</h2>
      </div>
      <input className="searchbar" placeholder="search" />
      <div className="gallery_wrapper">
        {pokemonData?.map((singlePokemon) => (
          <div className="gallery_list">
            <div className="gallery_single_pokemon">
              <img className="gallery_img" src={singlePokemon.front_default} />
              <div>
                <h3>{singlePokemon.name}</h3>
                <span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
