import "./App.css";
import Landingpage from "./components/Landingpage";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import BeatLoader from "react-spinners/BeatLoader";
import EachPokemon from "./EachPokemon";

function App() {
  // const [pokemons, setPokemons] = useState([]);
  // const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  // const [nextPageUrl, setNextPageUrl] = useState()
  // const [prevPageUrl, setPrevPageUrl] = useState()
  // const [loading, setLoading] = useState(true)

  // useEffect(() => {
  //   setLoading(true);
  //     const fetchData = async () => {
  //     const res = await fetch(currentPageUrl)
  //     const data = await res.json();
  //     setPokemons(data.results)
  //     setNextPageUrl(data.next)
  //     setPrevPageUrl(data.previous)
  //     // setPokemons(data.results.map(p => p.className))
  //     setLoading(false);
  //     }
  //     fetchData();
  // }, [currentPageUrl])

  // console.log("pokemons:", pokemons);
  // function gotoNextPage() {
  //   setCurrentPageUrl(nextPageUrl)
  // }

  // function gotoPrevPage() {
  //   setCurrentPageUrl(prevPageUrl)
  // }

  return (
    <div className="App">
      <EachPokemon />
      {/* spiner
      {loading ? (<BeatLoader
        color="#f5a214"
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"/>)
        : (
          <ul>Hello
          {pokemons.map((pokemon) => (
            <li>
              <p>{pokemon.name}</p>
              <p>{pokemon.url}</p>
            </li>
          ))}
        </ul>
        )
        }
  <EachPokemon />      
  <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
  /> */}
    </div>
  );
}

export default App;
