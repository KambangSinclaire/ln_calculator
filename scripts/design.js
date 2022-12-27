let mainCalculatorContainer = document.querySelector('main.calculator-container');

// Creating Calculator Screens
let screenContainer = constructElement('div', { class: 'screen-container' });
let opScreen = constructElement('input', { class: 'operations-screen' });
let ansScreen = constructElement('input', { class: 'answer-screen' });

// Append the two screens to the main screen container;
screenContainer = appendChildren(screenContainer, [opScreen, ansScreen]);
appendChildren(mainCalculatorContainer, [screenContainer]);

// Creating Calculator buttons
let buttonContainer = constructElement('div', { class: 'button-container' });

let numericContainer = constructElement('div', { class: 'numeric-container' });
let digitsContainer = constructElement('div', { class: 'digits-container' });

let is_degree=true;
const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const createdDigits = digits.map(digit => {
    let digitElement = constructElement('button', { class: digit });
    digitElement.textContent = digit;
    digitElement.classList.add('digit');
    return digitElement;
});
appendChildren(digitsContainer, createdDigits);


let functionContainer = constructElement('div', { class: 'function-container' });
const calcFunctions = ['ON', 'OFF', '2nd', 'M+', 'M-', 'Ans', 'CLR', 'DEL', 'RAD', 'DEG'];
const createdCalcFunctions = calcFunctions.map(item => {
    let calcFunctionElement = constructElement('button', { class: item });
    calcFunctionElement.textContent = item;
    calcFunctionElement.classList.add('calc-function');
    return calcFunctionElement;
});
appendChildren(functionContainer, createdCalcFunctions);


let operationsContainer = constructElement('div', { class: 'operations-container' });

let arithmeticContainer = constructElement('div', { class: 'arithmetic-container' });
const arithmeticOps = ['+', '-', '*', '%', '/', '='];
const createdArimeticOps = arithmeticOps.map(operator => {
    let operatorElement = constructElement('button', { class: operator });
    operatorElement.classList.add('arithmeticOp');
    operatorElement.textContent = operator;
    return operatorElement;
});
appendChildren(arithmeticContainer, createdArimeticOps);

let scientificContainer = constructElement('div', { class: 'scientific-container' });
const scientificOps = ['rand', 'sine', 'tan', 'cos', 'log', 'x^y', 'hyp', 'sqrt'];
const createdScientificOps = scientificOps.map(operator => {
    let operatorElement = constructElement('button', { class: operator });
    operatorElement.classList.add('scientificOp');
    operatorElement.textContent = operator;
    return operatorElement;
});
appendChildren(scientificContainer, createdScientificOps);

appendChildren(numericContainer, [functionContainer, digitsContainer]);
appendChildren(operationsContainer, [scientificContainer, arithmeticContainer]);
appendChildren(buttonContainer, [operationsContainer, numericContainer]);
appendChildren(mainCalculatorContainer, [buttonContainer]);


function constructElement(tag = '', attributes = {}) {
    tag = tag == '' ? 'div' : tag;
    // create element
    const createdElement = document.createElement(tag);
    // add attributes
    for (let [key, value] of Object.entries(attributes)) {
        if (key == 'class') {
            createdElement.classList.add(value);
        } else {
            createdElement.setAttribute(key, value);
        }
    }
    return createdElement;
}

function appendChildren(parent, children = []) {
    if (children.length == 1) {
        parent.appendChild(children[0]);
        return parent;
    }
    children.forEach(child => {
        parent.appendChild(child);
    })
    return parent;
}