import fetchAPI from "./Utils";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../src/App.css";
import "./styles/userProfile.css";
import { DataContext } from "../contexts/DataContext.jsx";

export default function UserProfile() {
  const [user, setUser] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const navigate = useNavigate();
  const { userData, setUserData } = useContext(DataContext);
  const { _id } = userData;

  const player_id = _id ? _id : "647b19205f5822b228233f4d";

  useEffect(() => {
    console.log("This is my datacontext id:", player_id);
    fetchAPI.fetchOneUser(player_id).then((res) => {
      console.log("I'm in the Dashboard:", res.data);
      setUser(res.data);
      setUserData(res.data);
    });
  }, []);

  // console.log("my info:", user);

  if (!user) return null;

  const handleLeaderboardClick = () => {
    navigate("/leaderboard");
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handlePokemonBattleClick = () => {
    const player_info = {
      user_id: user._id,
      user_name: user.user_name,
      score: user.score,
      coins: user.coins,
      selected_pokemon: selectedPokemon,
    };
    navigate("/arena", { state: player_info });
  };

  const handleGalleryClick = () => {
    navigate("/gallery");
  };

  return (
    <div className="dashboard-container">
      <div className="header">
        <div className="user-info">
          <p className="score">Score: {user.score}</p>
          <h1 className="username">{user.user_name}</h1>
          <p className="coins">Coins: {user.coins}</p>
        </div>
      </div>
      <div className="action-buttons">
        <button className="action-button" onClick={handleGalleryClick}>
          Collect a Pokemon
        </button>
        <button className="action-button" onClick={handlePokemonBattleClick}>
          Start Pokemon Battle
        </button>
        <button className="action-button" onClick={handleLeaderboardClick}>
          Leaderboard
        </button>
      </div>
      <h2>Collection</h2>
      <div className="collection">
        {user.collections &&
          user.collections.map((pokemon, index) => (
            <div
              key={index}
              className={`pokemon ${
                selectedPokemon === pokemon ? "selected" : ""
              }`}
              onClick={() => handlePokemonClick(pokemon)}
            >
              {pokemon}
            </div>
          ))}
      </div>
    </div>
  );
}
