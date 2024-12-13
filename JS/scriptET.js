//Random Song Generator
//Objects containing the file names and subfolders, they key of the track, and the chord progression
// {FileName:'',Name:'',Key:'',Chords:''},

/*
bass Progressions
Begginner Record all of these in G C and A with roots and fifths 
15 1145, 1415, 1464 

intermediate all all keys add in thirds
1415 1465 1645  1564 15634 1345 6251

Advanced
real songs

*/
////////////////////////////
//Global Variables
let randomAudioIndex;
let selectedDifficultyObject;
const difficulty = document.getElementById("difficulty");
let selectedDifficulty = difficulty.value;
///////////////////////////////
//Song Banks Maps and Rules
const guitarOnly = {
  videosBeginnerG: [
    {
      FileName: "ET_1415G.mp3",
      Name: "Generic Progression 1",
      Key: "G",
      Chords: "G,C,G,D",
      Tip: "Come on dude. Really.🙃",
    },
    {
      FileName: "ET_1465G.mp3",
      Name: "Generic Progression 2",
      Key: "G",
      Chords: "G,C,Em,D",
      Tip: "Come on dude. Really.🙃",
    },
    {
      FileName: "ET_1524G.mp3",
      Name: "Generic Progression 3",
      Key: "G",
      Chords: "G,D,Am,C",
      Tip: "Come on dude. Really.🙃",
    },
    {
      FileName: "ET_1645G.mp3",
      Name: "Generic Progression 4",
      Key: "G",
      Chords: "G,Em,C,D",
      Tip: "Come on dude. Really.🙃",
    },
    {
      FileName: "ET_5411G.mp3",
      Name: "Generic Progression 5",
      Key: "G",
      Chords: "D,C,G,G",
      Tip: "Come on dude. Really.🙃",
    },
    {
      FileName: "ET_Good_Lord_Lorrie_Verse.mp3",
      Name: "Good Lord Lorrie Verse",
      Key: "G",
      Chords: "G,Em,C,G",
      Tip: "Come on dude. Really.🙃",
    },
  ],
  videosBeginner: [
    {
      FileName: "ET_Blue_Chorus.mp3",
      Name: "Blue Chorus",
      Key: "D",
      // Chords: "D,G,D,D,Bm,A,G,G",
    },
    { FileName: "ET1_Hurt.mp3", Name: "Hurt", Key: "C", Chords: "Am C D" },
    {
      FileName: "ET_1_Simple_Man.mp3",
      Name: "Simple Man",
      Key: "C",
      // Chords: "C G Am",
    },
  ],
  videosBeginnerCapo: [
    {
      FileName: "ET_Summertime_Blues_Verse.mp3",
      Name: "Summertime Blues Verse",
      Key: "C# Capo: 1",
      // Chords: "C#,C#,F#,C#,F#,C#,G#,G#",
    },
    {
      FileName: "ET_Jersey_Giant.mp3",
      Name: "Jersey Giant",
      Key: "G# Capo: 1",
      // Chords: "G#,D#,A#m,C#",
    },
  ],
  videosIntermediate: [
    {
      FileName: "ET3_My_Heros_Have_Always_Been_Cowboys.mp3",
      Name: "My Heros Have Always Been Cowboys",
      Key: "D",
      Chords:
        "Verse: D G D E7 A7 D G D G D A7 D D7, Chorus: G D E A G D G D A7 D",
      Tip: "",
    },
    {
      FileName: "ET3_Feelin_Good_Again.mp3",
      Name: "Feelin Good Again",
      Key: "G",
      Chords: "G Bm Em D G Bm Em D C D G C G D C D",
      Tip: "",
    },
  ],
  fullSongs: [
    {
      FileName: "ET3_Cavalry.mp3",
      Name: "Cavalry",
      Key: "D",
      Chords: "D",
      Tip: "Try to learn the bass notes first.",
    },
    {
      FileName: "ET3_Nobody_Knows_You_When_You're_Down_And_Out.mp3",
      Name: "Nobody Knows You When Youre Down and Out",
      Key: "C 'sorta'",
      Chords: "C E7 A A7 Dm7 A7 Dm7 F F#dim7 C A7 D7 G7",
      Tip: "Theres a diminished chord a 5of5 and a III7",
    },
    {
      FileName: "ET3_Something.mp3",
      Name: "Something",
      Key: "C",
      Chords:
        "Transition: F Eb G, Verse: C Cmaj7 C7 F D D7 G, Chorus: Am AmMaj7 Am7, D7, Bridge: A C#m F#m D G",
      Tip: "The verse and chorus each have a chromatic walk hidden in the chords. The bridge changes keys.",
    },
  ],
  patrick: [
    { FileName: "Weird/Last_Christmas.m4a" },
    { FileName: "Weird/Mistletoe_ftJazzy_G.m4a" },
    { FileName: "Weird/Rockin_Around_The_Christmas_Tree.m4a" },
  ],
};

const bassOnly = {
  beginnerBass: [
    {
      FileName: "ET_BO_B_G_15.mp3",
      Name: "Generic Progression 1",
      Key: "G",
      Chords: "G,D",
      Tip: "Come on dude. Really.🙃",
    },
    {
      FileName: "ET_BO_B_G_1415.mp3",
      Name: "Generic Progression 1",
      Key: "G",
      Chords: "G,C,G,D",
      Tip: "Come on dude. Really.🙃",
    },
  ],
  intermediateBass: [
    {
      FileName: "ET_BO_I_A_1415.mp3",
      Name: "Generic Progression 1",
      Key: "A",
      Chords: "A,D,A,E",
      Tip: "3 Chords 3 Notes Each",
    },
  ],
  advancedBass: [
    {
      FileName: "ET_BO_A_12BB.mp3",
      Name: "12 Bar Blues in Bb",
      Key: "Bb",
      Chords: "Bb,Bb,Bb,Bb,Eb,Eb,Bb,Bb,F,Eb,Bb,F",
      Tip: "12 Bar Blues",
    },
  ],
};

const melodiesOnly = {
  beginnerGMelodies: [],
  beginnerMelodies: [],
  intermediateMelodies: [
    {
      FileName: "ET_MO_A_ElPaso.mp3",
      Name: "El Paso",
      Key: "A",
      Chords: "",
      Tip: "",
    },
    {
      FileName: "ET_MO_I_GOTTV1.mp3",
      Name: "Game of Thrones Theme Variation 1",
      Key: "Cm",
      Chords: "",
      Tip: "",
    },
  ],
  advancedMelodies: [],
};
// https://tabs.ultimate-guitar.com/tab/misc-television/game-of-thrones-theme-tabs-1052803
const difficultyMapGuitarOnly = {
  videosBeginner: guitarOnly.videosBeginner,
  videosBeginnerG: guitarOnly.videosBeginnerG,
  videosBeginnerCapo: guitarOnly.videosBeginnerCapo,
  videosIntermediate: guitarOnly.videosIntermediate,
  fullSongs: guitarOnly.fullSongs,
  patrick: guitarOnly.patrick,
};

const difficultyMapBassOnly = {
  beginnerBass: bassOnly.beginnerBass,
  intermediateBass: bassOnly.intermediateBass,
  advancedBass: bassOnly.advancedBass,
};

const difficultyMapMelodiesOnly = {
  beginnerMelodiesG: melodiesOnly.beginnerGMelodies,
  beginnerMelodies: melodiesOnly.beginnerMelodies,
  intermediateMelodies: melodiesOnly.intermediateMelodies,
  advancedMelodies: melodiesOnly.advancedMelodies,
};
const rules = {
  guitarOnly: [
    {
      type: "h3",
      class: "t",
      content: "Guide",
    },
    {
      type: "h4",
      class: "difficulty0",
      content: "BeginnerG (6) (Number of tracks in category)",
    },
    {
      type: "p",
      class: "content",
      content: "Same as beginner but only in the key of G",
    },
    {
      type: "h4",
      class: "difficulty1",
      content: "Beginner (3)",
    },
    {
      type: "p",
      class: "content",
      content:
        "The chords in the beginner progressions are all diatonic. All progressions are in one of the following keys: G C D E and A. No capo required.",
    },
    {
      type: "h4",
      class: "difficulty",
      content: "Beginner+Capo (2)",
    },
    {
      type: "p",
      class: "content",
      content: "Same as beginner but with a capo. Can be in any key.",
    },
    {
      type: "h4",
      class: "difficulty",
      content: "Intermediate (2)",
    },
    {
      type: "p",
      class: "content",
      content:
        "All keys, more complex progressions, multipart songs, extended chords, more complex strumming, some fingerpicking and, faster changes. Mostly diatonic chords.",
    },
    {
      type: "h4",
      class: "difficulty",
      content: "Intermediate (2)",
    },
    {
      type: "p",
      class: "content",
      content:
        "All keys, more complex progressions, multipart songs, extended chords, more complex strumming, some fingerpicking and, faster changes. Mostly diatonic chords.",
    },
    {
      type: "h4",
      class: "difficulty",
      content: "Full Songs (3)",
    },
    {
      type: "p",
      class: "content",
      content:
        "Lots of extended and diatonic chords, walkups and walkdowns, complex fingerpicking.",
    },
  ],
  bassOnly: [
    {
      type: "h3",
      class: "t",
      content: "Guide",
    },
    {
      type: "h4",
      class: "difficulty0",
      content: "Beginner (2)",
    },
    {
      type: "p",
      class: "content",
      content: "Roots and 5ths",
    },
    {
      type: "h4",
      class: "difficulty1",
      content: "Intermediate (1)",
    },
    {
      type: "p",
      class: "content",
      content: "Chord Tones",
    },
    {
      type: "h4",
      class: "difficulty",
      content: "Advanced (1)",
    },
    {
      type: "p",
      class: "content",
      content: "All Notes",
    },
  ],
  melodiesOnly: [
    {
      type: "h3",
      class: "t",
      content: "Guide",
    },
    {
      type: "h4",
      class: "difficulty0",
      content: "BeginnerG (0)",
    },
    {
      type: "p",
      class: "content",
      content: "Key of G. Acoustic Tones. Pentatonic Only.",
    },
    {
      type: "h4",
      class: "difficulty1",
      content: "Beginner (0)",
    },
    {
      type: "p",
      class: "content",
      content: "All keys. No Key Changes. Acoustic Tones. Pentatonic Only.",
    },
    {
      type: "h4",
      class: "difficulty",
      content: "Intermediate (2)",
    },
    {
      type: "p",
      class: "content",
      content: "All Keys. Key changes",
    },
    {
      type: "h4",
      class: "difficulty2",
      content: "Advanced (0)",
    },
    {
      type: "p",
      class: "content",
      content: "All Keys. Key changes",
    },
  ],
};

const difficultySelectors = {
  guitarOnly: [
    { value: "videosBeginnerG", text: "BeginnerG" },
    { value: "videosBeginner", text: "Beginner" },
    { value: "videosBeginnerCapo", text: "Beginner+Capo" },
    { value: "videosIntermediate", text: "Intermediate" },
    { value: "fullSongs", text: "Full Songs" },
    { value: "patrick", text: "Patrick" },
  ],
  bassOnly: [
    { value: "beginnerBass", text: "Begginer" },
    { value: "intermediateBass", text: "Intermediate" },
    { value: "advancedBass", text: "Advanced" },
  ],
  melodiesOnly: [
    { value: "beginnerGMelodies", text: "BeginnerG" },
    { value: "beginnerMelodies", text: "Beginner" },
    { value: "intermediateMelodies", text: "Intermediate" },
    { value: "advancedMelodies", text: "Advanced" },
  ],
};
/////////////////////////////
//functions
function createElement(object) {
  const type = object.type;

  const el = document.createElement(type);
  el.classList.add(object.class);
  el.innerHTML = object.content;
  return el;
}

function updateHTML(updatedElements, place) {
  const element = document.querySelector(`${place}`);
  element.innerHTML = " ";

  updatedElements.forEach((object) => {
    const htmlElement = createElement(object);
    element.appendChild(htmlElement);
  });
}

function createSelectOptions(array) {
  for (let i = 0; i <= array.length; i++) {
    const option = document.createElement("option");
    option.value = array[i].value;
    option.text = array[i].text;
    difficulty.appendChild(option);
  }
}
/////////////////////////////
//Event Listenrs
document.getElementById("playButton").addEventListener("click", function () {
  //Set feedback to ''
  document.getElementById("feedback").textContent = ``;
  document.getElementById("tipContent").textContent = ``;

  //Find Instrument and assign it to a variable
  const instrument = document.getElementById("instrument");
  const selectedInstrument = instrument.value;

  //Find selected difficulty and assign it to a variable
  selectedDifficulty = difficulty.value;

  // Assign get difficulty object into a variable
  if (selectedInstrument == "guitarOnly") {
    selectedDifficultyObject =
      difficultyMapGuitarOnly[selectedDifficulty] || [];
  } else if (selectedInstrument == "bassOnly") {
    selectedDifficultyObject = difficultyMapBassOnly[selectedDifficulty] || [];
  } else if (selectedInstrument == "melodiesOnly") {
    selectedDifficultyObject =
      difficultyMapMelodiesOnly[selectedDifficulty] || [];
  }
  console.log(selectedDifficulty);
  console.log(selectedDifficultyObject);

  //Extract track names into an array
  const trackNames = selectedDifficultyObject.map((track) => track.FileName);

  // Randomly select an audio file from the chosen array
  const randomAudio = trackNames[Math.floor(Math.random() * trackNames.length)];
  randomAudioIndex = trackNames.indexOf(randomAudio);
  // Get the audio player element
  const audioPlayer = document.getElementById("audioPlayer");

  // Set the source of the audio player
  audioPlayer.src = "../Assets/Songs/" + randomAudio;

  // Load and play the audio
  audioPlayer.load();
  audioPlayer.play();

  ////////////////////////////////////////////////////////////////////////

  //Event Listeners

  //Show the user the chords and associated Info
  document
    .getElementById("feedbackButton")
    .addEventListener("click", function () {
      const selectedTrack = selectedDifficultyObject[randomAudioIndex];
      document.getElementById(
        "feedback"
      ).textContent = `Name: ${selectedTrack.Name},  Key: ${selectedTrack.Key},  Chords: ${selectedTrack.Chords}`;
    });

  //Show User a Tip
  document.getElementById("tipButton").addEventListener("click", function () {
    const selectedTrack = selectedDifficultyObject[randomAudioIndex];
    document.getElementById(
      "tipContent"
    ).textContent = `Tip: ${selectedTrack.Tip}`;
  });
});

//Update Rules Div
document.getElementById("instrument").addEventListener("change", function () {
  const instrument = document.getElementById("instrument");
  const selectedInstrument = instrument.value;

  if (selectedInstrument == "guitarOnly") {
    const updatedElements = rules.guitarOnly;
    updateHTML(updatedElements, "#rules");
  } else if (selectedInstrument == "bassOnly") {
    const updatedElements = rules.bassOnly;
    updateHTML(updatedElements, "#rules");
  } else if (selectedInstrument == "melodiesOnly") {
    const updatedElements = rules.melodiesOnly;
    updateHTML(updatedElements, "#rules");
  }

  selectedDifficulty = difficulty.value;
  difficulty.innerHTML = "";
  console.log(difficulty.innerHTML);
  if (selectedInstrument == "guitarOnly") {
    const updatedElements = difficultySelectors.guitarOnly;
    createSelectOptions(updatedElements);
  } else if (selectedInstrument == "bassOnly") {
    const updatedElements = difficultySelectors.bassOnly;
    createSelectOptions(updatedElements);
  } else if (selectedInstrument == "melodiesOnly") {
    const updatedElements = difficultySelectors.melodiesOnly;
    createSelectOptions(updatedElements);
  }
});
