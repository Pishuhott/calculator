document.addEventListener("DOMContentLoaded", function () {
    let = nubmersBtn = document.querySelectorAll('.number'),
        operationsBtn = document.querySelectorAll('.operator'),
        cleraBtns = document.querySelectorAll('.btn-clear'),
        decimalBtn = document.getElementById('decimal'),
        display = document.getElementById('display'),
        errorText = document.getElementById('error-text'),
        MemoryCurrentNumber = 0,
        MemoryNewNumber = false,
        MemoryPandingOperation = '';


    let matchMaxLength = (value) => {
        if (display.value.length <= display.getAttribute('maxlength')) {
            return true;
        }
        return false;
    };

    let clearCalculationError = () => errorText.innerHTML = '';

    let setCalculationError = (text) => errorText.innerHTML = text;

    let getDistlayValue = () => {
        return display.value;
    };


    let manageDisplay = (value, operation) => {
        clearCalculationError();

        if (matchMaxLength(value)) {
            display.value = value;
        } else {
            if (operation == 'result') {
                setCalculationError('MaxLength error.');
            };
        };
    };


    let numberPress = (number) => {
        clearCalculationError();
        
        let currentsDisplayValue = getDistlayValue();

        if (MemoryNewNumber) {
            manageDisplay(number, 'input');
            MemoryNewNumber = false;
        } else {
            if (currentsDisplayValue === '0') {
                manageDisplay(number, 'input');
            } else {
                manageDisplay(currentsDisplayValue + number, 'input');
            };
        };
    };


    let clear = (id) => {
        if (id === 'ce') {
            display.value = '0';
            MemoryNewNumber = true;
        } else if (id === 'c') {
            display.value = '0';
            MemoryNewNumber = true;
            MemoryCurrentNumber = 0;
            MemoryPandingOperation = '';
        };
    };


    let operation = (opere) => {
        let localOperationMemory = getDistlayValue();

        if (MemoryNewNumber && MemoryPandingOperation !== '=') {
            display.value = MemoryCurrentNumber;
        } else {
            MemoryNewNumber = true;
            if (MemoryPandingOperation === '+') {
                MemoryCurrentNumber += parseFloat(localOperationMemory);
            } else if (MemoryPandingOperation === '-') {
                MemoryCurrentNumber -= parseFloat(localOperationMemory);
            } else if (MemoryPandingOperation === '*') {
                MemoryCurrentNumber *= parseFloat(localOperationMemory);
            } else if (MemoryPandingOperation === '/') {
                MemoryCurrentNumber /= parseFloat(localOperationMemory);
            } else {
                MemoryCurrentNumber = parseFloat(localOperationMemory);
            };

            display.value = MemoryCurrentNumber;
            MemoryPandingOperation = opere;
        };
    };


    let decimal = () => {
        let localDecimalMemory = display.value;

        if (MemoryNewNumber) {
            localDecimalMemory = '0.';
            MemoryNewNumber = false;
        } else {
            if (localDecimalMemory.indexOf('.') === -1) {
                localDecimalMemory += '.';
            };
        };

        display.value = localDecimalMemory;
    };


    for (let i = 0; i < nubmersBtn.length; i++) {
        let number = nubmersBtn[i];
        number.addEventListener('click', (e) => numberPress(e.target.textContent));
    };

    for (let i = 0; i < cleraBtns.length; i++) {
        let cleraBtn = cleraBtns[i];
        cleraBtn.addEventListener('click', (e) => clear(e.srcElement.id));
    };

    for (let i = 0; i < operationsBtn.length; i++) {
        let operationBtn = operationsBtn[i];
        operationBtn.addEventListener('click', (e) => operation(e.target.textContent));
    };

    decimalBtn.addEventListener('click', decimal);

});
