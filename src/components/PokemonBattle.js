import { useState, useEffect } from 'react';
import fetchAPI from './Utils';
import fetchAPI2 from './Utils'
import './styles/PokemonBattle.css';
import { useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();

    const setRandomCpuPokemon = () => {
        console.log("SET RANDOM CPU POKEMON")
        return pickRandomPokemon()
            .then(res => {
                setCpuPokemonData(oldData => {
                    console.log("INFO about to update the state cpuPokemonData")
                    return res
                })
                // return sleep(1000)
                return res
            })
            .catch(error => {
                console.error("Error while picking random Pokemon:", error);
            }); 
    }


    useEffect(() => { 
        console.log("useEffect initializing")
        getUserPokemonData()
            .then(res => {
                setUserPokemonData(res)
            })
            .catch(error => {
                console.error("Error while fetching User Pokemon:", error);
            }); 

        setRandomCpuPokemon()
    }, [battle])

    console.log("AFTER USE EFFECT")

    const user_data = userPokemonData;
    const cpu_data = cpuPokemonData;

    const incrementScore = () => {
        console.log("INFO incrementing score...")
        fetchAPI.addToScore({
            userID: "6476547bd65a2d249bb5e77c", // TODO change this to real userID
            scoreToAdd: 10,
            coinsToAdd: 3,
        })
            .then(_ => console.log("OK successfully incremented score"))
            .catch(e => console.log("ERROR failed to increment score"))
    }

    const doFirstTurn = () => {
        // console.log("BEFORE reset battle, cpuPokemonData is", cpuPokemonData)
        // resetBattle(battle, user_data, cpuPokemonData)
        // console.log("INFO after reset battle", battle)

        // print who goes first
        if (battle.nextTurn == CPU) { 
            setBattleLog(prevLog => [...prevLog, `${battle.cpuPokemon.name} attacks first.`]);
        } else {
            setBattleLog(prevLog => [...prevLog, `${battle.userPokemon.name} attacks first.`]);
        }

        // if cpu's turn, let cpu do a move
        if (battle.nextTurn == CPU) { 
            const logText = doCpuMove(battle)
            setBattleLog(prevLog => [...prevLog, logText]);
        }

        // if user HP > 0 then tell them they will move next
        if (!battle.isFinished) {
            setBattleLog(prevLog => [...prevLog, `${battle.userPokemon.name} will move next...`]);
        }

        // append win log
        if (battle.isFinished){
            if (battle.winner === USER){
                incrementScore()
            }
            setBattleLog(prevLog => [...prevLog, `The battle is finished! ${battle.winningPokemon} wins!`]);
        }

    }

    const handleBattleStart = () => {
        // battle has started
        setBattleOngoing(true)

        console.log("BEFORE handleBattleStart, cpuPokemonData is", cpuPokemonData)
        resetBattle(battle, user_data, cpuPokemonData)
        console.log("INFO after handleBattleStart", battle)

        doFirstTurn()
    };

    const handleBattleRestart = () => {
        setBattleLog([])
     
        // handleBattleStart()
        setRandomCpuPokemon()
            .then(cpuPokemon => {
                console.log("BEFORE handleBattleREstart, cpuPokemonData is", cpuPokemon)
                resetBattle(battle, user_data, cpuPokemon)
                console.log("INFO after handleBattleREstart", battle)
        
                doFirstTurn()
            })
            .catch(e => console.log("handleBattleRestart.setRandomCpuPokemon() threw an error:", e))
        // doFirstTurn()
    }

    const handleUserMoveSelected = indexOfMove => {
        // do user move
        const userLogTxext = applyMove(battle, indexOfMove)
        // setBattleLog(prevLog => [...prevLog, userLogTxext]);
        setBattleLog(prevLog => [userLogTxext]);

        // if user's move finished the battle, log the win and return already
        if (battle.isFinished) {
            if (battle.winner === USER){
                incrementScore()
            } 
            setBattleLog(prevLog => [...prevLog, `The battle is finished! ${battle.winningPokemon} wins!`]);
            return
        }

        // print next to move
        setBattleLog(prevLog => [...prevLog, `${battle.cpuPokemon.name} will move next...`]);

        // do cpu move
        const cpuLogText = doCpuMove(battle)
        setBattleLog(prevLog => [...prevLog, cpuLogText]);

        // if user HP > 0 then tell them they will move next
        if (!battle.isFinished) {
            setBattleLog(prevLog => [...prevLog, `${battle.userPokemon.name} will move next...`]);
        }

        // if battle is finished, log it
        if (battle.isFinished){
            if (battle.winner === USER){
                incrementScore()
            } 
            setBattleLog(prevLog => [...prevLog, `The battle is finished! ${battle.winningPokemon} wins!`]);
        }
    }

    const handleDashboardClick = () => {
        navigate('/dashboard');
    }

    // below are convenience functions to quickly display stats (e.g. current HP)
    const getUserPokemonForDisplay = () => JSON.stringify(describePokemon(battle, USER))
    const getCpuPokemonForDisplay = () => JSON.stringify(describePokemon(battle, CPU))

    // UI (1/3): Pre-Battle
    if (!battleOngoing) {
        return (
        <div className='container'>

            <h1>Welcome to the Arena</h1>
            <div className='wrapper'>
                <div className='player'>
                    <img className='pokemon_image'
                        src={userPokemonData.front_default} 
                        alt={userPokemonData.name}/>

                    <div className='info'>
                    <h5>My Pokemon : {userPokemonData.name}</h5>
                    <p>HP : {userPokemonData.hp}</p>
                    <p>Attack : {userPokemonData.attack}</p>
                    <p>Defense : {userPokemonData.defense}</p>
                    <p>Speed : {userPokemonData.speed}</p>
                    </div>
                </div>

                    
                <div className='cpu'>
                    <img className='pokemon_image'
                        src={cpuPokemonData.front_default} 
                        alt={cpuPokemonData.name}/>
                    
                    <div className='info'>
                    <h5>CPU Pokemon : {cpuPokemonData.name}</h5>
                    <p>HP : {cpuPokemonData.hp}</p>
                    <p>Attack : {cpuPokemonData.attack}</p>
                    <p>Defense : {cpuPokemonData.defense}</p>
                    <p>Speed : {cpuPokemonData.speed}</p>
                    </div>
                </div>
            </div>

            <button onClick={handleBattleStart}>Start Battle</button>
            <button onClick={handleDashboardClick}>Switch Pokemon</button>
        </div>
        )
    }

    // UI (2/3): Ongoing Battle
    if (!battle.isFinished) {
        return (
            <div>
                <h1>Welcome to the Arena</h1>
                        {/* SECTION: BATTLE LOG */}
                        <h3>Battle Log:</h3>
                        <div>
                            {battleLog?.map((log, index) => (
                                <p key={index}>{log}</p>
                            ))}
                        </div>
    
                        {/* <p>{battleLog && battleLog[battleLog.length - 1]}</p> */}
    
                        <div className='wrapper'>
                            <div className='player'>
                                <img
                                    className='pokemon_image'
                                    src={userPokemonData.front_default}
                                    alt={userPokemonData.name}
                                />
    
                                <div className='info'>
                                    <h5>{getUserPokemonForDisplay()}</h5>
                                    <h5> My Pokemon : {userPokemonData.name}</h5>
                                    <p>Attack : {userPokemonData.attack}</p>
                                    <p>Defense : {userPokemonData.defense}</p>
                                    <p>Speed : {userPokemonData.speed}</p>
                                </div>
                            </div>
    
                            <div className='cpu'>
                                <img
                                    className='pokemon_image'
                                    src={cpuPokemonData.front_default}
                                    alt={cpuPokemonData.name}
                                />
    
                                <div className='info'>
                                    <h5>{getCpuPokemonForDisplay()}</h5>
                                    <h5> CPU Pokemon : {cpuPokemonData.name}</h5>
                                    <p>Attack : {cpuPokemonData.attack}</p>
                                    <p>Defense : {cpuPokemonData.defense}</p>
                                    <p>Speed : {cpuPokemonData.speed}</p>
                                </div>
                            </div>
                        </div>
    
                        {/* SECTION: USER INPUT */}
                        <h3>Choose Attack:</h3>
                        {battle.nextTurn === USER ? (
                            battle.userPokemon.moveData.map((move, index) => (
                                <button
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
                )
    }

    // UI (3/3): Battle Finished
    return (
        <div>
            <h1>Welcome to the Arena</h1>

            {/* SECTION: BATTLE LOG */}
            <h3>Battle Log:</h3>
            <p>
                {battleLog?.map((log, index) => (
                    <p key={index}>{log}</p>
                ))}
            </p>
            {/* <p>{battleLog && battleLog[battleLog.length - 1]}</p> */}

            {/* SECTION: BATTLE RESULT */}
            <h3>Result:</h3>
            
            { battle.isFinished && battle.winner === USER 
                ? (
                <div>
                    <h2>YOU WON! :)</h2>
                    <img className='pokemon_image'
                    src={userPokemonData.front_default} 
                    alt={userPokemonData.name}/>
                    <p>{userPokemonData.name} wins!</p>
                </div>
                )
                : (
                    <div>
                    <h2>YOU LOST :'(</h2>
                    <img className='pokemon_image'
                    src={cpuPokemonData.front_default} 
                    alt={cpuPokemonData.name}/>
                    <h5>{cpuPokemonData.name} - CPU pokemon wins.</h5>
                </div>
                )
            }

            {/* SECTION: TRY AGAIN */}
            <h3>Play Again?</h3>
            <button onClick={handleBattleRestart}>Restart</button>
            <button onClick={handleDashboardClick}>Switch Pokemon</button>
        </div>
    )
}

// ------------------------------------------------------------------------------

// pickRandom pokemon and returns its index
async function pickRandomPokemon() {
    const randomIndex = Math.floor(Math.random() * 499);
    console.log("index:", randomIndex)

    return fetchAPI.pokemonAPI(randomIndex); 
}

async function getUserPokemonData() {
    // const myPokemon = "pikachu"
    const myPokemon = ["pikachu", "ivysaur", "paras", "meowth", "kadabra"]
    const index = Math.floor(Math.random() * myPokemon.length);
    console.log("myPokemon:", myPokemon)
    return fetchAPI2.fetchUserPokemon(myPokemon[index]);

}
// pickRandomMove picks a move from the provided moves and returns its index
function pickRandomMove(moves) {
    return Math.floor(Math.random() * moves.length);
}

function doCpuMove (battle) {
    const cpuMoves = battle.cpuPokemon.moveData
    const randomCpuMove = pickRandomMove(cpuMoves)
    const flavorText = applyMove(battle, randomCpuMove)
    return flavorText
}

const USER = "user"
const CPU = "cpu"

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
    const firstTurn = userPokemon.speed > cpuPokemon.speed
        ? USER
        : CPU

    // clone the provided pokemons so we have fresh objects for use in this battle.
    // Important for game restart, so we will have pokemon with full stats (HP)
    const clonedUserPokemon = clonePokemon(userPokemon)
    const clonedCpuPokemon = clonePokemon(cpuPokemon)

    battle1.userPokemon = clonedUserPokemon
    battle1.cpuPokemon = clonedCpuPokemon
    battle1.turnNumber = 1
    battle1.nextTurn = firstTurn
    battle1.isFinished = false
    battle1.winner = ""
    battle1.winningPokemon = ""
}

// describePokemon is a convenience function that provides a brief description
// (name, hp, attack, defense) of a pokemon. Useful as UI 'profile' for each combatant.
function describePokemon(battle, userOrCpu){
    const subject = userOrCpu === USER 
        ? battle.userPokemon 
        : battle.cpuPokemon

    return {
        // name: subject.name,
        "Current HP": subject.hp,
        // attack: subject.attack,
        // defense: subject.defense
    }
}

// Apply move applies the move at the given moveIndex of the pokemon that
// will act next.
// At end of the move, nextTurn is assigned to the one that was attacked.
// The function returns a string of 'flavor text', useful for UI logs.
function applyMove(battle, moveIndex) {
    // no need for state update when battle is finished already
    if (battle.isFinished) {
        return "battle is over"
    }

    // whoever is set to move next will do the action
    const [attacker, defender] = battle.nextTurn === USER
        ? [battle.userPokemon, battle.cpuPokemon]
        : [battle.cpuPokemon, battle.userPokemon]

    // select the move (ensure safety against array index overflow)
    const safeMoveIndex = limitIndex(attacker.moveData.length, moveIndex)
    console.log("applyMove():", { attackerMoveData: attacker.moveData, safeMoveIndex })
    const move = attacker.moveData[safeMoveIndex]

    // apply the move's effect
    const damage = Math.floor((attacker.attack / defender.defense) * move.power);
    defender.hp = Math.max(defender.hp - damage, 0) // don't let if fall below zero!

    // create some flavor text description of what just happened
    var flavorText = `${attacker.name} used ${move.name} on ${defender.name} for ${damage} damage!`

    // check if battle is finished
    if (defender.hp <= 0) {
        battle.isFinished = true
        battle.winner = battle.nextTurn
        battle.winningPokemon = battle.winner === USER 
            ? battle.userPokemon.name 
            : battle.cpuPokemon.name
        battle.nextTurn = ""
    }

    // if battle is finished, return already
    if (battle.isFinished){
        // flavorText += `\nThe battle is finished! ${attacker.name} wins!`
        return flavorText    
    }

    // switch next one that should move
    battle.nextTurn = battle.nextTurn == USER
        ? CPU
        : USER

    // increment the turn
    battle.turnNumber += 1

    return flavorText
}

// limitIndex limits the provided input to be within the array index range.
// Useful to avoid array index overflows
function limitIndex(arrayLength, index) {
    return index < 0 ? 0 : index >= arrayLength ? arrayLength -1 : index
}

// clonePokemon returns a copy of the given pokemon.
// important for game restarts, so we always start with pokemon with full stats (HP)
function clonePokemon(aPokemon) {
    return JSON.parse(JSON.stringify(aPokemon))
}

// sleep returns a Promise that resolves in the given millseconds
function sleep(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(_ => {
            resolve()
        }, ms)
    })
}
