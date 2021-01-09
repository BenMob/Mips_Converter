"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.onload = function () {
    var input = document.querySelector("#input");
    var submit = document.querySelector("#submit");
    var error = document.querySelector("#error");
    var format = document.querySelector("#format");
    var instruction = document.querySelector("#instruction");
    var decimal = document.querySelector("#decimal");
    var binary = document.querySelector("#binary");
    if (submit) {
        submit.addEventListener("click", function () {
            if (input.value) {
                error.innerHTML = " ";
                instruction.innerHTML = "Instruction: " + input.value;
                format.innerHTML = "Format: R";
                decimal.innerHTML = "Decimal: 34";
                binary.innerHTML = "Binary: 0000 1232 00102 00023 0230";
            }
            else {
                console.log("Problem");
                error.innerHTML = " ";
                error.innerHTML = "Please, type something!";
            }
            //if(Instruction.correct(input?.nodeValue))
        });
    }
    else {
        console.error("There is no id called 'submit'");
    }
};
