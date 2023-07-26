let canvas;
let world;
let keyboard = new Keyboard();
let paused = false;
let muted = false;

function init() {
  initLevel();
  mobileBtnEvents();
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

function handleWindowResize() {
  if (window.innerWidth < 750 && window.innerHeight > 390) {
    showRotateNotification();
  } else {
    showGame();
  }

  if (window.innerHeight < 480) {
    buttons = document.querySelectorAll(".button");
    buttons.forEach((btn) => {
      btn.style.display = "block";
    });
  } else {
    buttons = document.querySelectorAll(".button");
    buttons.forEach((btn) => {
      btn.style.display = "none";
    });
  }
}

window.addEventListener("resize", handleWindowResize);

function showRotateNotification() {
  document.getElementById("mainDiv").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("rotateNotification").style.display = "flex";
}

function showGame() {
  document.getElementById("mainDiv").style.display = "block";
  if (window.innerHeight > 480) {
    document.getElementById("title").style.display = "block";
  } else {
    document.getElementById("title").style.display = "none";
  }
  document.getElementById("rotateNotification").style.display = "none";
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

function mobileBtnEvents() {
  document.getElementById("btnUp").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });

  document.getElementById("btnUp").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });

  document.getElementById("btnRight").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });

  document.getElementById("btnRight").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });

  document.getElementById("btnDown").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.DOWN = true;
  });

  document.getElementById("btnDown").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.DOWN = false;
  });

  document.getElementById("btnLeft").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });

  document.getElementById("btnLeft").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });

  document.getElementById("bubbleBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
  });

  document.getElementById("bubbleBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.SPACE = false;
  });

  document.getElementById("attackBtn").addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.D = true;
  });

  document.getElementById("attackBtn").addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.D = false;
  });
}
