// Get access to Dom Elements

// Screens
const operationsScreen = document.querySelector('input.operations-screen');
const answerScreen = document.querySelector('input.answer-screen');
answerScreen.readOnly = true;

// Digit Buttons
const calcDigits = document.querySelectorAll('button.digit');

// Arithmetic Operator Buttons
const arithmeticOperators = document.querySelectorAll('button.arithmeticOp');

// Calculator function buttons
const allCalcFunctions = document.querySelectorAll('button.calc-function');

// Calculator scientific operators
const scientificOperators = document.querySelectorAll('button.scientificOp');


//creating a default value in our input box
operationsScreen.placeholder = 0;

//addition and substraction group
calcAddMinusOps = ['-', '+'];

//multiplication and division group
calcMultDivOps = ['*', '/'];

// Listen for click events on digits
calcDigits.forEach(digit => {
    digit.addEventListener('click', (event) => {
        event.preventDefault();
        // console.log('Button event', event);
        operationsScreen.value += event.target.innerText;
    })
});

// listen for click events on arithmetic operators
arithmeticOperators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        event.preventDefault();

        const clickedOperator = event.target.innerText;
        let result;

        if (clickedOperator == '=') {
            const { operation, value } = operationParser(operationsScreen.value);
            if (operation && value) {
                // This is a scientific operation
                answerScreen.value = science(operation, value, is_degree);
            } else {
                result = eval(operationsScreen.value);
                answerScreen.value = result;
                
            }
        } else {
            // input 0 + the clicked operator if nothing is on screen
            if(operationsScreen.value.length == 0){
                operationsScreen.value = `0${clickedOperator}`;
                return;
            }

            // if the last value input is an arithmetic op
            if(arithmeticOps.includes(operationsScreen.value[operationsScreen.value.length-1])){

                // the clicked operator cannot be the last operator that was recorded on screen
                if(operationsScreen.value[operationsScreen.value.length-1] !== clickedOperator){
                    // the minus operator should be the only operator that is added after another operator
                    if(calcMultDivOps.includes(operationsScreen.value[operationsScreen.value.length-1]) == true && clickedOperator == '-' ){
                        operationsScreen.value += clickedOperator;
                    }
                    // cannot input an operator if the second to last operator and the clicked operator are same
                    if(calcMultDivOps.includes(operationsScreen.value[operationsScreen.value.length-2]) == false && calcMultDivOps.includes(clickedOperator) == false){
                        let currVal = operationsScreen.value;
                        operationsScreen.value = currVal.substr(0, currVal.length - 1);
                        operationsScreen.value += clickedOperator;

                    }
                    if(calcMultDivOps.includes(operationsScreen.value[operationsScreen.value.length-2]) == false && calcMultDivOps.includes(clickedOperator) == true) {
                        // add * or / if the last value is a -
                        let currVal = operationsScreen.value;
                        operationsScreen.value = currVal.substr(0, currVal.length - 1);
                        operationsScreen.value += clickedOperator;
                    }
                   
                }
            }
            else {
                operationsScreen.value += clickedOperator;
            }
        }
        

    })
});

// listen for click events on the calc functions
allCalcFunctions.forEach(func => {
    func.addEventListener('click', (event) => {
        event.preventDefault();
        const clickedFunction = event.target.innerText;

        // Clear Screen
        if (clickedFunction == 'CLR') {
            operationsScreen.value = '';
            answerScreen.value = '';
        }

        // Clear last value
        if (clickedFunction == 'DEL') {
            let currVal = operationsScreen.value;
            operationsScreen.value = currVal.substr(0, currVal.length - 1);
        }

        // Change calculator do radians
        if (clickedFunction == 'RAD') {
            is_degree=false;
        }
        if (clickedFunction == 'DEG') {
            is_degree=true;
        }
        if(clickedFunction == 'Ans'){
            result = localStorage.getItem('label');
            answerScreen.value = result;
            operationsScreen.value = result;
        }
        if(clickedFunction == 'M+'){
            localStorage.setItem('label', getUserName.value);
        }

        if(clickedFunction == 'M-'){
            localStorage.removeItem('label')
        }
    })
});

// Listen for scientific operations
scientificOperators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        event.preventDefault();
        const clickedScientificOperator = event.target.innerText;
        operationsScreen.value += clickedScientificOperator + '(';

        if (clickedScientificOperator == 'tan') {

        }
    });
})

function operationParser(operation = '') {
    const scientificOps = ['rand', 'sin', 'tan', 'cos', 'log', 'x^y', 'hyp', 'sqrt'];
    let opertionToPerf;
    let val;

    scientificOps.forEach(operator => {
        if (operation.startsWith(operator)) {
            const expression = operation.split('(');
            console.log('exp', expression);
            opertionToPerf = expression[0];
            val = expression[1];
        }
    });
    return { operation: opertionToPerf, value: val };
}

function science(operation='', val = 0, is_degree = true) {
    let value_to_return=0;
    console.log(Math.cos(+radians_to_degrees(val)) );
    switch(is_degree==true){
        case true:
            
            operation =='tan' ? value_to_return = Math.tan(+radians_to_degrees(val))
            :operation == 'sine' ? value_to_return = Math.sin(+radians_to_degrees(val))
            :operation == 'cos' ? value_to_return = Math.cos(+radians_to_degrees(val))
            :{};
            break;

        case false:
            operation =='tan' ? value_to_return = Math.tan(+val)
            :operation == 'sine' ? value_to_return = Math.sin(+val)
            :operation == 'cos' ? value_to_return = Math.cos(+val)
            :{};
            console.log(value_to_return);
    }
    
    return value_to_return;

    if (operation == 'sine') {
        return Math.sin(eval(val));
    }

    if (operation == 'cos') {
        return Math.co(eval(val));
    }
}

//radians to degrees
function radians_to_degrees(number){
    return number*(Math.PI/180);
}
