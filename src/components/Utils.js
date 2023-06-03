// Fetch one Pokemon
const fetchOnePokemon = async (id) => {
  console.log("pokemon_id:", id);
  // return fetch("http://localhost:4000/api/pokemons/bulbasaur")
  return fetch(`http://localhost:4000/api/pokemons/${id}`)
    .then((res) => res.json())
    .then((pokemon) => {
      console.log("One Pokemon:", pokemon);
      return pokemon;
    });
};

// Fetch All Pokemon
const fetchAllPokemons = async () => {
  return fetch("http://localhost:4000/api/pokemons")
    .then((res) => res.json())
    .then((pokemons) => {
      console.log("All Pokemon", pokemons);
      return pokemons;
    });
};

// Fetch One User
const fetchOneUser = async () => {
  return (
    fetch("http://localhost:4000/api/users/6476547bd65a2d249bb5e77c")
      // return fetch(`http://localhost:4000/api/users/${id}`)
      .then((res) => res.json())
      .then((user) => {
        console.log("One User:", user);
        return user;
      })
  );
};

// Fetch All User

const fetchAllUsers = async () => {
  return fetch("http://localhost:4000/api/users/leaderboard")
    .then((res) => res.json())
    .then((users) => {
      console.log("All Pokemon", users);
      return users;
    });
};

// Fetch from Pokemon API
const pokemonAPI = async (i) => {
  console.log("pokemon_id:", i);
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

    const moveUrls = moves.map((move) => {
      // Fetch All User
      const url = move.url;
      const fetchMoveData = async () => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          const { name, power } = data;
          moveData.push({ name, power });
        } catch (error) {
          console.error("Error fetching MOVES from PokemonAPI:", error);
        }
      };
      fetchMoveData();
    });

    let pokemonObj = {
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
    console.log("CPUobject:", pokemonObj);
    return pokemonObj;
  } catch (error) {
    console.error("Error fetching from PokemonAPI:", error);
  }
};

// Fetch from Pokemon DB
const fetchUserPokemon = async (myPokemon) => {
  console.log("pokemon_id:", myPokemon);
  try {
    // const res = await fetch(`http://localhost:4000/api/pokemons/${id}`)
    const res = await fetch(`http://localhost:4000/api/pokemons/${myPokemon}`);
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

    const moveUrls = moves.map((move) => {
      // Fetch All User
      const url = move.url;
      const fetchMoveData = async () => {
        try {
          const res = await fetch(url);
          const data = await res.json();
          const { name, power } = data;
          moveData.push({ name, power });
        } catch (error) {
          console.error("Error fetching MOVES from PokemonAPI:", error);
        }
      };
      fetchMoveData();
    });

    let pokemonObj = {
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
    console.log("UserObject:", pokemonObj);
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
};
