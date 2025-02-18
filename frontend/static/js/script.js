document.addEventListener('DOMContentLoaded', () => {
    let questionsAndAnswers = [];
    let currentQuestionIndex = -1;
    let selectedIndex = 0;

    fetch('question.txt')
    .then(response => response.text())
    .then(data => {
        const questions = data.split('\n').map(line => {
            const parts = line.split(';');
            if (parts.length === 2) {
                return {
                    question: parts[0].trim(),
                    answer: parts[1].trim()
                };
            }
        });

        questionsAndAnswers = questions;
    })
    .catch(err => console.error('Błąd ładowania pytań:', err));

    function getRandomQuestion() {
        if (questionsAndAnswers.length === 0) return;
        const randomIndex = Math.floor(Math.random() * questionsAndAnswers.length);
        currentQuestionIndex = randomIndex;
        document.getElementById('question').innerHTML = questionsAndAnswers[randomIndex].question;
        document.getElementById('answer').classList.add('hidden');
    }

    function selectQuestion() {
        selectedIndex = document.getElementById('selectInput').value-1;
        if (selectedIndex < 0 || selectedIndex >= questionsAndAnswers.length) {
            selectedIndex = 0;
        }
        document.getElementById('question').innerHTML = questionsAndAnswers[selectedIndex].question;
        document.getElementById('answer').classList.add('hidden');
    }

    document.getElementById('showAnswerButton').addEventListener('click', () => {
        if (currentQuestionIndex !== -1) {
            document.getElementById('answer').innerHTML = questionsAndAnswers[currentQuestionIndex].answer;
            document.getElementById('answer').classList.remove('hidden');
        }
    });


    document.getElementById('nextQuestionButton').addEventListener('click', getRandomQuestion);

    document.getElementById('selectQuestionButton').addEventListener('click', selectQuestion);
});