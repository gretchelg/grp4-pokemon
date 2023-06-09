// Put Score endpoint to increment user score
const putScore = async ({
  userID,
  scoreToAdd,
  coinsToAdd,
  updatedCollection,
}) => {
  const payload = {
    id: userID,
    score: scoreToAdd,
    coins: coinsToAdd,
    collections: updatedCollection,
  };

  return fetch(`https://api-pokemon-n19c.onrender.com/api/users/arena/${userID}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((res) => {
    // if result is not http 200/201, throw an error
    if (res.status > 201) {
      throw "failed to post score: " + res.status;
    }
  });
};

// this is just for testing
// postScore({userID: "6476547bd65a2d249bb5e77c", scoreToAdd: 10, coinsToAdd: 3})
//     .then(_ => console.log("successfully posted score"))
//     .catch(e => console.log("failed posting score:", e))

// Fetch one Pokemon
const fetchOnePokemon = async (id) => {
  return fetch(`https://api-pokemon-n19c.onrender.com/api/pokemons/${id}`)
    .then((res) => res.json())
    .then((pokemon) => {
      return pokemon;
    });
};

// Fetch All Pokemon
const fetchAllPokemons = async () => {
  return fetch("https://api-pokemon-n19c.onrender.com/api/pokemons")
    .then((res) => res.json())
    .then((pokemons) => {
      return pokemons;
    });
};

const fetchOneUser = async (_id) => {
  try {
    const response = await fetch(`https://api-pokemon-n19c.onrender.com/api/users/${_id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    // You can handle the error as needed (e.g., show an error message)
    throw error;
  }
};

// Fetch All User

const fetchAllUsers = async () => {
  return fetch("https://api-pokemon-n19c.onrender.com/api/users/leaderboard")
    .then((res) => res.json())
    .then((users) => {
      return users;
    });
};

// Fetch from Pokemon API
const pokemonAPI = async (i) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    const data = await res.json();

    const {
      id,
      name,
      sprites: {
        other: {
          dream_world: { front_default },
        },
      },
      base_experience,
      height,
      types,
      weight,
    } = data;

    const { stats } = data;

    const hpStat = stats.find((stat) => stat.stat.name === "hp");
    const speedStat = stats.find((stat) => stat.stat.name === "speed");
    const defenseStat = stats.find((stat) => stat.stat.name === "defense");
    const attackStat = stats.find((stat) => stat.stat.name === "attack");

    const { base_stat: hp } = hpStat;
    const { base_stat: speed } = speedStat;
    const { base_stat: defense } = defenseStat;
    const { base_stat: attack } = attackStat;

    const moves = data.moves.slice(0, 3).map(({ move }) => ({
      name: move.name,
      url: move.url,
    }));
    const moveData = [];

    const movePromises = moves.map((move) => {
      // Fetch Move Data
      const url = move.url;
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const { name, power } = data;
          moveData.push({ name, power });
        })
        .catch((error) => {
          console.error("Error fetching MOVES from PokemonAPI:", error);
        });
    });

    await Promise.all(movePromises);

    const pokemonObj = {
      id,
      name,
      hp,
      defense,
      attack,
      speed,
      front_default,
      moveData,
      base_experience,
      height,
      types,
      weight,
    };
    return pokemonObj;
  } catch (error) {
    console.error("Error fetching from PokemonAPI:", error);
  }
};

// Fetch from Pokemon DB
const fetchUserPokemon = async (myPokemon) => {
  try {
    const res = await fetch(`https://api-pokemon-n19c.onrender.com/api/pokemons/${myPokemon}`);
    const data = await res.json();

    const {
      id,
      name,
      front_default,
      moves,
      base_experience,
      height,
      types,
      stats,
      weight,
    } = data.data;

    const hpStat = stats.find((stat) => stat.stat.name === "hp");
    const speedStat = stats.find((stat) => stat.stat.name === "speed");
    const defenseStat = stats.find((stat) => stat.stat.name === "defense");
    const attackStat = stats.find((stat) => stat.stat.name === "attack");

    const { base_stat: hp } = hpStat;
    const { base_stat: speed } = speedStat;
    const { base_stat: defense } = defenseStat;
    const { base_stat: attack } = attackStat;

    const moveData = [];

    const movePromises = moves.map((move) => {
      const url = move.url;
      return fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const { name, power } = data;
          moveData.push({ name, power });
        })
        .catch((error) => {
          console.error("Error fetching MOVES from PokemonAPI:", error);
        });
    });

    await Promise.all(movePromises);

    const pokemonObj = {
      id,
      name,
      hp,
      defense,
      attack,
      speed,
      front_default,
      moveData,
      base_experience,
      height,
      types,
      weight,
    };
    return pokemonObj;
  } catch (error) {
    console.error("Error fetching from pokemon DB:", error);
  }
};

export default {
  fetchOnePokemon: fetchOnePokemon,
  fetchAllPokemons: fetchAllPokemons,
  fetchAllUsers: fetchAllUsers,
  fetchOneUser: fetchOneUser,
  pokemonAPI: pokemonAPI,
  fetchUserPokemon: fetchUserPokemon,
  addToScore: putScore,
};
