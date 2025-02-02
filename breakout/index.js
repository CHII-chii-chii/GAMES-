const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('#score');
const startButton = document.querySelector('#start-button');

// Game Constants
const blockWidth = 100;
const blockHeight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;
let xDirection = -2;
let yDirection = 2;
let timerId;
let score = 0;
let speed = 30;

// User Paddle Position
const userStart = [230, 10];
let currentPosition = [...userStart];

// Ball Position
const ballStart = [270, 40];
let ballCurrentPosition = [...ballStart];

// Block Class
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis];
        this.topLeft = [xAxis, yAxis + blockHeight];
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
    }
}

// Blocks Array
const blocks = [];
for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 5; col++) {
        blocks.push(new Block(10 + col * 110, 270 - row * 30));
    }
}

// Add Blocks to Grid
function addBlocks() {
    blocks.forEach(block => {
        const div = document.createElement('div');
        div.classList.add('block');
        div.style.left = block.bottomLeft[0] + 'px';
        div.style.bottom = block.bottomLeft[1] + 'px';
        grid.appendChild(div);
    });
}
addBlocks();

// Create User Paddle
const user = document.createElement('div');
user.classList.add('user');
grid.appendChild(user);
drawUser();

// Create Ball
const ball = document.createElement('div');
ball.classList.add('ball');
grid.appendChild(ball);
drawBall();

// Draw Functions
function drawUser() {
    user.style.left = currentPosition[0] + 'px';
}

function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px';
    ball.style.bottom = ballCurrentPosition[1] + 'px';
}

// Move User Paddle (Increased Speed)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && currentPosition[0] > 0) {
        currentPosition[0] -= 15;
        drawUser();
    }
    if (e.key === 'ArrowRight' && currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 15;
        drawUser();
    }
});

// Start Game
startButton.addEventListener('click', startGame);

function startGame() {
    clearInterval(timerId);
    ballCurrentPosition = [...ballStart];
    currentPosition = [...userStart];
    drawBall();
    drawUser();
    score = 0;
    scoreDisplay.innerHTML = "Score: " + score;
    timerId = setInterval(moveBall, speed);
}

// Move Ball
function moveBall() {
    ballCurrentPosition[0] += xDirection;
    ballCurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

// Check Collisions
function checkForCollisions() {
    // Block Collision
    blocks.forEach((block, i) => {
        if (
            ballCurrentPosition[0] > block.bottomLeft[0] &&
            ballCurrentPosition[0] < block.bottomRight[0] &&
            ballCurrentPosition[1] + ballDiameter > block.bottomLeft[1] &&
            ballCurrentPosition[1] < block.topLeft[1]
        ) {
            document.querySelectorAll('.block')[i].remove();
            blocks.splice(i, 1);
            yDirection *= -1;
            score++;
            scoreDisplay.innerHTML = "Score: " + score;

            // **Win Condition**: If all blocks are cleared
            if (blocks.length === 0) {
                clearInterval(timerId);
                scoreDisplay.innerHTML = 'You Win!';
            }
        }
    });

    // Wall Collision (Left & Right)
    if (ballCurrentPosition[0] <= 0 || ballCurrentPosition[0] >= boardWidth - ballDiameter) {
        xDirection *= -1;
    }

    // Wall Collision (Top)
    if (ballCurrentPosition[1] >= boardHeight - ballDiameter) {
        yDirection *= -1;
    }

    // Paddle Collision
    if (
        ballCurrentPosition[0] + ballDiameter > currentPosition[0] &&
        ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
        ballCurrentPosition[1] <= currentPosition[1] + blockHeight &&
        ballCurrentPosition[1] >= currentPosition[1]
    ) {
        yDirection *= -1;

        // Adjust xDirection based on where the ball hits the paddle
        let paddleCenter = currentPosition[0] + blockWidth / 2;
        let ballCenter = ballCurrentPosition[0] + ballDiameter / 2;
        xDirection = (ballCenter - paddleCenter) / 5;
    }

    // Game Over Condition
    if (ballCurrentPosition[1] <= 0) {
        clearInterval(timerId);
        scoreDisplay.innerHTML = 'Game Over!';
    }
}
