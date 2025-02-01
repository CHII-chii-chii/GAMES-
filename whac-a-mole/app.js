const squares = document.querySelectorAll(".square");
const mole = document.querySelector('.mole');
const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');
const startBtn = document.querySelector('#start-btn');

let result = 0;
let hitPosition;
let currentTime = 60;
let timerId = null;

function randomSquare() {
    squares.forEach(square => {
        square.classList.remove('mole');
    });

    let randomSquare = squares[Math.floor(Math.random() * 9)];
    randomSquare.classList.add('mole');
    hitPosition = randomSquare.id;
}

squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    });
});

function moveMole() {
    timerId = setInterval(randomSquare, 1000);
}

function countDown() {
    currentTime--;
    timeLeft.textContent = currentTime;

    if (currentTime == 0) {
        clearInterval(countDownTimerId);
        clearInterval(timerId);
        alert('Game over! Your result: ' + result);
        startBtn.style.display = 'block';  // Show start button again
    }
}

function startGame() {
    result = 0;
    score.textContent = result;
    currentTime = 60;
    timeLeft.textContent = currentTime;
    startBtn.style.display = 'none';  // Hide start button during game
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
}

startBtn.addEventListener('click', startGame);
