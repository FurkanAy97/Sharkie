let canvas;
let world;
let keyboard = new Keyboard();

function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

const keyState = {};

window.addEventListener("keydown", (event) => {
  const key = event.key;
  keyState[key] = true;

  if (keyState.ArrowUp) {
    keyboard.UP = true;
  }
  if (keyState.ArrowRight) {
    keyboard.RIGHT = true;
  }
  if (keyState.ArrowDown) {
    keyboard.DOWN = true;
  }
  if (keyState.ArrowLeft) {
    keyboard.LEFT = true;
  }
  if (keyState[" "]) {
    keyboard.SPACE = true;
  }
  if (keyState.d) {
    keyboard.D = true;
  }
});


window.addEventListener("keyup", (event) => {
  const key = event.key;

  keyState[key] = false;

  if (key === "ArrowUp") {
    keyboard.UP = false;
  }
  if (key === "ArrowRight") {
    keyboard.RIGHT = false;
  }
  if (key === "ArrowDown") {
    keyboard.DOWN = false;
  }
  if (key === "ArrowLeft") {
    keyboard.LEFT = false;
  }
  if (key === " ") {
    keyboard.SPACE = false;
  }
  if (key === "d") {
    keyboard.D = false;
  }
});
