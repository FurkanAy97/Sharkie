let canvas;
let world;
let keyboard = new Keyboard();
let paused = false;
let muted = false;
let gameIsRunning = false;
let gameOver = false;
let youWin = false;
let fullscreenOn = false;

function init() {
  initLevel();
  mobileBtnEvents();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, muted);
  gameIsRunning = true;
  handleWindowResize();
}

function resetGame() {
  location.reload();
}

function openHowToPlay() {
  document.getElementById("howToPlayScreen").style.display = "flex";
}

function closeHowToPlay() {
  document.getElementById("howToPlayScreen").style.display = "none";
}

function toggleFullscreen() {
  const container = document.getElementById("mainDiv");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const startScreen = document.getElementById("startScreen");
  const optionBtnLayer = document.querySelector(".optionBtnLayer");

  if (!fullscreenOn) {
    enableFullscreen(container, fullscreenBtn, startScreen, optionBtnLayer);
  } else {
    disableFullscreen(container, fullscreenBtn, optionBtnLayer);
  }
}

function enableFullscreen(container, fullscreenBtn, startScreen, optionBtnLayer) {
  fullscreenBtn.style.backgroundImage = "url('img/fullscreen-exit.png')";
  fullscreenOn = true;
  enterFullscreen(container);
  startScreen.classList.add("fullscreen");
  container.style.border = "none";
  if (window.innerHeight > 480) {
    optionBtnLayer.style.width = "100%";
  }
}

function disableFullscreen(container, fullscreenBtn, optionBtnLayer) {
  fullscreenBtn.style.backgroundImage = "url('img/fullscreen-enter.png')";
  fullscreenOn = false;
  exitFullscreen();
  container.style.border = "15px solid black";
  if (window.innerHeight > 480) {
    optionBtnLayer.style.width = "720px";
  }
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
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
  if (window.innerHeight < 481) {
    document.querySelector(".optionBtnLayer").style.width = "auto";
  } else if (!fullscreenOn) {
    document.querySelector(".optionBtnLayer").style.width = "720px";
  } else {
    document.querySelector(".optionBtnLayer").style.width = "100%";
  }
  
  if (window.innerWidth < 750 && window.innerHeight > 390) {
    showRotateNotification();
  } else {
    showGame();
  }


  if (window.innerHeight < 480 && gameIsRunning == true) {
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
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("gameoverScreen").style.display = "none";
  document.getElementById("rotateNotification").style.display = "flex";
}

function showGame() {
  if (!gameOver && !youWin) {
    document.getElementById("mainDiv").style.display = "block";
  }
  if (gameOver) {
    document.getElementById("gameoverScreen").style.display = "flex";
  }
  if (youWin) {
    document.getElementById("endScreen").style.display = "flex";
  }
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
