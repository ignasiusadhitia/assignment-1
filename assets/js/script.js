// Calculator configuration
const DECIMAL_PLACES = 2;
const MAX_DIGITS = 12;
const MAX_VALUE = 9999999999.99;

//  DOM Elements
const primaryDisplay = document.getElementById("primaryDisplay");
const secondaryDisplay = document.getElementById("secondaryDisplay");

// Operator Symbols
const operatorSymbols = {
  "+": "+",
  "-": "-",
  "*": "\u00D7",
  "/": "\u00F7",
};

// Calculator State
let currentEntry = "";
let firstOperand = "";
let operator = "";
let secondOperand = "";

// Update the primary and secondary displays
function updateDisplays(primaryValue, secondaryValue, operatorSymbol = "") {
  if (primaryValue === "ERROR") {
    // Display an error message
    primaryDisplay.innerText = primaryValue;
    secondaryDisplay.innerText = secondaryValue !== "" ? secondaryValue : "";
  } else {
    // Format the secondary value with commas and handle negative values
    const formattedSecondaryValue =
      secondaryValue !== "" && parseFloat(secondaryValue) < 0
        ? `(${addCommas(secondaryValue)})`
        : addCommas(secondaryValue);

    // Add an equal sign if there is a first operand and operator
    const equalSign = firstOperand !== "" && operatorSymbol !== "" ? " =" : "";

    // Update primary and secondary displays
    primaryDisplay.innerText = primaryValue;
    secondaryDisplay.innerText =
      secondaryValue !== ""
        ? `${addCommas(
            firstOperand
          )} ${operatorSymbol} ${formattedSecondaryValue}${equalSign}`
        : `${addCommas(firstOperand)} ${operatorSymbol}`;
  }
}

// Initialize displays
updateDisplays("", "");

// Handle numeric input
function handleOperandClick(value) {
  if (value === "." && (currentEntry === "" || currentEntry.includes("."))) {
    // Do not allow multiple dots in a number
    return;
  }

  const currentValue = parseFloat(currentEntry + value);

  if (value !== "." && currentEntry.replace(".", "").length >= MAX_DIGITS) {
    // Do not allow more than 10 digits before and after the dot
    return;
  }

  if (currentValue > MAX_VALUE) {
    // Display an error for value limit exceeded
    updateDisplays("ERROR", "Value Limit Exceeded");
    setTimeout(allClear, 2000);
    return;
  }

  // Update current entry and show on the primary display
  currentEntry =
    currentEntry === "0" && value !== "." ? value : currentEntry + value;
  showEntry(currentEntry);
}

// Handle operator input
function handleOperatorClick(operation) {
  if (currentEntry !== "") {
    if (firstOperand === "") {
      // Store the first operand and operator
      firstOperand = currentEntry;
      operator = operation;
      updateSecondaryDisplay();
      currentEntry = "";
    } else {
      // Update the operator
      operator = operation;
    }

    // Display the operator symbol on the secondary display
    const displayOperator = operatorSymbols[operator];
    updateSecondaryDisplay(displayOperator);
    showEntry(currentEntry);
  }
}

// Handle negation button
function negate() {
  if (currentEntry !== "" && currentEntry !== "0") {
    // Negate the current entry and update the primary display
    currentEntry =
      currentEntry.charAt(0) === "-"
        ? currentEntry.slice(1)
        : `-${currentEntry}`;

    if (parseFloat(currentEntry) === 0) {
      currentEntry = "0";
    }

    // Display the negated value on the primary display
    const displayOperator = operatorSymbols[operator] || operator;

    updateDisplays(currentEntry, displayOperator);
  }
}

function calculatePercentage() {
  if (currentEntry !== "" && firstOperand === "") {
    const numericCurrentEntry = parseFloat(currentEntry);

    if (!isNaN(numericCurrentEntry)) {
      if (firstOperand !== "") {
        // Calculate percentage and update displays
        const percentage =
          (numericCurrentEntry / 100) * parseFloat(firstOperand);
        updateDisplays(
          addCommas(percentage.toString()),
          addCommas(currentEntry),
          `${operator} ${addCommas(firstOperand)}% =`
        );
        resetOperands();
      } else {
        // Display the percentage of the current entry
        const percentage = numericCurrentEntry / 100;
        updateDisplays(
          addCommas(percentage.toString()),
          `${addCommas(currentEntry)}%`
        );
        currentEntry = percentage.toString();
      }
    }
  } else {
    // Display an error for invalid input
    updateDisplays("ERROR", "Invalid input for percentage calculation");
    setTimeout(allClear, 2000);
  }
}

// Check if calculation is possible
function shouldCalculate() {
  return firstOperand !== "" && operator !== "";
}

// Handle calculation
function calculate() {
  if (currentEntry !== "" && shouldCalculate()) {
    secondOperand = currentEntry;
    let resultValue = performCalculation();

    // Check if the result is defined
    if (resultValue !== undefined) {
      // Format the result to the specified decimal places
      resultValue = parseFloat(resultValue.toFixed(DECIMAL_PLACES));

      // Set maximum values for result and second operand
      const maxEntryValue = MAX_VALUE;
      const maxResultValue = MAX_VALUE / Math.pow(10, DECIMAL_PLACES);

      // Check for result length exceeding the limit
      if (Math.abs(resultValue) > maxResultValue) {
        updateDisplays("ERROR", "Result too long");
        setTimeout(allClear, 2000);
      } else {
        // Check for second operand exceeding the limit
        if (Math.abs(parseFloat(secondOperand)) > maxEntryValue) {
          updateDisplays("ERROR", "Value Limit Exceeded");
          setTimeout(allClear, 2000);
        } else {
          // Display the result with proper formating and operator
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
      // Handle division by zero
      handleDivisionByZero();
    }
    resetOperands();
  }
}

// Perform calculation based on operator
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

// Handle division by zero
function handleDivisionByZero() {
  // Display an error for division by zero
  updateDisplays("ERROR", "Cannot divide by zero");
  setTimeout(allClear, 2000);
  return;
}

// Update secondary display with formatted second operand
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

// Show the current entry on the primary display
function showEntry(value) {
  const indexOfDot = value.indexOf(".");
  let formattedValue;

  if (indexOfDot !== -1) {
    // Format decimal number with commas
    const beforeDot = value.substring(0, indexOfDot);
    const afterDot = value.substring(
      indexOfDot + 1,
      indexOfDot + 1 + DECIMAL_PLACES
    );
    formattedValue = addCommas(`${beforeDot}.${afterDot}`);
  } else {
    // Format integer number with commas
    formattedValue = addCommas(value.slice(0, MAX_DIGITS));
  }

  // Display the formatted value on the primary display
  primaryDisplay.innerText = formattedValue;
}

// Add commas to a numeric value
function addCommas(value) {
  const parts = value.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// Reset all operands and displays
function resetOperands() {
  currentEntry = "";
  firstOperand = "";
  operator = "";
  secondOperand = "";
}

// Reset the calculator to initial state
function allClear() {
  resetOperands();
  updateDisplays("0", "");
}

// Clear the current entry
function clearEntry() {
  currentEntry = "";
  showEntry("0");
}

// Highlight special keys
function highlightSpecialKey(id) {
  const button = document.getElementById(id);

  if (button) {
    button.classList.add(`${id}-active`);
    setTimeout(() => {
      button.classList.remove(`${id}-active`);
    }, 100);
  }
}

// Event Listeners for Operand Buttons
const operands = document.querySelectorAll(".operand");
operands.forEach((operand) =>
  operand.addEventListener("click", () => handleOperandClick(operand.innerText))
);

// Event Listeners for Operator Buttons
const operators = document.querySelectorAll(".operator");
operators.forEach((operator) =>
  operator.addEventListener("click", () =>
    handleOperatorClick(operator.getAttribute("data-value"))
  )
);

// Event Listeners for Negation Button
const negationButton = document.getElementById("negation");
negationButton.addEventListener("click", negate);

// Event Listeners for Percentage Button
const percentButton = document.getElementById("percent");
percentButton.addEventListener("click", calculatePercentage);

// Event Listener for Equals Button
const resultButton = document.getElementById("equal");
resultButton.addEventListener("click", () => {
  if (shouldCalculate()) {
    calculate();
  }
});

// Event Listener for All Clear Button
const allClearButton = document.getElementById("ac");
allClearButton.addEventListener("click", allClear);

// Event Listener for Clear Entry Button
const clearEntryButton = document.getElementById("c");
clearEntryButton.addEventListener("click", clearEntry);

// Event Listeners for Keyboard Inputs
document.addEventListener("keydown", (event) => {
  const keyValue = event.key;

  const isNumeric = !isNaN(parseFloat(keyValue)) && isFinite(keyValue);
  const isOperator = ["+", "-", "*", "/"].includes(keyValue);

  // Handle numeric and decimal point inputs
  if (isNumeric || keyValue === ".") {
    handleOperandClick(keyValue);

    // Highlight corresponding button
    const button = document.querySelector(`[data-value="${keyValue}"]`);

    if (button) {
      button.classList.add("operand-active");
      setTimeout(() => {
        button.classList.remove("operand-active");
      }, 100);
    }
  }

  // Handle operator inputs
  if (isOperator) {
    handleOperatorClick(keyValue);

    // Highlight corresponding button
    const button = document.querySelector(`[data-value="${keyValue}"]`);

    if (button) {
      button.classList.add("operator-active");
      setTimeout(() => {
        button.classList.remove("operator-active");
      }, 100);
    }
  }

  // Handle special keys
  switch (keyValue) {
    case "Enter":
    case "=":
      calculate();
      highlightSpecialKey("equal");
      break;
    case "%":
      calculatePercentage();
      highlightSpecialKey("percent");
      break;
    case "Escape":
      allClear();
      highlightSpecialKey("ac");
      break;
    case "Backspace":
      clearEntry();
      highlightSpecialKey("c");
      break;
    case "n":
      negate();
      highlightSpecialKey("negation");
      break;
    default:
      break;
  }
});

document.addEventListener("DOMContentLoaded", (event) => {
  // Get the dark mode toggle switch and check local storage
  const darkModeToggle = document.getElementById("darkModeToggle");
  const savedDarkMode = localStorage.getItem("darkMode");

  // Function to update dark mode state
  function updateDarkMode() {
    const componentsToUpdate = [
      document.body,
      ...document.querySelectorAll(
        ".card, #primaryDisplay, #secondaryDisplay, .operator, #percent, #negation, .operator:hover, #percent:hover, #negation:hover, .operator-active, .percent-active, .negation-active, .operator:active, #percent:active, #negation:active,.operand, .operand:hover, .operand-active, .operand:active, #ac, #c, #ac:hover, #c:hover, .ac-active, .c-active, #ac:active, #c:active, .checkbox-label, #equal, #equal:hover, #equal:active"
      ),
    ];

    if (darkModeToggle.checked) {
      componentsToUpdate.forEach((component) =>
        component?.classList?.add("dark-mode")
      );
    } else {
      componentsToUpdate.forEach((component) =>
        component?.classList?.remove("dark-mode")
      );
    }

    localStorage.setItem("darkMode", darkModeToggle.checked);
  }

  // Event listener for the dark mode toggle switch
  darkModeToggle.addEventListener("change", updateDarkMode);

  // Set the initial dark mode state based on local storage
  if (savedDarkMode === "true") {
    darkModeToggle.checked = true;
  }

  // Apply the dark mode on page load
  updateDarkMode();
});
