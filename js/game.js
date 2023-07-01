let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard)
}

window.addEventListener('keydown', (event) => {
    
    if (event.key == 'ArrowUp') {
        keyboard.UP = true
    }
    if (event.key == 'ArrowRight') {
        keyboard.RIGHT = true
    }
    if (event.key == 'ArrowDown') {
        keyboard.DOWN = true
    }
    if (event.key == 'ArrowLeft') {
        keyboard.LEFT = true
    }
    if (event.key == ' ') {
        keyboard.SPACE = true        
    }
})

window.addEventListener('keyup', () => {
    setKeysToFalse();
})


function setKeysToFalse(){
    keyboard.UP = false
    keyboard.RIGHT = false
    keyboard.DOWN = false
    keyboard.LEFT = false
    keyboard.SPACE = false
}