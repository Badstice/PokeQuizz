function updatePoints(addPoints) {
  points += addPoints * scoreIndice;
  divPoints.innerHTML = points;
}

function resetResponse() {
  for (let index = 0; index < answers.length; index++) {
    answers.shift();
  }
  for (const btn of btnResponses) {
    btn.dataset.selected = false;
    btn.classList.remove("green", "bad");
  }
  mainBtn.dataset.state = "hide";
}

document.addEventListener("click", (evt) => {
  const target = evt.target;
  if (target.classList.contains("btn")) {
    if (target.dataset.selected === "true") {
      remove(answers, target.dataset.value);
      target.dataset.selected = false;
    } else {
      speak(target.dataset.value);
      answers.push(target.dataset.value);
      target.dataset.selected = true;
    }
    console.log(answers);
    mainBtn.dataset.state = answers.length > 0 ? "valider" : "hide";
  } else if (target.id === "btn-main") {
    console.log(currentQuestion);
    if (target.dataset.state === "valider") {
      if (
        answers.length === currentQuestion.goods.length &&
        answers.every((a) => currentQuestion.getGoods().includes(a)) &&
        answers.every((a) => !currentQuestion.getBads().includes(a))
      ) {
        updatePoints(1);
      } else {
        console.log("FAUX");
      }
      showResponse();
      target.dataset.state = "next";
    } else if (target.dataset.state === "next") {
      nextQuestion();
    }
  } else if (target.id === "question-container") {
    speak(questionP.innerHTML);
  }
});

function showResponse() {
  for (const btn of btnResponses) {
    if (btn.dataset.selected === "true" && btn.dataset.isGood === "true") {
      btn.classList.add("green");
    } else if (
      btn.dataset.selected === "true" &&
      btn.dataset.isGood === "false"
    ) {
      btn.classList.add("red");
    }
  }
}
