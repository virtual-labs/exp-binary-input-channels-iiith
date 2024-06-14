const inputcodewords = [
    {inputcodeword: [0, 0, 0, 0],
    },{inputcodeword: [0, 0, 0, 1],
    },{inputcodeword: [0, 0, 1, 0],
    },{inputcodeword: [0, 0, 1, 1],
    },{inputcodeword: [0, 1, 0, 0],
    },{inputcodeword: [0, 1, 0, 1],
    },{inputcodeword: [0, 1, 1, 0],
    },{inputcodeword: [0, 1, 1, 1],
    },{inputcodeword: [1, 0, 0, 0],
    },{inputcodeword: [1, 0, 0, 1],
    },{inputcodeword: [1, 0, 1, 0],
    },{inputcodeword: [1, 0, 1, 1],
    },{inputcodeword: [1, 1, 0, 0],
    },{inputcodeword: [1, 1, 0, 1],
    },{inputcodeword: [1, 1, 1, 0],
    },{inputcodeword: [1, 1, 1, 1],}
];

const eps = "\u03B5";

const wrongcodeword = [
    {wcw: [0, eps , 0, eps],
    },{wcw: [0, 0.64, 0, 1.23],
    },{wcw: [0, 0, 1.24, 0],
    },{wcw: [0, 0, 1, eps],
    },{wcw: [0, 1, eps, 0],
    },{wcw: [0, 1, 0.91, 1],
    },{wcw: [eps, 1, 1, 0],
    },{wcw: [0, 1, 1.98, 1],
    },{wcw: [1, eps, 0, 0],
    },{wcw: [1, 0, eps, 1],
    },{wcw: [1, 0.09, 1, 0],
    },{wcw: [1, 0, eps, 1],
    },{wcw: [1, 1, 0.52, 0],
    },{wcw: [1, eps, 0, 1],
    },{wcw: [1, 1.73, 1, 0],
    },{wcw: [1, 1, eps, 1],}
];

document.getElementById("epsilon").innerHTML = eps;
document.getElementById("epsilon1").innerHTML = 1 - eps;

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

function formatMatrix(matrix) {
    return "[" + matrix + "]";
}

var buttonIdentity = ["a1", "a2", "a3", "a4","a5", "a6", "a7", "a8"];

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
    wrongbuttons.forEach(function(wansbutton) {
        // Get the button element
        var buttonw = document.getElementById(wansbutton);
        randw = Array.from(selectRandomWrongCodeword().wcw);
        wrongcodewordsarray.push(randw)
        // Set the random number as the button's text
        buttonw.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: black;">' + formatMatrix(randw) + '</span>';
    });

    correctbuttons.forEach(function(codebutton) {
        // Get the button element
        var button = document.getElementById(codebutton);
        rand = Array.from(selectRandomInputCodeword().inputcodeword);
        correctcodewordsarray.push(rand)
        // Set the random number as the button's text
        button.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: black;">' + formatMatrix(rand) + '</span>';
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

    document.getElementById("codeword1").innerHTML = formatMatrix(correctcodewordsarray[0].toString());
    document.getElementById("codeword2").innerHTML = formatMatrix(correctcodewordsarray[1].toString());
    document.getElementById("codeword3").innerHTML = formatMatrix(correctcodewordsarray[2].toString());
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
            becobs12.innerHTML = "<b>Correct! The above selected output codewords are indeed the right possible outputs for the given codeword.</b>";
            becobs1.style.color = "green";
        } else {
            becobs1.innerHTML = "<b>Kindly check as to what the correct output codewords could be by going through the theory.</b>";
            becobs1.style.color = "red";
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

    let [a11,a12] = compareArray(correctcodewordsarray[0], sentcodeword);
    let [a21,a22] = compareArray(correctcodewordsarray[1], sentcodeword);
    let [a31,a32] = compareArray(correctcodewordsarray[2], sentcodeword);

    
    var p11 = parseInt(document.getElementById("p11").value);
    var p12 = parseInt(document.getElementById("p12").value);
    var p21 = parseInt(document.getElementById("p21").value);
    var p22 = parseInt(document.getElementById("p22").value);
    var p31 = parseInt(document.getElementById("p31").value);
    var p32 = parseInt(document.getElementById("p32").value);


    if (isNaN(p11) || isNaN(p12) || isNaN(p21) || isNaN(p22) || isNaN(p31) || isNaN(p32) ||
        p11 < 0 || p11 > 9 || p12 < 0 || p12 > 9 || p21 < 0 || p21 > 9 ||
        p22 < 0 || p22 > 9 || p31 < 0 || p31 > 9 || p32 < 0 || p32 > 9) {
        document.getElementById("becobs2").innerHTML = "Please enter valid positive integers below 9 into the boxes.";
        document.getElementById("becobs2").style.color = "black";
        return;
    }

    switch (true) {
            
        case (a11 === p11 && a12 === p12 && a21 === p21 && a22 === p22 && a31 === p31 && a32 === p32):
            document.getElementById("becobs2").innerHTML = "Correct Answer!";
            document.getElementById("becobs2").style.color = "green";
            break;

        case (a11 !== p11 || a12 !== p12):
            document.getElementById("becobs2").innerHTML = "Kindly check the hamming distance between the input and the output codewords for part (a) again";
            document.getElementById("becobs2").style.color = "blue";
            break;

        case (a21 !== p21 || a22 !== p22):
            document.getElementById("becobs2").innerHTML = "Kindly check the hamming distance between the input and the output codewords for part (b) again";
            document.getElementById("becobs2").style.color = "blue";
            break;
    
        case (a31 !== p31 || a32 !== p32):
            document.getElementById("becobs2").innerHTML = "Kindly check the hamming distance between the input and the output codewords for part (c) again";
            document.getElementById("becobs2").style.color = "blue";
            break;
    
        default:
            document.getElementById("becobs2").innerHTML = "Incorrect Answer! <br> Please go through the Instructions, and try again.";
            document.getElementById("becobs2").style.color = "red";
            break;
    }

}