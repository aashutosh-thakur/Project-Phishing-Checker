// image.js

import { PHISHING_REGEX, PHISHING_MESSAGE, SAFE_MESSAGE } from './constants.js';

export async function analyzeImage(file) {
  const { data: { text } } = await Tesseract.recognize(file, 'eng');
  console.log("Extracted image text:", text.substring(0, 200));
  const isPhishing = PHISHING_REGEX.test(text);
  const message = isPhishing ? `${PHISHING_MESSAGE} in image.` : `${SAFE_MESSAGE} in image.`;
  return message;
}

// Make it globally available
window.analyzeImage = analyzeImage;
