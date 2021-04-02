const calculatorScreen = document.querySelector(".result")

let prevInput='0'
let calculationOperator= ''
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
        const num = event.target.innerText
		inputNumber(num)
		updateScreen(num)
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
    let result = calculate()
    prevInput = '0'
    calculationOperator = ''
    currentInput = result.toString()
    updateScreen(result, true)
})

const clearBtn = document.querySelector("button[data-clearall]")

clearBtn.addEventListener("click", () =>
{
    prevInput = '0'
    calculationOperator = ''
    currentInput = '0'
    updateScreen(currentInput, true)
})

const deleteLastSymbolBtn = document.querySelector("button[data-deletelastsymbol]")

deleteLastSymbolBtn.addEventListener("click", () =>
{
    if (calculationOperator === '')
    {
        currentInput = currentInput.substring(0, currentInput.length - 1)
        updateScreen(currentInput, true)
    }
    else
    {
        calculationOperator = ''
        currentInput = prevInput
        prevInput = '0'
        updateScreen(currentInput, true)
    }
})

const updateScreen = (symbol, overwrite) =>
{
    if (!overwrite)
    {
        calculatorScreen.value = calculatorScreen.value + symbol
    }
    else
    {
        calculatorScreen.value = symbol
    }
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
    return result
}