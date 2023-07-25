let canvas;
let world;
let keyboard = new Keyboard();
let paused = false;
let muted = false;

function init() {
  initLevel();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, muted);
}

function resetGame() {
  location.reload();
}

function mute() {
  let muteButton = document.getElementById("muteButton");

  if (!muted) {
    muteButton.style.backgroundImage = "url(img/mute.png)";
    muted = true;
    if (world) {
      world.muted = true;
    }
  } else {
    muteButton.style.backgroundImage = "url('img/unmute.png')";
    muted = false;
    if (world) {
      world.muted = false;
    }
  }
  if (world) {
    world.playWorldAudio();
    world.playEndbossAudio();
  }
}

function toggleFrames() {
  world.framesActive = !world.framesActive;
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
