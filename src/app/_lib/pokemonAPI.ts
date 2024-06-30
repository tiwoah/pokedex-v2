const POKEMON_API = "https://pokeapi.co/api/v2/";

// getAllPokemonFromSlice -> fetching subsets of pokemon data from large dataset
export async function getAllPokemonFromSlice(limit: string, offset: string) {
    const response = await fetch(`${POKEMON_API}/pokemon?limit=${limit}&offset=${offset}`);
    const data = await response.json();
    return data.results;
}

// getPokemon -> get the information of a pokemon
export async function getPokemon(name: string) {
    const response = await fetch(POKEMON_API + "pokemon/" + name);
    const data = await response.json();
    return data;
}

// getPokemonTypes -> get different possible types of pokemon for navigation
export async function getPokemonTypes() {
    const response = await fetch(POKEMON_API + "type");
    const data = await response.json();
    return data.results;
}

// getPokemonTypeList -> get pokemon list of a certain type
export async function getPokemonFromTypeURL(url: string) {
    const response = await fetch(url);
    const data = await response.json();
    return data.pokemon;
}