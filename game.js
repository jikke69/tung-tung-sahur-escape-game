const player = document.getElementById("player");
const police = document.getElementById("police");
const obstacle = document.getElementById("obstacle");

const scoreText = document.getElementById("score");
const gameOver = document.getElementById("gameOver");

let playerX = 200;
let playerY = 0;

let policeX = 50;

let obstacleX = window.innerWidth + 100;

let velocityY = 0;

let jumping = false;
let gameRunning = true;

let score = 0;

let playerSpeed = 6;
let policeSpeed = 1.5;
let obstacleSpeed = 6;

const gravity = 0.8;

const keys = {};


// TOETSEN

document.addEventListener("keydown", function(event) {

    keys[event.key] = true;

    if (
        (event.key === "ArrowUp" || event.key === " ") &&
        !jumping
    ) {

        velocityY = 15;
        jumping = true;

    }

});


document.addEventListener("keyup", function(event) {

    keys[event.key] = false;

});


// GAME LOOP

function gameLoop() {

    if (!gameRunning) {
        return;
    }


    // LINKS / RECHTS

    if (keys["ArrowRight"]) {
        playerX += playerSpeed;
    }

    if (keys["ArrowLeft"]) {
        playerX -= playerSpeed;
    }


    // ZORG DAT JE NIET UIT HET SCHERM GAAT

    if (playerX < 0) {
        playerX = 0;
    }

    if (playerX > window.innerWidth - 70) {
        playerX = window.innerWidth - 70;
    }


    // SPRINGEN

    velocityY -= gravity;

    playerY += velocityY;


    if (playerY <= 0) {

        playerY = 0;
        velocityY = 0;
        jumping = false;

    }


    // POLITIE ACHTERVOLGT

    if (policeX < playerX - 100) {

        policeX += policeSpeed;

    }


    // OBSTAKEL BEWEEGT

    obstacleX -= obstacleSpeed;


    // NIEUW OBSTAKEL

    if (obstacleX < -100) {

        obstacleX =
            window.innerWidth +
            Math.random() * 500;

        score++;

        scoreText.textContent =
            "Score: " + score;

        obstacleSpeed += 0.2;
        policeSpeed += 0.03;

    }


    // POSITIES

    player.style.left =
        playerX + "px";

    player.style.bottom =
        (100 + playerY) + "px";

    police.style.left =
        policeX + "px";

    obstacle.style.left =
        obstacleX + "px";


    // COLLISION

    const playerRect =
        player.getBoundingClientRect();

    const obstacleRect =
        obstacle.getBoundingClientRect();

    const policeRect =
        police.getBoundingClientRect();


    // OBSTAKEL

    if (
        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top
    ) {

        endGame();

    }


    // POLITIE

    if (
        playerRect.left < policeRect.right &&
        playerRect.right > policeRect.left &&
        playerRect.top < policeRect.bottom &&
        playerRect.bottom > policeRect.top
    ) {

        endGame();

    }


    requestAnimationFrame(gameLoop);
}


// GAME OVER

function endGame() {

    gameRunning = false;

    gameOver.style.display = "block";

}


// OPNIEUW SPELEN

function restartGame() {

    playerX = 200;
    playerY = 0;

    policeX = 50;

    obstacleX =
        window.innerWidth + 100;

    velocityY = 0;

    score = 0;

    policeSpeed = 1.5;
    obstacleSpeed = 6;

    scoreText.textContent =
        "Score: 0";

    gameOver.style.display =
        "none";

    gameRunning = true;

    gameLoop();

}


// START GAME

gameLoop();
