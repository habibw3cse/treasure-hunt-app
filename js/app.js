// ================= GLOBAL STATE =================
let currentAnswer = "";

// ================= LOAD HUNTS =================
async function loadHunts() {

    const hunts = await getHunts();

    let html = "<h3>Select a Hunt</h3>";

    hunts.forEach(h => {
        html += `<button onclick="startGame(${h.id})">${h.name}</button><br><br>`;
    });

    document.getElementById("huntList").innerHTML = html;
}

// ================= START GAME =================
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

// ================= LOAD QUESTION =================
async function loadQuestion() {

    document.getElementById("feedback").innerText = "";
    currentAnswer = "";

    const q = await getQuestion();

    // ===== GAME FINISHED =====
    if (q.finished) {
        document.getElementById("questionScreen").style.display = "none";
        document.getElementById("endScreen").style.display = "block";
        document.getElementById("finalScore").innerText = "Final Score: " + q.score;
        return;
    }

    // ===== SHOW QUESTION =====
    document.getElementById("questionText").innerText = q.text;

    buildAnswerUI(q.type, q.options);
}


// ================= BUILD ANSWER UI =================
function buildAnswerUI(type, options) {

    let html = "";

    if (type === "mcq") {
        options.forEach(opt => {
            html += `<button onclick="setAnswer('${opt}')">${opt}</button><br>`;
        });
    } else {
        html = `<input id="answerInput" placeholder="Type your answer">`;
    }

    document.getElementById("answerArea").innerHTML = html;
}

// ================= STORE ANSWER =================
function setAnswer(ans) {
    currentAnswer = ans;
}

// ================= SUBMIT ANSWER =================
async function submitAnswer() {

    let ans = currentAnswer;

    const input = document.getElementById("answerInput");
    if (!ans && input) ans = input.value.trim();

    if (!ans) {
        alert("Enter or select an answer");
        return;
    }

    // GET GPS FIRST
    await getCurrentLocation();

    const res = await apiSubmitAnswer(ans, latitude, longitude);

    if (res.correct) {
        document.getElementById("feedback").innerText = "✅ Correct!";
        setTimeout(loadQuestion, 800);
    } else {
        document.getElementById("feedback").innerText = "❌ Wrong!";
    }
}



// ================= SKIP =================
function skipQuestion(){
    loadQuestion();
}

