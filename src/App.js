import "./App.css";
<<<<<<< HEAD
import Landingpage from "./components/Landingpage";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import BeatLoader from "react-spinners/BeatLoader";
import EachPokemon from "./EachPokemon";
import Login from "./components/Login";

function App() {
  // Login
  const [currentForm, setCurrentForm] = useState("Login");

  const [pokemons, setPokemons] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const res = await fetch(currentPageUrl);
      const data = await res.json();
      setPokemons(data.results);
      setNextPageUrl(data.next);
      setPrevPageUrl(data.previous);
      // setPokemons(data.results.map(p => p.className))
      setLoading(false);
    };
    fetchData();
  }, [currentPageUrl]);

  console.log("pokemons:", pokemons);
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  return (
    <div className="App">
      <Login />
      <EachPokemon />
      spiner
      {loading ? (
        <BeatLoader
          color="#f5a214"
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <ul>
          Hello
          {pokemons.map((pokemon) => (
            <li>
              <p>{pokemon.name}</p>
              <p>{pokemon.url}</p>
            </li>
          ))}
        </ul>
      )}
      <EachPokemon />
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
      />
=======
import Registration from "./components/Registration";
import Login from "./components/Login";
import Gallery from "./components/Gallery";
import Profile from "./components/Profile";
import UserProfile from "./components/UserProfile";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./contexts/DataContext";
import Navigation from "./components/Navigation";
import Landingpage from "./components/Landingpage";
import Errorpage from "./components/Errorpage";

function App() {
  const { isLoggedIn } = useContext(DataContext);
  return (
    <div className="App">
      <Navigation />

      {/* SETUP ROUTES AND PATHS    */}
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route path="/home" element={<Landingpage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/dashboard" element={<UserProfile />} />
        <Route path="/:id" element={<Profile />} />
        <Route path="/oops" element={<Errorpage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
>>>>>>> main
    </div>
  );
}

export default App;
