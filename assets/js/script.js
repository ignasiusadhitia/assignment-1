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

function updateDisplays(primaryValue, secondaryValue, operatorSymbol = "") {
  if (primaryValue === "ERROR") {
    primaryDisplay.innerText = primaryValue;
    secondaryDisplay.innerText = secondaryValue !== "" ? secondaryValue : "";
  } else {
    primaryDisplay.innerText = primaryValue;
    secondaryDisplay.innerText =
      secondaryValue !== ""
        ? `${addCommas(firstOperand)} ${operatorSymbol} ${secondaryValue} =`
        : `${addCommas(firstOperand)} ${operatorSymbol}`;
  }
}

updateDisplays("", "");

function handleOperandClick(value) {
  if (value === "." && (currentEntry === "" || currentEntry.includes("."))) {
    return;
  }

  const currentValue = parseFloat(currentEntry + value);

  if (value !== "." && currentEntry.replace(".", "").length >= MAX_DIGITS) {
    return;
  }

  if (currentValue > MAX_VALUE) {
    updateDisplays("ERROR", "Value Limit Exceeded");
    return;
  }

  currentEntry =
    currentEntry === "0" && value !== "." ? value : currentEntry + value;
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
          addCommas(currentEntry),
          `${operator} ${addCommas(firstOperand)}% =`
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

      const maxEntryValue = MAX_VALUE;
      const maxResultValue = MAX_VALUE / Math.pow(10, DECIMAL_PLACES);

      if (Math.abs(resultValue) > maxResultValue) {
        updateDisplays("ERROR", "Result too long");
      } else {
        if (Math.abs(parseFloat(secondOperand)) > maxEntryValue) {
          updateDisplays("ERROR", "Value Limit Exceeded");
        } else {
          const displayOperator = operatorSymbols[operator] || operator;
          updateSecondaryDisplay(displayOperator);

          updateDisplays(
            addCommas(resultValue.toString()),
            addCommas(secondOperand),
            displayOperator
          );
        }
      }
    } else {
      handleDivisionByZero();
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
  updateDisplays("ERROR", "Cannot divide by zero");
  return;
}

function updateSecondaryDisplay(operatorSymbol) {
  if (secondOperand !== "") {
    const numericSecondOperand = parseFloat(secondOperand);
    const formattedSecondOperand =
      !isNaN(numericSecondOperand) && numericSecondOperand < 0
        ? `(${addCommas(secondOperand)})`
        : addCommas(secondOperand);
    updateDisplays("", formattedSecondOperand, operatorSymbol);
  } else {
    updateDisplays("", "", operatorSymbol);
  }
}

function showEntry(value) {
  const indexOfDot = value.indexOf(".");
  let formattedValue;

  if (indexOfDot !== -1) {
    const beforeDot = value.substring(0, indexOfDot);
    const afterDot = value.substring(
      indexOfDot + 1,
      indexOfDot + 1 + DECIMAL_PLACES
    );
    formattedValue = addCommas(`${beforeDot}.${afterDot}`);
  } else {
    formattedValue = addCommas(value.slice(0, MAX_DIGITS));
  }

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
