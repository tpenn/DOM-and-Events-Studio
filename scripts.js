// Write your JavaScript code here.
// Remember to pay attention to page loading!
function handleTakeoff() {
    if (globals.rocketState) {
        window.alert("The shuttle is already in flight.")
        return;
    }
    
    if (window.confirm("Confirm that the shuttle is ready for takeoff.")) {
        globals.flightStatus.innerHTML = "Shuttle in flight";
        globals.flightScreen.style.backgroundColor = 'blue';
        globals.shuttleAltitude.innerHTML = parseInt(globals.shuttleAltitude.innerHTML) + 10000;
        // globals.rocket.style.top = '0px';
        globals.rocketState = 1;
    }
}

function handleAbort() {
    if (!globals.rocketState) {
        window.alert("The shuttle is not in flight.")
        return;
    }

    if (window.confirm("Confirm that you want to abort the mission.")) {
        globals.flightStatus.innerHTML = "Mission aborted";
        globals.flightScreen.style.backgroundColor = 'green';
        globals.shuttleAltitude.innerHTML = parseInt(globals.shuttleAltitude.innerHTML) + 10000;
        initRocket();
    }
}

function handleLanding() {
    if (!globals.rocketState) {
        window.alert("The shuttle is not in flight.")
        return;
    }
    
    window.alert("The shuttle is landing  Landing gear engaged.");

    globals.flightStatus.innerHTML = "The shuttle has landed";
    globals.flightScreen.style.backgroundColor = 'green';
    globals.shuttleAltitude.innerHTML = 0;
    initRocket();
}

function handleUp() {
    if (!globals.rocketState) {
        window.alert("The shuttle is not in flight.")
        return;
    }
    
    globals.shuttleAltitude.innerHTML = parseInt(globals.shuttleAltitude.innerHTML) + 10000;
    globals.rocket.style.top = Math.max(globals.flightScreen.offsetHeight - globals.rocket.offsetHeight - parseInt(globals.shuttleAltitude.innerHTML) / 1000, 0) + 'px';
}
function handleDown() {
    if (!globals.rocketState) {
        window.alert("The shuttle is not in flight.")
        return;
    }
    
    globals.shuttleAltitude.innerHTML = Math.max(parseInt(globals.shuttleAltitude.innerHTML) - 10000, 0);
    globals.rocket.style.top = Math.min(Math.max(globals.flightScreen.offsetHeight - globals.rocket.offsetHeight - parseInt(globals.shuttleAltitude.innerHTML) / 1000, 0), globals.flightScreen.offsetHeight - globals.rocket.offsetHeight) + 'px';

    if (globals.shuttleAltitude.innerHTML === "0") {
        handleLanding();
    }
}
function handleLeft() {
    if (!globals.rocketState) {
        window.alert("The shuttle is not in flight.")
        return;
    }
    
    globals.rocket.style.left = Math.max(parseInt(globals.rocket.style.left) - 10, 0) + 'px';
}
function handleRight() {
    if (!globals.rocketState) {
        window.alert("The shuttle is not in flight.")
        return;
    }
    
    globals.rocket.style.left = Math.min(parseInt(globals.rocket.style.left) + 10, globals.flightScreen.offsetWidth - globals.rocket.offsetWidth) + 'px';
}

function initRocket() {
    globals.rocket.style.top = (globals.flightScreen.offsetHeight - globals.rocket.offsetHeight) + 'px';
    globals.rocket.style.left = Math.trunc(globals.flightScreen.offsetWidth / 2 - globals.rocket.offsetWidth / 2) + 'px';
    globals.rocketState = 0;
}

function init() {
    globals.flightStatus = document.getElementById('flightStatus');
    globals.flightScreen = document.getElementById('shuttleBackground');
    globals.shuttleAltitude = document.getElementById('spaceShuttleHeight');
    globals.rocket = document.getElementById('rocket');

    initRocket();
    
    document.getElementById("takeoff").addEventListener('click', handleTakeoff);
    document.getElementById("landing").addEventListener('click', handleLanding);
    document.getElementById("missionAbort").addEventListener('click', handleAbort);
    document.getElementById("up").addEventListener('click', handleUp);
    document.getElementById("down").addEventListener('click', handleDown);
    document.getElementById("left").addEventListener('click', handleLeft);
    document.getElementById("right").addEventListener('click', handleRight);


    // globals.flightStatus.innerHTML = parseInt(globals.rocket.style.left);
}

const globals = {};
window.addEventListener("load", init);