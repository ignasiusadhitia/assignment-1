# Calculator App Documentation

## Introduction

The Calculator App is a simple yet powerful calculator designed for basic arithmetic calculations. It provides a user-friendly interface for performing addition, subtraction, multiplication, and division, along with additional features like percentage calculations and number formatting.

## Features

### 1. Basic Arithmetic Operations

- **Addition (+):** Perform addition calculations by clicking the "+" button or using the keyboard.
- **Subtraction (-):** Subtract numbers by clicking the "-" button or using the keyboard.
- **Multiplication (x):** Multiply numbers by clicking the "x" button or using the keyboard.
- **Division (/):** Divide numbers by clicking the "/" button or using the keyboard.

### 2. Keyboard Support

- The calculator supports keyboard input for all numeric digits (0-9), decimal point (.), and basic operators (+, -, *, /).
- Additional keyboard shortcuts include Enter (=) for calculating results, Escape for clearing all, Backspace for clearing the last entry, and "n" for negation.

### 3. Limit on Digits

- The calculator restricts the entry of numbers to a maximum of 12 digits for readability and precision.

### 4. Number Formatting

- Numbers are formatted with commas for better readability. For example, "1,000" or "1,000,000".

### 5. Negation

- Negate a number by clicking the "+/-" button or using the "n" key on the keyboard.

### 6. Percentage Calculation

- Calculate percentages of numbers with the "%" button or the "%" key on the keyboard.

### 7. Error Handling

- The calculator handles division by zero, displaying an alert message when attempting to divide by zero.

### 8. Responsive Design

- The calculator is designed with a responsive layout to ensure a consistent and user-friendly experience across different devices and screen sizes.

## Usage

1. **Numeric Entry:**
   - Click on the numeric buttons (0-9) to input numbers.
   - Use the decimal point (.) for entering decimal numbers.

2. **Arithmetic Operations:**
   - Click on the operator buttons (+, -, *, /) to perform arithmetic operations.
   - Use the corresponding keyboard keys for operators.

3. **Result Calculation:**
   - Click on the "=" button or press Enter to calculate results.

4. **Percentage Calculation:**
   - Click on the "%" button or press the "%" key to calculate percentages.

5. **Negation:**
   - Click on the "+/-" button or press "n" to negate a number.

6. **Clearing Entry:**
   - Click on the "C" button or press Backspace to clear the last entry.
   - Click on the "AC" button or press Escape to clear all entries.

## Technical Details

- **Decimal Places:** The calculator displays results rounded to 4 decimal places.
- **Maximum Digits:** The maximum allowed digits for entry is set to 12.
- **Number Formatting:** The `addCommas` function is used to format numbers with commas.

## Developer Information

- **Variables:**
  - `currentEntry`: Holds the current numeric entry.
  - `firstOperand`: Stores the first operand in a calculation.
  - `operator`: Represents the arithmetic operator.
  - `secondOperand`: Stores the second operand in a calculation.
  - `primaryDisplay`: Reference to the primary display element.
  - `secondaryDisplay`: Reference to the secondary display element.

- **Functions:**
  - `handleOperandClick(value)`: Handles numeric and decimal point clicks.
  - `handleOperatorClick(operation)`: Handles arithmetic operator clicks.
  - `negate()`: Negates the current entry.
  - `calculatePercentage()`: Calculates percentages.
  - `calculate()`: Performs arithmetic calculations.
  - `performCalculation()`: Executes the actual arithmetic operation.
  - `handleDivisionByZero()`: Handles division by zero.
  - `updateSecondaryDisplay()`: Updates the secondary display with formatted values.
  - `showEntry(value)`: Displays the current entry with number formatting.
  - `addCommas(value)`: Adds commas to format numbers.
  - `resetOperands()`: Resets all operands and the operator.
  - `allClear()`: Clears all entries.
  - `clearEntry()`: Clears the last entry.

## Conclusion

The Calculator App is designed to provide a convenient and efficient tool for performing basic arithmetic calculations. Whether you're using the on-screen buttons or the keyboard shortcuts, the calculator ensures a seamless and user-friendly experience.