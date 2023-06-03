import { useState, useEffect } from "react";
import fetchAPI from "./Utils";
import fetchAPI2 from "./Utils";
import "./styles/PokemonBattle.css";

// define sample pokemons
// const cpu_data = {
//     name: 'Charizard',
//     speed: 100,
//     attack: 70,
//     defense: 40,
//     hp: 100,
//     moves: [
//         { name: 'fire breath', power: 50 },
//         { name: 'claw', power: 70 },
//         { name: 'fireball', power: 90 },
//     ],
// }

// const user_data = {
//     name: 'Pikachu',
//     speed: 90,
//     attack: 50,
//     defense: 30,
//     hp: 200,
//     moves: [
//         { name: 'electricity', power: 40 },
//         { name: 'bite', power: 60 },
//         { name: 'lightning bolt', power: 80 },
//     ],
// }

export default function PokemonBattle() {
  const [battle, setBattle] = useState({});
  const [battleLog, setBattleLog] = useState([]);
  const [battleOngoing, setBattleOngoing] = useState(false);
  const [cpuPokemonData, setCpuPokemonData] = useState({});
  const [userPokemonData, setUserPokemonData] = useState({});

  useEffect(() => {
    console.log("useEffect initializing");
    pickRandomPokemon()
      .then((res) => {
        setCpuPokemonData(res);
        console.log("I'm the CPU Pokemon:", res);
      })
      .catch((error) => {
        console.error("Error while picking random Pokemon:", error);
      });

    console.log("second useEffect...");
    getUserPokemonData()
      .then((res) => {
        setUserPokemonData(res);
        console.log("I'm the User Pokemon:", res);
      })
      .catch((error) => {
        console.error("Error while fetching User Pokemon:", error);
      });
  }, []);

  console.log("outside CPU Pokemon:", cpuPokemonData);
  console.log("outside User Pokemon:", userPokemonData);
  const user_data = userPokemonData;
  const cpu_data = cpuPokemonData;

  const handleBattleStart = () => {
    // battle has started
    setBattleOngoing(true);

    const freshBattle = newBattle(user_data, cpu_data);

    // print who goes first
    if (freshBattle.nextTurn == CPU) {
      setBattleLog((prevLog) => [
        ...prevLog,
        `${freshBattle.cpuPokemon.name} attacks first.`,
      ]);
    } else {
      setBattleLog((prevLog) => [
        ...prevLog,
        `${freshBattle.userPokemon.name} attacks first.`,
      ]);
    }

    // if cpu's turn, let cpu do a move
    if (freshBattle.nextTurn == CPU) {
      const logText = doCpuMove(freshBattle);
      setBattleLog((prevLog) => [...prevLog, logText]);
    }

    // if user is not dead then tell them they will move next
    if (!freshBattle.isFinished) {
      setBattleLog((prevLog) => [
        ...prevLog,
        `${freshBattle.userPokemon.name} will move next...`,
      ]);
    }

    // append win log
    if (freshBattle.isFinished) {
      setBattleLog((prevLog) => [
        ...prevLog,
        `The battle is finished! ${freshBattle.winningPokemon} wins!`,
      ]);
    }

    setBattle(freshBattle);
  };

  const handleBattleRestart = () => {
    setBattleLog([]);
    handleBattleStart();
  };

  const handleUserMoveSelected = (indexOfMove) => {
    // do user move
    const userLogTxext = applyMove(battle, indexOfMove);
    // setBattleLog(prevLog => [...prevLog, userLogTxext]);
    setBattleLog((prevLog) => [userLogTxext]);

    // if user's move finished the battle, log the win and return already
    if (battle.isFinished) {
      setBattleLog((prevLog) => [
        ...prevLog,
        `The battle is finished! ${battle.winningPokemon} wins!`,
      ]);
      return;
    }

    // print next to move
    setBattleLog((prevLog) => [
      ...prevLog,
      `${battle.cpuPokemon.name} will move next...`,
    ]);

    // do cpu move
    const cpuLogText = doCpuMove(battle);
    setBattleLog((prevLog) => [...prevLog, cpuLogText]);

    // if user is not dead then tell them they will move next
    if (!battle.isFinished) {
      setBattleLog((prevLog) => [
        ...prevLog,
        `${battle.userPokemon.name} will move next...`,
      ]);
    }

    // if battle is finished, log it
    if (battle.isFinished) {
      setBattleLog((prevLog) => [
        ...prevLog,
        `The battle is finished! ${battle.winningPokemon} wins!`,
      ]);
    }
  };

  // below are convenience functions to quickly display stats (e.g. current HP)
  const getUserPokemonForDisplay = () =>
    JSON.stringify(describePokemon(battle, USER));
  const getCpuPokemonForDisplay = () =>
    JSON.stringify(describePokemon(battle, CPU));

  // =====================================================
  // =====================================================

  // UI (1/3): Pre-Battle
  if (!battleOngoing) {
    return (
      <div className="area_wrapper">
        <div className="area_header">
          <h2>Welcome to the Arena</h2>
        </div>

        <div className="players_wrapper">
          <div className="arena_player">
            <div>
              <img
                className="arena_image"
                src={userPokemonData.front_default}
                alt={userPokemonData.name}
              />
              <img className="elipse" src="../../img/ellipse.png" />
            </div>

            <div className="arena_info">
              <p id="arena_pokemone_title">
                My Pokemon : {userPokemonData.name}
              </p>
              <p>Attack : {userPokemonData.attack}</p>
              <p>Defense : {userPokemonData.defense}</p>
              <p>Speed : {userPokemonData.speed}</p>
            </div>
          </div>

          <div>
            <h3>VS</h3>
          </div>

          <div className="arena_player">
            <div>
              <img
                className="arena_image"
                src={cpuPokemonData.front_default}
                alt={cpuPokemonData.name}
              />
              <img className="elipse" src="../../img/ellipse.png" />
            </div>

            <div className="arena_info">
              <p id="arena_pokemone_title">
                CPU Pokemon : {cpuPokemonData.name}
              </p>
              <p>Attack : {cpuPokemonData.attack}</p>
              <p>Defense : {cpuPokemonData.defense}</p>
              <p>Speed : {cpuPokemonData.speed}</p>
            </div>
          </div>
        </div>

        <button className="start_battle" onClick={handleBattleStart}>
          Start Battle
        </button>
      </div>
    );
  }

  //   ============================================================
  //   ============================================================

  // UI (2/3): Ongoing Battle
  if (!battle.isFinished) {
    return (
      <div className="area_wrapper">
        <div className="area_header">
          <h2>Welcome to the Arena</h2>
        </div>

        {/* SECTION: BATTLE LOG */}
        <h3>Battle Log:</h3>
        <p>
          {battleLog?.map((log, index) => (
            <p key={index}>{log}</p>
          ))}
        </p>
        {/* <p>{battleLog && battleLog[battleLog.length - 1]}</p> */}

        <div className="area_wrapper">
          <div className="player">
            <img
              className="pokemon_image"
              src={userPokemonData.front_default}
              alt={userPokemonData.name}
            />
          </div>

          <div className="info">
            <p> My Pokemon : {userPokemonData.name}</p>
            <p>Attack : {userPokemonData.attack}</p>
            <p>Defense : {userPokemonData.defense}</p>
            <p>Speed : {userPokemonData.speed}</p>
          </div>

          <div className="cpu">
            <img
              className="pokemon_image"
              src={cpuPokemonData.front_default}
              alt={cpuPokemonData.name}
            />
          </div>

          <div className="info">
            <p> CPU Pokemon : {cpuPokemonData.name}</p>
            <p>Attack : {cpuPokemonData.attack}</p>
            <p>Defense : {cpuPokemonData.defense}</p>
            <p>Speed : {cpuPokemonData.speed}</p>
          </div>
        </div>

        {/* SECTION: POKEMON STATS */}
        {/* <h3>Opponents Stats:</h3>
                <p>Player 1 (user): {getUserPokemonForDisplay()}</p>
                <p>Player 2 (cpu): {getCpuPokemonForDisplay()}</p> */}

        {/* SECTION: USER INPUT */}
        <h3>Choose Attack:</h3>
        {battle.nextTurn === USER ? (
          battle.userPokemon.moveData.map((move, index) => (
            <button key={index} onClick={() => handleUserMoveSelected(index)}>
              {move.name}
            </button>
          ))
        ) : (
          <>N.A.</>
        )}
      </div>
    );
  }

  //   ===========================================================
  //   ===========================================================

  // UI (3/3): Battle Finished
  return (
    <div>
      <div className="area_header">
        <h2>Welcome to the Arena</h2>
      </div>

      {/* SECTION: BATTLE LOG */}
      <h3>Battle Log:</h3>
      <p>
        {battleLog?.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </p>
      {/* <p>{battleLog && battleLog[battleLog.length - 1]}</p> */}
      {/* SECTION: BATTLE LOG */}
      <h3>Battle Log:</h3>
      <p>
        {battleLog?.map((log, index) => (
          <p key={index}>{log}</p>
        ))}
      </p>
      {/* <p>{battleLog && battleLog[battleLog.length - 1]}</p> */}

      {/* SECTION: POKEMON STATS */}
      {/* <h3>Opponents Stats:</h3>
            <p>Player 1 (user): {getUserPokemonForDisplay()}</p>
            <p>Player 2 (cpu): {getCpuPokemonForDisplay()}</p> */}

      <div className="area_wrapper">
        <div className="player">
          <img
            className="pokemon_image"
            src={userPokemonData.front_default}
            alt={userPokemonData.name}
          />
        </div>

        <div className="info">
          <p> My Pokemon : {userPokemonData.name}</p>
          <p>Attack : {userPokemonData.attack}</p>
          <p>Defense : {userPokemonData.defense}</p>
          <p>Speed : {userPokemonData.speed}</p>
        </div>

        <div className="cpu">
          <img
            className="pokemon_image"
            src={cpuPokemonData.front_default}
            alt={cpuPokemonData.name}
          />
        </div>

        <div className="info">
          <p> CPU Pokemon : {cpuPokemonData.name}</p>
          <p>Attack : {cpuPokemonData.attack}</p>
          <p>Defense : {cpuPokemonData.defense}</p>
          <p>Speed : {cpuPokemonData.speed}</p>
        </div>
      </div>

      {/* SECTION: BATTLE RESULT */}
      <h3>Result:</h3>
      <p>
        {battle.isFinished && battle.winner === USER
          ? "*** YOU WON! ***"
          : "*** YOU LOST. ***"}
      </p>

      {/* SECTION: TRY AGAIN */}
      <h3>Play Again?</h3>
      <button onClick={handleBattleRestart}>Restart</button>
    </div>
  );
}

// ------------------------------------------------------------------------------

// pickRandom pokemon and returns its index
async function pickRandomPokemon() {
  const randomIndex = Math.floor(Math.random() * 499);
  console.log("index:", randomIndex);

  return fetchAPI.pokemonAPI(randomIndex);
}

async function getUserPokemonData() {
  const myPokemon = "pikachu";
  return fetchAPI2.fetchUserPokemon(myPokemon);
}
// pickRandomMove picks a move from the provided moves and returns its index
function pickRandomMove(moves) {
  return Math.floor(Math.random() * moves.length);
}

function doCpuMove(battle) {
  const cpuMoves = battle.cpuPokemon.moveData;
  const randomCpuMove = pickRandomMove(cpuMoves);
  const flavorText = applyMove(battle, randomCpuMove);
  return flavorText;
}

const USER = "user";
const CPU = "cpu";

// newBattle constructs a new battle session between the given 2 pokemons.
// it returns an object with methods to track the status of the fight (e.g.: whose
// turn is up next, did anyone win already), and to apply moves.
function newBattle(userPokemon, cpuPokemon) {
  // judge who gets first turn
  const firstTurn = userPokemon.speed > cpuPokemon.speed ? USER : CPU;

  // clone the provided pokemons so we have fresh objects for use in this battle.
  // Important for game restart, so we will have pokemon with full stats (HP)
  const clonedUserPokemon = clonePokemon(userPokemon);
  const clonedCpuPokemon = clonePokemon(cpuPokemon);

  // define initial state of the battle
  return {
    userPokemon: clonedUserPokemon,
    cpuPokemon: clonedCpuPokemon,
    turnNumber: 1,
    nextTurn: firstTurn,
    isFinished: false,
    winner: "",
    winningPokemon: "",
  };
}

// describePokemon is a convenience function that provides a brief description
// (name, hp, attack, defense) of a pokemon. Useful as UI 'profile' for each combatant.
function describePokemon(battle, userOrCpu) {
  const subject = userOrCpu === USER ? battle.userPokemon : battle.cpuPokemon;

  return {
    name: subject.name,
    hp: subject.hp,
    attack: subject.attack,
    defense: subject.defense,
  };
}

// Apply move applies the move at the given moveIndex of the pokemon that
// will act next.
// At end of the move, nextTurn is assigned to the one that was attacked.
// The function returns a string of 'flavor text', useful for UI logs.
function applyMove(battle, moveIndex) {
  // no need for state update when battle is finished already
  if (battle.isFinished) {
    return "battle is over";
  }

  // whoever is set to move next will do the action
  const [attacker, defender] =
    battle.nextTurn === USER
      ? [battle.userPokemon, battle.cpuPokemon]
      : [battle.cpuPokemon, battle.userPokemon];

  // select the move (ensure safety against array index overflow)
  const safeMoveIndex = limitIndex(attacker.moveData.length, moveIndex);
  const move = attacker.moveData[safeMoveIndex];

  // apply the move's effect
  const damage = Math.floor((attacker.attack / defender.defense) * move.power);
  defender.hp = Math.max(defender.hp - damage, 0); // don't let if fall below zero!

  // create some flavor text description of what just happened
  var flavorText = `${attacker.name} used ${move.name} on ${defender.name} for ${damage} damage!`;

  // check if battle is finished
  if (defender.hp <= 0) {
    battle.isFinished = true;
    battle.winner = battle.nextTurn;
    battle.winningPokemon =
      battle.winner === USER ? battle.userPokemon.name : battle.cpuPokemon.name;
    battle.nextTurn = "";
  }

  // if battle is finished, return already
  if (battle.isFinished) {
    // flavorText += `\nThe battle is finished! ${attacker.name} wins!`
    return flavorText;
  }

  // switch next one that should move
  battle.nextTurn = battle.nextTurn == USER ? CPU : USER;

  // increment the turn
  battle.turnNumber += 1;

  return flavorText;
}

// limitIndex limits the provided input to be within the array index range.
// Useful to avoid array index overflows
function limitIndex(arrayLength, index) {
  return index < 0 ? 0 : index >= arrayLength ? arrayLength - 1 : index;
}

// clonePokemon returns a copy of the given pokemon.
// important for game restarts, so we always start with pokemon with full stats (HP)
function clonePokemon(aPokemon) {
  return JSON.parse(JSON.stringify(aPokemon));
}
