// pdf.js

import { PHISHING_REGEX, PHISHING_MESSAGE, SAFE_MESSAGE } from './constants.js';

let isWorkerConfigured = false;

export async function analyzePDF(file) {
  // Check if PDF.js is loaded
  if (!window.pdfjsLib) {
    throw new Error("PDF.js library not loaded. Please refresh the page and try again.");
  }

  const pdfjsLib = window.pdfjsLib;

  // Configure the worker only once, the first time the function is called
  if (!isWorkerConfigured) {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
    isWorkerConfigured = true;
  }

  try {
    const typedArray = new Uint8Array(await file.arrayBuffer());
    const pdf = await pdfjsLib.getDocument(typedArray).promise;
    let text = '';
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map(item => item.str).join(' ');
    }

    console.log("Extracted PDF text:", text.substring(0, 200));

    const isPhishing = PHISHING_REGEX.test(text);
    const message = isPhishing ? `${PHISHING_MESSAGE} in PDF.` : `${SAFE_MESSAGE} in PDF.`;
    return message;
  } catch (error) {
    console.error("PDF analysis error:", error);
    throw new Error("Failed to analyze PDF: " + error.message);
  }
}

// Make it globally available
window.analyzePDF = analyzePDF;
