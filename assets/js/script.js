let currentEntry = "";
let firstOperand = "";
let operator = "";
let secondOperand = "";

// Displays
const primaryDisplay = document.getElementById("primaryDisplay");
const secondaryDisplay = document.getElementById("secondaryDisplay");

// Displays initial state
updateDisplays("0", "");

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
    handleOperandClick(value);
  });
});

// Operator button event listener
operators.forEach(function (operator) {
  operator.addEventListener("click", function () {
    const operation = operator.getAttribute("data-value");
    handleOperatorClick(operation);
  });
});

// Result button event listener
resultButton.addEventListener("click", calculate);

// All Clear button event listener
allClearButton.addEventListener("click", allClear);

// Clear entry button event listener
clearEntryButton.addEventListener("click", clearEntry);

function handleOperandClick(value) {
  currentEntry += value;
  showEntry(currentEntry);
}

function handleOperatorClick(operation) {
  if (currentEntry !== "") {
    if (firstOperand === "") {
      firstOperand = currentEntry;
      operator = operation;
      updateSecondaryDisplay();
      currentEntry = "";
    } else {
      // Handle consecutive operators by updating the operator
      operator = operation;
      updateSecondaryDisplay();
    }
  }
}

function calculate() {
  if (currentEntry !== "") {
    secondOperand = currentEntry;
    let resultValue;

    switch (operator) {
      case "+":
        resultValue = parseFloat(firstOperand) + parseFloat(secondOperand);
        break;
      case "-":
        resultValue = parseFloat(firstOperand) - parseFloat(secondOperand);
        break;
      case "x":
        resultValue = parseFloat(firstOperand) * parseFloat(secondOperand);
        break;
      case "/":
        if (parseFloat(secondOperand) !== 0) {
          resultValue = parseFloat(firstOperand) / parseFloat(secondOperand);
        } else {
          alert("Cannot divide by zero");
          allClear();
          return;
        }
        break;
      default:
        return;
    }

    updateDisplays(resultValue.toString(), "");
    resetOperands();
  }
}

function updateSecondaryDisplay() {
  secondaryDisplay.innerText = firstOperand + " " + operator;
}

function showEntry(value) {
  primaryDisplay.innerText = value;
}

function updateDisplays(primaryValue, secondaryValue) {
  primaryDisplay.innerText = primaryValue;
  secondaryDisplay.innerText = secondaryValue;
}

function resetOperands() {
  currentEntry = "";
  firstOperand = "";
  operator = "";
  secondOperand = "";
}

function allClear() {
  resetOperands();
  updateDisplays("0", "");
}

function clearEntry() {
  currentEntry = "";
  showEntry("0");
}
