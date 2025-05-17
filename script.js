const questionContainer = document.getElementById('question-container');
const answerInput = document.getElementById('answer-input');
const submitButton = document.getElementById('submit-button');
const nextButton = document.getElementById('next-button');
const resultMessage = document.getElementById('result-message');

let currentQuestionIndex = 0;
let questions = [];

// Функция для загрузки вопросов из JSON файлов
async function loadQuestions() {
    try {
        const response1 = await fetch('questions/question1.json');
        const response2 = await fetch('questions/question2.json'); // Замените на нужное количество файлов

        const data1 = await response1.json();
        const data2 = await response2.json();

        questions = [data1, data2]; // Объедините данные из разных файлов
        startQuiz();
    } catch (error) {
        console.error("Ошибка загрузки вопросов:", error);
        questionContainer.textContent = "Ошибка загрузки вопросов.  Пожалуйста, проверьте консоль.";
    }
}

function startQuiz() {
    currentQuestionIndex = 0;
    nextButton.style.display = 'none';
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionContainer.textContent = question.question;
    answerInput.value = ''; // Очистка поля ввода
    resultMessage.textContent = '';
    submitButton.style.display = 'block';
}


submitButton.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim(); // Получаем ответ пользователя и убираем пробелы
    const question = questions[currentQuestionIndex];
    const correctAnswer = question.correctAnswer; // Получаем правильный ответ (текстом)

    if (userAnswer === correctAnswer) {
        resultMessage.textContent = 'Правильно!';
        resultMessage.classList.add('correct');
        resultMessage.classList.remove('incorrect');
    } else {
        resultMessage.textContent = 'Неправильно. Правильный ответ: ' + correctAnswer;
        resultMessage.classList.add('incorrect');
        resultMessage.classList.remove('correct');
    }

    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
});


nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionContainer.textContent = 'Вы прошли все вопросы!';
        answerInput.style.display = 'none'; // Скрываем поле ввода
        submitButton.style.display = 'none';
        nextButton.style.display = 'none';
    }
});


loadQuestions();