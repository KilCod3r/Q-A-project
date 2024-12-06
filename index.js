const questions = [
    { question: "What is the capital of France?", options: ["A) Berlin", "B) Madrid", "C) Paris", "D) Rome"], answer: "C" },
    { question: "What is 2 + 2?", options: ["A) 3", "B) 4", "C) 5", "D) 6"], answer: "B" },
    { question: "Who wrote 'Hamlet'?", options: ["A) Charles Dickens", "B) William Shakespeare", "C) Mark Twain", "D) Jane Austen"], answer: "B" },
    { question: "What is the largest planet in our solar system?", options: ["A) Earth", "B) Mars", "C) Jupiter", "D) Saturn"], answer: "C" }
];

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;
const timeLimit = 10; // seconds
let timer;

function startQuiz() {
    const username = localStorage.getItem('username');
    const timeJoined = new Date().toLocaleString();
    document.getElementById('timer').innerText = `Time left: ${timeLimit}s`;
    loadQuestion();
    startTimer(timeJoined);
}

function loadQuestion() {
    if (currentQuestionIndex < totalQuestions) {
        const questionData = questions[currentQuestionIndex];
        document.getElementById('question').innerText = questionData.question;
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        questionData.options.forEach(option => {
            const button = document.createElement('button');
            button.innerText = option;
            button.onclick = () => checkAnswer(option.charAt(0));
            optionsContainer.appendChild(button);
        });
    } else {
        endQuiz();
    }
}

function checkAnswer(selectedOption) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById('feedback').innerText = 'Correct!';
    } else {
        document.getElementById('feedback').innerText = 'Wrong!';
    }
    currentQuestionIndex++;
    loadQuestion();
}

function startTimer(timeJoined) {
    let timeLeft = timeLimit;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    const username = localStorage.getItem('username');
    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('result').innerText = `Quiz Over! ${username}, your score is ${score}/${totalQuestions}.`;
    submitResults(username);
}

function submitResults(username) {
    const timeJoined = new Date().toLocaleString();
    fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, score, timeJoined })
    })
    .then(response => response.json())
    .then(data => console.log(data.message))
    .catch(error => console.error('Error:', error));
}

startQuiz();