/*-------------------------------- Constants --------------------------------*/
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('.display');

/*-------------------------------- Variables --------------------------------*/
let currentInput = '';
let previousInput = '';
let operation = null;

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach((button) => {
    button.addEventListener('click', (event) => {
        buttonClick(event.target.innerText);
    });
});

/*-------------------------------- Functions --------------------------------*/
function buttonClick(value) {
    console.log(`Button clicked: ${value}`);
    
    if (!isNaN(value) || value === '.') {
        handleNumber(value);
    } else if (value === 'C') {
        clearDisplay();
    } else if (value === '=') {
        calculate();
    } else {
        handleOperator(value);
    }
    updateDisplay();
    console.log(`Current input: ${currentInput}, Previous input: ${previousInput}, Operation: ${operation}`);
}

function handleNumber(number) {
    if (currentInput.includes('.') && number === '.') return;
    currentInput += number;
    console.log(`Number added: ${number}, Current input: ${currentInput}`);
}

function handleOperator(operator) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operation = operator;
    previousInput = currentInput;
    currentInput = '';
    console.log(`Operator selected: ${operator}, Previous input: ${previousInput}`);
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operation === null) return;
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    currentInput = result.toString();
    operation = null;
    previousInput = '';
    console.log(`Calculation performed: ${prev} ${operation} ${current} = ${result}`);
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    console.log('Display cleared');
}

function updateDisplay() {
    display.innerText = currentInput || '0';
    console.log(`Display updated: ${currentInput}`);
}
