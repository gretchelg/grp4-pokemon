import { useState, useEffect } from 'react';
import fetchAPI from './Utils';
import fetchAPI2 from './Utils'
import './styles/PokemonBattle.css';
import { useNavigate, useLocation } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";

const CPU_THINKING_TIME = 2000

export default function PokemonBattle() {
    const [battle, setBattle] = useState({});
    const [battleLog, setBattleLog] = useState([]);
    const [battleOngoing, setBattleOngoing] = useState(false); 
    const [cpuPokemonData, setCpuPokemonData] = useState({});
    const [userPokemonData, setUserPokemonData] = useState({});
    const [cpuIsThinking, setCpuIsThinking] = useState(false)
    const navigate = useNavigate();
    const location = useLocation();
    const player_info = location.state;
    const myPokemon = player_info ? player_info.selected_pokemon : "pikachu"; 

  const setRandomCpuPokemon = () => {
    return pickRandomPokemon()
      .then((res) => {
        setCpuPokemonData((oldData) => {
          return res;
        });
        return res;
      })
      .catch((error) => {
        console.error("Error while picking random Pokemon:", error);
      });
  };

  useEffect(() => {
    getUserPokemonData(myPokemon)
      .then((res) => {
        setUserPokemonData(res);
      })
      .catch((error) => {
        console.error("Error while fetching User Pokemon:", error);
      });

    setRandomCpuPokemon();
  }, [battle]);

  const user_data = userPokemonData;
  const cpu_data = cpuPokemonData;

    const incrementScore = () => {
        fetchAPI.addToScore({
            userID: player_info ? player_info.user_id : "647b19205f5822b228233f4d",
            scoreToAdd: 10,
            coinsToAdd: 50,
        })
            .then(_ => console.log("OK successfully incremented score", player_info.user_id))
            .catch(e => console.log("ERROR failed to increment score"))
    }

    const doFirstTurn = async () => {

    // print who goes first
    if (battle.nextTurn == CPU) {
      setBattleLog((prevLog) => [
        ...prevLog,
        `${battle.cpuPokemon.name} attacks first.`,
      ]);
    } else {
      setBattleLog((prevLog) => [
        ...prevLog,
        `${battle.userPokemon.name} attacks first.`,
      ]);
    }

        // if cpu's turn, let cpu do a move
        if (battle.nextTurn == CPU) { 
            setCpuIsThinking(true)
            setBattleLog(prevLog => [...prevLog, `${battle.cpuPokemon.name} is thinking...`]);
            await sleep(CPU_THINKING_TIME)
            setCpuIsThinking(false)
            const logText = doCpuMove(battle)
            setBattleLog(prevLog => [...prevLog, logText]);
        }

    // if user HP > 0 then tell them they will move next
    if (!battle.isFinished) {
      setBattleLog((prevLog) => [
        ...prevLog,
        `${battle.userPokemon.name} will move next...`,
      ]);
    }

    // append win log
    if (battle.isFinished) {
      if (battle.winner === USER) {
        incrementScore();
      }
      setBattleLog((prevLog) => [
        ...prevLog,
        `The battle is finished! ${battle.winningPokemon} wins!`,
      ]);
    }
  };

  const handleBattleStart = () => {
    // battle has started
    setBattleOngoing(true);
    resetBattle(battle, user_data, cpuPokemonData);

    doFirstTurn();
  };

  const handleBattleRestart = () => {
    setBattleLog([]);

    // handleBattleStart()
    setRandomCpuPokemon()
      .then((cpuPokemon) => {
        console.log(
          "BEFORE handleBattleREstart, cpuPokemonData is",
          cpuPokemon
        );
        resetBattle(battle, user_data, cpuPokemon);
        console.log("INFO after handleBattleREstart", battle);

        doFirstTurn();
      })
      .catch((e) =>
        console.log(
          "handleBattleRestart.setRandomCpuPokemon() threw an error:",
          e
        )
      );
    // doFirstTurn()
  };

    const handleUserMoveSelected = async indexOfMove => {
        setCpuIsThinking(true)
        // setBattleLog(prevLog => [...prevLog, `${battle.cpuPokemon.name} is thinking...`]);
        await sleep(CPU_THINKING_TIME)
        setCpuIsThinking(false)


        // do user move
        const userLogTxext = applyMove(battle, indexOfMove)
        // setBattleLog(prevLog => [...prevLog, userLogTxext]);
        setBattleLog(prevLog => [userLogTxext]);

    // if user's move finished the battle, log the win and return already
    if (battle.isFinished) {
      if (battle.winner === USER) {
        incrementScore();
      }
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
        setCpuIsThinking(true)
        setBattleLog(prevLog => [...prevLog, `${battle.cpuPokemon.name} is thinking...`]);
        await sleep(CPU_THINKING_TIME)
        setCpuIsThinking(false)
        const cpuLogText = doCpuMove(battle)
        setBattleLog(prevLog => [...prevLog, cpuLogText]);

    // if user HP > 0 then tell them they will move next
    if (!battle.isFinished) {
      setBattleLog((prevLog) => [
        ...prevLog,
        `${battle.userPokemon.name} will move next...`,
      ]);
    }

    // if battle is finished, log it
    if (battle.isFinished) {
      if (battle.winner === USER) {
        incrementScore();
      }
      setBattleLog((prevLog) => [
        ...prevLog,
        `The battle is finished! ${battle.winningPokemon} wins!`,
      ]);
    }
  };

  const handleDashboardClick = () => {
    navigate("/dashboard");
  };

  // below are convenience functions to quickly display stats (e.g. current HP)
  const getUserPokemonForDisplay = () =>
    JSON.stringify(describePokemon(battle, USER));
  const getCpuPokemonForDisplay = () =>
    JSON.stringify(describePokemon(battle, CPU));

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
              <p>HP : {userPokemonData.hp}</p>
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
              <p>HP : {cpuPokemonData.hp}</p>
            </div>
          </div>
        </div>
        <button className="start_battle" onClick={handleBattleStart}>
          Start Battle
        </button>
      </div>
    );
  }

  // ==========================================

  // =========================================

  // UI (2/3): Ongoing Battle
  if (!battle.isFinished) {
    return (
      <div className="area_wrapper">
        <div className="area_header">
          <h2>Welcome to the Arena</h2>
        </div>

        {/* SECTION: BATTLE LOG */}
        <div className="battle_log">
          {/* <h3 className="battle_log">Battle Log:</h3> */}
            {battleLog?.map((log, index) => (
              <p key={index}>{log}</p>
            ))}
            
          {cpuIsThinking ? (     
                <BeatLoader
                color="#f5a214"
                loading={cpuIsThinking}
                size={40}
                aria-label="Loading Spinner"
                data-testid="loader"/>
            ) : <></>
            }  
        </div>

        <div className="players_wrapper">
          <div className="arena_player">
              <img
                className="arena_image"
                src={userPokemonData.front_default}
                alt={userPokemonData.name}
              />
              <img className="elipse" src="../../img/ellipse.png" />
            
            <div className="arena_info">
              <h5>{getUserPokemonForDisplay()}</h5>
              <p id="arena_pokemone_title">
                My Pokemon : {userPokemonData.name}
              </p>
              <p>Attack : {userPokemonData.attack}</p>
              <p>Defense : {userPokemonData.defense}</p>
              <p>Speed : {userPokemonData.speed}</p>
              <p>HP : {userPokemonData.hp}</p>
            </div>
          </div>

          <div>
            <h3>VS</h3>
          </div>

          <div className="arena_player">
              <img
                className="arena_image"
                src={cpuPokemonData.front_default}
                alt={cpuPokemonData.name}
              />
              <img className="elipse" src="../../img/ellipse.png" />
            
            <div className="arena_info">
              <h5>{getCpuPokemonForDisplay()}</h5>
              <p id="arena_pokemone_title">
                CPU Pokemon : {cpuPokemonData.name}
              </p>
              <p>Attack : {cpuPokemonData.attack}</p>
              <p>Defense : {cpuPokemonData.defense}</p>
              <p>Speed : {cpuPokemonData.speed}</p>
              <p>HP : {cpuPokemonData.hp}</p>
            </div>
          </div>
        </div>

        {/* SECTION: USER INPUT */}
        <h3 className="choose_attack">Choose Attack:</h3>
        {battle.nextTurn === USER ? (
          battle.userPokemon.moveData.map((move, index) => (
            <button
              className="start_battle"
              key={index}
              onClick={() => handleUserMoveSelected(index)}
            >
              {move.name}
            </button>
          ))
        ) : (
          <>N.A.</>
        )}
      </div>
    );
  }

  // UI (3/3): Battle Finished
  return (
    <div className="area_wrapper">
      <div className="area_header">
        <h2>Welcome to the Arena</h2>
      </div>

      {battle.isFinished && battle.winner === USER ? (
        <div className="arena_result">
          <h2>YOU WON! :)</h2>

          <div>
            <img
              className="result_image"
              src={userPokemonData.front_default}
              alt={userPokemonData.name}
            />
          </div>
          <h4>{userPokemonData.name} wins!</h4>
        </div>
        ) : (
        <div className="arena_result">
          <h2>YOU LOST :'(</h2>
          <div>
            <img
              className="result_image"
              src={cpuPokemonData.front_default}
              alt={cpuPokemonData.name}
            />
          </div>
          <h4>{cpuPokemonData.name} - CPU pokemon wins.</h4>
        </div>
      )}

      {/* SECTION: TRY AGAIN */}
      <h3 className="play-again">Play Again?</h3>
      <button className="start_battle" onClick={handleBattleRestart}>
        Restart
      </button>

      <button className="start_battle" onClick={handleDashboardClick}>
        Switch Pokemon
      </button>
    </div>
  );
}

// ------------------------------------------------------------------------------

// pickRandom pokemon and returns its index
async function pickRandomPokemon() {
  const randomIndex = Math.floor(Math.random() * 499);

  return fetchAPI.pokemonAPI(randomIndex);
}

async function getUserPokemonData(myPokemon) {
  // const myPokemon = "pikachu"
  // const myPokemon = ["pikachu", "ivysaur", "paras", "meowth", "kadabra"]
  // const index = Math.floor(Math.random() * myPokemon.length);
  return fetchAPI2.fetchUserPokemon(myPokemon);
  // return fetchAPI2.fetchUserPokemon(myPokemon[index]);
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
// function newBattle(userPokemon, cpuPokemon) {
//     const battle = {}
//     resetBattle(battle, userPokemon, cpuPokemon)
//     return battle
// }

function resetBattle(battle1, userPokemon, cpuPokemon) {
  // judge who gets first turn
  const firstTurn = userPokemon.speed > cpuPokemon.speed ? USER : CPU;

  // clone the provided pokemons so we have fresh objects for use in this battle.
  // Important for game restart, so we will have pokemon with full stats (HP)
  const clonedUserPokemon = clonePokemon(userPokemon);
  const clonedCpuPokemon = clonePokemon(cpuPokemon);

  battle1.userPokemon = clonedUserPokemon;
  battle1.cpuPokemon = clonedCpuPokemon;
  battle1.turnNumber = 1;
  battle1.nextTurn = firstTurn;
  battle1.isFinished = false;
  battle1.winner = "";
  battle1.winningPokemon = "";
}

// describePokemon is a convenience function that provides a brief description
// (name, hp, attack, defense) of a pokemon. Useful as UI 'profile' for each combatant.
function describePokemon(battle, userOrCpu) {
  const subject = userOrCpu === USER ? battle.userPokemon : battle.cpuPokemon;

  return {
    // name: subject.name,
    "Current HP": subject?.hp,
    // attack: subject.attack,
    // defense: subject.defense
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
  console.log("applyMove():", {
    attackerMoveData: attacker.moveData,
    safeMoveIndex,
  });
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

// sleep returns a Promise that resolves in the given millseconds
function sleep(ms) {
  return new Promise((resolve, reject) => {
    setTimeout((_) => {
      resolve();
    }, ms);
  });
}
