export const generateNoteNames = (noteIndex, accidentals) => {
  const notesFlat = [
    "C",
    "D♭",
    "D",
    "E♭",
    "E",
    "F",
    "G♭",
    "G",
    "A♭",
    "A",
    "B♭",
    "B",
  ];
  const notesSharp = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  noteIndex %= 12;
  return accidentals === "flats" ? notesFlat[noteIndex] : notesSharp[noteIndex];
};
