const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const min = 1;
const max = 10;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random#getting_a_random_integer_between_two_values_inclusive
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

rl.question(
  `Guess a number between ${min} and ${max} (inclusive): `,
  (answer) => {
    const randomNumber = getRandomIntInclusive(min, max);

    if (Number(answer) === randomNumber) {
      console.log("Congratulations, you guessed the correct number!");
    } else {
      console.log("You did not guess the correct number!");
      console.log(`The correct number was: ${randomNumber}`);
    }

    rl.close();
  }
);
