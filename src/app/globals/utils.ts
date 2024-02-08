export function setGameHighScoreToLocalStorage(score: number) {
  localStorage.setItem("gameHighScore", score.toString());
}

export function getGameHighScoreToLocalStorage() {
  const highScore = localStorage.getItem("gameHighScore");
  return highScore === null ? 0 : parseInt(highScore);
}
