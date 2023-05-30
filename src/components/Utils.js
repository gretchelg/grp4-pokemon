    // Fetch one Pokemon    
    const fetchOnePokemon = async ( id ) => {
        console.log("pokemon_id:", id)
        // return fetch("http://localhost:4000/api/pokemons/bulbasaur")
        return fetch(`http://localhost:4000/api/pokemons/${id}`)
        .then(res => res.json())
        .then(pokemon => { 
            console.log("One Pokemon:", pokemon)
            return pokemon
        })
    }

// Fetch All Pokemon    
    const fetchAllPokemons = async () => {
    return fetch('http://localhost:4000/api/pokemons')
    .then(res => res.json())
    .then(pokemons => {
        console.log("All Pokemon", pokemons)
        return pokemons
        })
    }    

// Fetch One User
    const fetchOneUser = async () => {
    return fetch("http://localhost:4000/api/users/6470c4420002f15771da7850")
// return fetch(`http://localhost:4000/api/users/${id}`)
    .then(res => res.json())
    .then(user => { 
        console.log("One User:", user)
        return user
    })
}

// Fetch All User

    const fetchAllUsers = async () => {
        return fetch('http://localhost:4000/api/users/leaderboard')
        .then(res => res.json())
        .then(users => {
            console.log("All Pokemon", users)
            return users
            })
        }        

export default {
    fetchOnePokemon: fetchOnePokemon,
    fetchAllPokemons: fetchAllPokemons,
    fetchAllUsers: fetchAllUsers, 
    fetchOneUser:fetchOneUser
}