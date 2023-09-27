const apiRoot = "https://api-pokemon-fr.vercel.app/api/v1/pokemon";

const main = document.querySelector("main"),
  pokeImg = document.querySelector("#img-container img"),
  questionP = document.querySelector("#question-container p"),
  btnResponses = [...document.querySelectorAll("#response-container div")],
  responsesP = [...document.querySelectorAll("#response-container div p")],
  btn = document.querySelector("#button-container"),
  divPoints = document.getElementById("divPoints");

const answers = [];
var goodAnswers = [];
var currentQuestion;
var stat = "quizz";
var scoreIndice = 1,
  points = 0;
