function nextQuestion() {
  resetResponse();
  const pokemon = api.nextPokemon();
  pokeImg.src = pokemon.sprites.regular;

  currentQuestion = generateQuestion(pokemon);
  questionP.innerHTML = currentQuestion.question;
  goodAnswers = currentQuestion.goodAnswers;
  const answers = currentQuestion.getAnswers();

  for (let i = 0; i < answers.length; i++) {
    btnResponses[i].dataset.value = answers[i].value;
    if (answers[i].img) {
      btnResponses[i].dataset.type = "img";
      btnResponses[i].querySelector("img").src = answers[i].img;
    } else {
      btnResponses[i].dataset.type = "txt";
      btnResponses[i].querySelector("p").innerHTML = answers[i].value;
    }
  }
}
