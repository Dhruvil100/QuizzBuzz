// CREATE A QUIZ CLASS
import {Quiz} from './quizclass.js';

// Create a question Class
import {Question} from './questionclass.js';

// NOW DISPLAY THE QUESTIONS
function displayQuestion() {
    if (quiz.isEnded()) {
        showScores();
    } else {
        // show question
        let questionElement = document.getElementById("question");
        questionElement.innerHTML = quiz.getQuestionIndex().text;

        // show options
        let choices = quiz.getQuestionIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            let choiceElement = document.getElementById("choice" + i);
            choiceElement.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

// GUESS ANSWER
function guess(id, guess) {
    let button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        displayQuestion();
    }
};

// SHOW QUIZ PROGRESS
function showProgress() {
    let currentQuestionNumber = quiz.questionIndex + 1;
    let ProgressElement = document.getElementById("progress");
    ProgressElement.innerHTML =
        `Question ${currentQuestionNumber} of ${quiz.questions.length}`;
};

// SHOW SCORES
function showScores() {
    let quizEndHTML =
        `
    <h1>Quiz Completed</h1>
    <h2 id='score'> You scored: ${quiz.score} of ${quiz.questions.length * 10}</h2>
    <div class="quiz-repeat">
        <a href="index.html">Take Quiz Again</a>
    </div>
    `;
    let quizElement = document.getElementById("quiz");
    quizElement.innerHTML = quizEndHTML;
};

// create questions here
let questions = [
    new Question(
        "What is the best way to represent a subset ?", ["Pie Chart", "Venn Diagram", "Table", "Exploding Diagram"], "Venn Diagram"
    ),
    new Question(
        "In Roman Numericals, what is represented by C?", ["10", "100", "1000", "10000"], "100"
    ),
    new Question(
        "Approximately, what is the angle of a regular heptagon?", ["126", "128", "130", "132"], "128"
    ),
    new Question(
        "G. H. Hardy worked with which famous Indian mathematican?", ["Harishchandran", "C. R. Rao", "Satyendra Bose", "Ramanujan"], "Ramanujan"
    ),
    new Question(
        "The theoretical probability of rolling an even number on a dice.", ["3/6", "1/2", "1/6", "5/6"], "1/2"
    )
];

// INSTANTIATE quiz
let quiz = new Quiz(questions);

// display questions
displayQuestion();


// Add A CountDown for the Quiz
let time = 10;
let quizTimeInMinutes = time * 60 * 60;
let quizTime = quizTimeInMinutes / 60;

let counting = document.getElementById("count-down");

function startCountdown() {
    let quizTimer = setInterval(function() {
        if (quizTime <= 0) {
            clearInterval(quizTimer);
            showScores();
        } else {
            quizTime--;
            let sec = Math.floor(quizTime % 60);
            let min = Math.floor(quizTime / 60) % 60;
            counting.innerHTML = `TIME: ${min} : ${sec}`;
        }
    }, 1000);
}

startCountdown();