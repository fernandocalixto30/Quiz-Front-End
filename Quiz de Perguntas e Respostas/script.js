const questions = [
	{
        question: "O que significa CSS?",
        options: ["Central Style Sheet", "Cascading Style Sheet", "Computer Style Sheet", "Creative Style Sheet"],
        correctAnswer: "Cascading Style Sheet"
    },
    {
        question: "Qual linguagem é usada para a estruturação de páginas web?",
        options: ["JavaScript", "CSS", "HTML", "Java"],
        correctAnswer: "HTML"
    },
    {
        question: "O que é DOM em JavaScript?",
        options: ["Document Object Model", "Data Object Model", "Design Object Model", "Digital Object Model"],
        correctAnswer: "Document Object Model"
    },
    {
        question: "Qual seletor CSS seleciona elementos com uma determinada classe?",
        options: [".class", "#id", "element", "tag"],
        correctAnswer: ".class"
    },
    {
        question: "Qual é a função do JavaScript no desenvolvimento web?",
        options: ["Manipular o estilo das páginas", "Controlar a estrutura das páginas", "Adicionar interatividade às páginas", "Formatar o conteúdo das páginas"],
        correctAnswer: "Adicionar interatividade às páginas"
    },
    {
        question: "O que significa HTML?",
        options: ["Hypertext Markup Language", "Hyper Transfer Markup Language", "High-Level Text Markup Language", "Home Tool Markup Language"],
        correctAnswer: "Hypertext Markup Language"
    },
    {
        question: "O que é JavaScript?",
        options: ["Uma linguagem de marcação", "Uma linguagem de programação", "Um estilo de folha", "Um formato de arquivo"],
        correctAnswer: "Uma linguagem de programação"
    },
    {
        question: "Qual propriedade CSS é usada para definir o tamanho da fonte?",
        options: ["font-family", "font-style", "font-size", "font-weight"],
        correctAnswer: "font-size"
    }
];

let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let displayedQuestions = new Set();

function startQuiz() {
    hideElement("start-btn");
    showElement("quiz-container");

    shuffleQuestions();
    currentQuestionIndex = 0;
    correctAnswersCount = 0;

    updateProgressBar();
    showQuestion();
}

function hideElement(elementId) {
    document.getElementById(elementId).style.display = "none";
}

function showElement(elementId) {
    document.getElementById(elementId).style.display = "block";
}

function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]];
    }
}

function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
}

function showQuestion() {
    updateProgressBar(); 

    if (currentQuestionIndex < questions.length) {
        const currentQuestion = questions[currentQuestionIndex];

        displayedQuestions.add(currentQuestion);

        const questionElement = document.getElementById("question");
        const optionsElement = document.getElementById("options");

        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = "";

        shuffleOptions(currentQuestion.options);

        currentQuestion.options.forEach((option, index) => {
            createOptionButton(option, index, currentQuestion.correctAnswer);
        });
    } else {
        handleQuizCompletion();
        showElement("restart-btn");
    }
}

function createOptionButton(option, index, correctAnswer) {
    const optionBtn = document.createElement("button");
    optionBtn.className = "option";
    optionBtn.textContent = option;
    optionBtn.addEventListener("click", () => checkAnswer(option, correctAnswer));
    document.getElementById("options").appendChild(optionBtn);
}

function checkAnswer(selectedOption, correctAnswer) {
    const result = document.getElementById("result");

    document.querySelectorAll(".option").forEach(btn => btn.disabled = true);

    document.querySelectorAll(".option").forEach(btn => {
        if (btn.textContent === correctAnswer) {
            btn.classList.add("correct");
        } else {
            btn.classList.add("incorrect");
        }
    });

    if (selectedOption === correctAnswer) {
        correctAnswersCount++;
    }

    currentQuestionIndex++;

    result.textContent = "";
    setTimeout(() => {
        showQuestion();
    }, 1000);
}

function updateProgressBar() {
    const progressBarInner = document.getElementById("progress-bar-inner");
    const progressPercentage = (currentQuestionIndex / questions.length) * 100;
    progressBarInner.style.width = progressPercentage + "%";
}

function handleQuizCompletion() {
    const conclusionElement = document.getElementById("result");
    const restartBtn = document.getElementById("restart-btn");
    const accuracy = (correctAnswersCount / questions.length) * 100;

    conclusionElement.textContent = "";

    if (accuracy === 100) {
        conclusionElement.textContent = "Parabéns! Você acertou todas as perguntas. Seu conhecimento é excelente!";
    } else if (accuracy >= 70) {
        conclusionElement.textContent = "Parabéns! Você se saiu muito bem no quiz. Seu nível de conhecimento é bom!";
    } else if (accuracy >= 50) {
        conclusionElement.textContent = "Você se saiu razoavelmente no quiz. Há espaço para melhorias no seu conhecimento.";
    } else {
        conclusionElement.textContent = "Infelizmente, sua pontuação foi baixa. Continue estudando e você melhorará!";
    }

    setTimeout(() => {
        restartBtn.style.display = "flex";
    }, 1000);
}

function restartQuiz() {
    displayedQuestions.clear();
    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    showQuestion();
    document.getElementById("result").textContent = "";
    document.getElementById("restart-btn").style.display = "none";
    updateProgressBar();
}
