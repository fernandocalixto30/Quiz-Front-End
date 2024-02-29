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

function startQuiz() {
	document.getElementById("start-btn").style.display = "none";
	document.getElementById("quiz-container").style.display = "block";
	showQuestion();
}

function showQuestion() {
	const currentQuestion = questions[currentQuestionIndex];
	const questionElement = document.getElementById("question");
	const optionsElement = document.getElementById("options");

	questionElement.textContent = currentQuestion.question;
	optionsElement.innerHTML = "";

	currentQuestion.options.forEach((option, index) => {
		const optionBtn = document.createElement("button");
		optionBtn.className = "option";
		optionBtn.textContent = option;
		optionBtn.addEventListener("click", () => checkAnswer(option));
		optionsElement.appendChild(optionBtn);
	});

	updateProgressBar();
}

function checkAnswer(selectedOption) {
	const currentQuestion = questions[currentQuestionIndex];
	const result = document.getElementById("result");

	if (selectedOption === currentQuestion.correctAnswer) {
		result.textContent = "Resposta correta!";
		correctAnswersCount++;
	} else {
		result.textContent = "Resposta incorreta. A resposta correta é: " + currentQuestion.correctAnswer;
	}

	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	} else {
		showConclusion();
	}
}

function updateProgressBar() {
	const progressBarInner = document.getElementById("progress-bar-inner");
	const progressPercentage = (currentQuestionIndex / questions.length) * 100;
	progressBarInner.style.width = progressPercentage + "%";
}

function showConclusion() {
	const conclusionElement = document.getElementById("result");
	const accuracy = (correctAnswersCount / questions.length) * 100;

	if (accuracy >= 70) {
		conclusionElement.textContent = "Parabéns! Você se saiu muito bem no quiz. Seu nível de conhecimento é excelente!";
	} else if (accuracy >= 50) {
		conclusionElement.textContent = "Você se saiu razoavelmente no quiz. Há espaço para melhorias no seu conhecimento.";
	} else {
		conclusionElement.textContent = "Parece que há oportunidades de aprendizado. Considere revisar os conceitos.";
	}

	document.getElementById("next-btn").style.display = "none";
}
function showConclusion() {
	const conclusionElement = document.getElementById("result");
	const restartBtn = document.getElementById("restart-btn");
	const accuracy = (correctAnswersCount / questions.length) * 100;

	if (accuracy >= 70) {
		conclusionElement.textContent = "Parabéns! Você se saiu muito bem no quiz. Seu nível de conhecimento é excelente!";
	} else if (accuracy >= 50) {
		conclusionElement.textContent = "Você se saiu razoavelmente no quiz. Há espaço para melhorias no seu conhecimento.";
	} else {
		conclusionElement.textContent = "Parece que há oportunidades de aprendizado. Considere revisar os conceitos.";
	}

	document.getElementById("next-btn").style.display = "none";
	restartBtn.style.display = "block";
}
function nextQuestion() {
	currentQuestionIndex++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
		document.getElementById("result").textContent = "";
		document.getElementById("next-btn").style.display = "block";
		document.getElementById("restart-btn").style.display = "none";
	} else {
		showConclusion();
	}
	updateProgressBar();
}

function restartQuiz() {
	currentQuestionIndex = 0;
	correctAnswersCount = 0;
	showQuestion();
	document.getElementById("result").textContent = "";
	document.getElementById("next-btn").style.display = "block";
	document.getElementById("restart-btn").style.display = "none";
	updateProgressBar();
}