// ==============================
// GLOBAL VARIABLES
// ==============================
let sessionId = null;
let currentAnswer = "";

// ==============================
// LOAD AVAILABLE HUNTS
// ==============================
async function loadHunts() {
    const hunts = await getHunts();

    let html = "<h3>Select a Hunt</h3>";

    hunts.forEach(h => {
        html += `<button onclick="startGame(${h.id})">${h.name}</button><br><br>`;
    });

    document.getElementById("huntList").innerHTML = html;
}

// ==============================
// START GAME
// ==============================
async function startGame(id) {
    const name = document.getElementById("playerName").value;

    if (!name) {
        alert("Enter your name first");
        return;
    }

    await startSession(id, name);

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("questionScreen").style.display = "block";

    loadQuestion();
}

// ==============================
// LOAD QUESTION
// ==============================
async function loadQuestion() {

    document.getElementById("feedback").innerText = "";
    currentAnswer = "";

    const q = await getQuestion();

    // Game finished
    if (q.finished) {
        document.getElementById("questionScreen").style.display = "none";
        document.getElementById("endScreen").style.display = "block";
        document.getElementById("finalScore").innerText = "Final Score: " + q.score;
        return;
    }

    document.getElementById("questionText").innerText = q.text;

    buildAnswerUI(q.type, q.options);
}

// ==============================
// BUILD INPUT BASED ON TYPE
// ==============================
function buildAnswerUI(type, options) {

    let html = "";

    if (type === "text" || type === "number") {
        html = `<input id="answerInput" placeholder="Type your answer">`;
    }

    else if (type === "boolean") {
        html = `
        <button onclick="setAnswer('True')">True</button>
        <button onclick="setAnswer('False')">False</button>`;
    }

    else if (type === "mcq") {
        options.forEach(opt => {
            html += `<button onclick="setAnswer('${opt}')">${opt}</button><br>`;
        });
    }

    document.getElementById("answerArea").innerHTML = html;
}

// ==============================
// STORE SELECTED ANSWER
// ==============================
function setAnswer(ans) {
    currentAnswer = ans;
}

// ==============================
// SUBMIT ANSWER
// ==============================
async function submitAnswer() {

    let ans = currentAnswer;

    if (!ans) {
        const input = document.getElementById("answerInput");
        if (input) ans = input.value;
    }

    if (!ans) {
        alert("Enter or select an answer");
        return;
    }

    const res = await sendAnswer(ans, latitude, longitude);

    if (res.correct) {
        document.getElementById("feedback").innerText = "✅ Correct!";
        setTimeout(loadQuestion, 800);
    }
    else {
        document.getElementById("feedback").innerText = "❌ Wrong! Try again";
    }
}

// ==============================
// SKIP QUESTION
// ==============================
async function skipQuestion() {
    document.getElementById("feedback").innerText = "Question skipped";
    setTimeout(loadQuestion, 500);
}
