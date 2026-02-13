let sessionId=null;
let currentAnswer="";

async function loadHunts(){
    const hunts=await getHunts();
    let html="";
    hunts.forEach(h=>{
        html+=`<button onclick="startGame(${h.id})">${h.name}</button><br>`;
    });
    document.getElementById("huntList").innerHTML=html;
}

async function startGame(id){
    const name=document.getElementById("playerName").value;
    await startSession(id,name);
    document.getElementById("startScreen").style.display="none";
    document.getElementById("questionScreen").style.display="block";
    loadQuestion();
}

async function loadQuestion(){
    const q=await getQuestion();

    if(q.finished){
        document.getElementById("questionScreen").style.display="none";
        document.getElementById("endScreen").style.display="block";
        document.getElementById("finalScore").innerText="Score: "+q.score;
        return;
    }

    document.getElementById("questionText").innerText=q.text;

    if(q.type==="boolean"){
        document.getElementById("answerArea").innerHTML=`
        <button onclick="setAnswer('True')">True</button>
        <button onclick="setAnswer('False')">False</button>`;
    }else{
        document.getElementById("answerArea").innerHTML=`<input id="answerInput">`;
    }
}

function setAnswer(a){
    currentAnswer=a;
}

async function submitAnswer(){
    let ans=currentAnswer||document.getElementById("answerInput").value;
    const res=await sendAnswer(ans,latitude,longitude);
    document.getElementById("feedback").innerText=res.correct?"Correct":"Wrong";
    if(res.correct)loadQuestion();
}

function skipQuestion(){
    loadQuestion();
}

