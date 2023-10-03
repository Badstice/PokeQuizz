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
    btn.classList.remove("green", "red");
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
  var isGood = true;
  for (const btn of btnResponses) {
    if (btn.dataset.selected === "true" && btn.dataset.isGood === "true") {
      btn.classList.add("green");
    } else if (
      btn.dataset.selected === "false" &&
      btn.dataset.isGood === "true"
    ) {
      isGood = false;
      btn.classList.add("green");
    } else if (
      btn.dataset.selected === "true" &&
      btn.dataset.isGood === "false"
    ) {
      isGood = false;
      btn.classList.add("red");
    }
  }

  if (isGood) {
    speak("Bravo");
    speak(
      `Tu as donné ${
        currentQuestion.goods.length > 1 ? "les" : "la"
      } bonne réponse`
    );
  } else {
    speak("Dommage");
    speak(
      `${currentQuestion.goods.length > 1 ? "les" : "la"} bonne réponse était`
    );
    currentQuestion.getGoods().forEach((good, i, ar) => {
      speak(good);
      if (i < ar.length - 1) speak("et");
    });
  }
}
