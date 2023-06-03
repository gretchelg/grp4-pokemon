import { useContext, useEffect } from "react";
import "./styles/Gallery.css";
import { DataContext } from "../contexts/DataContext";
import { useState } from "react";
import { func } from "prop-types";
import { NavLink } from "react-router-dom";

export default function Gallery() {
  const { pokemonData, setPokemonData, userData } = useContext(DataContext);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  console.log(search);
  console.log(userData);

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
        <NavLink to="/dashboard">
          <h3>Home</h3>
        </NavLink>
        <h2>Collect a Pokémon</h2>
        <h3>Coins: {userData.coins}</h3>
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
              <NavLink to={`/${singlePokemon._id}`}>
                <img
                  className="gallery_img"
                  src={singlePokemon.front_default}
                />
              </NavLink>
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
