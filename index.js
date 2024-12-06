const questions = [
    { question: "Who was the first angel Allah created", options: ["A) Jibreel", "B) Izrael", "C) Malik", "D) Israfeel"], answer: "A" },
    { question: "Which Nabii was sent to pple of Aad", options: ["A) Hud", "B) Adam", "C) Idris", "D) Nuh"], answer: "A" },
    { question: "Who killed the other", options: ["A) Habil killed Qabil", "B) Qabil killed Habil"], answer: "B" },
    { question: "Who was the second Nabii after Adam", options: ["A) Sheeth", "B) Nuh", "C) Hud", "D) Idris"], answer: "D" },
    { question: "How many years Nuh preached to his people", options: ["A) 1050", "B) 800", "C) 50", "D) 960"], answer: "D" },
    { question: "Jahannam has how many levels", options: ["A) 3", "B) 4", "C) 7", "D) 6"], answer: "C" },
    { question: "Jins were created before Adam", options: ["A) True", "B) False"], answer: "A" },
    { question: "Allah created Hawa From..", options: ["A) Clay", "B) Light", "C) the ribs of Adam", "D) Fire"], answer: "C" },
    { question: "Where did malakulMaut took soul of Idris", options: ["A) 4th Heaven", "B) Jahannam", "C) Earth", "D) Jannah"], answer: "A" },
    { question: "Where did Qabil settled after he fled with his sister", options: ["A) Mountain", "B) Hills", "C) Flat lands", "D) Sea"], answer: "C" },
    { question: "Which one is correct?", options: ["A) Sirat is a life between Qiyama and after death", "B) Jibreel was the first soul created", "C) Yauq,yaghuth,Nasra and Suwa were prophets after Idris", "D) Jins were created using light"], answer: "B" },
    { question: "What was the first sin committed in this dunya ", options: ["A) shirk", "B) murder", "C) zina", "D) theft"], answer: "B" },
    { question: "Do Jins have the ability to change their form", options: ["A) yes", "B) no"], answer: "A" },
     { question: "Which angel created his work is to blow trumpet", options: ["A) Jibreel", "B) malakulMaut", "C) Israfeel", "D) Mikail"], answer: "C" },
    { question: "Humans and Jins were only created to...", options: ["A) worship Allah", "B) just live their life in dunya", "C) work", "D) be grateful"], answer: "A" },
];

let currentQuestionIndex = 0;
let score = 0;
const totalQuestions = questions.length;
const timeLimit = 40; // seconds
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
