import { useContext, useEffect } from "react";
import "./styles/Gallery.css";
import { DataContext } from "../contexts/DataContext";
import { useState } from "react";
import { func } from "prop-types";
import { NavLink } from "react-router-dom";
// import Pagination from "./Pagination";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

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
  }, [search, page]);

  console.log(typeof pokemonData, pokemonData);
  const handleSearch = function (e) {
    e.preventDefault();
  };

  const handlePageChange = function (event, value) {
    setPage(value);
  };

  // const nextPage = function () {
  //   setPage((prev) => prev + 1);
  // };
  // const prevPage = function () {
  //   setPage((prev) => prev - 1);
  // };

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
      {/* <div className="gallery_pagination">
        <button className="pagination_buttons" onClick={nextPage}>
          Previous
        </button>
        <button className="pagination_buttons" onClick={prevPage}>
          Next
        </button>
      </div> */}
      <Stack spacing={2}>
        <Pagination
          color="primary"
          onChange={handlePageChange}
          className="gallery_pagination "
          count={10}
        />
      </Stack>
    </div>
  );
}
