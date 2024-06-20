const inputcodewords = [
    {inputcodeword: [0, 1, 0, 0]},{inputcodeword: [0, 1, 0, 1]},{inputcodeword: [1, 0, 1, 0]}
];

const eps = "\u03B5";

const correctanswercodewrords0 = [
    {ccw0: [0, 1, 0, 0]},
    {ccw0: [eps, 1, 0, 0]},
    {ccw0: [0, eps, 0, 0]},
    {ccw0: [0, 1, eps, 0]},
    {ccw0: [eps, 1, 0, eps]},
    {ccw0: [0, 1, eps, eps]},
    {ccw0: [0, eps, 0, eps]},
    {ccw0: [eps, eps, 0, eps]},
    {ccw0: [eps, eps, eps, eps]},
];

const correctanswercodewrords1 = [
    {ccw1: [0, 1, 0, 1]},
    {ccw1: [eps, 1, 0, 1]},
    {ccw1: [0, eps, 0, 1]},
    {ccw1: [0, 1, eps, 1]},
    {ccw1: [eps, 1, 0, eps]},
    {ccw1: [0, 1, eps, eps]},
    {ccw1: [0, eps, 0, eps]},
    {ccw1: [eps, eps, 0, eps]},
    {ccw1: [eps, eps, eps, eps]},
];

const correctanswercodewrords2 = [
    {ccw2: [1, 0, 1, 0]},
    {ccw2: [eps, 0, 1, 0]},
    {ccw2: [1, eps, 1, 0]},
    {ccw2: [1, 0, eps, 0]},
    {ccw2: [eps, 0, 1, eps]},
    {ccw2: [1, 0, eps, eps]},
    {ccw2: [1, eps, 1, eps]},
    {ccw2: [eps, eps, 1, eps]},
    {ccw2: [eps, eps, eps, eps]},
];



const wrongcodeword = [
    {wcw: [1, eps , 0, 0],
    },{wcw: [1, 1, 1, 1],
    },{wcw: [0, 0, 1, 1],
    },{wcw: [0, 1, 1, eps],
    },{wcw: [1, 1, eps, 0],
    },{wcw: [1, 1, 0, eps],
    },{wcw: [eps, 1, 1, 0],
    },{wcw: [0, 0, 0, 0],
    },{wcw: [1, 0, 0, 0],
    },{wcw: [1.24, 0.82, 1.78, 2.12],
    },{wcw: [1.09, 0.09, 2.13, 0.46],
    },{wcw: [0.24, 0.79, 0.98, 1.45],
    },{wcw: [1.22, 1.35, 0.52, 0.97]}
];

var inpcodeword = Array.from(selectRandomInputCodeword().inputcodeword);
document.getElementById("sentCodword").innerHTML = inpcodeword;
document.getElementById("newCodword").innerHTML = inpcodeword;


function selectRandomInputCodeword() {
    const randomIndex = Math.floor(Math.random() * inputcodewords.length);
    return inputcodewords[randomIndex];
}
function selectRandomWrongCodeword() {
    const randomwIndex = Math.floor(Math.random() * wrongcodeword.length);
    return wrongcodeword[randomwIndex];
}
function selectRandomCorrectCodeword0() {
    const randomwIndex = Math.floor(Math.random() * correctanswercodewrords0.length);
    return correctanswercodewrords0[randomwIndex];
}
function selectRandomCorrectCodeword1() {
    const randomwIndex = Math.floor(Math.random() * correctanswercodewrords1.length);
    return correctanswercodewrords1[randomwIndex];
}
function selectRandomCorrectCodeword2() {
    const randomwIndex = Math.floor(Math.random() * correctanswercodewrords2.length);
    return correctanswercodewrords2[randomwIndex];
}


function formatMatrix(matrix) {
    return "[" + matrix + "]";
}

var buttonIdentity = ["b1", "b2", "b3", "b4","b5", "b6", "b7", "b8"];

function reset(){
    const becp1 = document.getElementById("becp1");
    const becp2 = document.getElementById("becp2");
    const becobs1 = document.getElementById("becobs1");
    const becobs2 = document.getElementById("becobs2");
    const becobs12 = document.getElementById("becobs12");

    becobs1.innerHTML = "";
    becobs12.innerHTML = "";
    becobs2.innerHTML = "";

    becp1.style.display = "block";
    becp2.style.display = "none";
    document.getElementById("nextpagebuttonb").style.display = "none";

    buttonIdentity.forEach(function(buttonId) {
        // Get the button element
        var buttons = document.getElementById(buttonId);
        
        // Set the random number as the button's text
        buttons.style.backgroundColor = "";
    });

    var arrslice = [];
    var correctbuttons = [];
    var wrongbuttons = [];
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray(correctanswercodewrords0);
shuffleArray(correctanswercodewrords1);
shuffleArray(correctanswercodewrords2);
shuffleArray(wrongcodeword);

const arrslice = buttonIdentity.slice();

// Shuffle the array using the Fisher-Yates algorithm
for (let i = arrslice.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrslice[i], arrslice[j]] = [arrslice[j], arrslice[i]];
}

correctbuttons = arrslice.slice(0, 3);
wrongbuttons = arrslice.slice(3, 8);

var correctcodewordsarray = [];
var wrongcodewordsarray = [];

window.onload = function() {
    var i = 0;
    var j = 0;

    wrongbuttons.forEach(function(wansbutton) {
        // Get the button element
        var buttonw = document.getElementById(wansbutton);
        randw = wrongcodeword[i].wcw;
        wrongcodewordsarray.push(randw)
        // Set the random number as the button's text
        buttonw.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: black;">' + formatMatrix(randw) + '</span>';
        i = i + 1;
    });

    correctbuttons.forEach(function(codebutton) {
        // Get the button element
        var button = document.getElementById(codebutton);

        if(JSON.stringify(inpcodeword) === JSON.stringify(inputcodewords[0].inputcodeword)){
            rand = correctanswercodewrords0[j].ccw0;
            correctcodewordsarray.push(rand)
            button.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: black;">' + formatMatrix(rand) + '</span>';
            j = j + 1;
        }

        if (JSON.stringify(inpcodeword) === JSON.stringify(inputcodewords[1].inputcodeword)){
            rand = correctanswercodewrords1[j].ccw1;
            correctcodewordsarray.push(rand)
            button.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: black;">' + formatMatrix(rand) + '</span>';
            j = j + 1;
        }

        if (JSON.stringify(inpcodeword) === JSON.stringify(inputcodewords[2].inputcodeword)){
            rand = correctanswercodewrords2[j].ccw2;
            correctcodewordsarray.push(rand)
            button.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: black;">' + formatMatrix(rand) + '</span>';
            j = j + 1;
        }
    });
};

function nextpage() {
    const becp1 = document.getElementById("becp1");
    const becp2 = document.getElementById("becp2");
    const becobs1 = document.getElementById("becobs1");
    const becobs2 = document.getElementById("becobs2");
    const becobs12 = document.getElementById("becobs12");

    becobs1.innerHTML = "";
    becobs12.innerHTML = "";
    becobs2.innerHTML = "";

    becp1.style.display = "none";
    becp2.style.display = "block";

    document.getElementById("codewordb1").innerHTML = formatMatrix(correctcodewordsarray[0].toString());
    document.getElementById("codewordb2").innerHTML = formatMatrix(correctcodewordsarray[1].toString());
    document.getElementById("codewordb3").innerHTML = formatMatrix(correctcodewordsarray[2].toString());
}

function prevpage() {
    const becp1 = document.getElementById("becp1");
    const becp2 = document.getElementById("becp2");
    const becobs1 = document.getElementById("becobs1");
    const becobs2 = document.getElementById("becobs2");
    const becobs12 = document.getElementById("becobs12");

    becobs1.innerHTML = "";
    becobs12.innerHTML = "";
    becobs2.innerHTML = "";

    becp1.style.display = "block";
    becp2.style.display = "none";
}

var array2 = [];

function change(id) {
    const element = document.getElementById(id);

    if (element.style.backgroundColor === "rgb(26, 255, 0)") {
        element.style.backgroundColor = "rgb(200, 200, 200)";
            const index = array2.indexOf(id);
            if (index !== -1) {
                array2.splice(index, 1);
            }
}   else {
        element.style.backgroundColor = "rgb(26, 255, 0)";
        array2.push(id);
    }
}

function checkb1() {
    const becobs1 = document.getElementById("becobs1");
    const becobs12 = document.getElementById("becobs12");
    const selectedCodewords = document.querySelectorAll('#becp1 .code-word button[style="background-color: rgb(26, 255, 0);"]');

    if (selectedCodewords.length == 0) {
        becobs1.innerHTML = "No output codeword has been selected. Kindly choose the codewords by clicking on them.";
        becobs1.style.color = "black";
    }
    else {
        const selectedIds = Array.from(selectedCodewords).map(button => button.id);
        const correctIds = correctbuttons.slice();
        const isCorrect = correctIds.every(id => selectedIds.includes(id)) && selectedIds.length === correctIds.length;


        if (isCorrect) {
            becobs1.innerHTML = '{' + "[" + correctcodewordsarray[0] + "];" + "[" +  correctcodewordsarray[1] + "];" + "[" +  correctcodewordsarray[2] + ']}';
            becobs12.innerHTML = "<b>Correct! The above selected output vectors are indeed the right possible outputs for the given codeword.</b>";
            becobs1.style.color = "green";
            document.getElementById("nextpagebuttonb").style.display = "initial";
        } else {
            becobs1.innerHTML = "<b>Kindly check as to what the correct output vectors could be by going through the theory.</b>";
            becobs1.style.color = "red";
            becobs12.innerHTML = "";
        }
    }
}

function compareArray(arr1, arr2) {
    var p = 0;
    var p1 = 0;

    for(let i=0; i<arr1.length; i++) {
        if(arr1[i] != arr2[i]) {
            p++;
        }
        else {
            p1++;
        }
    }
    return [p,p1];      
}




function checkb2(){

    let [a11,a12] = compareArray(correctcodewordsarray[0], inpcodeword);
    let [a21,a22] = compareArray(correctcodewordsarray[1], inpcodeword);
    let [a31,a32] = compareArray(correctcodewordsarray[2], inpcodeword);

    
    var q11 = parseInt(document.getElementById("q11").value);
    var q12 = parseInt(document.getElementById("q12").value);
    var q21 = parseInt(document.getElementById("q21").value);
    var q22 = parseInt(document.getElementById("q22").value);
    var q31 = parseInt(document.getElementById("q31").value);
    var q32 = parseInt(document.getElementById("q32").value);


    if (isNaN(q11) || isNaN(q12) || isNaN(q21) || isNaN(q22) || isNaN(q31) || isNaN(q32) ||
        q11 < 0 || q11 > 9 || q12 < 0 || q12 > 9 || q21 < 0 || q21 > 9 ||
        q22 < 0 || q22 > 9 || q31 < 0 || q31 > 9 || q32 < 0 || q32 > 9) {
        document.getElementById("becobs2").innerHTML = "Please enter valid positive integers below 9 into the boxes.";
        document.getElementById("becobs2").style.color = "black";
        return;
    }

    switch (true) {
            
        case (a11 === q11 && a12 === q12 && a21 === q21 && a22 === q22 && a31 === q31 && a32 === q32):
            document.getElementById("becobs2").innerHTML = "Correct Answer!";
            document.getElementById("becobs2").style.color = "green";
            break;

        case (a11 !== q11 || a12 !== q12):
            document.getElementById("becobs2").innerHTML = "Kindly check the number of erasures/non-erasures in the output vector for part (a) again.";
            document.getElementById("becobs2").style.color = "blue";
            break;

        case (a21 !== q21 || a22 !== q22):
            document.getElementById("becobs2").innerHTML = "Kindly check the number of erasures/non-erasures in the output vector for part (b) again.";
            document.getElementById("becobs2").style.color = "blue";
            break;
    
        case (a31 !== q31 || a32 !== q32):
            document.getElementById("becobs2").innerHTML = "Kindly check the number of erasures/non-erasures in the output vector for part (c) again.";
            document.getElementById("becobs2").style.color = "blue";
            break;
    
        default:
            document.getElementById("becobs2").innerHTML = "Incorrect Answer! <br> Please go through the Instructions, and try again.";
            document.getElementById("becobs2").style.color = "red";
            break;
    }

}