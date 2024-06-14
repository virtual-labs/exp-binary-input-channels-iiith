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

var sentcodeword = Array.from(selectRandomCodeword().codeword);
document.getElementById("sentCodeword").innerHTML = sentcodeword;
document.getElementById("newCodeword").innerHTML = sentcodeword;


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

var buttonIds = ["a1", "a2", "a3", "a4","a5", "a6", "a7", "a8"];

function reset(){
    const bscp1 = document.getElementById("bscp1");
    const bscp2 = document.getElementById("bscp2");
    const bscobs1 = document.getElementById("bscobs1");
    const bscobs2 = document.getElementById("bscobs2");
    const bscobs12 = document.getElementById("bscobs12");

    bscobs1.innerHTML = "";
    bscobs12.innerHTML = "";
    bscobs2.innerHTML = "";

    bscp1.style.display = "block";
    bscp2.style.display = "none";

    buttonIds.forEach(function(buttonId) {
        // Get the button element
        var buttons = document.getElementById(buttonId);
        
        // Set the random number as the button's text
        buttons.style.backgroundColor = "";
    });

    var arrsplice = [];
    var codebuttons = [];
    var wansbuttons = [];
}



const arrsplice = buttonIds.slice();

// Shuffle the array using the Fisher-Yates algorithm
for (let i = arrsplice.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arrsplice[i], arrsplice[j]] = [arrsplice[j], arrsplice[i]];
}

codebuttons = arrsplice.slice(0, 3);
wansbuttons = arrsplice.slice(3, 8);

var corrcw = [];
var wroncw = [];

window.onload = function() {
    wansbuttons.forEach(function(wansbutton) {
        // Get the button element
        var buttonw = document.getElementById(wansbutton);
        randw = Array.from(selectRandomWans().wans);
        wroncw.push(randw)
        // Set the random number as the button's text
        buttonw.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: black;">' + formatMatrix(randw) + '</span>';
    });

    codebuttons.forEach(function(codebutton) {
        // Get the button element
        var button = document.getElementById(codebutton);
        rand = Array.from(selectRandomCodeword().codeword);
        corrcw.push(rand)
        // Set the random number as the button's text
        button.innerHTML = '<span style="font-size: 20px; font-weight: bold; color: black;">' + formatMatrix(rand) + '</span>';
    });
};

function nextpage() {
    const bscp1 = document.getElementById("bscp1");
    const bscp2 = document.getElementById("bscp2");
    const bscobs1 = document.getElementById("bscobs1");
    const bscobs2 = document.getElementById("bscobs2");
    const bscobs12 = document.getElementById("bscobs12");

    bscobs1.innerHTML = "";
    bscobs12.innerHTML = "";
    bscobs2.innerHTML = "";

    bscp1.style.display = "none";
    bscp2.style.display = "block";

    document.getElementById("codeword1").innerHTML = formatMatrix(corrcw[0].toString());
    document.getElementById("codeword2").innerHTML = formatMatrix(corrcw[1].toString());
    document.getElementById("codeword3").innerHTML = formatMatrix(corrcw[2].toString());
}

function prevpage() {
    const bscp1 = document.getElementById("bscp1");
    const bscp2 = document.getElementById("bscp2");
    const bscobs1 = document.getElementById("bscobs1");
    const bscobs2 = document.getElementById("bscobs2");
    const bscobs12 = document.getElementById("bscobs12");

    bscobs1.innerHTML = "";
    bscobs12.innerHTML = "";
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
    const bscobs12 = document.getElementById("bscobs12");
    const selectedCodewords = document.querySelectorAll('#bscp1 .code-word button[style="background-color: rgb(26, 255, 0);"]');

    if (selectedCodewords.length == 0) {
        bscobs1.innerHTML = "No output codeword has been selected. Kindly choose the codewords by clicking on them.";
        bscobs1.style.color = "black";
    }
    else {
        const selectedIds = Array.from(selectedCodewords).map(button => button.id);
        const correctIds = codebuttons.slice();
        const isCorrect = correctIds.every(id => selectedIds.includes(id)) && selectedIds.length === correctIds.length;


        if (isCorrect) {
            bscobs1.innerHTML = '{' + "[" + corrcw[0] + "];" + "[" +  corrcw[1] + "];" + "[" +  corrcw[2] + ']}';
            bscobs12.innerHTML = "<b>Correct! The above selected output codewords are indeed the right possible outputs for the given codeword.</b>";
            bscobs1.style.color = "green";
        } else {
            bscobs1.innerHTML = "<b>Kindly check as to what the correct output codewords could be by going through the theory.</b>";
            bscobs1.style.color = "red";
        }
    }
}

function compareArrays(arr1, arr2) {
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




function check2(){

    let [a11,a12] = compareArrays(corrcw[0], sentcodeword);
    let [a21,a22] = compareArrays(corrcw[1], sentcodeword);
    let [a31,a32] = compareArrays(corrcw[2], sentcodeword);

    
    var p11 = parseInt(document.getElementById("p11").value);
    var p12 = parseInt(document.getElementById("p12").value);
    var p21 = parseInt(document.getElementById("p21").value);
    var p22 = parseInt(document.getElementById("p22").value);
    var p31 = parseInt(document.getElementById("p31").value);
    var p32 = parseInt(document.getElementById("p32").value);

    if (isNaN(p11) || isNaN(p12) || isNaN(p21) || isNaN(p22) || isNaN(p31) || isNaN(p32) ||
        p11 < 0 || p11 > 9 || p12 < 0 || p12 > 9 || p21 < 0 || p21 > 9 ||
        p22 < 0 || p22 > 9 || p31 < 0 || p31 > 9 || p32 < 0 || p32 > 9) {
        document.getElementById("bscobs2").innerHTML = "Please enter valid positive integers below 9 into the boxes.";
        document.getElementById("bscobs2").style.color = "black";
        return;
    }

    switch (true) {
            
        case (a11 === p11 && a12 === p12 && a21 === p21 && a22 === p22 && a31 === p31 && a32 === p32):
            document.getElementById("bscobs2").innerHTML = "Correct Answer!";
            document.getElementById("bscobs2").style.color = "green";
            break;

        case (a11 !== p11 || a12 !== p12):
            document.getElementById("bscobs2").innerHTML = "Kindly check the hamming distance between the input and the output codewords for part (a) again";
            document.getElementById("bscobs2").style.color = "blue";
            break;

        case (a21 !== p21 || a22 !== p22):
            document.getElementById("bscobs2").innerHTML = "Kindly check the hamming distance between the input and the output codewords for part (b) again";
            document.getElementById("bscobs2").style.color = "blue";
            break;
    
        case (a31 !== p31 || a32 !== p32):
            document.getElementById("bscobs2").innerHTML = "Kindly check the hamming distance between the input and the output codewords for part (c) again";
            document.getElementById("bscobs2").style.color = "blue";
            break;
    
        default:
            document.getElementById("bscobs2").innerHTML = "Incorrect Answer! <br> Please go through the Instructions, and try again.";
            document.getElementById("bscobs2").style.color = "red";
            break;
    }

}
