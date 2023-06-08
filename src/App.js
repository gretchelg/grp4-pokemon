import "./App.css";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Gallery from "./components/Gallery";
import UserProfile from "./components/UserProfile";
import { NavLink, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./contexts/DataContext";
import Navigation from "./components/Navigation";
import Errorpage from "./components/Errorpage";
import Leaderboard from "./components/Leaderboard";
import PokemonBattle from "./components/PokemonBattle";
import SinglePokemon from "./components/SinglePokemon";

function App() {
  const { isRegistered, isLoggedIn } = useContext(DataContext);
  return (
    <div className="App">
      {/* <Navigation /> */}

      {/* SETUP ROUTES AND PATHS    */}
      <Routes>
        <Route path="/arena" element={<PokemonBattle />} />
        <Route
          path="/"
          element={
            !isLoggedIn ? <Login /> : <UserProfile />
          }
        />
        <Route
          path="/registration"
          element={
            !isRegistered ? <Registration /> : <Login />
          }
        />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/dashboard" element={<UserProfile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/:id" element={<SinglePokemon />} />
        <Route path="/oops" element={<Errorpage />} />
        <Route path="*" element={<Errorpage />} />
      </Routes>
    </div>
  );
}

export default App;
