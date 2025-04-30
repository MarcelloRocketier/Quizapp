let rightQuestions = 0;
let currentQuestion = 0;

function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function showQuestion() {
    if (currentQuestion >= questions.length) {
        // Quiz beendet
        document.getElementById('endScreen').style.display = '';
        document.getElementById('questionBody').style.display = 'none';
        document.getElementById('amount-of-questions').innerHTML = questions.length;
        document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;

        // Zeige den "Wieder spielen"-Button an
        document.getElementById('restart-button').style.display = 'block';
    } else {
        // Frage und Fortschrittsbalken anzeigen
        let percent = ((currentQuestion + 1) / questions.length) * 100;
        percent = Math.round(percent);
        document.getElementById('progress-bar').style.width = `${percent}%`;
        document.getElementById('progress-bar').setAttribute('aria-valuenow', percent);
        document.getElementById('progress-bar').innerText = `${percent}%`;

        let question = questions[currentQuestion];
        document.getElementById('question-number').innerHTML = currentQuestion + 1;
        document.getElementById('questiontext').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    }
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1); 
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (selectedQuestionNumber == question['right_answer']) {
        document.getElementById(selection).parentNode.classList.add('bg-success');
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('next-button').disabled = false;
}

function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger', 'bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger', 'bg-success');
}

// Neustart des Quiz
function restartQuiz() {
    currentQuestion = 0;
    rightQuestions = 0;
    document.getElementById('endScreen').style.display = 'none';
    document.getElementById('questionBody').style.display = '';
    document.getElementById('progress-bar').style.width = '0%';
    document.getElementById('progress-bar').setAttribute('aria-valuenow', '0');
    document.getElementById('progress-bar').innerText = '0%';
    
    showQuestion();
}