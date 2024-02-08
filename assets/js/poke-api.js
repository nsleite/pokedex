const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(DetailToPokemon);
}

function DetailToPokemon(pokemonDetails){
    var pokemon = new Pokemon();

    pokemon.name = pokemonDetails.name;
    pokemon.id = pokemonDetails.order;
    pokemon.img = pokemonDetails.sprites.other.dream_world.front_default;

    const types = pokemonDetails.types.map((slot) => slot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.mainType = type;

    return pokemon;
}

pokeApi.getPokemons = (offset=0, limit=350) => {
    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(URL)
            .then((response) => response.json())
            .then((jsonBody) => jsonBody.results)
            .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
            .then((requests) => Promise.all(requests))
            .then((pokemonDetails) => pokemonDetails);
}