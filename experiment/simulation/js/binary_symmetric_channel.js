const codewords = [
    {codeword: [0, 0, 0, 0],
    },{codeword: [0, 0, 0, 1],
    },{codeword: [0, 0, 1, 0],
    },{codeword: [0, 0, 1, 1],
    },{codeword: [0, 1, 0, 0],
    },{codeword: [0, 1, 0, 1],
    },{codeword: [0, 1, 1, 0],
    },{codeword: [0, 1, 1, 1],
    },{codeword: [1, 0, 0, 0],
    },{codeword: [1, 0, 0, 1],
    },{codeword: [1, 0, 1, 0],
    },{codeword: [1, 0, 1, 1],
    },{codeword: [1, 1, 0, 0],
    },{codeword: [1, 1, 0, 1],
    },{codeword: [1, 1, 1, 0],
    },{codeword: [1, 1, 1, 1],}
];

const eps = "\u03B5";

const wrongans = [
    {wans: [0, eps , 0, eps],
    },{wans: [0, 0.64, 0, 1.23],
    },{wans: [0, 0, 1.24, 0],
    },{wans: [0, 0, 1, eps],
    },{wans: [0, 1, eps, 0],
    },{wans: [0, 1, 0.91, 1],
    },{wans: [eps, 1, 1, 0],
    },{wans: [0, 1, 1.98, 1],
    },{wans: [1, eps, 0, 0],
    },{wans: [1, 0, eps, 1],
    },{wans: [1, 0.09, 1, 0],
    },{wans: [1, 0, eps, 1],
    },{wans: [1, 1, 0.52, 0],
    },{wans: [1, eps, 0, 1],
    },{wans: [1, 1.73, 1, 0],
    },{wans: [1, 1, eps, 1],}
];

document.getElementById("sentCodeword").innerHTML = formatMatrix(selectRandomCodeword().codeword);


function selectRandomCodeword() {
    const randomIndex = Math.floor(Math.random() * codewords.length);
    return codewords[randomIndex];
}
function selectRandomWans() {
    const randomwIndex = Math.floor(Math.random() * wrongans.length);
    return wrongans[randomwIndex];
}

function formatMatrix(matrix) {
    return "[" + matrix + "]";
}

function reset(){
    console.log("function called")
    const bscp1 = document.getElementById("bscp1");
    const bscp2 = document.getElementById("bscp2");
    const f1 = document.getElementById("f1");
    const f2 = document.getElementById("f2");
    const bscobs1 = document.getElementById("bscobs1");
    const bscobs2 = document.getElementById("bscobs2");

    bscobs1.innerHTML = "";
    bscobs2.innerHTML = "";

    bscp1.style.display = "block";
    bscp2.style.display = "none";

    var arrsplice = [];
    var codebuttons = [];
    var wansbuttons = [];
}

var buttonIds = ["a1", "a2", "a3", "a4","a5", "a6", "a7", "a8"];

const arrsplice = buttonIds.slice();

// Shuffle the array using the Fisher-Yates algorithm
for (let i = arrsplice.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrsplice[i], arrsplice[j]] = [arrsplice[j], arrsplice[i]];
}

codebuttons = arrsplice.slice(0, 3);
wansbuttons = arrsplice.slice(3, 8);


window.onload = function() {
    wansbuttons.forEach(function(wansbutton) {
        // Get the button element
        var buttonw = document.getElementById(wansbutton);
        
        // Set the random number as the button's text
        buttonw.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: black;">' + formatMatrix(selectRandomWans().wans) + '</span>';
    });

    codebuttons.forEach(function(codebutton) {
        // Get the button element
        var button = document.getElementById(codebutton);
        
        // Set the random number as the button's text
        button.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: black;">' + formatMatrix(selectRandomCodeword().codeword) + '</span>';
    });
};

function nextpage() {
    console.log("function called")
    const bscp1 = document.getElementById("bscp1");
    const bscp2 = document.getElementById("bscp2");
    const f1 = document.getElementById("f1");
    const f2 = document.getElementById("f2");
    const bscobs1 = document.getElementById("bscobs1");
    const bscobs2 = document.getElementById("bscobs2");

    bscobs1.innerHTML = "";
    bscobs2.innerHTML = "";

    bscp1.style.display = "none";
    bscp2.style.display = "block";
}

function prevpage() {
    console.log("function called")
    const bscp1 = document.getElementById("bscp1");
    const bscp2 = document.getElementById("bscp2");
    const f1 = document.getElementById("f1");
    const f2 = document.getElementById("f2");
    const bscobs1 = document.getElementById("bscobs1");
    const bscobs2 = document.getElementById("bscobs2");

    bscobs1.innerHTML = "";
    bscobs2.innerHTML = "";

    bscp1.style.display = "block";
    bscp2.style.display = "none";
}

var array1 = [];

function change(id) {
    const element = document.getElementById(id);

    if (element.style.backgroundColor === "rgb(26, 255, 0)") {
        element.style.backgroundColor = "rgb(200, 200, 200)";
            const index = array1.indexOf(id);
            if (index !== -1) {
                array1.splice(index, 1);
            }
}   else {
        element.style.backgroundColor = "rgb(26, 255, 0)";
        array1.push(id);
    }
}

function check1() {
    const bscobs1 = document.getElementById("bscobs1");
    const selectedCodewords = document.querySelectorAll('#bscp1 .code-word button[style="background-color: rgb(26, 255, 0);"]');

    if (selectedCodewords.length == 0) {
        bscobs1.innerHTML = "No output codeword has been selected for experiment 1. Choose the codewords by clicking on them.";
        bscobs1.style.color = "black";
    }
    else {
        const selectedIds = Array.from(selectedCodewords).map(button => button.id);
        const correctIds = codebuttons.slice();
        const isCorrect = correctIds.every(id => selectedIds.includes(id)) && selectedIds.length === correctIds.length;


        if (isCorrect) {
            bscobs1.innerHTML = "<b>Correct! The selected output codewords are indeed the right possible outputs for the given codeword.</b>";
            bscobs1.style.color = "green";
        } else {
            bscobs1.innerHTML = "<b>Kindly check as to what the correct output codewords could be by going throught the Theory.</b>";
            bscobs1.style.color = "red";
        }
    }
}

function check2(){

}
