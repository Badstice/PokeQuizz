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
  questions
    .filter((q) => q.pokemon === pokemon.name.fr)
    .map(
      (q) =>
        new Question(
          q.value,
          q.goods
            .map((r) => new Answer(r, true))
            .concat(q.bads.map((r) => new Answer(r, false)))
        )
    )
    .forEach((q) => questionFunctions.push(() => q));
  if (
    pokemon.pokedexId > api.pokemons[1].pokedexId &&
    pokemon.pokedexId < api.pokemons.at(-1).pokedexId
  ) {
    questionFunctions.push(quelEstCePokmon);
    questionFunctions.push(quelEstEvolution);
  }
  questionFunctions.push(quelEstLeType);
  const value = shuffleArray(questionFunctions)[0](pokemon);
  return value;
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
    evolutions.push(new Answer("Il n'a pas d'évolution", true));
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

const questions = [
  {
    pokemon: "Bulbizarre",
    value: "Quel est le type de Bulbizarre?",
    goods: ["Plante", "Poison"],
    bads: ["Feu", "Eau", "Électrik"],
  },
  {
    pokemon: "Salamèche",
    value: "Quelle est la capacité signature de Salamèche?",
    goods: ["Lance-Flammes"],
    bads: ["Hydrocanon", "Brouillard", "Tranch'Herbe"],
  },
  {
    pokemon: "Carapuce",
    value: "Quelle est la caractéristique distinctive de Carapuce?",
    goods: ["Il a une carapace dure"],
    bads: [
      "Il a des épines sur le dos",
      "Il a une grande queue",
      "Il a une carapace molle",
    ],
  },
  {
    pokemon: "Pikachu",
    value: "Quel est le type de Pikachu?",
    goods: ["Électrik"],
    bads: ["Feu", "Plante", "Eau"],
  },
  {
    pokemon: "Roucool",
    value: "Quelle est la particularité de Roucool par rapport à Roucoups?",
    goods: ["Il est plus petit", "Il a des serres moins acérées"],
    bads: [
      "Il est plus grand",
      "Il a une queue plus longue",
      "Il a des yeux plus grands",
    ],
  },
  {
    pokemon: "Rattata",
    value: "Où peut-on généralement trouver Rattata?",
    goods: ["Cavernes", "Forêts"],
    bads: ["Montagnes", "Plages", "Grottes"],
  },
  {
    pokemon: "Flagadoss",
    value: "Quel est le type de Flagadoss?",
    goods: ["Eau", "Psy"],
    bads: ["Plante", "Feu", "Vol"],
  },
  {
    pokemon: "Rattatac",
    value: "Quelle est la caractéristique principale de Rattatac?",
    goods: ["Petit", "Rapide"],
    bads: ["Grand", "Lent", "Puissant"],
  },
  {
    pokemon: "Raichu",
    value: "Quelle est la caractéristique distinctive de Raichu?",
    goods: ["Il a des oreilles plus grandes"],
    bads: [
      "Il a une queue plus longue",
      "Il a des yeux plus grands",
      "Il a des dents plus longues",
    ],
  },
  {
    pokemon: "Roucool",
    value: "Quelle est la caractéristique distinctive de Roucool?",
    goods: ["Il a des serres acérées"],
    bads: [
      "Il a une queue plus longue",
      "Il a des ailes plus grandes",
      "Il a des yeux plus grands",
    ],
  },
  {
    pokemon: "Nidorino",
    value: "Quelle est la caractéristique distinctive de Nidorino?",
    goods: ["Il a une corne plus longue"],
    bads: [
      "Il a une queue plus longue",
      "Il a des yeux plus grands",
      "Il a des épines plus longues",
    ],
  },
  {
    pokemon: "M. Mime",
    value: "Quelle est la caractéristique principale de Mr. Mime?",
    goods: ["Illusionniste", "Farceur"],
    bads: ["Timide", "Sérieux", "Introverti"],
  },
  {
    pokemon: "Caninos",
    value: "Où peut-on généralement trouver Caninos?",
    goods: ["Montagnes", "Forêts"],
    bads: ["Plages", "Marais", "Grottes"],
  },
  {
    pokemon: "Arbok",
    value: "Quel est le type de Arbok?",
    goods: ["Poison"],
    bads: ["Sol", "Roche", "Feu"],
  },
  {
    pokemon: "Miaouss",
    value: "Quel est le type de Miaouss?",
    goods: ["Normal"],
    bads: ["Ténèbres", "Psy", "Combat"],
  },
  {
    pokemon: "Pikachu",
    value: "Quelle est la capacité spéciale de Pikachu?",
    goods: ["Statik"],
    bads: ["Paratonnerre", "Échauffement", "Absorb Volt"],
  },
  {
    pokemon: "Dodrio",
    value: "Où peut-on généralement trouver Dodrio?",
    goods: ["Plaines", "Forêts"],
    bads: ["Montagnes", "Cieux", "Marais"],
  },
  {
    pokemon: "Poissoroy",
    value: "Quelle est la particularité de Poissoroy par rapport à Magicarpe?",
    goods: ["Il est de type Eau", "Il a des couleurs différentes"],
    bads: [
      "Il a des ailes",
      "Il a des écailles plus épaisses",
      "Il a une corne sur la tête",
    ],
  },
  {
    pokemon: "Soporifik",
    value: "Quel est le type de Soporifik?",
    goods: ["Psy"],
    bads: ["Ténèbres", "Spectre", "Vol"],
  },
  {
    pokemon: "Rattatac",
    value: "Quelle est la particularité de Rattatac par rapport à Rattata?",
    goods: ["Il est plus grand", "Il a des moustaches"],
    bads: [
      "Il est plus petit",
      "Il a des yeux plus grands",
      "Il a une couleur différente",
    ],
  },
  {
    pokemon: "Tortank",
    value: "Quelle est la caractéristique distinctive de Tortank?",
    goods: ["Il a des canons d'eau sur le dos"],
    bads: ["Il a des nageoires", "Il a des antennes", "Il a des ailes"],
  },
  {
    pokemon: "Kadabra",
    value: "Quel est le type de Kadabra?",
    goods: ["Psy"],
    bads: ["Spectre", "Ténèbres", "Vol"],
  },
  {
    pokemon: "Dracaufeu",
    value: "Quelle est la caractéristique distinctive de Dracaufeu?",
    goods: ["Il a des ailes puissantes"],
    bads: [
      "Il a des nageoires",
      "Il a des antennes",
      "Il a des jambes plus fortes",
    ],
  },
  {
    pokemon: "Roucarnage",
    value: "Quelle est la particularité de Roucarnage par rapport à Roucoups?",
    goods: ["Il a une crête plus imposante"],
    bads: [
      "Il est plus petit",
      "Il a une queue plus longue",
      "Il a des yeux plus grands",
    ],
  },
  {
    pokemon: "Doduo",
    value: "Quel est le type de Doduo?",
    goods: ["Normal", "Vol"],
    bads: ["Sol", "Roche", "Combat"],
  },
];
