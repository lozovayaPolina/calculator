const calculatorScreen = document.querySelector(".result")

let firstNumber = '0'
let secondNumber = '0'
let calculationOperator = ''

const numbers = document.querySelectorAll("button[data-number]")

const inputNumber = (symbol) => {
	if (calculationOperator === '')
    {
        if (symbol === '.')
            firstNumber = firstNumber + symbol
        else if (firstNumber === '0')
            firstNumber = symbol
        else if (firstNumber === '-0')
            firstNumber = '-' + symbol
        else
            firstNumber = firstNumber + symbol
    }
    else
    {
        if (symbol === '.')
            secondNumber = secondNumber + symbol
        else if (secondNumber === '0')
            secondNumber = symbol
        else
            secondNumber = secondNumber + symbol
    }
}

numbers.forEach((number) => 
{
	number.addEventListener("click", (event) =>
    {
        const num = event.target.innerText
		inputNumber(num)
		updateScreen()
	})
})

const operators = document.querySelectorAll("button[data-operation]")

operators.forEach((operator) =>
{
    operator.addEventListener("click", (event) =>
    {
        let newOperation = event.target.innerText
        if (newOperation === '-' &&
            calculationOperator === '' &&
            firstNumber === '0')
        {
            firstNumber = newOperation + firstNumber
            updateScreen()
            return
        }
        
        calculationOperator = newOperation
        updateScreen()
    })
})

const equalSign = document.querySelector("button[data-equal]")

equalSign.addEventListener("click", () =>
{
    if (calculationOperator === '')
        return

    let result = calculate()
    firstNumber = result.toString()
    secondNumber = '0'
    calculationOperator = ''
    updateScreen()
})

const clearBtn = document.querySelector("button[data-clearall]")

clearBtn.addEventListener("click", () =>
{
    firstNumber = '0'
    secondNumber = '0'
    calculationOperator = ''
    updateScreen()
})

const deleteLastSymbolBtn = document.querySelector("button[data-deletelastsymbol]")

deleteLastSymbolBtn.addEventListener("click", () =>
{
    if (calculationOperator === '')
    {
        if (firstNumber.length == 1)
            firstNumber = '0'
        else
            firstNumber = firstNumber.substring(0, firstNumber.length - 1)
    }
    else
    {
        if (secondNumber != '0')
        {
            if (secondNumber.length == 1)
                secondNumber = '0'
            else
                secondNumber = secondNumber.substring(0, secondNumber.length - 1)
        }
        else
            calculationOperator = ''
    }
    updateScreen()
})

const updateScreen = (symbol) =>
{
    let result = firstNumber
    if (calculationOperator != '')
        result = result + calculationOperator
    if (secondNumber != '0')
        result = result + secondNumber
    calculatorScreen.value = result
}

const calculate = () =>
{
    let result = 0
    let first = parseFloat(firstNumber)
    let second = parseFloat(secondNumber)
    switch(calculationOperator) {
        case '+':
            result = first + second
            break
        case '-':
            result = first - second
            break
        case '*':
            result = first * second
            break
        case '/':
            result = first / second
            break
	    case '%':
            result = (first / 100) * second
            break
        default:
            return
    }
    return result
}

updateScreen()