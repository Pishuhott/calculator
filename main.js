document.addEventListener("DOMContentLoaded", function () {
    let = nubmersBtn = document.querySelectorAll('.number'),
        operationsBtn = document.querySelectorAll('.operator'),
        cleraBtns = document.querySelectorAll('.btn-clear'),
        decimalBtn = document.getElementById('decimal'),
        display = document.getElementById('display'),
        MemoryCurrentNumber = 0,
        MemoryNewNumber = false,
        MemoryPandingOperation = '';


    let numberPress = (number) => {
        if (MemoryNewNumber) {
            display.value = number;
            MemoryNewNumber = false;
        } else {
            if (display.value === '0') {
                display.value = number;
            } else {
                display.value += number;
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
        let localOperationMemory = display.value;

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
