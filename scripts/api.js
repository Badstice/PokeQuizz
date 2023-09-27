async function getPokemonData() {
  const response = await fetch(apiRoot);
  const json = await response.json();
  return json;
}

async function getImage(url) {
  const response = await fetch(url);
  const image = await response.blob();
  const objectURL = URL.createObjectURL(image);
  return objectURL;
}

const api = {
  initData: async () => {
    const response = await fetch(apiRoot);
    const json = await response.json();
    api.pokemons = json;
    api.pokedexIdNotReturned = json.map((p) => p.pokedexId);
  },
  nextPokemon: () => {
    if (api.pokedexIdNotReturned.length === 0) {
      api.pokedexIdNotReturned = api.pokemons.map((p) => p.pokedexId);
    }
    shuffleArray(api.pokedexIdNotReturned);

    const pokedexId = api.pokedexIdNotReturned.shift();
    return api.pokemons.find((p) => p.pokedexId === pokedexId);
  },
};

//As une méga-évolution
