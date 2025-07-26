import { analyzePDF } from './pdf.js';
import { analyzeImage } from './image.js';
import { PHISHING_REGEX, PHISHING_MESSAGE, SAFE_MESSAGE } from './constants.js';
import { showAnalyzing, displayResult } from './result.js';

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const htmlTag = document.documentElement;
const themeImage = document.getElementById('theme-image');
const fileInput = document.getElementById('fileInput');
const textInputBox = document.getElementById('text-input');
const fileUploadBox = document.getElementById('file-upload');
const submitBtn = document.getElementById('submitBtn');
const resultBox = document.getElementById('result');

// Theme Toggle Logic - Optimized
themeToggle.addEventListener('click', () => {
  const isLight = htmlTag.getAttribute('data-theme') === 'light';
  const newTheme = isLight ? 'dark' : 'light';
  
  // Use requestAnimationFrame for smooth transitions
  requestAnimationFrame(() => {
    htmlTag.setAttribute('data-theme', newTheme);
    themeToggle.textContent = isLight ? '☀️' : '🌙';
    themeImage.src = `assets/${newTheme}.png`;
  });
});

// Radio Button Logic
const radios = document.querySelectorAll('input[name="fileType"]');
radios.forEach(radio => {
  radio.addEventListener('change', () => {
    const isText = radio.value === 'text';
    textInputBox.classList.toggle('hidden', !isText);
    fileUploadBox.classList.toggle('hidden', isText);

    // Reset result box to default message
    resultBox.innerHTML = 'Result will appear here...';
    resultBox.style.display = 'block';

    if (!isText) {
      fileInput.value = ''; // Clear file input
      if (radio.value === 'pdf') {
        fileInput.setAttribute('accept', '.pdf');
      } else if (radio.value === 'image') {
        fileInput.setAttribute('accept', '.jpg,.jpeg,.png');
      }
    } else {
      // Clear text input when switching to text mode
      document.getElementById('textBox').value = '';
    }
  });
});

// Handle Submit
submitBtn.addEventListener('click', async () => {
  const selected = document.querySelector('input[name="fileType"]:checked').value;
  
  // Show analyzing message
  resultBox.innerHTML = `
    <span style="color:#ffbf00;">🔍 Analyzing...</span>
    <br><br>
    <div class="loader"></div>
  `;
  resultBox.style.display = 'block';

  if (selected === 'text') {
    const text = document.getElementById('textBox').value.trim();
    if (!text) {
      resultBox.innerHTML = '<span style="color:#e74c3c;">❌ Please enter some text.</span>';
      return;
    }
    
    // Analyze text for phishing keywords
    const hasPhishing = PHISHING_REGEX.test(text);
    setTimeout(() => {
      const color = hasPhishing ? '#e74c3c' : '#27ae60';
      const message = hasPhishing ? "⚠️ Potential phishing phrases detected in text." : "✅ No phishing detected in text.";
      resultBox.innerHTML = `<strong>Result:</strong> <span style="color:${color};">${message}</span>`;
    }, 2000);

  } else {
    if (!fileInput.files.length) {
      resultBox.innerHTML = '<span style="color:#e74c3c;">❌ Please upload a file.</span>';
      return;
    }

    const file = fileInput.files[0];
    
    try {
      let result;
      if (selected === 'pdf') {
        result = await window.analyzePDF(file);
      } else if (selected === 'image') {
        result = await window.analyzeImage(file);
      }
      
      const color = result.includes('⚠️') ? '#e74c3c' : '#27ae60';
      resultBox.innerHTML = `<strong>Result:</strong> <span style="color:${color};">${result}</span>`;
      
    } catch (error) {
      resultBox.innerHTML = `<span style="color:#e74c3c;">❌ Error: ${error}</span>`;
    }
  }
});
