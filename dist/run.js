"use strict";
const inputA = document.getElementById("A");
const inputB = document.getElementById("B");
const button = document.getElementById("calculate");
if (!button || !inputA || !inputB)
    throw new Error();
button.onclick = () => {
    try {
        const A = JSON.parse(`[${inputA.value}]`);
        const B = JSON.parse(`[${inputB.value}]`);
        plot(new F(A), new F(B));
    }
    catch (error) {
        alert(error);
    }
};
