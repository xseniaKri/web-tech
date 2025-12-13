document.addEventListener('DOMContentLoaded', () => {

    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const resultScreen = document.getElementById('result-screen');
    const endScreen = document.getElementById('end-screen');

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const nextLevelBtn = document.getElementById('next-level-btn');
    const exitBtn = document.getElementById('exit-btn');
    const playAgainBtn = document.getElementById('play-again-btn');
    const submitAnswerBtn = document.getElementById('submit-answer');

    const levelDisplay = document.getElementById('level-display');
    const questionCounter = document.getElementById('question-counter');
    const correctCounter = document.getElementById('correct-counter');
    const incorrectCounter = document.getElementById('incorrect-counter');

    const questionText = document.getElementById('question-text');
    const answerInput = document.getElementById('answer-input');
    const feedback = document.getElementById('feedback');

    const resultTitle = document.getElementById('result-title');
    const finalScore = document.getElementById('final-score');
    const percentageValue = document.getElementById('percentage-value');
    const resultMessage = document.getElementById('result-message');
    const levelUpMessage = document.getElementById('level-up-message');

    const totalCorrect = document.getElementById('total-correct');
    const totalIncorrect = document.getElementById('total-incorrect');
    const totalPercentage = document.getElementById('total-percentage');

    let gameState = {
        level: 0,
        questionNumber: 1,
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalQuestions: 10,
        usedQuestions: [],
        totalCorrectAll: 0,
        totalIncorrectAll: 0
    };

    let currentQuestion = null;

    const levels = [
        { name: "Начальный" },
        { name: "Средний" },
        { name: "Продвинутый" }
    ];

    function showScreen(screen) {
        [startScreen, gameScreen, resultScreen, endScreen].forEach(s =>
            s.classList.remove('active')
        );
        screen.classList.add('active');
    }

    function updateDisplay() {
        levelDisplay.textContent = levels[gameState.level].name;
        questionCounter.textContent = `${gameState.questionNumber}/${gameState.totalQuestions}`;
        correctCounter.textContent = gameState.correctAnswers;
        incorrectCounter.textContent = gameState.incorrectAnswers;
    }

    function initGame() {
        gameState = {
            level: 0,
            questionNumber: 1,
            correctAnswers: 0,
            incorrectAnswers: 0,
            totalQuestions: 10,
            usedQuestions: [],
            totalCorrectAll: 0,
            totalIncorrectAll: 0
        };
        showScreen(startScreen);
        updateDisplay();
    }

    function startLevel() {
        gameState.questionNumber = 1;
        gameState.correctAnswers = 0;
        gameState.incorrectAnswers = 0;
        gameState.usedQuestions = [];
        showScreen(gameScreen);
        generateQuestion();
        updateDisplay();
    }

    function generateQuestion() {
        let q, id;

        do {
            q = createQuestion();
            id = JSON.stringify(q);
        } while (gameState.usedQuestions.includes(id));

        gameState.usedQuestions.push(id);
        currentQuestion = q;

        questionText.textContent = q.question;
        answerInput.value = '';
        feedback.textContent = '';
        feedback.className = 'feedback';
        answerInput.focus();
    }

    function createQuestion() {
        const level = gameState.level;

        if (level === 0) {
            const ops = ['+', '-', '*'];
            const op = ops[Math.floor(Math.random() * ops.length)];
            const a = Math.floor(Math.random() * 20) + 1;
            const b = Math.floor(Math.random() * 20) + 1;

            const answer = eval(`${a}${op}${b}`);
            return { question: `${a} ${op} ${b} = ?`, answer };
        }

        if (level === 1) {
            if (Math.random() < 0.5) {
                const ops = ['>', '<', '=='];
                const op = ops[Math.floor(Math.random() * ops.length)];
                const a = Math.floor(Math.random() * 50) + 1;
                const b = Math.floor(Math.random() * 50) + 1;
                return {
                    question: `${a} ${op} ${b} (верно/неверно)`,
                    answer: eval(`${a}${op}${b}`)
                };
            } else {
                return createQuestion.call({ level: 0 });
            }
        }

        if (Math.random() < 0.5) {
            const a = Math.random() > 0.5;
            const b = Math.random() > 0.5;
            return {
                question: `${a} AND ${b} (верно/неверно)`,
                answer: a && b
            };
        } else {
            const num = Math.floor(Math.random() * 16);
            return {
                question: `Переведите ${num} в двоичную систему`,
                answer: num.toString(2)
            };
        }
    }

    function checkAnswer() {
        if (!currentQuestion) return;

        let user = answerInput.value.trim().toLowerCase();
        let correct = currentQuestion.answer;
        let isCorrect = false;

        if (typeof correct === 'boolean') {
            isCorrect =
                (user === 'верно' && correct) ||
                (user === 'неверно' && !correct);
        } else if (typeof correct === 'number') {
            isCorrect = Number(user) === correct;
        } else {
            isCorrect = user === correct.toString();
        }

        if (isCorrect) {
            gameState.correctAnswers++;
            feedback.textContent = 'Правильно!';
            feedback.className = 'feedback correct';
        } else {
            gameState.incorrectAnswers++;
            let correctText = correct;
            if (typeof correct === 'boolean') {
                correctText = correct ? 'верно' : 'неверно';
            }
            feedback.textContent = `Неправильно. Ответ: ${correct}`;
            feedback.className = 'feedback incorrect';
        }

        updateDisplay();

        setTimeout(nextQuestion, 1500);
    }

    function nextQuestion() {
        if (gameState.questionNumber < gameState.totalQuestions) {
            gameState.questionNumber++;
            generateQuestion();
        } else {
            finishLevel();
        }
    }

    function finishLevel() {
        const percent = (gameState.correctAnswers / gameState.totalQuestions) * 100;

        gameState.totalCorrectAll += gameState.correctAnswers;
        gameState.totalIncorrectAll += gameState.incorrectAnswers;

        finalScore.textContent = `${gameState.correctAnswers}/10`;
        percentageValue.textContent = `${percent.toFixed(1)}%`;

        if (percent >= 80 && gameState.level < 2) {
            resultTitle.textContent = 'Отлично!';
            resultMessage.textContent = 'Вы можете перейти на следующий уровень.';
            nextLevelBtn.style.display = 'inline-block';
        } else if (gameState.level === 2) {
            finishGame();
            return;
        } else {
            resultTitle.textContent = 'Уровень не пройден';
            resultMessage.textContent = 'Попробуйте еще раз.';
            nextLevelBtn.style.display = 'none';
        }

        showScreen(resultScreen);
    }

    function finishGame() {
        const total = gameState.totalCorrectAll + gameState.totalIncorrectAll;
        const percent = total ? (gameState.totalCorrectAll / total * 100).toFixed(1) : 0;

        totalCorrect.textContent = gameState.totalCorrectAll;
        totalIncorrect.textContent = gameState.totalIncorrectAll;
        totalPercentage.textContent = `${percent}%`;

        showScreen(endScreen);
    }

    startBtn.onclick = startLevel;
    restartBtn.onclick = initGame;
    playAgainBtn.onclick = initGame;
    exitBtn.onclick = initGame;

    nextLevelBtn.onclick = () => {
        gameState.level++;
        startLevel();
    };

    submitAnswerBtn.onclick = checkAnswer;
    answerInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') checkAnswer();
    });

    initGame();
});
