function updatePoints(addPoints) {
  points += addPoints * scoreIndice;
  divPoints.innerHTML = points;
}

function resetResponse() {
  for (const btn of btnResponses) {
    btn.dataset.selected = false;
  }
}

document.addEventListener("click", (evt) => {
  const target = evt.target;

  if (target.classList.contains("btn")) {
    if (target.dataset.selected === "true") {
      remove(answers, target.dataset.value);
      target.dataset.selected = false;
    } else {
      answers.push(target.dataset.value);
      target.dataset.selected = true;
    }
    console.log(answers);
  } else if ((target.id = "btn-main")) {
    if (
      answers.length === currentQuestion.goodAnswers.length &&
      answers.every((a) => currentQuestion.goodAnswers.includes(a)) &&
      currentQuestion.goodAnswers.every((a) => answers.includes(a))
    ) {
      updatePoints(1);
    }
    nextQuestion();
  }
});
