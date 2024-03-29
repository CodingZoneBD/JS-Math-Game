var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// if we click on the start/reset 

document.getElementById("startreset").onclick =
    function () {

        // if we are playing

        if (playing == true) {

            location.reload(); //reload page

        } else {

            //if we are not playing

            playing = true;

            //set score to 
            score = 1;

            document.getElementById("scorevalue").innerHTML = score;

            //show countdow box
            show("timeremaining");
            timeremaining = 60;
            document.getElementById("timeremainingvalue").innerHTML = timeremaining;

            // hide game over box
            hide("gameover");


            //change button to reset
            document.getElementById("startreset").innerHTML = "Reset Game";

            //start countdow 
            startCountdown();

            //generate a new Q&A
            generateQA();
        }
    }


//Clicking on an answer box
for (i = 1; i < 5; i++) {
    document.getElementById("box" + i).onclick = function () {
        //check if we are playing
        if (playing == true) {//yes
            if (this.innerHTML == correctAnswer) {
                //correct answer

                //increase score by 1
                score++;

                document.getElementById("scorevalue").innerHTML = score;
                //hide wrong box and show correct box
                hide("wrong");
                show("correct");
                setTimeout(function () {
                    hide("correct");
                }, 1000);

                //Generate new Q&A

                generateQA();
            } else {
                //wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function () {
                    hide("wrong");
                }, 1000);
            }
        }
    }
}



// if we click on the start/reset 
// if we are playing
// reload page
//if we are not playing
//set score to 0
//show countdow box
//reduce time by 1sec in loop
//timeleft?
//yes->continue
//no->gameover
//change button to reset
//generate new Q&A


//if we click  on answer box
//if we are playing 
//correct?
//yes
//increase score
//show corect box for 1 sec
//generate new Q&A
//no 
//show try again box



// function 

// start counter
function startCountdown() {
    action = setInterval(function () {
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            // game over
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your Score is" + score + "</p>";
            hide("timeremaining");
            hide("crrect");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}


// stop counter
function stopCountdown() {
    clearInterval(action);
}


// hide an element
function hide(id) {
    document.getElementById(id).style.display = "none";
}

// show an element
function show(id) {
    document.getElementById(id).style.display = "block";
}

//generate question and multiple answers
function generateQA() {
    var x = 1 + Math.round(9 * Math.random());
    var y = 1 + Math.round(9 * Math.random());
    correctAnswer = x * y;
    document.getElementById("question").innerHTML = x +
        "x" + y;
    var correctPosition = 1 + Math.round(3 * Math.random());

    document.getElementById("box" + correctPosition).innerHTML =
        correctAnswer; //fill one box with the correct answer

    //fill other boxes with wrong answers

    var answers = [correctAnswer];

    for (i = 1; i < 5; i++) {
        if (i != correctPosition) {
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(9 * Math.random())) * (1 + Math.round(9 * Math.random()));
                //a wrong answer
            } while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}