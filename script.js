// Get nodes
const buttons = document.querySelectorAll("button");
const feedback = document.querySelector(".feedback");

window.addEventListener('DOMContentLoaded', (e) => feedback.textContent = "0");

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
        }
        else {
            feedback.textContent += `${e.target.textContent}`;
        }
    }
}