const availableKeyboardKeysToPress = [38, 32];
const wrapper = document.querySelector(".wrapper");
const distance = document.querySelector(".distance span");
let currentClouds;
let currentMario;
let currentPipe;
let currentLoop;
let gameStartButton;
let keyBoardEvent;

function transformValueWithPixelInNumber(stringValueWithPixel) {
    return Number(Number(stringValueWithPixel.replace("px", "")).toFixed(2));
}

function distanceAdd() {
    const currentScore = Number(distance.innerHTML);
    distance.innerHTML = `${currentScore + 1}`;
}

function clearDistance() {
    distance.innerHTML = "0";
}

function jump() {
    currentMario.classList.add("jump");
    setTimeout(() => {
        currentMario.classList.remove("jump");
    }, 800);
}

function stopCloudsAnimation() {
    const cloudsCurrentPositionOnScreen = `${currentClouds.offsetLeft}px`;
    currentClouds.style.left = cloudsCurrentPositionOnScreen;
    currentClouds.style.animation = "none";    
}

function stopPipesAnimation() {
    const pipeCurrentPositionOnScreen = `${currentPipe.offsetLeft}px`;
    currentPipe.style.left = pipeCurrentPositionOnScreen;
    currentPipe.style.animation = "none";
}

function stopMarioAnimation() {
    const marioPositionFromTheGround = transformValueWithPixelInNumber(window.getComputedStyle(currentMario).bottom);
    currentMario.src = "assets/img/game-over.png";
    currentMario.style.width = "70px";
    currentMario.style.left = "30px";
    currentMario.style.bottom = `${marioPositionFromTheGround + 20}px`;
}

function createClouds() {
    const clouds = document.createElement("img");
    clouds.src = "assets/img/clouds.png";
    clouds.setAttribute("class", "clouds clouds-start");
    wrapper.appendChild(clouds);
    currentClouds = clouds;
    wrapper.appendChild(clouds);
}

function createMario() {
    const mario = document.createElement("img");
    mario.src = "assets/img/mario.gif";
    mario.setAttribute("class", "mario");
    currentMario = mario;
    wrapper.appendChild(mario);
}

function createPipe() {
    const pipe = document.createElement("img");
    pipe.src = "assets/img/pipe.png";
    pipe.setAttribute("class", "pipe");
    currentPipe = pipe;
    wrapper.appendChild(pipe);
}

function createStartButton() {
    const button = document.createElement("a");
    button.setAttribute("class", "game-start");
    button.innerHTML = "Iniciar Jogo";
    gameStartButton = button;
    wrapper.appendChild(button);
    button.addEventListener("click", (event) => {
        event.preventDefault();
        startGame();
    });
}

function keyBoardEventHandler(event) {
    const key = event.keyCode;
    if (availableKeyboardKeysToPress.includes(key)) {
        jump();
    }
}

function createKeyboardEvent() {
    keyBoardEvent = document.addEventListener("keyup", keyBoardEventHandler);
}

function startGame() {
    createKeyboardEvent();
    clearDistance();
    wrapper.innerHTML = "";
    createClouds();
    createMario();
    createPipe();
    currentLoop = setInterval(() => {
        const marioPositionFromTheGround = transformValueWithPixelInNumber(window.getComputedStyle(currentMario).bottom);
        const pipePosition = currentPipe.offsetLeft;
        if(pipePosition <= 100 && pipePosition > 0 && marioPositionFromTheGround < 80) {
            gameOver();
        } else {
            distanceAdd();
        }
    }, 10);
}

function gameOver() {
    stopMarioAnimation();
    stopPipesAnimation();
    stopCloudsAnimation();
    clearInterval(currentLoop);
    document.removeEventListener("keyup", keyBoardEventHandler);
    setTimeout(() => {
        createStartButton();
    }, 1000);
}

function init() {
    createStartButton();
    createClouds();
}

init();