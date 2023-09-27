const synth = window.speechSynthesis;

function speak(msg) {
  let speech = new SpeechSynthesisUtterance(msg);
  synth.speak(speech);
}
