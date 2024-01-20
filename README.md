# Calculator App Documentation

## Introduction

The Calculator App is a versatile calculator designed for basic arithmetic calculations with additional features such as percentage calculations and number formatting. It provides a user-friendly interface that supports both button clicks and keyboard input.

## Features

### 1. Basic Arithmetic Operations

- **Addition (+):** Perform addition calculations.
- **Subtraction (-):** Subtract numbers.
- **Multiplication (×):** Multiply numbers.
- **Division (÷):** Divide numbers.

### 2. Keyboard Support

- The calculator supports keyboard input for numeric digits (0-9), the decimal point (.), and basic operators (+, -, ×, ÷).
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

The Calculator App includes effective error handling to address exceptional scenarios and maintain a user-friendly experience. Here are the key aspects:

#### 7.1 Division by Zero

- **Scenario:** When attempting to divide by zero.
- **Handling:** Detects the division by zero condition.
- **Feedback:** Displays "Cannot divide by zero" on the primary display.
- **Resolution:** Clears all entries after a brief delay, restoring functionality.

#### 7.2 Value Limit Exceeded

- **Scenario:** Results or operands exceeding specified limits.
- **Handling:** Identifies values beyond the set limit.
- **Feedback:** Shows "Value Limit Exceeded" on the primary display.
- **Resolution:** Automatically clears entries after a brief delay.

#### 7.3 Result Length Limit

- **Scenario:** Excessively long calculated results.
- **Handling:** Recognizes results surpassing the allowable length.
- **Feedback:** Presents "Result too long" on the primary display.
- **Resolution:** Clears entries after a short delay.

#### 7.4 Invalid Percentage Calculation

- **Scenario:** Invalid percentage calculation attempts.
- **Handling:** Validates input for meaningful percentage calculations.
- **Feedback:** Displays "Invalid input for percentage calculation."
- **Resolution:** Clears entries after a brief delay.

### 8. Operator Modification

Users can modify the operator even after setting the `firstOperand`, `operator`, and `secondOperand`. This allows flexibility in adjusting the operation without resetting the entire calculation.

### 9. Keyboard Highlighting

When users input entries using their keyboard, the corresponding key on the calculator will be highlighted. Numeric and decimal point inputs will highlight the respective operand buttons, while operator inputs will highlight the corresponding operator buttons. Special keys such as Enter, %, Escape, Backspace, and n will also be highlighted on the calculator interface.

### 10. Dark Mode Toggle

The app includes a dark mode toggle switch to enhance user experience in different lighting conditions. Users can enable or disable dark mode by clicking the toggle switch or pressing "d" on the keyboard.

### 11. Responsive Design

- The calculator features a responsive layout for a consistent user experience across different devices and screen sizes.

## Usage

1. **Numeric Entry:**
   - Click on numeric buttons (0-9) or use the decimal point (.) for numeric input.

2. **Arithmetic Operations:**
   - Click on operator buttons (+, -, ×, ÷) or use the corresponding keyboard keys.

3. **Result Calculation:**
   - Click on the "=" button or press Enter to calculate results.

4. **Percentage Calculation:**
   - Click on the "%" button or press the "%" key to calculate percentages.

5. **Negation:**
   - Click on the "+/-" button or press "n" to negate a number.

6. **Dark Mode Toggle:**
   - Click on the dark mode toggle switch or press "d" to switch between dark and light modes.

7. **Clearing Entry:**
   - Click on the "C" button or press Backspace to clear the last entry.
   - Click on the "AC" button or press Escape to clear all entries.

## Technical Details

- **Decimal Places:** Results are displayed rounded to 2 decimal places.
- **Maximum Digits:** The calculator allows a maximum of 12 digits for entry.
- **Number Formatting:** The `addCommas` function is used to format numbers with commas.
- **Entry and Result Limit:** Entries and calculated results are restricted to 9,999,999,999.99 to prevent overflow and maintain precision.

## Developer Information

- **Calculator Configuration:**
  - `DECIMAL_PLACES`: Specifies the decimal places for result display.
  - `MAX_DIGITS`: Defines the maximum number of digits allowed for entry.
  - `MAX_VALUE`: Sets the maximum value for entries and results.

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
  - `highlightSpecialKey(id)`: Highlights special keys during keyboard input.
  - `updateDarkMode()`: Updates the dark mode state based on the toggle switch.
  - `toggleDarkMode()`: Updates the dark mode state based on the key press.

- **Event Listeners:**
  - Event listeners are set up for operand buttons, operator buttons, negation button, percentage button, equals button, all-clear button, clear-entry button, and keyboard inputs.

- **Dark Mode Toggle:**
  - Users can switch between dark and light modes using the dark mode toggle switch or by pressing "d" on the keyboard.

## Conclusion

The Calculator App offers a convenient and efficient tool for performing basic arithmetic calculations. Whether using on-screen buttons or keyboard shortcuts, the calculator ensures a seamless and user-friendly experience, with additional features such as dark mode for improved visibility.

## Limitations

1. **Single Operation:** The calculator currently supports only single operations at a time. Multiple operations in sequence are not supported.
2. **Percentage Calculation Limitation:** Percentage calculations are performed as a first operand. Invalid percentage input operations are not supported and will display an error message.
3. **Limited Decimal Precision:** Results are displayed with a fixed decimal precision (default is 2 decimal places). Long decimal values may be truncated.
4. **No Memory Functionality:** The calculator does not have memory functionality for storing and retrieving values.
