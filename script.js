const pastNumberScreen = document.getElementById('pastNumberScreen');
const currentNumberScreen = document.getElementById('currentNumberScreen');
const clearBtn = document.getElementById('clearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const dataNumber = document.querySelectorAll('[data-number]');
const dataOperator = document.querySelectorAll('[data-operator]');
const doteSign = document.getElementById('doteSign');
const equalSign = document.getElementById('equalSign');

let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetScreen = false;

window.addEventListener('keydown', handleKeyboardInput);
equalSign.addEventListener('click', evaluate);
clearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', deleteNumber);
doteSign.addEventListener('click', appendPoint);

dataNumber.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
);

dataOperator.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
);

function appendNumber(number) {
  if (currentNumberScreen.textContent === '0' || shouldResetScreen) {
    resetScreen();
  }
  currentNumberScreen.textContent += number;
}

function resetScreen() {
  currentNumberScreen.textContent = '';
  shouldResetScreen = false;
}

function clear() {
  currentNumberScreen.textContent = '0';
  pastNumberScreen.textContent = '';
  firstOperand = '';
  secondOperand = '';
  currentOperation = null;
}

function appendPoint() {
  if (shouldResetScreen) resetScreen();
  if (currentNumberScreen.textContent === '') currentNumberScreen.textContent = '0';
  if (currentNumberScreen.textContent.includes('.')) return;
  currentNumberScreen.textContent += '.';
}

function deleteNumber() {
  currentNumberScreen.textContent = currentNumberScreen.textContent
    .toString()
    .slice(0, -1);
}

function setOperation(operator) {
  if (currentOperation !== null) evaluate();
  firstOperand = currentNumberScreen.textContent;
  currentOperation = operator;
  pastNumberScreen.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === '÷' && currentNumberScreen.textContent === '0') {
    alert("You can't divide by 0!");
    return;
  }
  secondOperand = currentNumberScreen.textContent;
  currentNumberScreen.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  pastNumberScreen.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
  if (e.key === '.') appendPoint();
  if (e.key === '=' || e.key === 'Enter') evaluate();
  if (e.key === 'Backspace') deleteNumber();
  if (e.key === 'Escape') clear();
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') setOperation(convertOperator(e.key));
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷';
  if (keyboardOperator === '*') return '×';
  if (keyboardOperator === '-') return '−';
  if (keyboardOperator === '+') return '+';
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case '+':
      return add(a, b);
    case '−':
      return subtract(a, b);
    case '×':
      return multiply(a, b);
    case '÷':
      if (b === 0) return null;
      else return divide(a, b);
    default:
      return null;
  }
}