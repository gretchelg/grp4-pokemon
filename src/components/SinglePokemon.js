import { useEffect, useContext, useState } from "react";
import fetchAPI from "./Utils";
import { DataContext } from "../contexts/DataContext";
import { useParams, NavLink } from "react-router-dom";
import "./styles/SinglePokemon.css";
export default function SinglePokemon() {
  const { onePokemon, setOnePokemon, userData, setUserData } =
    useContext(DataContext);
  const [buyMsg, setBuyMsg] = useState("");
  const [newCollection, setNewCollection] = useState([]);

  const { id } = useParams();
  useEffect(() => {
    // onePokemon && console.log("onepoke", onePokemon);
    fetch(`http://localhost:4000/api/pokemons/${id}`)
      .then((res) => res.json())
      .then((data) => setOnePokemon(data.data));
  }, []);

  const buyNow = function (e) {
    e.preventDefault();
    if (userData.coins >= 80) {
      const found = userData.collections.find(
        (pokemone) => pokemone === onePokemon?.name
      );

      if (found) {
        setBuyMsg("you already have this pokemon");
        console.log(found);
      } else {
        // setNewCollection((prev) => [...prev, onePokemon.name]);
        // updating coins
        const updatedObject = { ...userData };
        updatedObject.coins = String(Number(updatedObject.coins) - 80);

        updatedObject.collections = [
          ...updatedObject.collections,
          onePokemon.name,
        ];
        console.log("updateObject.collections:", updatedObject.collections);

        //updating collection
        // let newCollection = [];
        // const { collections } = userData;
        // console.log(" destructured collections:", collections);
        // const updatedCollection = [...collections, onePokemon.name];

        setUserData(updatedObject);

        //updating the user information
        fetchAPI.addToScore({
          userID: userData._id,
          scoreToAdd: 0,
          coinsToAdd: -80,
          updatedCollection: updatedObject.collections,
        });

        setBuyMsg(
          `Pokemone purschased, current Coins :
          ${Number(userData?.coins) - 80}`
        );
      }
    } else {
      return setBuyMsg("you dont have enough coins !");
    }
  };

  return (
    <div className="singlePokemon">
      <div className="header">
        <NavLink to="/dashboard">
          <h3>Home</h3>
        </NavLink>
        <h2>{onePokemon?.name}</h2>
        <h3>Coins: {userData?.coins}</h3>
      </div>

      <div className="singlePokemon_container">
        <div className="singlePokemon_info_wrapper">
          <div>
            <img
              className="singlePokemon_img"
              src={onePokemon?.front_default}
            />
            <div>
              {onePokemon?.types.map((info) => (
                <span className="types">{info.type.name}</span>
              ))}
            </div>
          </div>
          <div className="singlePokemon_infobox">
            <h2 className="singlePokemon_Basic">Basic</h2>
            <p>
              <span className="infos_large">Base Experience: </span>
              {onePokemon?.base_experience}
            </p>
            <p>
              <span className="infos_large">HP: </span>
              {onePokemon?.stats[0].base_stat}
            </p>
            <p>
              <span className="infos_large">Attack: </span>
              {onePokemon?.stats[1].base_stat}
            </p>
            <p>
              <span className="infos_large">Defense: </span>
              {onePokemon?.stats[2].base_stat}
            </p>
            <p>
              <span className="infos_large">Special-Attack: </span>
              {onePokemon?.stats[3].base_stat}
            </p>
            <p>
              <span className="infos_large">Special-Defense: </span>
              {onePokemon?.stats[4].base_stat}
            </p>
            <p>
              <span className="infos_large">Speed: </span>
              {onePokemon?.stats[5].base_stat}
            </p>
          </div>
        </div>
        <button onClick={buyNow} className="buyNow">
          Buy Now
        </button>
        <p className={userData.coins > 80 ? "buySuccess" : "buyFailed"}>
          {buyMsg}
        </p>
      </div>
    </div>
  );
}
