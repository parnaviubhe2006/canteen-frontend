let time = 15 * 60; // 15 minutes

function startTimer() {
  const timerEl = document.getElementById("timer");

  setInterval(() => {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;

    timerEl.innerText =
      `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (time > 0) {
      time--;
    }
  }, 1000);
}

startTimer();