function buildQuiz(){}

function showResults(){}

// display quiz right away
buildQuiz();

// on submit, show results
submitButton.addEventListener('click', showResults);


var myQuestions = [
  {
    question1: "?",
    answers: {
      a: "#",
      b: "#",
      c: "#"
    },
    correctAnswer: "c"
  },
  {
    question2: "?",
    answers: {
      a: "#",
      b: "#",
      c: "#"
    },
    correctAnswer: "c"
  },
  {
    question3: "?",
    answers: {
      a: "#",
      b: "#",
      c: "#",
      d: "#"
    },
    correctAnswer: "d"
  },
  {
    question4: "?",
    answers: {
      a: "#",
      b: "#",
      c: "#",
      d: "#"
    },
    correctAnswer: "d"
  }
];

function showResults(){

    // gather answer containers from our quiz
    var answerContainers = quizContainer.querySelectorAll('.answers');
  
    // keep track of user's answers
    let numCorrect = 0;
  
    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {
  
      // find selected answer
      var answerContainer = answerContainers[questionNumber];
      var selector = `input[name=question${questionNumber}]:checked`;
      var userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;
  
        // color the answers green
        answerContainers[questionNumber].style.color = 'lightgreen';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });
  
    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }