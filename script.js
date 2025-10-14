// Questions data
const questions = [
    {"question": "Which type of cell has a membrane-bound nucleus?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Eukaryotic", "explanation": "The nucleus stores DNA and controls cell activities."},
    {"question": "Which type of cell lacks membrane-bound organelles?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Prokaryotic", "explanation": "Prokaryotic cells lack organelles like mitochondria."},
    {"question": "To which type do bacteria belong?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Prokaryotic", "explanation": "Bacteria are simple, single-celled organisms."},
    {"question": "Which type of cell contains mitochondria?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Eukaryotic", "explanation": "Mitochondria produce energy via cellular respiration."},
    {"question": "Prokaryotic cells are typically:", "options": ["Single-celled", "Multi-celled"], "correct": "Single-celled", "explanation": "Single-celled organisms perform all functions in one cell."},
    {"question": "Which type of cell has a peptidoglycan cell wall?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Prokaryotic", "explanation": "The peptidoglycan cell wall provides support."},
    {"question": "To which type do plant cells belong?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Eukaryotic", "explanation": "Plant cells have chloroplasts for photosynthesis."},
    {"question": "Which type of cell is generally larger?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Eukaryotic", "explanation": "Larger size supports complex functions."},
    {"question": "Which type of cell has DNA in the cytoplasm?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Prokaryotic", "explanation": "DNA floats freely in the cytoplasm in prokaryotes."},
    {"question": "To which type do animal cells belong?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Eukaryotic", "explanation": "Animal cells have a nucleus but no cell wall."},
    {"question": "Which type of cell lacks a membrane-bound nucleus?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Prokaryotic", "explanation": "DNA is not enclosed in a membrane."},
    {"question": "To which type do fungi belong?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Eukaryotic", "explanation": "Fungi have complex structures like plants."},
    {"question": "Which type of cell has 70S ribosomes?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Prokaryotic", "explanation": "70S ribosomes synthesize proteins."},
    {"question": "Which type of cell has an endoplasmic reticulum?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Eukaryotic", "explanation": "The ER aids in protein synthesis and transport."},
    {"question": "Prokaryotic cells typically have:", "options": ["Only a cell wall", "Cell wall and organelles"], "correct": "Only a cell wall", "explanation": "The cell wall gives shape and protection."},
    {"question": "Which type of cell has linear chromosomes?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Eukaryotic", "explanation": "Linear chromosomes store genetic info in the nucleus."},
    {"question": "To which type do archaea belong?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Prokaryotic", "explanation": "Archaea are prokaryotes with unique traits."},
    {"question": "Which type of cell can be multicellular?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Eukaryotic", "explanation": "Multicellular organisms have specialized cells."},
    {"question": "In prokaryotic cells, DNA is typically:", "options": ["Circular", "Linear"], "correct": "Circular", "explanation": "Circular DNA is compact and simple."},
    {"question": "Which type of cell has a Golgi apparatus?", "options": ["Eukaryotic", "Prokaryotic"], "correct": "Eukaryotic", "explanation": "The Golgi apparatus processes and packages proteins."}
];

// Application variables
let currentQuestion = 0;
let score = 0;
let studentName = "";
let selectedOption = null;
let attempts = 0;

// DOM elements
const welcomeSection = document.getElementById('welcome-section');
const quizSection = document.getElementById('quiz-section');
const resultsSection = document.getElementById('results-section');
const studentNameInput = document.getElementById('student-name');
const startBtn = document.getElementById('start-btn');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const nextBtn = document.getElementById('next-btn');
const feedback = document.getElementById('feedback');
const feedbackText = document.getElementById('feedback-text');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');
const resultsTitle = document.getElementById('results-title');
const scoreElement = document.getElementById('score');
const resultsMessage = document.getElementById('results-message');
const restartBtn = document.getElementById('restart-btn');

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
    progressText.textContent = 'Question ' + (currentQuestion + 1) + ' of ' + questions.length;
}

// Display current question
function displayQuestion() {
    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    
    // Clear previous options
    optionsContainer.innerHTML = '';
    selectedOption = null;
    
    // Add new options
    question.options.forEach(function(option) {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', function() {
            selectOption(optionElement, option);
        });
        optionsContainer.appendChild(optionElement);
    });
    
    // Reset button states
    submitBtn.disabled = true;
    nextBtn.classList.add('hidden');
    feedback.style.display = 'none';
    
    // Update progress bar
    updateProgress();
}

// Select an option
function selectOption(optionElement, option) {
    // Remove selection from all options
    const allOptions = document.querySelectorAll('.option');
    allOptions.forEach(function(el) {
        el.classList.remove('selected');
    });
    
    // Select the clicked option
    optionElement.classList.add('selected');
    selectedOption = option;
    submitBtn.disabled = false;
}

// Check answer
function checkAnswer() {
    const question = questions[currentQuestion];
    const isCorrect = selectedOption === question.correct;
    
    // Show feedback
    feedback.style.display = 'block';
    if (isCorrect) {
        feedback.className = 'feedback correct';
        feedbackText.innerHTML = '<strong>Correct!</strong> ' + question.explanation;
        score++;
        nextBtn.classList.remove('hidden');
        submitBtn.disabled = true;
    } else {
        feedback.className = 'feedback incorrect';
        attempts++;
        
        if (attempts === 1) {
            feedbackText.innerHTML = '<strong>Incorrect!</strong> Try again! Consider whether the cell has a nucleus or organelles to choose the correct answer.';
            submitBtn.disabled = false;
        } else {
            feedbackText.innerHTML = '<strong>Incorrect!</strong> The correct answer is: ' + question.correct + '. Explanation: ' + question.explanation;
            nextBtn.classList.remove('hidden');
            submitBtn.disabled = true;
        }
    }
}

// Move to next question
function nextQuestion() {
    currentQuestion++;
    attempts = 0;
    
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

// Show results
function showResults() {
    quizSection.style.display = 'none';
    resultsSection.style.display = 'block';
    
    scoreElement.textContent = score + '/' + questions.length;
    
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
        resultsTitle.textContent = 'Congratulations ' + studentName + '! Excellent Performance';
        resultsMessage.textContent = 'You have demonstrated an excellent understanding of the differences between eukaryotic and prokaryotic cells.';
    } else if (percentage >= 60) {
        resultsTitle.textContent = 'Well Done ' + studentName + '!';
        resultsMessage.textContent = 'You have a good understanding of cells, but you can improve your knowledge of some concepts.';
    } else {
        resultsTitle.textContent = 'Try Again ' + studentName;
        resultsMessage.textContent = 'It seems you need to review the differences between eukaryotic and prokaryotic cells.';
    }
}

// Reset quiz
function resetQuiz() {
    currentQuestion = 0;
    score = 0;
    attempts = 0;
    selectedOption = null;
    
    welcomeSection.style.display = 'block';
    quizSection.style.display = 'none';
    resultsSection.style.display = 'none';
    
    studentNameInput.value = '';
}

// Event listeners
startBtn.addEventListener('click', function() {
    studentName = studentNameInput.value.trim();
    if (studentName) {
        welcomeSection.style.display = 'none';
        quizSection.style.display = 'block';
        displayQuestion();
    } else {
        alert('Please enter your name!');
    }
});

submitBtn.addEventListener('click', checkAnswer);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', resetQuiz);