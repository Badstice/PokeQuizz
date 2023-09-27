class Question {
  goods = [];
  bads = [];

  constructor(question, answers) {
    this.question = question;
    for (const answer of answers) {
      if (answer.isGood) {
        this.goods.push(answer);
      } else {
        this.bads.push(answer);
      }
    }
  }

  getAnswers = () => shuffleArray(this.goods.concat(this.bads));
}

class Answer {
  constructor(value, isGood, img) {
    this.value = value;
    this.isGood = isGood;
    this.img = img;
  }
}

function generateQuestion(pokemon) {
  const questionFunctions = [];
  if (
    pokemon.pokedexId > api.pokemons[1].pokedexId &&
    pokemon.pokedexId < api.pokemons.at(-1).pokedexId
  ) {
    questionFunctions.push(quelEstCePokmon);
  }
  console.log(pokemon);
  const value = questionFunctions[0](pokemon);
  return value;
  //Quel est ce pokemon
  //Quel est le type
  //Quel est l'évolution
}

function quelEstCePokmon(pokemon) {
  return new Question("Quel est ce pokémon ?", [
    new Answer(pokemon.name.fr, true),
    new Answer(
      api.pokemons.find((p) => p.pokedexId === pokemon.pokedexId - 1).name.fr,
      false
    ),
    new Answer(
      api.pokemons.find((p) => p.pokedexId === pokemon.pokedexId + 1).name.fr,
      false
    ),
    new Answer(
      api.pokemons.find((p) => p.pokedexId === pokemon.pokedexId + 2).name.fr,
      false
    ),
  ]);
}

function quelEstLeType(pokemon) {
  return pokemon.pokedexId;
}

function quelEstEvolution(pokemon) {
  return pokemon.pokedexId;
}
