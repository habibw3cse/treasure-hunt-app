async function loadHunts(){
    const hunts = await getHunts();

    let html="";
    hunts.forEach(h=>{
        html += `<button onclick="startGame(${h.id})">${h.name}</button><br>`;
    });

    document.getElementById("huntList").innerHTML = html;
}

