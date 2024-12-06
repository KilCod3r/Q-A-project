document.getElementById('startQuiz').addEventListener('click', function() {
    const username = document.getElementById('username').value;
    if (username) {
        localStorage.setItem('username', username);
        window.location.href = 'quiz.html';
    } else {
        alert('Please enter your username');
    }
});