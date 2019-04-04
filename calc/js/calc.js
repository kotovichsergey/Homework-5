let	decimalBtn = document.getElementById('decimal'),
    clearBtn = document.getElementById('clear'),
    display = document.getElementById('display'),
    result = document.getElementById('result'),
    memoryCurrentNumber = 0,
    memoryNewNumber = false,
    memoryPendingOperation = '',
	memoryLocal = {};
	
if (localStorage.getItem('memoryLocal')){	
	memoryLocal = JSON.parse(localStorage.getItem('memoryLocal'));		
} else {
	memoryLocal = {key: 'lastResult', value: 0};
}
if (isNumber(memoryLocal.value)) {
	result.innerHTML = memoryLocal.value;
} else {
	result.innerHTML = '0';
}

clickBtn('number', numberPress);
clickBtn('operation', operationPress);
decimalBtn.addEventListener('click', decimal);
clearBtn.addEventListener('click', clear);

function clickBtn(choice, func){
	let press = document.getElementsByClassName(choice);
	for (let i = 0; i < press.length; i++) {
		press[i].addEventListener("click", function (e) {
			func(e.target.textContent);
		});
	}	
}
function numberPress(number) {
    if (memoryNewNumber) {
        display.value = number;
        memoryNewNumber = false;
    } else {
        if (display.value === '0') {
            display.value = number;
        } else {
            display.value += number;
        }
    }
}
function operationPress(op) {
    let localOperationMemory = display.value;
    if (memoryNewNumber && memoryPendingOperation !== '=') {
        display.value = memoryCurrentNumber;
    } else {
        memoryNewNumber = true;
		switch (memoryPendingOperation) {
			case '+':
				memoryCurrentNumber += parseFloat(localOperationMemory);
				memoryLocal.value = memoryCurrentNumber;
				localStorage.setItem('memoryLocal', JSON.stringify(memoryLocal));
				break;
			case '-':
				memoryCurrentNumber -= parseFloat(localOperationMemory);
				memoryLocal.value = memoryCurrentNumber;
				localStorage.setItem('memoryLocal', JSON.stringify(memoryLocal));
				break;
			case '*':
				memoryCurrentNumber *= parseFloat(localOperationMemory);
				memoryLocal.value = memoryCurrentNumber;
				localStorage.setItem('memoryLocal', JSON.stringify(memoryLocal));
				break;
			case '/':
				memoryCurrentNumber /= parseFloat(localOperationMemory);
				memoryLocal.value = memoryCurrentNumber;
				localStorage.setItem('memoryLocal', JSON.stringify(memoryLocal));
				break;
			default:
				memoryCurrentNumber = parseFloat(localOperationMemory);
		}	
        display.value = memoryCurrentNumber;
        memoryPendingOperation = op;
    }
}
function clear() {
        display.value = '0';
        memoryNewNumber = true;
        memoryCurrentNumber = 0;
        memoryPendingOperation = '';
}
function decimal() {
    let localDecimalMemory = display.value;
    if (memoryNewNumber) {
        localDecimalMemory = '0.';
        memoryNewNumber = false;
    } else {
        if (localDecimalMemory.indexOf('.') === -1) {
            localDecimalMemory += '.';
        }
    }
    display.value = localDecimalMemory;
}
function isNumber(tmp) {
	return tmp != null && !isNaN(Number(tmp));
}