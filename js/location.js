let latitude = null;
let longitude = null;

function getLocation(){
    navigator.geolocation.getCurrentPosition(pos=>{
        latitude = pos.coords.latitude;
        longitude = pos.coords.longitude;
        console.log("Location:",latitude,longitude);
    },()=>{
        alert("Please enable GPS");
    });
}

setInterval(getLocation,120000); // every 2 minutes

