let currentEntry = "";
let firstOperand = "";
let operator = "";
let secondOperand = "";

// Displays
const primaryDisplay = document.getElementById("primaryDisplay");
const secondaryDisplay = document.getElementById("secondaryDisplay");

// Displays initial state
updateDisplays("", "");

// Buttons
const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const resultButton = document.getElementById("=");
const allClearButton = document.getElementById("ac");
const clearEntryButton = document.getElementById("c");

// Event listeners
operands.forEach((operand) =>
  operand.addEventListener("click", () =>
    handleOperandClick(operand.getAttribute("data-value"))
  )
);
operators.forEach((operator) =>
  operator.addEventListener("click", () =>
    handleOperatorClick(operator.getAttribute("data-value"))
  )
);
resultButton.addEventListener("click", calculate);
allClearButton.addEventListener("click", allClear);
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
      operator = operation;
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
        resultValue =
          parseFloat(secondOperand) !== 0
            ? parseFloat(firstOperand) / parseFloat(secondOperand)
            : (alert("Cannot divide by zero"), allClear(), undefined);
        break;
      default:
        return;
    }

    updateSecondaryDisplay();
    updateDisplays(
      resultValue !== undefined ? resultValue.toString() : "ERROR",
      resultValue !== undefined
        ? `${firstOperand} ${operator} ${secondOperand} =`
        : ""
    );
    resetOperands();
  }
}

function updateSecondaryDisplay() {
  secondaryDisplay.innerText =
    secondOperand !== ""
      ? `${firstOperand} ${operator} ${secondOperand} =`
      : `${firstOperand} ${operator}`;
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
