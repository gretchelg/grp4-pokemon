import { useContext, useEffect } from "react";
import "./styles/Gallery.css";
import { DataContext } from "../contexts/DataContext";
import { useState } from "react";
import { func } from "prop-types";

export default function Gallery() {
  const { pokemonData, setPokemonData } = useContext(DataContext);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  console.log(search);

  useEffect(() => {
    fetch(`http://localhost:4000/api/pokemons?page=${page}&search=${search}`)
      .then((res) => res.json())
      .then((data) => setPokemonData(data.data));
    console.log(page);
  }, [search]);

  console.log(typeof pokemonData, pokemonData);
  const handleSearch = function (e) {
    e.preventDefault();
  };

  return (
    <div className="gallery">
      <div className="header">
        <h2>Collect a Pokémon</h2>
      </div>
      <form onSubmit={handleSearch}>
        <input
          onChange={(e) => setSearch(e.target.value)}
          className="searchbar"
          placeholder="search"
        />
      </form>

      <div className="gallery_wrapper">
        {pokemonData?.map((singlePokemon) => (
          <div className="gallery_list">
            <div className="gallery_single_pokemon">
              <img className="gallery_img" src={singlePokemon.front_default} />
              <div>
                <h4 className="gallery_name">{singlePokemon.name}</h4>
                {singlePokemon.types.map((type) => (
                  <span className="gallery_type">{type.type.name}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
