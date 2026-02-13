let latitude = 0;
let longitude = 0;

// get current position once
function getCurrentLocation() {
    return new Promise((resolve, reject) => {

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                latitude = pos.coords.latitude;
                longitude = pos.coords.longitude;

                console.log("GPS update:", latitude, longitude);

                updateLocation(latitude, longitude);
                resolve();
            },
            () => reject(),
            { enableHighAccuracy:true }
        );

    });
}

// automatic update every 2 minutes
setInterval(() => {
    getCurrentLocation();
}, 120000);
