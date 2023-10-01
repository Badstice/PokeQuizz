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

  getAnswers = () =>
    shuffleArray(
      this.goods.concat(shuffleArray(this.bads.slice(0, 4 - this.goods.length)))
    );
  getGoods = () => this.goods.map((g) => g.value);
  getBads = () => this.bads.map((b) => b.value);
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
    questionFunctions.push(quelEstEvolution);
  }
  questionFunctions.push(quelEstLeType);
  console.log(questionFunctions);
  const value = shuffleArray(questionFunctions)[0](pokemon);
  console.log(value);
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
  const types = pokemon.types.map((t) => new Answer(t.name, true, t.image));
  console.log(types);
  for (let index = types.length; index < 4; index++) {
    const p = shuffleArray(pokemon.resistances).find(
      (r) => !types.find((t) => r.name === t.value)
    );
    types.push(new Answer(p.name, false, getTypeUrl(p.name)));
  }
  return new Question(`Quel est le type de ${pokemon.name.fr} ?`, types);
}

function quelEstEvolution(pokemon) {
  const evolutions = [];
  if (pokemon.evolution?.next) {
    evolutions.push(new Answer(pokemon.evolution.next[0].name, true));
  } else {
    evolutions.push(new Answer("In n'a pas d'évolution", true));
  }
  evolutions.push(
    new Answer(
      api.pokemons.find((p) => p.pokedexId === pokemon.pokedexId - 1).name.fr,
      false
    )
  );
  evolutions.push(
    new Answer(
      api.pokemons.find((p) => p.pokedexId === pokemon.pokedexId + 2).name.fr,
      false
    )
  );
  evolutions.push(
    new Answer(
      api.pokemons.find((p) => p.pokedexId === pokemon.pokedexId + 3).name.fr,
      false
    )
  );
  return new Question(
    `Quel est l'évolution de ${pokemon.name.fr} ?`,
    evolutions
  );
}

function checkName(name) {
  const replaces = {
    e: ["é", "è", "ê"],
  };
  for (const key in replaces) {
    if (Object.hasOwnProperty.call(replaces, key)) {
      const values = replaces[key];
      name = name.replace(new RegExp(values.join("|"), "ig"), key);
    }
  }
  return name.toLowerCase();
}

function getTypeUrl(type) {
  return `https://raw.githubusercontent.com/Yarkis01/PokeAPI/images/types/${checkName(
    type
  )}.png`;
}
