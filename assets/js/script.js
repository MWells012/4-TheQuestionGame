var timeLeft = 60
var timerID;
var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var startContainerEl = document.getElementById("start-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");
var checkAnswerEl = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var shuffledQuestions, currentQuestionIndex;;


// Start button trigger the first question and next button to display
startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
});

// Timer
function timeTick() {
    timeLeft--;
    timerElement.textContent = "Time Left:" + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
}

//start the quiz
function startQuiz () {
    timerID = setInterval(timeTick, 1000);
    startcontainerElement.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide");

    timeTick();
    setNextQuestion();
};

//move to the next quesiton
function nextQuestion () {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

//displays question
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement("button")
        button.innerText = answer.text
        button.classList.add("btn")
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
};

function selectAnswer(e) {
    var selectedButton = e.target;
    //console.dir(selectedButton);
    var correct = selectedButton.dataset.correct;
    checkAnswerElement.classList.remove("hide")
    // Check if the answer correct or wrong then show text
    if (correct) {
        checkAnswerElement.innerHTML = "You got it right!";
    } else {
        checkAnswerElement.innerHTML = "Sorry that was not the correct answer.";
        if (timeLeft <= 10) {
            timeLeft = 0;
        } else {
            // If the aswer is wrong, deduct time by 10
            timeLeft -= 10;
        }
    }

    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })

    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide")
        checkAnswerElement.classList.remove("hide")
    } else {
        startButton.classList.remove("hide")
        saveScore();
    }
};

function saveScore() {
    clearInterval(timerID);
    timerElement.textContent = "Time: " + timeLeft;
    setTimeout(function () {
        //localStorage.setItem("scores", JSON.stringify(scores));
        questionContainerElement.classList.add("hide");
        document.getElementById("score-container").classList.remove("hide");
        document.getElementById("your-score").textContent = "Your final score is " + timeLeft;

    }, 2000)
};

function showHighScores(initials) {
    document.getElementById("highscores").classList.remove("hide")
    document.getElementById("score-container").classList.add("hide");
    startContainerElement.classList.add("hide");
    questionContainerElement.classList.add("hide");
    if (typeof initials == "string") {
        var score = {
            initials, timeLeft
        }
        scores.push(score)
    }

    var highScoreElement = document.getElementById("highscore");
    highScoreElement.innerHTML = "";
    //console.log(scores)
    for (i = 0; i < scores.length; i++) {
        var div1 = document.createElement("div");
        div1.setAttribute("class", "name-div");
        div1.innerText = scores[i].initials;
        var div2 = document.createElement("div");
        div2.setAttribute("class", "score-div");
        div2.innerText = scores[i].timeLeft;

        highScoreElement.appendChild(div1);
        highScoreElement.appendChild(div2);
    }

    localStorage.setItem("scores", JSON.stringify(scores));

};

// View high scores link
viewHighScores.addEventListener("click", showHighScores);


submitButton.addEventListener("click", function (event) {
    event.preventDefault()
    var initials = document.querySelector("#initials-field").value;
    showHighScores(initials);
});

// Restart or reload the page
restartButton.addEventListener("click", function () {
    window.location.reload();
});