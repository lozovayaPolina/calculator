const calculatorScreen = document.querySelector(".result")

let prevInput='0'
let calOperator= ''
let currentInput='0'

const numbers=document.querySelectorAll("button[data-number]")

const inputNumber = (number) => {
	if (currentInput === '0')
    {
		currentInput = number
	}
    else
    {
		currentInput = currentInput + number
	}
}

numbers.forEach((number) => 
{
	number.addEventListener("click", (event) =>
    {
		inputNumber(event.target.innerText)
		updateScreen(currentInput)
	})
})

const operators = document.querySelectorAll("button[data-operation]")
const inputOperator = (operator) =>
{
    prevInput = currentInput
    calculationOperator = operator
    updateScreen(operator)
    currentInput = '0'
}

operators.forEach((operator) =>
{
    operator.addEventListener("click", (event) =>
    {
        inputOperator(event.target.innerText)
    })
})

const equalSign = document.querySelector("button[data-equal]")

equalSign.addEventListener("click", () =>
{
    calculate();
    updateScreen(currentInput)
})

const clearBtn = document.querySelector("button[data-clearall]")

clearBtn.addEventListener("click", () =>
{
    clearAll()
    updateScreen(currentInput)
})

const clearAll = () =>
{
    prevInput = '0'
    calculationOperator = ''
    currentInput = '0'
}

const updateScreen = (number) =>
{
	calculatorScreen.value = number
}

const calculate = () =>
{
    let result = 0
    switch(calculationOperator) {
        case '+':
            result = parseInt(prevInput) + parseInt(currentInput)
            break
        case '-':
            result = parseInt(prevInput) - parseInt(currentInput)
            break
        case '*':
            result = parseInt(prevInput) * parseInt(currentInput)
            break
        case '/':
            result = parseInt(prevInput) / parseInt(currentInput)
            break
	    case '%':
            result = (parseInt(prevInput)/100)*parseInt(currentInput)
            break
        default:
            return
    }
    currentInput = result.toString()
    calculationOperator = ''
}