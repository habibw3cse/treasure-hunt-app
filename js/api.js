// ================= API LAYER =================
// Development mode using free trivia API

let questionCount = 0;
const MAX_QUESTIONS = 5;
let correctAnswer = "";
let score = 0;


// -------- GET HUNTS --------
async function getHunts(){
    return [
        { id: 1, name: "Online Trivia Hunt" }
    ];
}

// -------- START SESSION --------
async function startSession(huntId, playerName){
    console.log("Session started for:", playerName);
    score = 0;
}

// -------- GET QUESTION --------
async function getQuestion(){

    try {

        // stop game after max questions
        if(questionCount >= MAX_QUESTIONS){
            return { finished:true, score:score };
        }

        const res = await fetch("https://opentdb.com/api.php?amount=1&type=multiple");

        if(!res.ok){
            document.getElementById("statusMsg").innerText =
                "❌ Server error while loading question";
            return { finished:true, score:score };
        }

        const data = await res.json();
        const q = data.results[0];

        // store correct answer
        correctAnswer = decodeHTML(q.correct_answer);

        questionCount++;

        return {
            text: decodeHTML(q.question),
            type: "mcq",
            options: shuffle([
                decodeHTML(q.correct_answer),
                ...q.incorrect_answers.map(a=>decodeHTML(a))
            ]),
            finished:false
        };

    }
    catch(err){
        document.getElementById("statusMsg").innerText =
            "❌ Unable to connect to quiz server";
        return { finished:true, score:score };
    }
}

// -------- SUBMIT ANSWER --------
async function apiSubmitAnswer(answer, latitude, longitude){

    let isCorrect = answer === correctAnswer;

    if(isCorrect) score += 10;
    else score -= 5;

    return {
        correct:isCorrect,
        score:score
    };
}

// -------- LOCATION UPDATE --------
async function updateLocation(lat, lon){
    console.log("Location:",lat,lon);
}

// -------- HELPERS --------
function shuffle(arr){
    return arr.sort(()=>Math.random()-0.5);
}

function decodeHTML(html){
    const txt=document.createElement("textarea");
    txt.innerHTML=html;
    return txt.value;
}

