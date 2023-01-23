const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter 2 numbers (seperated by a space): ", (answer) => {
  const numberList = answer.split(" ");

  const firstNumber = Number(numberList[0]);
  const secondNumber = Number(numberList[1]);

  console.log(firstNumber + secondNumber);

  rl.close();
});
