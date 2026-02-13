const BASE_URL = "https://opentdb.com/api.php?amount=1&type=multiple";

// sessionId comes from app.js (do NOT declare again here)

// =======================
// GET AVAILABLE HUNTS
// =======================
// IMPORTANT: must return ARRAY
async function getHunts() {
    return [
        { id: 1, name: "Online Trivia Hunt" }
    ];
}

// =======================
// START SESSION
// =======================
async function startSession(huntId, name){
    const res = await fetch(BASE_URL + "/session/start",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({huntId:huntId, playerName:name})
    });

    const data = await res.json();
    sessionId = data.sessionId;
}

// =======================
// GET QUESTION
// =======================
async function getQuestion(){
    const res = await fetch(BASE_URL + "/question?session=" + sessionId);
    return await res.json();
}

// =======================
// SEND ANSWER
// =======================
async function sendAnswer(answer,lat,lon){
    const res = await fetch(BASE_URL + "/answer",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
            sessionId:sessionId,
            answer:answer,
            latitude:lat,
            longitude:lon
        })
    });

    return await res.json();
}
