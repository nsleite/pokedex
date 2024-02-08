var offset = 0;
const LIMIT = 15;
const MAXPOKEMONS = 649;

const pokemonList = document.getElementById('pokemonList');
const loadButton = document.getElementById('loadButton');

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

function loadPokemons(offset, limit){

    pokeApi.getPokemons(offset, limit)
        .then((pokemons = []) => {
            console.log(pokemons[0])
            var newHtml = pokemons.map(PokemonToHtmlLi).join('');
            pokemonList.innerHTML += newHtml;
        })
}

loadPokemons(offset, LIMIT);

loadButton.addEventListener('click', loadMore)

function loadMore(){
    offset += LIMIT;
    var nextPage = offset + LIMIT
    if(nextPage > MAXPOKEMONS){
        loadPokemons(offset, MAXPOKEMONS%LIMIT);
        loadButton.parentElement.removeChild(loadButton);
        return;
    }
    loadPokemons(offset, LIMIT)
}   


