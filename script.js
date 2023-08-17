const startButton = document.getElementById('start-button');
startButton.addEventListener('click', startGame);

const introContainer = document.getElementById('intro-container');
const questionContainer = document.getElementById('question-container');
const resultsContainer = document.getElementById('results'); 
const scoresContainer = document.getElementById('scoresContainer');

const scores = [];

let currentQuestionIndex = 0;
let timerInterval;
let seconds = 60;
let score = 0;
const timerElement = document.getElementById('timer');

const questions = [
    'Commmonly used data types do NOT include',
    'The condition in an if /else statement is enclosed with ___.',
    'Arrays in JavaScript can be used to store ___.',
    'String values must be enclosed within ___ when being assigned to variables.',
    'A very useful tool used during development and debugging for printing content to the debugger is:'
];

const correctAnswers = [
    'alerts',
    'parenthesis',
    'all-above',
    'quotes',
    'console-log'
];

const questionContainers = document.querySelectorAll('.QuestionContainer');

function startGame() {
    introContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    startTimer();
    showQuestion(currentQuestionIndex);
  }

function startTimer() {
    timerInterval = setInterval(() => {
        if (currentQuestionIndex < questionContainers.length) {
      seconds--;
      updateTimer();
      if (seconds === 0) {
        stopTimer();
        }
      }
    }, 1000);
}

function updateTimer() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = padZero(minutes);
    const formattedSeconds = padZero(remainingSeconds);

    timerElement.textContent = `${formattedMinutes}:${formattedSeconds}`;

    if (seconds <= 0) {
        stopTimer();
        showResults();
    }
}

function padZero(value) {
    return value < 10 ? `0${value}` : value;
}
  
function stopTimer() {
    clearInterval(timerInterval);
    seconds = 60;
    timerElement.textContent = '0:00';
}

function showQuestion(index) {
    questionContainers.forEach(question => {
        question.style.display = 'none';
    });

    if (index < questionContainers.length) {
        questionContainers[index].style.display = 'block';
    } else {
        showResults();
    }

    updateTimer();
}

function showResults() {
    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'block';

    const scoreElement = document.querySelector('#results-content p');
    scoreElement.textContent = `Your final score is ${score} points.`;

    const initialsInput = document.querySelector('#initials-input');
    initialsInput.value = '';

    stopTimer();
}

questionContainers.forEach((question, index) => {
    const answerButtons = question.querySelectorAll('button');
    answerButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.id === correctAnswers[currentQuestionIndex]) {
                score+=1;
                button.classList.add('correct');
            } else {
                seconds -= 10;
                button.classList.add('incorrect');
            }

            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        });
    });
});

const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submitGame);

function submitGame() {
    const initialsInput = document.querySelector('#initials-input');
    const initials = initialsInput.value.trim().toUpperCase();

    if (initials !== '') {
        const scoreEntry = { initials, score };
        scores.push(scoreEntry);
    }
    
    stopTimer();
    introContainer.style.display = 'none';
    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    
    displayScores();
    scoresContainer.style.display = 'grid';
    scoresContainer.style.placeItems = 'center';
    scoresContainer.scrollIntoView({ behavior: 'smooth'});
}

const goBackButton = document.getElementById('go-back');
goBackButton.addEventListener('click', goBackToIntro);

function goBackToIntro() {
    introContainer.style.display = 'grid';
    introContainer.style.placeItems = 'center';
    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    scoresContainer.style.display = 'none';
    currentQuestionIndex = 0;
    score = 0;
    clearInterval(timerInterval);
    seconds = 60;
    timerElement.textContent = '01:00';
}

function displayScores() {
    const scoresList = document.querySelector('#scoresContainer ul');
    scoresList.innerHTML = '';

    scores.sort((a, b) => b.score - a.score);

    scores.forEach((entry, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${index + 1}. ${entry.initials} - ${entry.score} points`;
        scoresList.appendChild(listItem);
    })

    questionContainer.style.display = 'none';
    resultsContainer.style.display = 'none';
    scoresContainer.style.display = 'block';
    scoresContainer.scrollIntoView({behavior: 'smooth'});
}

const clearScoresButton = document.getElementById('clear-scores');
clearScoresButton.addEventListener('click', clearScores);

function clearScores() {
    const scoresList = document.querySelector('#scoresContainer ul');
    scoresList.innerHTML = '';
}