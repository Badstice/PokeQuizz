function nextQuestion() {
  resetResponse();
  const pokemon = api.nextPokemon();
  pokeImg.src = pokemon.sprites.regular;

  currentQuestion = generateQuestion(pokemon);
  questionP.innerHTML = currentQuestion.question;
  goodAnswers = currentQuestion.goodAnswers;
  console.log(currentQuestion);
  const answers = currentQuestion.getAnswers();

  for (let i = 0; i < answers.length; i++) {
    btnResponses[i].dataset.value = answers[i].value;
    btnResponses[i].dataset.isGood = answers[i].isGood;
    if (answers[i].img) {
      btnResponses[i].dataset.type = "img";
      btnResponses[i].querySelector("img").src = answers[i].img;
    } else {
      btnResponses[i].dataset.type = "txt";
      btnResponses[i].querySelector("p").innerHTML = answers[i].value;
    }
  }
  speak(currentQuestion.question);
}
