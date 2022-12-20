/**
 * get access to dom Elements
 */

const operationScreen = document.querySelector('input.operationScreen');
const ansScreen = document.querySelector('input.anScreen');
ansScreen.readOnly = true;

//buttons
//access to digits
const digital = document.querySelectorAll('button.digit');
// Digit buttons
const arithmeticOperators = document.querySelectorAll('button.arithmetic');

const allClear = document.querySelectorAll('button.calFunction');
const scientificops = document.querySelectorAll('button.scientificOps');


//Operations
//listen for click events for arithmetic operatores
digital.forEach(digit => {
    digit.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('button event', event);
        operationScreen.value += event.target.innerText;
    })
})

//listen for click events for arithmetic operatores
arithmeticOperators.forEach(operator => {
    operator.addEventListener('click', (event) => {
        event.preventDefault();
        //Operation for the equals sign
        //eval is a dangerous something, it takes some text and execute it as code
        const clickedOperator = event.target.innerText
        let result;
        if (clickedOperator == '=') {
            // const {operation,value} = operationParser(operationScreen.value);
            result = eval(operationScreen.value);
            ansScreen.value = result
        } else {
            operationScreen.value += event.target.innerText;    
        }


    });
});


//Listen to click event for all clear

allClear.forEach(func => {
    func.addEventListener('click', (event) => {
        event.preventDefault;

        const clickedFunction = event.target.innerText
        if (clickedFunction == 'CLR') {
            operationScreen.value = '';
            ansScreen.value = '';
        }

        //delete value
        if (clickedFunction == 'DEL') {
            let currVal = operationScreen.value;
            operationScreen.value = currVal.substr(0, currVal.length - 1);
        }
    });
});

//listen fo scientific operations
scientificops.forEach(operator => {
    operator.addEventListener('click', (event) => {
        event.preventDefault();
        const clickedScientificOperator = event.target.innerText;
        operationScreen.value += clickedScientificOperator;

        if (clickedScientificOperator == 'tan') {

        }
    })
})
function operationParser(operation = '') {
    const scientificOps = ['rand', 'sin', 'cos', 'tan', 'sqrt', 'log', 'hyp', 'x^y'];
    let operationToPerf;
    let val; 

    scientificOps.forEach(operator => {
        if(operation.startsWith(operator)){            
            const expression = operation.split(operation);
            const operationToPerf = expression[0];
            val = expression[1]
    }
    });
    return
}
