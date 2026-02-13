const BASE_URL = "const BASE_URL = "https://treasurehunt.cs.ucy.ac.cy/api";

//let sessionId = null;

async function getHunts(){
    const res = await fetch(BASE_URL + "/hunts");
    return await res.json();
}

async function startSession(huntId, name){
    const res = await fetch(BASE_URL + "/session/start",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({huntId:huntId, playerName:name})
    });

    const data = await res.json();
    sessionId = data.sessionId;
}

async function getQuestion(){
    const res = await fetch(BASE_URL + "/question?session=" + sessionId);
    return await res.json();
}

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
