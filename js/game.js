let canvas;
let world;
let keyboard = new Keyboard();
let paused = false;
let muted = false;
let gameIsRunning = false;
let gameOver = false;
let youWin = false;
let fullscreenOn = false;

/**
 * Initializes the game by setting up the level, button events, and creating the world.
 */
function init() {
  initLevel();
  mobileBtnEvents();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, muted);
  gameIsRunning = true;
  handleWindowResize();
}

/**
 * Resets the game by reloading the current page.
 */
function resetGame() {
  location.reload();
}

/**
 * Opens the "How to Play" screen.
 */
function openHowToPlay() {
  document.getElementById("howToPlayScreen").style.display = "flex";
}

/**
 * Closes the "How to Play" screen.
 */
function closeHowToPlay() {
  document.getElementById("howToPlayScreen").style.display = "none";
}

/**
 * Toggles fullscreen mode for the game.
 */
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

/**
 * Enables fullscreen mode for the game.
 *
 * @param {HTMLElement} container - The container element of the game.
 * @param {HTMLElement} fullscreenBtn - The button element to toggle fullscreen.
 * @param {HTMLElement} startScreen - The start screen element of the game.
 * @param {HTMLElement} optionBtnLayer - The layer containing option buttons.
 */
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

/**
 * Disables fullscreen mode for the game.
 *
 * @param {HTMLElement} container - The container element of the game.
 * @param {HTMLElement} fullscreenBtn - The button element to toggle fullscreen.
 * @param {HTMLElement} optionBtnLayer - The layer containing option buttons.
 */
function disableFullscreen(container, fullscreenBtn, optionBtnLayer) {
  fullscreenBtn.style.backgroundImage = "url('img/fullscreen-enter.png')";
  fullscreenOn = false;
  exitFullscreen();
  container.style.border = "15px solid black";
  if (window.innerHeight > 480) {
    optionBtnLayer.style.width = "720px";
  }
}

/**
 * Enters fullscreen mode for a specific element.
 *
 * @param {HTMLElement} element - The element to enter fullscreen mode.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

/**
 * Toggles the mute status of the game.
 */
function mute() {
  let muteButton = document.getElementById("muteButton");
  if (!muted) {
    activateMute(muteButton);
  } else {
    deactivateMute(muteButton);
  }
  if (world) {
    world.playWorldAudio();
    world.playEndbossAudio();
  }
}

/**
 * Activates the mute state in the game and updates the mute button appearance.
 *
 * @param {HTMLElement} muteButton - The mute button element to activate.
 */
function activateMute(muteButton) {
  muteButton.style.backgroundImage = "url(img/mute.png)";
  muted = true;
  localStorage.setItem("muted", JSON.stringify(muted));
  if (world) {
    world.muted = true;
  }
}

/**
 * Deactivates the mute state in the game and updates the mute button appearance.
 */
function deactivateMute() {
  muteButton.style.backgroundImage = "url('img/unmute.png')";
  muted = false;
  localStorage.setItem("muted", JSON.stringify(muted));
  if (world) {
    world.muted = false;
  }
}

/**
 * Sets the mute state of the game based on the stored value in localStorage.
 * Updates the mute button appearance accordingly.
 */
async function setMuteState() {
  let muteButton = document.getElementById("muteButton");
  muted = await JSON.parse(localStorage.getItem("muted"));
  if (!muted) {
    muteButton.style.backgroundImage = "url('img/unmute.png')";
  } else {
    muteButton.style.backgroundImage = "url('img/mute.png')";
  }
}

/**
 * Toggles the state of frame rendering in the game world.
 */
function toggleFrames() {
  world.framesActive = !world.framesActive;
}

/**
 * Handles window resize events and adjusts game elements accordingly.
 */
function handleWindowResize() {
  handleOptionBtnLayerSize();

  if (window.innerWidth < 750 && window.innerHeight > 390) {
    showRotateNotification();
  } else {
    showGame();
  }

  handleMobileButtons();
}

/**
 * Adjusts the size of the optionBtnLayer based on the window and fullscreen state.
 */
function handleOptionBtnLayerSize() {
  if (window.innerHeight < 481) {
    document.querySelector(".optionBtnLayer").style.width = "auto";
  } else if (!fullscreenOn) {
    document.querySelector(".optionBtnLayer").style.width = "720px";
  } else {
    document.querySelector(".optionBtnLayer").style.width = "100%";
  }
}

/**
 * Handles the display of mobile buttons based on the window height and game state.
 */
function handleMobileButtons() {
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

// Event listener for window resize event to handle resizing the game elements.
window.addEventListener("resize", handleWindowResize);

/**
 * Shows a notification to rotate the screen.
 */
function showRotateNotification() {
  document.getElementById("mainDiv").style.display = "none";
  document.getElementById("title").style.display = "none";
  document.getElementById("endScreen").style.display = "none";
  document.getElementById("gameoverScreen").style.display = "none";
  document.getElementById("rotateNotification").style.display = "flex";
}

/**
 * Shows the main game content and screens based on the game state.
 */
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

/**
 * Stores the state of each key in the keyState object when a key is pressed (keydown event).
 * Updates the keyboard.UP, keyboard.RIGHT, keyboard.DOWN, keyboard.LEFT, keyboard.SPACE, and keyboard.D properties accordingly.
 *
 * @param {KeyboardEvent} event - The keydown event object.
 */
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

/**
 * Updates the keyState object when a key is released (keyup event).
 * Resets the keyboard.UP, keyboard.RIGHT, keyboard.DOWN, keyboard.LEFT, keyboard.SPACE, and keyboard.D properties accordingly.
 *
 * @param {KeyboardEvent} event - The keyup event object.
 */
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

/**
 * Adds touchstart and touchend event listeners to the mobile buttons for character control.
 * Updates the keyboard.UP, keyboard.RIGHT, keyboard.DOWN, keyboard.LEFT, keyboard.SPACE, and keyboard.D properties accordingly.
 */
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
