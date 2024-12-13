import { setupFretboard } from "./fretboard.js";
import { setupEventListeners } from "./events.js";

export const app = {
  init() {
    setupFretboard();
    setupEventListeners();
  },
};
