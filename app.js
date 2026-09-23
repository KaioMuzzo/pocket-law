let questions = [];
let deck = [];
let correctCount = 0;
let answeredCount = 0;

async function loadQuestions() {
    const response = await fetch("questions.json");
    questions = await response.json();
    showQuestion();
}

function showQuestion() {
    document.getElementById("next").classList.add("hidden");

    if (deck.length === 0) {
        deck = shuffle(questions);
    }
    const current = deck.pop();
    document.getElementById("question").textContent = current.question;

    const wrong = shuffle(getWrongAnswers(current)).slice(0, 3);
    const options = shuffle([current.answer, ...wrong]);

    const container = document.getElementById("options");
    container.innerHTML = "";

    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "text-left p-3 rounded-lg border border-slate-300 enabled:hover:bg-slate-50";
        button.addEventListener("click", () => checkAnswer(button, current.answer));
        container.appendChild(button);
    });
}

function getWrongAnswers(current) {
    if (current.wrongAnswers) {
        return current.wrongAnswers;
    }

    const siblings = questions
        .filter(q => q.topic === current.topic)
        .map(q => q.answer)
        .filter(answer => answer !== current.answer);

    return [...new Set(siblings)];
}

function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
}

function checkAnswer(clicked, correctAnswer) {
    const buttons = document.querySelectorAll("#options button");

    buttons.forEach(button => {
        button.disabled = true;
        if (button.textContent === correctAnswer) {
            button.classList.replace("border-slate-300", "border-green-500");
            button.classList.add("bg-green-100");
        }
    });

    if (clicked.textContent !== correctAnswer) {
        clicked.classList.replace("border-slate-300", "border-red-500");
        clicked.classList.add("bg-red-100");
    } else {
        correctCount++;
    }

    answeredCount++;
    document.getElementById("score").textContent = `Acertos: ${correctCount} de ${answeredCount}`;
    document.getElementById("next").classList.remove("hidden");
}

document.getElementById("next").addEventListener("click", showQuestion);
loadQuestions();