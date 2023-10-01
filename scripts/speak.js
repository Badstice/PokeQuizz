const synth = window.speechSynthesis;

function speak(msg) {
  let speech = new SpeechSynthesisUtterance(msg);
  speech.rate = 0.9;
  synth.speak(speech);
}
