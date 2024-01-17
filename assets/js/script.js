let currentEntry = "";
let firstOperand = "";
let operator = "";
let secondOperand = "";

const primaryDisplay = document.getElementById("primaryDisplay");
const secondaryDisplay = document.getElementById("secondaryDisplay");

function updateDisplays(primaryValue, secondaryValue) {
  primaryDisplay.innerText = primaryValue;
  secondaryDisplay.innerText = secondaryValue;
}

updateDisplays("", "");

function handleOperandClick(value) {
  if (value === "." && (currentEntry === "" || currentEntry.includes("."))) {
    return;
  }

  if (currentEntry.length < MAX_DIGITS) {
    currentEntry =
      currentEntry === "0" && value !== "." ? value : currentEntry + value;
    showEntry(currentEntry);
  }
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
  if (currentEntry !== "" && currentEntry !== "0") {
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

function calculatePercentage() {
  if (currentEntry !== "" && firstOperand === "") {
    const numericCurrentEntry = parseFloat(currentEntry);

    if (!isNaN(numericCurrentEntry)) {
      if (firstOperand !== "") {
        const percentage =
          (numericCurrentEntry / 100) * parseFloat(firstOperand);
        updateDisplays(
          addCommas(percentage.toString()),
          `${addCommas(firstOperand)} ${operator} ${addCommas(
            currentEntry
          )} % =`
        );
        resetOperands();
      } else {
        const percentage = numericCurrentEntry / 100;
        updateDisplays(
          addCommas(percentage.toString()),
          `${addCommas(currentEntry)}%`
        );
        currentEntry = percentage.toString();
      }
    }
  }
}

function calculate() {
  if (currentEntry !== "") {
    secondOperand = currentEntry;
    let resultValue = performCalculation();

    resultValue =
      resultValue !== undefined
        ? addCommas(parseFloat(resultValue.toFixed(DECIMAL_PLACES)).toString())
        : undefined;

    updateSecondaryDisplay();
    updateDisplays(
      resultValue !== undefined ? resultValue.toString() : "ERROR",
      resultValue !== undefined
        ? `${addCommas(firstOperand)} ${operator} ${addCommas(secondOperand)} =`
        : ""
    );
    resetOperands();
  }
}

function performCalculation() {
  switch (operator) {
    case "+":
      return parseFloat(firstOperand) + parseFloat(secondOperand);
    case "-":
      return parseFloat(firstOperand) - parseFloat(secondOperand);
    case "x":
      return parseFloat(firstOperand) * parseFloat(secondOperand);
    case "/":
      return parseFloat(secondOperand) !== 0
        ? parseFloat(firstOperand) / parseFloat(secondOperand)
        : handleDivisionByZero();
    default:
      return;
  }
}

function handleDivisionByZero() {
  alert("Cannot divide by zero");
  allClear();
  return undefined;
}

function updateSecondaryDisplay() {
  if (secondOperand !== "") {
    const numericSecondOperand = parseFloat(secondOperand);
    const formattedSecondOperand =
      !isNaN(numericSecondOperand) && numericSecondOperand < 0
        ? `(${addCommas(secondOperand)})`
        : secondOperand;
    secondaryDisplay.innerText = `${addCommas(
      firstOperand
    )} ${operator} ${formattedSecondOperand} =`;
  } else {
    secondaryDisplay.innerText = `${addCommas(firstOperand)} ${operator}`;
  }
}

function showEntry(value) {
  const formattedValue = addCommas(value.slice(0, MAX_DIGITS));
  primaryDisplay.innerText = formattedValue;
}

function addCommas(value) {
  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
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

const DECIMAL_PLACES = 4;
const MAX_DIGITS = 12;

const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const negationButton = document.getElementById("negation");
const percentButton = document.getElementById("percent");
const resultButton = document.getElementById("=");
const allClearButton = document.getElementById("ac");
const clearEntryButton = document.getElementById("c");

operands.forEach((operand) =>
  operand.addEventListener("click", () => handleOperandClick(operand.innerText))
);
operators.forEach((operator) =>
  operator.addEventListener("click", () =>
    handleOperatorClick(operator.getAttribute("data-value"))
  )
);
negationButton.addEventListener("click", negate);
percentButton.addEventListener("click", calculatePercentage);
resultButton.addEventListener("click", calculate);
allClearButton.addEventListener("click", allClear);
clearEntryButton.addEventListener("click", clearEntry);

document.addEventListener("keydown", (event) => {
  const keyValue = event.key;

  const isNumeric = !isNaN(parseFloat(keyValue)) && isFinite(keyValue);
  const isOperator = ["+", "-", "*", "/"].includes(keyValue);

  if (isNumeric || keyValue === ".") {
    handleOperandClick(keyValue);
  }

  if (isOperator) {
    handleOperatorClick(keyValue);
  }

  switch (keyValue) {
    case "Enter":
    case "=":
      calculate();
      break;
    case "%":
      calculatePercentage();
      break;
    case "Escape":
      allClear();
      break;
    case "Backspace":
      clearEntry();
      break;
    case "n":
      negate();
      break;
    default:
      break;
  }
});
