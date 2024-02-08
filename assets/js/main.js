
let PokemonToHtmlLi = (pokemon) => {
    return `
            <li class="pokemon ${pokemon.mainType}">
                <div class="title">
                    <div class="number">#${pokemon.id}</div>
                    <div class="name">${pokemon.name}</div>
                </div>
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src=${pokemon.img} 
                        alt=${pokemon.name}>
                </div>
            </li>
            `
}

const pokemonList = document.getElementById('pokemonList')

pokeApi.getPokemons()
    .then((pokemons = []) => {
        console.log(pokemons[0])
        var newHtml = pokemons.map(PokemonToHtmlLi).join('');
        pokemonList.innerHTML = newHtml;
    })
    .finally(() => console.log('success'))

console.log(10+10)