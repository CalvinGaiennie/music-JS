import { instrumentTuningPresets } from "./constants.js";
import { generateNoteNames } from "./utils.js";

export const setupFretboard = () => {
  // Example logic for setting up the fretboard
  console.log("Fretboard setup with presets:", instrumentTuningPresets);
};

export const createElement = (tag, content = "") => {
  const el = document.createElement(tag);
  if (content) el.textContent = content;
  return el;
};
