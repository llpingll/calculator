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
        calculate(e);
    });
});

window.addEventListener('DOMContentLoaded', () => feedback.textContent = "0");

// Functions
function calculate(e) {
    if (e.target.className === "number") handleNumbers(e);
    else if (e.target.className === "operator") handleOperators(e);
    else if (e.target.className === "dot") handleDot();
    else if (e.target.className === "delete") handleDel();
    else if (e.target.className === "clear") handleClear();
    else if (e.target.className === "equal") handleEqual();
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
    isOperator = true;
    if (sum.textContent.endsWith("=")) {
        sum.textContent = `${feedback.textContent} ${e.target.textContent}`;
        sBuffer = `${feedback.textContent} ${e.target.textContent}`;
    }
    else if (["+", "-", "*", "÷"].some(char => sum.textContent.includes(char))) {
        if ((Number(fbBuffer) === 0) && (sBuffer.split(" ")[1] === "÷")) {
            alert("You can't divide by 0 sweetheart 😘");
            handleClear();
        }
        else {
            sum.textContent = operate(sBuffer.split(" ")[1], Number(sBuffer.split(" ")[0]), Number(fbBuffer));
            sum.textContent += ` ${e.target.textContent}`;
            fbBuffer = feedback.textContent;
            sBuffer = `${sum.textContent} ${e.target.textContent}`;
            feedback.textContent = "0";
        }
    }
    else {
        sum.textContent = `${feedback.textContent} ${e.target.textContent}`;
        sBuffer = `${feedback.textContent} ${e.target.textContent}`;
    }
}

function handleDot() {
    if (feedback.textContent.includes(".")) return;
    feedback.textContent += ".";
    fbBuffer += "."
}

function handleDel() {
    if (feedback.textContent.length > 1) {
        feedback.textContent = feedback.textContent.slice(0, feedback.textContent.length - 1);
        fbBuffer = feedback.textContent;
    }
    else {
        feedback.textContent = "0";
        fbBuffer = feedback.textContent;
    }
}

function handleClear() {
    sum.textContent = "";
    feedback.textContent = "0";
    sBuffer = 0;
    fbBuffer = 0;
}

function handleEqual() {
    if (sum.textContent === "") {
        return;
    }
    else if ((Number(fbBuffer) === 0) && (sBuffer.split(" ")[1] === "÷")) {
        alert("You can't divide by 0 sweetheart 😘");
        handleClear();
    }
    else if (!sBuffer.endsWith("=")) {
        feedback.textContent = operate(sBuffer.split(" ")[1], Number(sBuffer.split(" ")[0]), Number(fbBuffer));
        sum.textContent += ` ${fbBuffer} =`;
        fbBuffer = feedback.textContent;
        sBuffer += ` ${fbBuffer} =`;
    }
}

function operate(operator, a, b) {
    if (operator === "+") return a + b;
    else if (operator === "-") return a - b;
    else if (operator === "÷") return a / b;
    else return a * b;
}