var questions = [
    {
        question: 'Question 1: The Lion, the Witch and the ____ ??',
        answers: [
        { text: 'Dresser', correct: false },
        { text: 'Wardrobe', correct: true },
        { text: 'Closet', correct: false },
        { text: 'Desk', correct: false }
        ]

    },
    {
        question: 'Question 2: What mythical creature does not fly ?',
        answers: [
        { text: 'Faeries', correct: false },
        { text: 'Dragons', correct: false },
        { text: 'Nymphs', correct: true },
        { text: 'Hippogriff', correct: false }
        ]

    },
    {
        question: 'Question 3: Which is not a mythical creature?',
        answers: [
        { text: 'Dragon', correct: false },
        { text: 'Centaur', correct: false },
        { text: 'Unicorn', correct: false },
        { text: 'Frog', correct: true }
        ]

    },
    {
        question: 'What is the movie series about wizards and the boy who lived?',
        answers: [
        { text: 'Wizards of Waverly Place', correct: false },
        { text: 'Wizard of Oz', correct: false },
        { text: 'Harry Potter', correct: true },
        { text: 'Lord of the Rings', correct: false }
        ]

    },
    {
        question: 'What supposed creature lives in Scotland?',
        answers: [
        { text: 'Chupacabra', correct: false },
        { text: 'Lochness Monster', correct: true },
        { text: 'Big Foot', correct: false },
        { text: 'Kraken', correct: false }
        ]

    },
]
var timeLeft = 60
var timerID;
var timerElement = document.getElementById("timer");
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerElement = document.getElementById("question-container");
var startContainerElement = document.getElementById("start-container");
var questionElement = document.getElementById("questions");
var answerButtonsElement = document.getElementById("answer-btn");
var checkAnswerElement = document.getElementById("check-answer");
var viewHighScores = document.getElementById("highscores-link");
var submitButton = document.getElementById("submit-btn");
var clearScoreButton = document.getElementById("clear-btn");
var initialsField = document.getElementById("player-name");
var restartButton = document.getElementById("restart-btn");
var scoreField = document.getElementById("player-score");
var scores = JSON.parse(localStorage.getItem("scores")) || [];
var shuffledQuestions, currentQuestionIndex;



// Start button trigger the first question and next button to display
startButton.addEventListener("click", startGame);
if (nextButton) {
    nextButton.classList.add("hide")
    nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    setNextQuestion()
    
})};

// Timer
function timeTick() {
    timeLeft--;
    timerElement.textContent = "Time Left:" + timeLeft;
    if (timeLeft <= 0) {
        saveScore();
    }
};

//start the quiz
function startGame () {
    timerID = setInterval(timeTick, 1000);
    startContainerElement.classList.add("hide");
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove("hide");
//console.log("text");
    timeTick();
    setNextQuestion();
};

//move to the next quesiton
function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex]);
};

//displays question
function showQuestion(questions) {
    questionElement.innerText = questions.question
    questions.answers.forEach(answers => {
        var button = document.createElement("btn")
        button.innerText = answers.text
        button.classList.add("btn")
        if (answers.correct) {
            button.dataset.correct = answers.correct
        }
        button.addEventListener("click", selectAnswer)
        answerButtonsElement.appendChild(button)
    })
    //console.log("text")
};

// Reset state function
function resetState() {
    //clearStatusClass(document.body)
    nextButton.classList.add("hide")
    checkAnswerElement.classList.add("hide")
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild
            (answerButtonsElement.firstChild)
    }
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

// Check and show the correct answer by set the buttons colors
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
};

// Remove all the classes
function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
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

var loadScores = function () {
    // Get score from local storage

    if (!savedScores) {
        return false;
    }

    // Convert scores from stringfield format into array
    savedScores = JSON.parse(savedScores);
    var initials = document.querySelector("#initials-field").value;
    var newScore = {
        score: timeLeft,
        initials: initials
    }
    savedScores.push(newScore);
    console.log(savedScores)

    savedScores.forEach(score => {
        initialsField.innerText = score.initials
        scoreField.innerText = score.score
    })
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

// Clear localStorage items 
clearScoreButton.addEventListener("click", function () {
    localStorage.clear();
    document.getElementById("highscore").innerHTML = "";
});