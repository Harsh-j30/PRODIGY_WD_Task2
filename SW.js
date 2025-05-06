 // Get references to the display and buttons
 let display = document.getElementById("display");
 let startStopButton = document.getElementById("startStop");
 let lapButton = document.getElementById("lap");
 let resetButton = document.getElementById("reset");
 let lapsList = document.getElementById("laps");

 // Define variables to store time values
 let seconds = 0;
 let minutes = 0;
 let hours = 0;
 let intervalId = null;
 let lapCount = 1;

 // Function to update the display with the current time
 function updateDisplay() {
     let h = hours < 10 ? "0" + hours : hours;
     let m = minutes < 10 ? "0" + minutes : minutes;
     let s = seconds < 10 ? "0" + seconds : seconds;
     display.textContent = h + ":" + m + ":" + s;
 }

 // Function to start the timer
 function startTimer() {
     if (intervalId !== null) return;

     intervalId = setInterval(() => {
         seconds++;
         if (seconds === 60) {
             seconds = 0;
             minutes++;
             if (minutes === 60) {
                 minutes = 0;
                 hours++;
             }
         }
         updateDisplay();
     }, 1000);
     startStopButton.textContent = "Pause";
     startStopButton.classList.remove("start-pause");
     startStopButton.classList.add("lap");
 }

 // Function to pause the timer
 function pauseTimer() {
     clearInterval(intervalId);
     intervalId = null;
     startStopButton.textContent = "Start";
     startStopButton.classList.remove("lap");
     startStopButton.classList.add("start-pause");
 }

 // Function to handle the start/pause button click
 function toggleStartStop() {
     if (intervalId === null) {
         startTimer();
     } else {
         pauseTimer();
     }
 }

 // Function to record and display a lap time
 function recordLap() {
     if (intervalId === null) return;

     let lapTime = display.textContent;
     let lapItem = document.createElement("li");
     lapItem.className = "lap-item";
     lapItem.textContent = `Lap ${lapCount}: ${lapTime}`;
     lapsList.appendChild(lapItem);
     lapCount++;
 }

 // Function to reset the timer and lap times
 function resetTimer() {
     pauseTimer();
     seconds = 0;
     minutes = 0;
     hours = 0;
     updateDisplay();
     lapsList.innerHTML = ""; // Clear the lap times list
     lapCount = 1;
 }

 // Event listeners for the buttons
 startStopButton.addEventListener("click", toggleStartStop);
 lapButton.addEventListener("click", recordLap);
 resetButton.addEventListener("click", resetTimer);