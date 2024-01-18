let currentEntry = "";
let firstOperand = "";
let operator = "";
let secondOperand = "";

const primaryDisplay = document.getElementById("primaryDisplay");
const secondaryDisplay = document.getElementById("secondaryDisplay");

const operatorSymbols = {
  "+": "+",
  "-": "-",
  "*": "\u00D7",
  "/": "\u00F7",
};

function updateDisplays(primaryValue, secondaryValue) {
  primaryDisplay.innerText = primaryValue;
  secondaryDisplay.innerText = secondaryValue;
}

updateDisplays("", "");

function handleOperandClick(value) {
  if (value === "." && (currentEntry === "" || currentEntry.includes("."))) {
    return;
  }

  const currentValue = parseFloat(currentEntry + value);

  if (currentValue > MAX_VALUE) {
    updateDisplays("ERROR", "Value Limit Excedeed");

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

    const displayOperator = operatorSymbols[operator];
    updateSecondaryDisplay(displayOperator);
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
    const displayOperator = operatorSymbols[operator] || operator;
    updateDisplays(currentEntry, "");
    updateSecondaryDisplay(displayOperator);
  }
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

function shouldCalculate() {
  return firstOperand !== "" && operator !== "";
}

function calculate() {
  if (currentEntry !== "" && shouldCalculate()) {
    secondOperand = currentEntry;
    let resultValue = performCalculation();

    if (resultValue !== undefined) {
      resultValue = parseFloat(resultValue.toFixed(DECIMAL_PLACES));

      const maxValue = 999999999999 / Math.pow(10, DECIMAL_PLACES);

      if (Math.abs(resultValue) > maxValue) {
        updateDisplays("ERROR", "Result too long");
      } else {
        const displayOperator = operatorSymbols[operator] || operator;
        updateSecondaryDisplay(displayOperator);

        updateDisplays(
          addCommas(resultValue.toString()),
          `${addCommas(firstOperand)} ${displayOperator} ${addCommas(
            secondOperand
          )} =`
        );
      }
    } else {
      updateDisplays("ERROR", "");
    }
    resetOperands();
  }
}

function performCalculation() {
  switch (operator) {
    case "+":
      return parseFloat(firstOperand) + parseFloat(secondOperand);
    case "-":
      return parseFloat(firstOperand) - parseFloat(secondOperand);
    case "*":
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

function updateSecondaryDisplay(operatorSymbol) {
  if (secondOperand !== "") {
    const numericSecondOperand = parseFloat(secondOperand);
    const formattedSecondOperand =
      !isNaN(numericSecondOperand) && numericSecondOperand < 0
        ? `(${addCommas(secondOperand)})`
        : secondOperand;
    secondaryDisplay.innerText = `${addCommas(
      firstOperand
    )} ${operatorSymbol} ${formattedSecondOperand} =`;
  } else {
    secondaryDisplay.innerText = `${addCommas(firstOperand)} ${operatorSymbol}`;
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

const DECIMAL_PLACES = 2;
const MAX_DIGITS = 12;
const MAX_VALUE = 9999999999.99;

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
resultButton.addEventListener("click", () => {
  if (shouldCalculate()) {
    calculate();
  }
});
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
