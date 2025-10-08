const questions = [
    {
        question:"which is largest animal in the world ?",
        answers:[
            { text: "Shark", correct: false},
            { text: "Blue Whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Lion", correct: false}
        ]
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false }
        ]

    },

    {
        question: "Who was the first President of India?",
        answers: [
            { text: "Dr. Rajendra Prasad", correct: true },
            { text: "Jawaharlal Nehru", correct: false },
            { text: "Sardar Patel", correct: false },
            { text: "Subhas Chandra Bose", correct: false }
        ]
    },

    {
        question: "What is the national animal of India?",
        answers: [
            { text: "Elephant", correct: false },
            { text: "Tiger", correct: true },
            { text: "Lion", correct: false },
            { text: "Peacock", correct: false }
        ]
    },

    {
        question: "Which is the largest ocean in the world?",
        answers: [
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Atlantic Ocean", correct: false },
            { text: "Arctic Ocean", correct: false }
        ]
  },



];
    

const questionElement = document.getElementById("question");

const answerButtons = document.getElementById("ans-buttons");

const nextButton =document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

let timer;
let timeLeft = 60;





function startQuize(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    document.getElementById("timer").style.display = "block";
    showQuestion()
}

function showQuestion(){
    resetstate();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo +". "+currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
    startTimer(); 
}
    

function resetstate(){
    clearInterval(timer);
    nextButton.style.display= 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    clearInterval(timer);
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct == "true";
    if(iscorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetstate();
    document.getElementById("timer").style.display = "none";
    questionElement.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex< questions.length){
        handleNextButton();
    }else{
        startQuize();
    }
})

function startTimer() {
    timeLeft = 60;
    document.getElementById("timer").innerHTML = `Time Left: ${timeLeft}s`;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").innerHTML = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    // Disable all buttons
    Array.from(answerButtons.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextButton.style.display = "block";
}






startQuize();