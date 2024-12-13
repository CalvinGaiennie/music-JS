"use strict";

let doc;
const chart = document.getElementById("chart");
const preview = document.getElementById("preview");
const titleEl = document.getElementById("title");
const saveEl = document.getElementById("save");

function generatePDF() {
  const { jsPDF } = window.jspdf;
  doc = new jsPDF(); // Create a new jsPDF instance

  // Get the content from the textarea
  const title = titleEl.value;
  const chartValue = document.getElementById("chart").value;
  const chartValueNoSpaces = removeSpaces(chartValue);
  const formattedText = formatString(chartValueNoSpaces);

  // Split the formatted text into individual lines
  const lines = formattedText.split("\n");
  const fontSize = 20;
  const pageHeight = doc.internal.pageSize.height;
  const lineHeight = fontSize * 1.15;

  //setup title
  doc.setFontSize(fontSize);
  doc.text(title, fontSize, fontSize);
  let yOffset = fontSize;

  yOffset += fontSize;

  lines.forEach((line) => {
    // Check if adding another line will exceed page height
    if (yOffset + lineHeight > pageHeight) {
      doc.addPage(); // Create a new page
      yOffset = fontSize; // Reset yOffset for the new page
    }
    doc.text(line, fontSize, yOffset);
    yOffset += lineHeight;
  });
  // lines.forEach((line) => {
  //   doc.text(line, fontSize, yOffset);
  //   yOffset += fontSize;
  // });
}

function generatePreview() {
  generatePDF(); // Generate the PDF

  // Convert the PDF to a Blob and create a preview URL
  const pdfBlob = doc.output("blob");
  const previewUrl = URL.createObjectURL(pdfBlob);

  // Display the PDF in the iframe
  document.getElementById("pdfPreview").src = previewUrl;
}

function savePDF() {
  generatePDF(); // Ensure the PDF is generated
  doc.save("user-input.pdf"); // Save the PDF
}

function makeSubs(str) {
  let length = str.length;
  for (let i = 0; i <= length; i++) {
    if (str[i] == ",") {
      str = str.slice(0, i) + "/" + str.slice(i + 1);
    }
  }
  return str;
}

function formatString(str) {
  console.log(str);
  str = makeSubs(str);
  // add '|' every four charachters
  for (let i = 0; i <= str.length; i++) {
    let four = i * 5;
    if (str.length >= four) {
      str = str.slice(0, four) + "|" + str.slice(four);
    }
  }
  // add a new line after 4 bars
  for (let i = 1; i <= str.length; i++) {
    let line = i * 21;
    if (str.length >= line) {
      str = str.slice(0, line) + "\n" + str.slice(line);
    }
  }
  for (let i = 1; i <= str.length; i++) {
    let line = i * 22;
    if (str.length >= line) {
      str = str.slice(0, line) + "|" + str.slice(line);
    }
  }
  console.log(str);
  return str;
}
function removeSpaces(str) {
  for (let i = 1; i < str.length; i++) {
    let j = i + 1;
    if (str[i] == " ") {
      str = str.slice(0, i) + str.slice(j);
      i--;
    }
    console.log(str);
  }
  console.log(str);
  return str;
}

// this is more efficient but idk how it works so im not going to use it for now. chat wrote it and i want to figure out how it works before i use it
// function removeSpaces(str) {
//   return str.replace(/\s+/g, "");
// }

function addTitle() {}

document.addEventListener("DOMContentLoaded", function () {
  generatePreview();
});

preview.addEventListener("click", function () {
  generatePreview();
  const chartV = chart.value;
  const newString = formatString(chartV);
});

saveEl.addEventListener("click", function () {
  savePDF();
});
