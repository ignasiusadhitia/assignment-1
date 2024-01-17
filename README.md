# Calculator App Documentation

## Introduction

The Calculator App is a versatile calculator designed for basic arithmetic calculations with additional features such as percentage calculations and number formatting. It provides a user-friendly interface that supports both button clicks and keyboard input.

## Features

### 1. Basic Arithmetic Operations

- **Addition (+):** Perform addition calculations.
- **Subtraction (-):** Subtract numbers.
- **Multiplication (x):** Multiply numbers.
- **Division (/):** Divide numbers.

### 2. Keyboard Support

- The calculator supports keyboard input for numeric digits (0-9), the decimal point (.), and basic operators (+, -, *, /).
- Keyboard shortcuts include Enter (=) for calculating results, Escape for clearing all, Backspace for clearing the last entry, and "n" for negation.

### 3. Limit on Digits

- Entries are limited to a maximum of 12 digits for readability and precision.

### 4. Number Formatting

- Numbers are formatted with commas for better readability (e.g., "1,000" or "1,000,000").

### 5. Negation

- Negate a number by clicking the "+/-" button or pressing "n" on the keyboard.

### 6. Percentage Calculation

- Calculate percentages of numbers using the "%" button or the "%" key on the keyboard.

### 7. Error Handling

- The calculator handles division by zero, displaying an alert message when attempting to divide by zero.

### 8. Responsive Design

- The calculator features a responsive layout for a consistent user experience across different devices and screen sizes.

## Usage

1. **Numeric Entry:**
   - Click on numeric buttons (0-9) or use the decimal point (.) for numeric input.

2. **Arithmetic Operations:**
   - Click on operator buttons (+, -, *, /) or use the corresponding keyboard keys.

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

- **Decimal Places:** Results are displayed rounded to 4 decimal places.
- **Maximum Digits:** The calculator allows a maximum of 12 digits for entry.
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
  - `shouldCalculate()`: Checks if a calculation should be performed.
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

The Calculator App offers a convenient and efficient tool for performing basic arithmetic calculations. Whether using on-screen buttons or keyboard shortcuts, the calculator ensures a seamless and user-friendly experience.