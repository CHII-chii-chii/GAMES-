const computerChoiceDisplay = document.getElementById("computer_choice");
const userChoiceDisplay = document.getElementById("user_choice");
const resultDisplay = document.getElementById("result");
const possibleChoices = document.querySelectorAll("button");

let userChoice;
let computerChoice;
let result;

possibleChoices.forEach((button) =>
    button.addEventListener("click", (e) => {
        userChoice = e.target.id;
        userChoiceDisplay.innerHTML = userChoice;
        generateComputerChoice();
        checkWinner();
    })
);

function generateComputerChoice() {
    const choices = ["ROCK", "PAPER", "SCISSOR"];
    computerChoice = choices[Math.floor(Math.random() * choices.length)];
    computerChoiceDisplay.innerHTML = computerChoice
}

function checkWinner() {
    if (computerChoice === userChoice) {
        result = "It's a Draw! 🤝";
    } else if (
        (computerChoice === "ROCK" && userChoice === "SCISSOR") ||
        (computerChoice === "SCISSOR" && userChoice === "PAPER") ||
        (computerChoice === "PAPER" && userChoice === "ROCK")
    ) {
        result = "Computer Wins! 😢";
    } else {
        result = "You Win! 🎉";
    }

    resultDisplay.innerHTML = result;
}
