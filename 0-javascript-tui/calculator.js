const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter an expression with 2 numbers: ", (answer) => {
  const stringList = answer.split(" ");

  const firstNumber = Number(stringList[0]);
  const operator = stringList[1];
  const secondNumber = Number(stringList[2]);

  if (operator === "*") {
    console.log(firstNumber * secondNumber);
  }

  if (operator === "+") {
    console.log(firstNumber + secondNumber);
  }

  if (operator === "-") {
    console.log(firstNumber - secondNumber);
  }

  if (operator === "/") {
    console.log(firstNumber / secondNumber);
  }

  rl.close();
});
