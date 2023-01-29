const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const computerChoices = ["Rock", "Paper", "Scissors"];

console.log("Choose an option:");

rl.question("(R)ock  (P)aper  (S)cissors: ", (answer) => {
  const playerChoice = answer.toLowerCase()[0];

  console.log();

  if (playerChoice === "r") {
    console.log("You picked Rock");
  }
  if (playerChoice === "p") {
    console.log("You picked Paper");
  }
  if (playerChoice === "s") {
    console.log("You picked Scissors");
  }

  const computerChoiceIndex = getRandomInt(computerChoices.length);

  console.log(`Computer picked ${computerChoices[computerChoiceIndex]}`);
  console.log();

  const computerChoice = computerChoices[computerChoiceIndex].toLowerCase()[0];

  if (playerChoice === computerChoice) {
    console.log("Draw");
  } else {
    if (playerChoice === "r") {
      if (computerChoice === "s") {
        console.log("You win");
      }
      if (computerChoice === "p") {
        console.log("You lose");
      }
    }
    if (playerChoice === "p") {
      if (computerChoice === "r") {
        console.log("You win");
      }
      if (computerChoice === "s") {
        console.log("You lose");
      }
    }
    if (playerChoice === "s") {
      if (computerChoice === "p") {
        console.log("You win");
      }
      if (computerChoice === "r") {
        console.log("You lose");
      }
    }
  }

  rl.close();
});
