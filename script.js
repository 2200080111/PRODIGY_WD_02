let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let laps = [];

const startPauseButton = document.getElementById("startPause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

startPauseButton.addEventListener("click", startPause);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", lap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(getShowTime, 10);
        running = true;
        startPauseButton.innerHTML = "Pause";
        display.classList.add("running");
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        startPauseButton.innerHTML = "Start";
        display.classList.remove("running");
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00";
    startPauseButton.innerHTML = "Start";
    display.classList.remove("running");
    laps = [];
    lapsContainer.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = formatTime(difference);
        laps.push(lapTime);
        const lapElement = document.createElement("div");
        lapElement.innerText = `Lap ${laps.length}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.innerHTML = formatTime(difference);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    return `${pad(minutes)}:${pad(seconds)}:${pad(milliseconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}
