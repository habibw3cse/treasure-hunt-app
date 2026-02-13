// =============================
// DEVELOPMENT MODE (NO SERVER)
// =============================

let currentCorrectAnswer = "";

// Fake hunt list
async function getHunts() {
    return [
        { id: 1, name: "Online Trivia Hunt" }
    ];
}

// Fake start session
async function startSession(huntId, name) {
    console.log("Session started for:", name);
}

// Get question from free trivia API
async function getQuestion() {

    const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");
    const data = await res.json();

    const q = data.results[0];

    currentCorrectAnswer = q.correct_answer;

    return {
        text: decodeHTML(q.question),
        type: "mcq",
        options: shuffle([q.correct_answer, ...q.incorrect_answers]),
        finished: false
    };
}

// Check answer locally
async function sendAnswer(answer, lat, lon) {
    return {
        correct: answer === currentCorrectAnswer
    };
}

// helpers
function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

function decodeHTML(html) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}
