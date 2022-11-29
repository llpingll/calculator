let isOperator = false;
let fbBuffer = 0;
let sBuffer = 0;

// Get nodes
const buttons = document.querySelectorAll("button");
const feedback = document.querySelector(".feedback");
const sum = document.querySelector(".sum");

window.addEventListener('DOMContentLoaded', () => feedback.textContent = "0");

// Events
buttons.forEach(button => {
    button.addEventListener("click", function(e) {
        controller(e);
        // console.log(e.target.class);
    });
});


// Functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    if (operator === "+") {
        return add(a, b);
    }
    else if (operator === "-") {
        return subtract(a, b);
    }
    else if (operator === "*") {
        return multiply(a, b);
    }
    else {
        return divide(a, b);
    }
}

function controller(e) {
    // console.log(e.target.className);
    if (e.target.className === "number") {
        if (feedback.textContent === "0") {
            feedback.textContent = e.target.textContent;
            fbBuffer = e.target.textContent;
        }
        else if (isOperator === true) {
            feedback.textContent = e.target.textContent;
            fbBuffer = e.target.textContent;
            isOperator = false;
        }
        else {
            feedback.textContent += `${e.target.textContent}`;
            fbBuffer += `${e.target.textContent}`;
        }
    }
    else if (e.target.className === "operator") {
        sum.textContent = `${feedback.textContent} ${e.target.textContent}`;
        sBuffer = `${feedback.textContent} ${e.target.textContent}`;
        isOperator = true;
    }
    else if (e.target.className === "equal") {
        isOperator = false;
        if (!sBuffer.endsWith("=")) {
            feedback.textContent = operate(sBuffer.split(" ")[1], Number(sBuffer.split(" ")[0]), Number(fbBuffer));
            fbBuffer = feedback.textContent;
            sum.textContent += ` ${fbBuffer} =`;
            sBuffer += ` ${fbBuffer} =`;
        }
        
    }
}