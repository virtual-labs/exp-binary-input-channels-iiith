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
var noise = parseFloat(gaussianRV(0, Math.sqrt(noiseVariance))().toFixed(2)); // clip to 2 decimal places
var sentX = Math.random() > 0.5 ? 1 : 0;
var receivedY = sentX + noise  // send 0 or 1
// var dim = randomGeneratorMatrix.dim;
// var codelength = randomGeneratorMatrix.matrix[0].length;

document.getElementById("sentCodeword").innerHTML = sentX.toString();
document.getElementById("receivedCodeword").innerHTML = (receivedY.toFixed(2)).toString();
// document.getElementById("receivedCodeword").innerHTML = formatMatrix(receivedCodeword);
// }
// document.getElementById("sentCodword").innerHTML = formatMatrix(randomRandomCodeword.codeword);
// document.getElementById("matrixInfo").innerHTML = "Dimensions: " + randomGeneratorMatrix.dim.join("x") + ", Length: " + randomGeneratorMatrix.length;


// https://stackoverflow.com/questions/25582882/javascript-math-random-normal-distribution-gaussian-bell-curve
function gaussianRV(mean, stdev) {
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
    let y_x = Math.abs(document.querySelectorAll('.mathContainer #y_x')[0].value);

    console.log(N_0_first, noiseVariance, N_0_second, y_x == Math.abs(noise))


    // let output = '';
    // inputs.forEach(input => {
    //     output += `Input ID: ${input.id}, Value: ${input.value}\n`;
    // });

    if (N_0_first / 2 == noiseVariance && N_0_second / 2 == noiseVariance && y_x == Math.abs(noise)) {
        probabilityQuestionObservation.innerHTML = "<b>Correct Answer!!!</b>";
        probabilityQuestionObservation.style.color = "green";
        document.getElementById("nextButton").style.display = "initial";
        // nextProbabilityQuestion()
    }
    else if ((N_0_first / 2 != noiseVariance || N_0_second / 2 != noiseVariance) && y_x == Math.abs(noise)) {
        probabilityQuestionObservation.innerHTML = "<b>Incorrect. Please check the noise variance.</b>";
        probabilityQuestionObservation.style.color = "red";
    }
    else if ((N_0_first / 2 == noiseVariance && N_0_second / 2 == noiseVariance) && y_x != Math.abs(noise)) {
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
    const awgnTopQuestion = document.getElementById("awgnTopQuestion");

    const probabilityQuestion = document.getElementById("probabilityQuestion");
    const distQuestion = document.getElementById("distQuestion");
    const probabilityQuestionObservation = document.getElementById("probabilityQuestionObservation");


    probabilityQuestion.style.display = "none";
    distQuestion.style.display = "block";

    // change sentX and noise
    sentX = (Math.floor(Math.random() * 10 - 5));
    noiseVariance = (Math.floor(Math.random() * 5 + 1));

    awgnTopQuestion.innerHTML = "Consider a AWGN channel with noise variance \\(\\dfrac{N_0}{2}=" + ((noiseVariance/2).toFixed(2)) + "\\).";

    document.getElementById("sentCodeword").innerHTML = sentX.toString();
    document.getElementById("receivedCodeword").innerHTML = 'Y';

    document.getElementById("nextButton").style.display = "none";

    probabilityQuestionObservation.innerHTML = "";
    probabilityQuestionObservation.style.display = "none";

    // compile MathJax
    MathJax.typeset();

    randomiseGaussianOptions();
}

function nextDistQuestion() {

    const probabilityQuestion = document.getElementById("probabilityQuestion");
    const distQuestion = document.getElementById("distQuestion");
    const probabilityVectorQuestion = document.getElementById("probabilityVectorQuestion");

    const distQuestionObservation = document.getElementById("distQuestionObservation");

    probabilityQuestion.style.display = "none";
    distQuestion.style.display = "none";
    probabilityVectorQuestion.style.display = "block";

    // distQuestion.style.display = "none";
    // probabilityVectorQuestion.style.display = "block";

    sentX = randomRandomCodeword.codeword;
    document.getElementById("sentCodeword").innerHTML = formatMatrix(sentX);

    // create a noise vector
    noise = [];

    for (let i = 0; i < sentX.length; i++) {
        noise.push(parseFloat(gaussianRV(0, Math.sqrt(noiseVariance))().toFixed(2)));
    }

    receivedY = sentX.map((bit, index) => {
        return (bit + noise[index]).toFixed(2);
    });

    document.getElementById("receivedCodeword").innerHTML = formatMatrix(receivedY);
    // compile MathJax
    MathJax.typeset();

    distQuestionObservation.innerHTML = "";
    distQuestionObservation.style.display = "none";

}



function checkProbabilityVectorQuestion() {
    const probabilityVectorQuestion = document.getElementById("probabilityVectorQuestion");
    const probabilityVectorQuestionObservation = document.getElementById("probabilityVectorQuestionObservation");
    const distQuestion = document.getElementById("distQuestion");

    let N_0_first = parseFloat(document.querySelectorAll('.mathContainer #N_0_first_vect')[0].value);
    let N_0_second = parseFloat(document.querySelectorAll('.mathContainer #N_0_second_vect')[0].value);
    let y_x_norm = Math.abs(parseFloat(document.querySelectorAll('.mathContainer #y_x_norm')[0].value));

    let N_0_first_answer = Math.pow(2*noiseVariance, sentX.length);
    let N_0_second_answer = 2*noiseVariance;
    let y_x_norm_answer = Math.sqrt(sentX.reduce((acc, bit, index) => {
        return acc + Math.pow(noise[index], 2);
    }, 0));

    // for y_x_norm, accept 0.1 difference

    if (N_0_first == N_0_first_answer && N_0_second == N_0_second_answer && Math.abs(y_x_norm - y_x_norm_answer) <= 0.1) {
        probabilityVectorQuestionObservation.innerHTML = "<b>Correct Answer!!!</b>";
        probabilityVectorQuestionObservation.style.color = "green";
        document.getElementById("nextButtonVector").style.display = "initial";
    } else if (N_0_first != N_0_first_answer && N_0_second != N_0_second_answer && Math.abs(y_x_norm - y_x_norm_answer) <= 0.1) {
        probabilityVectorQuestionObservation.innerHTML = "<b>Incorrect. Please check the noise variance.</b>";
        probabilityVectorQuestionObservation.style.color = "red";
    } else if (N_0_first == N_0_first_answer && N_0_second == N_0_second_answer && Math.abs(y_x_norm - y_x_norm_answer) > 0.1) {
        probabilityVectorQuestionObservation.innerHTML = "<b>Incorrect. Please check answer again.</b>";
        probabilityVectorQuestionObservation.style.color = "red";
    } else {
        probabilityVectorQuestionObservation.innerHTML = "<b>Incorrect. </b>";
        probabilityVectorQuestionObservation.style.color = "red";
    }


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


// gaussian plots


// randomise the options by shuffling the array
var correctAnswerDist;
var correctAnswerDistOption;

function randomiseGaussianOptions() {
    let permutation = Array.from({ length: 4 }, (_, i) => i + 1);

    permutation.sort(() => Math.random() - 0.5);

    let options = [[mean = sentX, variance = noiseVariance], [mean = sentX, variance = 4 * noiseVariance], [mean = 0, variance = noiseVariance], [mean = 2 * sentX, variance = noiseVariance]];

    correctAnswerDist = permutation.indexOf(1);
    correctAnswerDistOption = String.fromCharCode(65 + correctAnswerDist);

    for (let i = 0; i < permutation.length; i++) {
        let option = options[permutation[i] - 1];
        let optionId = 'gaussianCurveOption' + String.fromCharCode(65 + i);
        drawGaussianCurve(option[0], option[1], optionId);
    }
}



// drawGaussianCurve(0, 5, 'gaussianCurveOptionA');
// drawGaussianCurve(5, 5, 'gaussianCurveOptionB');
// drawGaussianCurve(10, 5, 'gaussianCurveOptionC');
// drawGaussianCurve(0, 3, 'gaussianCurveOptionD');




function drawGaussianCurve(mean, variance, id) {                        //setting up empty data array
    let data = d3.range(100000).map(d3.randomNormal(mean, Math.sqrt(variance)));

    // Function to calculate kernel density estimation
    function kernelDensityEstimator(kernel, X) {
        return function (V) {
            return X.map(function (x) {
                return [x, d3.mean(V, function (v) { return kernel(x - v); })];
            });
        };
    }

    function kernelEpanechnikov(k) {
        return function (v) {
            return Math.abs(v /= k) <= 1 ? 0.75 * (1 - v * v) / k : 0;
        };
    }

    // line chart based on //bl.ocks.org/mbostock/3883245
    let margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
        width = 260 - margin.left - margin.right,
        height = 150 - margin.top - margin.bottom;

    let x = d3.scaleLinear()
        .range([0, width])
        .domain(d3.extent(data));

    let y = d3.scaleLinear()
        .range([height, 0]);

    let xAxis = d3.axisBottom(x).ticks(5).tickSizeOuter(0);

    let yAxis = d3.axisLeft(y).ticks(5);

    let line = d3.line()
        .x(function (d) {
            return x(d[0]);
        })
        .y(function (d) {
            return y(d[1]);
        });

    let svg = d3.select("#" + id).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Generate a KDE of the data
    let kde = kernelDensityEstimator(kernelEpanechnikov(0.5), x.ticks(100));
    let density = kde(data);

    y.domain([0, d3.max(density, function (d) { return d[1]; })]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    // svg.append("g")
    //     .attr("class", "y axis")
    //     .call(yAxis);

    svg.append("path")
        .datum(density)
        .attr("class", "line")
        // .attr("d", line)
        .attr("fill", "#404080")
        .attr("opacity", ".6")
        .attr("stroke", "#000")
        .attr("stroke-width", 1)
        .attr("stroke-linejoin", "round")
        .attr("d", d3.line()
            .curve(d3.curveBasis)
            .x(function (d) { return x(d[0]); })
            .y(function (d) { return y(d[1]); })
        );;
}


// check gaussian distribution question

function selectGaussianCurve(option) {
    // const gaussianCurveQuestion = document.getElementById("distQuestion");
    // const probabilityVectorQuestion = document.getElementById("probabilityVectorQuestion");
    const gaussianCurveObservation = document.getElementById("distQuestionObservation");

    let selectedOption = option;

    if (selectedOption != correctAnswerDistOption && distQuestionObservation.innerHTML == "<b>Incorrect. Please try again.</b>") {
        gaussianCurveObservation.innerHTML = "<b>Incorrect again!! Please try again.</b>";
        gaussianCurveObservation.style.color = "red";
    }
    else if (selectedOption != correctAnswerDistOption) {
        gaussianCurveObservation.innerHTML = "<b>Incorrect. Please try again.</b>";
        gaussianCurveObservation.style.color = "red";

        // document.getElementById("nextButtonDistQuestion").style.display = "initial";

    }
    else if (selectedOption == correctAnswerDistOption) {
        gaussianCurveObservation.innerHTML = "<b>Correct Answer!!!</b>";
        gaussianCurveObservation.style.color = "green";
        document.getElementById("nextButtonDistQuestion").style.display = "initial";
    }


}