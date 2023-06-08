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
    fetchAPI.fetchOneUser(player_id).then((res) => {
      setUser(res.data);
      setUserData(res.data);
    });
  }, []);

  if (!user) return null;

  const handleLeaderboardClick = () => {
    navigate("/leaderboard");
  };

  const handlePokemonClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handlePokemonBattleClick = () => {
    if (selectedPokemon === null) {
    alert("Select first a Pokemon in your Collection and Start the Battle.")
    return
    }

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
        <h3 className="dashboard_score">Score: {user.score}</h3>
        <h1 className="username">{user.user_name}</h1>
        <h3 className="coins">Coins: {user.coins}</h3>
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

      <div className="collection">
        <h2>Collection</h2>
        <div className="collection_footer">
          {user.collections?.length > 0 ? (
            user.collections.map((pokemon, index) => (
              <div
                key={index}
                className={`pokemon ${
                  selectedPokemon === pokemon ? "selected" : ""
                }`}
                onClick={() => handlePokemonClick(pokemon)}
              >
                <span>{pokemon}</span>
              </div>
            ))
          ) : (
            <div className="no_pokemons">You have no pokemons in your collection. Go collect Pokemon first.</div>
          )}
        </div>
      </div>
    </div>
  );
}
