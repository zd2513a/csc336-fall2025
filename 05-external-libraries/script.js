document.addEventListener("DOMContentLoaded", () => {

  Toastify({
    text: "Welcome 'Take a break coffee!' Today, the second cup of cappuccino is half price ☕",
    duration: 3000,
    gravity: "top",
    position: "center",
    close: true
  }).showToast();

  const btn = document.getElementById("dealBtn");
  const synth = new Tone.MembraneSynth().toDestination();

  btn.addEventListener("click", () => {
    synth.triggerAttackRelease("A3", "16n");

    Toastify({
      text: "Today's Special: Buy two cups of caramel latte and get the third one free!",
      duration: 3000,
      gravity: "top",
      position: "center",
      close: true
    }).showToast();
  });
});