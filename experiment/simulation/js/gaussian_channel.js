const codewords = [
    {
        codeword: [0, 0, 0, 0],
    },
    {
        codeword: [1, 1, 1, 1],
    },
    {
        codeword: [1, 0, 1, 0],
    },
    {
        codeword: [0, 1, 0, 1],
    },
];

var randomRandomCodeword = selectRandomCodeword();
var probabilityFlip = Math.random();

var noiseVariance = 5;
var noise = parseFloat(gaussian(0, Math.sqrt(noiseVariance))().toFixed(2)); // clip to 2 decimal places
var sentX = Math.random() > 0.5 ? 1 : 0;
var sentY = sentX + noise  // send 0 or 1
// var dim = randomGeneratorMatrix.dim;
// var codelength = randomGeneratorMatrix.matrix[0].length;

document.getElementById("sentCodeword").innerHTML = sentX.toString();
document.getElementById("receivedCodeword").innerHTML = sentY.toString();
// document.getElementById("receivedCodeword").innerHTML = formatMatrix(receivedCodeword);
// }
// document.getElementById("sentCodword").innerHTML = formatMatrix(randomRandomCodeword.codeword);
// document.getElementById("matrixInfo").innerHTML = "Dimensions: " + randomGeneratorMatrix.dim.join("x") + ", Length: " + randomGeneratorMatrix.length;


// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function gaussian(mean, stdev) {
    let y2;
    let use_last = false;
    return function () {
        var y1;
        if (use_last) {
            y1 = y2;
            use_last = false;
        } else {
            let x1, x2, w;
            do {
                x1 = 2.0 * Math.random() - 1.0;
                x2 = 2.0 * Math.random() - 1.0;
                w = x1 * x1 + x2 * x2;
            } while (w >= 1.0);
            w = Math.sqrt((-2.0 * Math.log(w)) / w);
            y1 = x1 * w;
            y2 = x2 * w;
            use_last = true;
        }

        var retval = mean + stdev * y1;
        //   if (retval > 0)
        return retval;
        //   return -retval;
    }
}

function selectRandomCodeword() {
    const randomIndex = Math.floor(Math.random() * codewords.length);
    return codewords[randomIndex];
}



function checkProbabilityQuestion() {
    // const inputs = document.querySelectorAll('.mathContainer input');

    const probabilityQuestion = document.getElementById("probabilityQuestion");
    const probabilityQuestionObservation = document.getElementById("probabilityQuestionObservation");
    const distQuestion = document.getElementById("distQuestion");


    let N_0_first = parseFloat(document.querySelectorAll('.mathContainer #N_0_first')[0].value);
    let N_0_second = parseFloat(document.querySelectorAll('.mathContainer #N_0_second')[0].value);
    let y_x = document.querySelectorAll('.mathContainer #y_x')[0].value;

    console.log(N_0_first, noiseVariance, N_0_second, y_x==noise)


    // let output = '';
    // inputs.forEach(input => {
    //     output += `Input ID: ${input.id}, Value: ${input.value}\n`;
    // });

    if (N_0_first/2 == noiseVariance && N_0_second/2 == noiseVariance && y_x == noise) {
        probabilityQuestionObservation.innerHTML = "<b>Correct Answer!!!</b>";
        probabilityQuestionObservation.style.color = "green";
    }
    else if ((N_0_first/2 != noiseVariance || N_0_second/2 != noiseVariance) && y_x == noise) {
        probabilityQuestionObservation.innerHTML = "<b>Incorrect. Please check the noise variance.</b>";
        probabilityQuestionObservation.style.color = "red";
    }
    else if ((N_0_first/2 == noiseVariance && N_0_second/2 == noiseVariance) && y_x != noise) {
        probabilityQuestionObservation.innerHTML = "<b>Incorrect. Please check answer again.</b>";
        probabilityQuestionObservation.style.color = "red";
    }
    else {
        probabilityQuestionObservation.innerHTML = "<b>Incorrect. </b>";
        probabilityQuestionObservation.style.color = "red";
    }

    // probabilityQuestion.style.display = "none";
    // distQuestion.style.display = "block";

    // document.getElementById('probabilityQuestionObservation').innerText = output;
    // console.log(output);
}

function nextProbabilityQuestion() {
    const probabilityQuestion = document.getElementById("probabilityQuestion");
    const distQuestion = document.getElementById("distQuestion");

    probabilityQuestion.style.display = "none";
    distQuestion.style.display = "block";
}

// function BinaryErasureChannel() {
// replace random codeword with erasure with probability probabilityFlip
const receivedCodeword = randomRandomCodeword.codeword.map((bit) => {
    if (Math.random() < probabilityFlip) {
        return "\\epsilon";
    }
    return bit;
}
);


function formatMatrix(matrix) {
    return "\\(\\begin{bmatrix} " + matrix + " \\end{bmatrix}\\)";
}

function reset() {
    const dimensionEntered = document.getElementById("dimensionEntered");
    dimensionEntered.innerHTML = "";

    initial();
}

function initial() {

    randomGeneratorMatrix = selectRandomGeneratorMatrix();
    dim = randomGeneratorMatrix.dim;
    codelength = randomGeneratorMatrix.matrix[0].length;

    const generatorMatrixElement = document.getElementById("generatorMatrix");
    generatorMatrixElement.innerHTML = " \\(A \\)= " + formatMatrix(randomGeneratorMatrix.matrix);

    // Trigger MathJax to typeset the updated content
    MathJax.typeset([generatorMatrixElement]);

    const isGeneratorQuestion = document.getElementById("isGeneratorQuestion");
    const rateQuestion = document.getElementById("rateQuestion");
    const generatorForm = document.getElementById("generatorForm");
    const rateForm = document.getElementById("rateForm");

    const rateEntered = document.getElementById("rateEntered");

    // dimensionEntered.innerHTML = "Try with new matrix";
    rateEntered.innerHTML = "";

    isGeneratorQuestion.style.display = "block";
    rateQuestion.style.display = "none";

    generatorForm.reset();
    rateForm.reset();
}


function yesValidGeneratorMatrix() {
    const dim = randomGeneratorMatrix.dim;
    const dimensionEntered = parseInt(document.getElementById("dimensionInput").value);
    const isGeneratorQuestion = document.getElementById("isGeneratorQuestion");
    if (dimensionEntered == dim) {
        if (dim === randomGeneratorMatrix.matrix.length) {
            document.getElementById("dimensionEntered").innerHTML = "<b>Yay! Your answer is correct. This is indeed a true generator matrix. It has rank " + parseInt(dim) + " (full row-rank, i.e., all rows are linearly independent), and has " + parseInt(codelength) + " columns. Now you need to enter the rate of the code. </b>";
            document.getElementById("dimensionEntered").style.color = "green";

            isGeneratorQuestion.style.display = "none";
            rateQuestion.style.display = "block";
        } else {
            document.getElementById("dimensionEntered").innerHTML = "<b>Incorrect. Please check if the matrix is full rank.</b>";
            document.getElementById("dimensionEntered").style.color = "red";
        }
    } else {
        document.getElementById("dimensionEntered").innerHTML = "<b>Incorrect. Please try again.</b>";
        document.getElementById("dimensionEntered").style.color = "red";
    }

}

function notValidGeneratorMatrix() {
    const dim = randomGeneratorMatrix.dim;
    const dimensionEntered = parseInt(document.getElementById("dimensionInput").value);
    const isGeneratorQuestion = document.getElementById("isGeneratorQuestion");


    if (dimensionEntered == dim) {
        if (dimensionEntered != randomGeneratorMatrix.matrix.length) {
            document.getElementById("dimensionEntered").innerHTML = "<b>Correct Answer!!!</b>";
            document.getElementById("dimensionEntered").style.color = "green";

            // isGeneratorQuestion.style.display = "none";
            // rateQuestion.style.display = "block";



            document.getElementById("dimensionEntered").innerHTML = "<b>Yes, your answer that the previously showed matrix is not a generator matrix, is absolutely correct! Now, look at this new matrix, and answer the question again.</b>";

            initial();
        } else {
            document.getElementById("dimensionEntered").innerHTML = "<b>Incorrect. Please check if the matrix is full rank or not.</b>";
            document.getElementById("dimensionEntered").style.color = "red";
        }
    } else {
        document.getElementById("dimensionEntered").innerHTML = "<b>Incorrect. Please try again.</b>";
        document.getElementById("dimensionEntered").style.color = "red";
    }

}

function checkRate() {
    const dimensionEntered = document.getElementById("dimensionInput");
    const rateEntered = document.getElementById("rateEntered");

    const dimensionInput = parseInt(document.getElementById("dimensionInput").value);
    const codelengthInput = parseFloat(document.getElementById("codelengthInput").value);

    if (dimensionInput == dim && codelengthInput == codelength) {
        rateEntered.innerHTML = "<b>Correct Answer!!!</b>";
        rateEntered.style.color = "green";
    }
    else {
        if (rateEntered.innerHTML == "<b>Incorrect. Please try again.</b>") {
            rateEntered.innerHTML = "<b>Incorrect. Please try again.</b>";
            rateEntered.style.color = "red";
            return;
        }
        else {
            rateEntered.innerHTML = "<b>Incorrect. Please try again.</b>";
            rateEntered.style.color = "red";
            return;
        }
    }

}