"use strict";
/////////////////////////////////////////////////

//Variables
//// Audio Elements
const audioPlayer = document.getElementById("audioPlayer");
audioPlayer.src = "../assets/Stick Control Sounds/first.mp3";
const audioPlayer2 = document.getElementById("audioPlayer2");
audioPlayer2.src = "../assets/Stick Control Sounds/other.wav";

////Workout Elements
const stickControlToggleEl = document.getElementById("toggle");
const stickControlImageDivEl = document.getElementById("imgDiv");
const stickControlMeasureNumberDivEl =
  document.getElementById("measureNumberDiv");
const stickControlBannerDivEl = document.getElementById("banner-title");
const stickControlRudimentTextEl = document.getElementById("rudimentText");
const stickControlMeasuresPerRudimentEl = document.getElementById(
  "measures-per-rudiment"
);
const workoutStateEl = document.getElementById("workout-state");

////Metronome Elements
const metronomeBPMEl = document.getElementById("metronomeBPM");
const metronomeToggleEl = document.getElementById("toggleMetronome");
const metronomeNoteTypeEl = document.getElementById("metronome-note-type");

//// Workout Initial Setup
let stickControlMeasuresPerRudiment = stickControlMeasuresPerRudimentEl.value;
let measureNumber = 0;
let rudimentNumber = 0;

//// Metronome Initial Setup
let metronomeNoteType = metronomeNoteTypeEl.value;
let metronomeBPM = metronomeBPMEl.value;
let metronomeState = "metronomePaused";

////Other Variables
let masterTime = 0;
const minute = 60000;
let measureLength = 0;
let elapsedTime = 0;
const timeouts = [];
const rudiments = [
  {
    RudimentNumber: "One",
    Rudiment: " 1: R L R L    R L R L      R L R L    R L R L",
  },
  {
    RudimentNumber: "Two",
    Rudiment: " 2: L R L R    L R L R      L R L R    L R L R",
  },
  {
    RudimentNumber: "Three",
    Rudiment: " 3: R R L L    R R L L      R R L L    R R L L",
  },
  {
    RudimentNumber: "Four",
    Rudiment: " 4: L L R R    L L R R      L L R R    L L R R",
  },
  {
    RudimentNumber: "Five",
    Rudiment: " 5: R L R R    L R L L      R L R R    L R L L",
  },
  {
    RudimentNumber: "Six",
    Rudiment: " 6: R L L R    L R R L      R L L R    L R R L",
  },
  {
    RudimentNumber: "Seven",
    Rudiment: " 7: R R L R    L L R L      R R L R    L L R L",
  },
  {
    RudimentNumber: "Eight",
    Rudiment: " 8: R L R L    L R L R      R L R L    L R L R",
  },
  {
    RudimentNumber: "Nine",
    Rudiment: " 9: R R R L    R R R L      R R R L    R R R L",
  },
  {
    RudimentNumber: "Ten",
    Rudiment: "10: L L L R    L L L R      L L L R    L L L R",
  },
  {
    RudimentNumber: "Eleven",
    Rudiment: "11: R L L L    R L L L      R L L L    R L L L",
  },
  {
    RudimentNumber: "Twelve",
    Rudiment: "12: L R R R    L R R R      L R R R    L R R R",
  },
  {
    RudimentNumber: "Thirteen",
    Rudiment: "13: R R R R    L L L L      R R R R    L L L L",
  },
  {
    RudimentNumber: "Fourteen",
    Rudiment: "14: R L R L    R R L L      R L R L    R R L L",
  },
  {
    RudimentNumber: "Fifteen",
    Rudiment: "15: L R L R    L L R R      L R L R    L L R R",
  },
  {
    RudimentNumber: "Sixteen",
    Rudiment: "16: R L R L    R L R R      L R L R    L R L L",
  },
  {
    RudimentNumber: "Seventeen",
    Rudiment: "17: R L R L    R L L R      L R L R    L R R L",
  },
  {
    RudimentNumber: "Eighteen",
    Rudiment: "18: R L R L    R R L R      L R L R    L L R L",
  },
  {
    RudimentNumber: "Nineteen",
    Rudiment: "19: R L R L    R R R L      R L R L    R R R L",
  },
  {
    RudimentNumber: "Twenty",
    Rudiment: "20: L R L R    L L L R      L R L R    L L L R",
  },
  {
    RudimentNumber: "TwentyOne",
    Rudiment: "21: R L R L    R L L L      R L R L    R L L L",
  },
  {
    RudimentNumber: "TwentyTwo",
    Rudiment: "22: L R L R    L R R R      L R L R    L R R R",
  },
  {
    RudimentNumber: "TwentyThree",
    Rudiment: "23: R L R L    R R R R      L R L R    L L L L",
  },
  {
    RudimentNumber: "TwentyFour",
    Rudiment: "24: R R L L    R L R R      L L R R    L R L L",
  },
];

////////////////////
//Shared Functions
function calcTime(BPM, noteType) {
  let time = minute / BPM;
  if (noteType == 8) {
    time = time / 2;
  }
  return time;
}

function convertNoteType(noteType) {
  let newNoteType;
  if (noteType == ".25") {
    newNoteType = 4;
  } else {
    newNoteType = 8;
  }
  return newNoteType;
}

////accent sound
function click() {
  audioPlayer.load();
  audioPlayer.play();
}
////standard sound
function click2() {
  audioPlayer2.load();
  audioPlayer2.play();
}

function populateSelect(place, textStr, low, high, selected) {
  for (let i = low; i <= high; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.text = `${i} ${textStr}`;
    if (i === selected) {
      option.selected = true;
    }
    place.appendChild(option);
  }
  const option = document.createElement("option");
  option.value = 1000;
  option.text = `${1000} ${textStr}`;
  place.appendChild(option);
}

function playMeasure(noteType, time) {
  console.log("Play Measure Called");
  let measureTime = 0;
  if (workoutStateEl.value == "yes") {
    incrementWorkout();
  }
  for (let beat = 0; beat < noteType; beat++) {
    let timeout;
    if (beat == 0) {
      timeout = setTimeout(click, measureTime);
      measureTime += time;
    } else if (beat < noteType) {
      timeout = setTimeout(click2, measureTime);
      measureTime += time;
    } else if (beat == noteType) {
      timeout = setTimeout(click2, measureTime);
      measureTime = 0;
    }
    timeouts.push(timeout);
  }
}

function clearAllTimeouts() {
  timeouts.forEach((timeoutID) => clearTimeout(timeoutID)); // Clear each timeout
  timeouts.length = 0; // Reset the array
}

function newMeasureIf(newNoteType, time) {
  console.log("New Measure Called");
  // playMeasure(newNoteType, time);
  if (metronomeState == "metronomePlaying") {
    const timeout = setTimeout(function () {
      playMeasure(newNoteType, time);
      if (metronomeState == "metronomePlaying") {
        newMeasureIf(newNoteType, time);
      }
    }, measureLength);
    timeouts.push(timeout);
  }
}

//Workout Functions

function incrementWorkout() {
  console.log("incrementWorkout called");
  displayMeasureNumber();
  measureNumber++;
}

function displayRudimentText() {
  console.log("Display Rudiment Text");
  let currentRudimentObject = rudiments[rudimentNumber];
  let currentRudiment = currentRudimentObject.Rudiment;
  stickControlRudimentTextEl.innerHTML = `<pre>${currentRudiment}</pre>`;
}

function displayMeasureNumber() {
  console.log("Display Measure Number", measureNumber);
  stickControlMeasureNumberDivEl.innerHTML = "<h2>Measure Number</h2>";
  const num = document.createElement("p");
  num.innerHTML = measureNumber;
  stickControlMeasureNumberDivEl.appendChild(num);
  let measuresPerRudiment = stickControlMeasuresPerRudimentEl.value;
  if (measureNumber == measuresPerRudiment) {
    measureNumber = 0;
    rudimentNumber++;
    // displayRudimentText();
  }
  if (measureNumber == 1) {
    displayRudimentText();
  }
}

function handleImageClick(i) {
  rudimentNumber = i;
  measureNumber = 0;
}

function handleImageClick(i) {
  rudimentNumber = i;
  measureNumber = 0;
}

//Metronome Functions
function startMetronome() {
  metronomeState = "metronomePlaying";
  const img = document.createElement("img");
  img.src = `../assets/StickControlImages/pause.png`;
  img.classList = "state";
  metronomeToggleEl.innerHTML = "";
  metronomeToggleEl.appendChild(img);
}

function stopMetronome() {
  metronomeState = "metronomePaused";
  clearAllTimeouts();
  const img = document.createElement("img");
  img.src = `../assets/StickControlImages/Play.png`;
  img.classList = "state";
  metronomeToggleEl.innerHTML = "";
  metronomeToggleEl.appendChild(img);
}
////////////////////
//Event Listeners
document.addEventListener("DOMContentLoaded", function () {
  //populate metronome BPM
  populateSelect(metronomeBPMEl, "BPM", 30, 200, 140);

  //populate metronome BPM
  populateSelect(stickControlMeasuresPerRudimentEl, "", 5, 50, 5);

  //populate the banner
  for (let i = 1; i <= 24; i++) {
    const img = document.createElement("img");
    img.src = `../assets/rudimentimages/rudiment${i}.png`;
    img.classList = "bannerImg";

    img.setAttribute(
      "onclick",
      `handleImageClick(${i - 1}); displayRudimentText();`
    );

    stickControlBannerDivEl.appendChild(img);
  }
  const filler = document.createElement("div");
  filler.innerHTML = `<h1 style="color: white;">Your Heading Text              ddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjlddddddddddddddjafsjkjkladfsjklfasjklsadfjklkjlsdfakjldsfkljsdkjlkjladfkjladsfkjlsadfkjladfskjldfsakjl</h1>`;
  filler.innerHTML = stickControlBannerDivEl.appendChild(filler);
});

//Metronome start/stop clicked
metronomeToggleEl.addEventListener("click", function () {
  //Sets metronome metronomeState to making pausing possible later
  if (metronomeState == "metronomePlaying") {
    stopMetronome();
  } else if (metronomeState == "metronomePaused") {
    startMetronome();
  }
  //get data needed to pass into the function
  let noteType = metronomeNoteTypeEl.value;
  let BPM = metronomeBPMEl.value;

  //convert noteType to not break old code but use a more straighforward one here
  let newNoteType = convertNoteType(noteType);

  //calculate Time
  const time = calcTime(BPM, newNoteType);

  measureLength = newNoteType * time;
  setInterval(function () {
    console.log("Measure Time:", masterTime);
    masterTime += measureLength;
  }, measureLength);
  //play the metronome while metronomeState is playing
  if (metronomeState == "metronomePlaying") {
    newMeasureIf(newNoteType, time);
  }
});

/////////////////////
//setup page

//for the workout have it play while toggle == playing and rudiment number < 26
