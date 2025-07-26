import { analyzePDF } from './pdf.js';
import { analyzeImage } from './image.js';
import { analyzeText } from './txt.js';

async function handleFileUpload(file, type) {
  let result = '';
  try {
    if (type === 'pdf') result = await analyzePDF(file);
    else if (type === 'image') result = await analyzeImage(file);
    else if (type === 'text') result = await analyzeText(file);
  } catch (e) {
    result = e.toString();
  }

  document.getElementById('result').innerText = result;
}
