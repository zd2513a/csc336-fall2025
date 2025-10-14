document.addEventListener("DOMContentLoaded", function () {

  var adviceEl = document.getElementById("advice");     
  var adviceIdEl = document.getElementById("adviceId"); 
  var jokeEl = document.getElementById("activity");     
  var refreshBtn = document.getElementById("refreshBtn");



  var ADVICE_URL = "https://api.adviceslip.com/advice";
  var JOKE_URL = "https://official-joke-api.appspot.com/random_joke"; 


  function loadAdvice() {
    var url = ADVICE_URL + "?t=" + Date.now();

    return fetch(url, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) {
          throw new Error("HTTP " + res.status);
        }
        return res.json();
      })
      .then(function (data) {
        if (data && data.slip) {
          adviceEl.textContent = data.slip.advice;
          if (data.slip.slip_id) {
            adviceIdEl.textContent = "ID: " + data.slip.slip_id;
          } else {
            adviceIdEl.textContent = "";
          }
        } else {
          adviceEl.textContent = "(No adivce)";
          adviceIdEl.textContent = "";
        }
      })
      .catch(function () {
        adviceEl.textContent = "Get advice error, try again";
        adviceIdEl.textContent = "";
      });
  }

  function loadJoke() {
    return fetch(JOKE_URL)
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (data && data.setup && data.punchline) {
          jokeEl.textContent = data.setup + " — " + data.punchline;
        } else {
          jokeEl.textContent = "(No Joke)";
        }
      })
      .catch(function () {
        jokeEl.textContent = "Get joke error, try again";
      });
  }

  function refreshAll() {
    refreshBtn.disabled = true;
    refreshBtn.textContent = "Loading";

    loadAdvice()
      .then(function () {
        return loadJoke();
      })
      .finally(function () {
        refreshBtn.disabled = false;
        refreshBtn.textContent = "Get new recommand";
      });
  }

  refreshAll();
  refreshBtn.addEventListener("click", refreshAll);
});