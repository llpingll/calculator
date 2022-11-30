// Global Variables
let isOperator = false;
let fbBuffer = 0;
let sBuffer = 0;

// Get nodes
const buttons = document.querySelectorAll("button");
const feedback = document.querySelector(".feedback");
const sum = document.querySelector(".sum");

// Events
buttons.forEach(button => {
    button.addEventListener("click", function(e) {
        display(e);
    });
});

window.addEventListener('DOMContentLoaded', () => feedback.textContent = "0");


// Functions

function display(e) {
    if (e.target.className === "number") {
        handleNumbers(e);
    }
    else if (e.target.className === "operator") {
        handleOperators(e);
    }
    else if (e.target.className === "dot") {
        handleDot();
    }
    else if (e.target.className === "delete") {
        handleDel();
    }
    else if (e.target.className === "clear") {
        handleClear();
    }
    else if (e.target.className === "equal") {
        handleEqual();
    }
}

function handleNumbers(e) {
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

function handleOperators(e) {  
    sum.textContent = `${feedback.textContent} ${e.target.textContent}`;
    sBuffer = `${feedback.textContent} ${e.target.textContent}`;
    isOperator = true;    
}

function handleDot() {
    if (feedback.textContent.includes(".")) {
        return;
    }
    feedback.textContent += ".";
    fbBuffer += "."
}

function handleDel() {
    if (feedback.textContent.length > 1) {
        feedback.textContent = feedback.textContent.slice(0, feedback.length - 1);
        fbBuffer = feedback.textContent;
    }
    feedback.textContent = "0";
    fbBuffer = feedback.textContent;
}

function handleClear() {
    sum.textContent = "";
    feedback.textContent = "0";
    sBuffer = 0;
    fbBuffer = 0;
}

function handleEqual() {
    isOperator = false;
    if (!sBuffer.endsWith("=")) {
        feedback.textContent = operate(sBuffer.split(" ")[1], Number(sBuffer.split(" ")[0]), Number(fbBuffer));
        sum.textContent += ` ${fbBuffer} =`;
        fbBuffer = feedback.textContent;
        sBuffer += ` ${fbBuffer} =`;
    } 
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