let currentEntry = "";
let firstOperand = "";
let operator = "";
let secondOperand = "";

const primaryDisplay = document.getElementById("primaryDisplay");
const secondaryDisplay = document.getElementById("secondaryDisplay");

updateDisplays("", "");

const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const negationButton = document.getElementById("negation");
const resultButton = document.getElementById("=");
const allClearButton = document.getElementById("ac");
const clearEntryButton = document.getElementById("c");

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

negationButton.addEventListener("click", negate);
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

function negate() {
  if (currentEntry !== "" && currentEntry !== 0) {
    currentEntry =
      currentEntry.charAt(0) === "-"
        ? currentEntry.slice(1)
        : `-${currentEntry}`;

    if (parseFloat(currentEntry) === 0) {
      currentEntry = "0";
    }
  }

  updateDisplays(currentEntry, "");
  updateSecondaryDisplay();
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

    resultValue =
      resultValue !== undefined
        ? parseFloat(resultValue.toFixed(4))
        : undefined;

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
  if (secondOperand !== "") {
    const numericSecondOperand = parseFloat(secondOperand);
    const formattedSecondOperand =
      !isNaN(numericSecondOperand) && numericSecondOperand < 0
        ? `(${secondOperand})`
        : secondOperand;
    secondaryDisplay.innerText = `${firstOperand} ${operator} ${formattedSecondOperand} =`;
  } else {
    secondaryDisplay.innerText = `${firstOperand} ${operator}`;
  }
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
