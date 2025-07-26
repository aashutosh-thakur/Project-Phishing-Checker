// result.js

export function showAnalyzing() {
    const resultContainer = document.getElementById("resultContainer");
    const resultText = document.getElementById("resultText");

    resultText.innerHTML = `
        <span style="color:yellow;">🔍 Analyzing the content...</span>
        <br><br>
        <div class="loader"></div>
    `;
    resultContainer.style.display = "block";
}

export function displayResult(text, isPhishing) {
    const resultContainer = document.getElementById("resultContainer");
    const resultText = document.getElementById("resultText");

    const status = isPhishing 
        ? `<span style="color:#e74c3c;">⚠️ Phishing Detected!</span>` // Red
        : `<span style="color:#27ae60;">✅ Safe</span>`; // Green

    // Safely create and append the detailed message to prevent XSS
    const pre = document.createElement('pre');
    pre.textContent = text;

    resultText.innerHTML = `<strong>Result:</strong> ${status}<br><br>`;
    resultText.appendChild(pre);
    
    resultContainer.style.display = "block";
}