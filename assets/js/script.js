let currentEntry = "";
let firstOperand = "";
let operator = "";
let secondOperand = "";
let result = "";

// Displays
const primaryDisplay = document.getElementById("primaryDisplay");
const secondaryDisplay = document.getElementById("secondaryDisplay");

// Displays initial state
primaryDisplay.innerText = "0";
secondaryDisplay.innerText = "";

// Buttons
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const resultButton = document.getElementById("=");
const allClearButton = document.getElementById("ac");
const clearEntryButton = document.getElementById("c");

// Operand button event listener
operands.forEach(function (operand) {
  operand.addEventListener("click", function () {
    const value = operand.getAttribute("data-value");
    currentEntry += value;
    showEntry(currentEntry);
  });
});

// Operator button event listener
operators.forEach(function (operator) {
  operator.addEventListener("click", function () {
    const operation = operator.getAttribute("data-value");
    setFirstOperand(operation);
  });
});

// resultButton event listener
resultButton.addEventListener("click", function () {
  setSecondOperand();
});

// All Clear button event listener
allClearButton.addEventListener("click", function () {
  allClear();
});

// Clear entry button event listener
clearEntryButton.addEventListener("click", function () {
  clearEntry();
});

function showEntry(value) {
  primaryDisplay.innerText = value;
}

function setFirstOperand(operation) {
  firstOperand = result || currentEntry || "0";
  operator = operation;
  secondaryDisplay.innerText = firstOperand + " " + operation;
  currentEntry = "";
}

function setSecondOperand() {
  secondOperand = currentEntry || firstOperand;
  secondaryDisplay.innerText =
    firstOperand + " " + operator + " " + secondOperand + " " + "=";
  currentEntry = "";
}

function calculate() {}

function allClear() {
  currentEntry = "";
  primaryDisplay.innerText = "0";
  secondaryDisplay.innerText = "";
}

function clearEntry() {
  currentEntry = "";
  primaryDisplay.innerText = "0";
}
