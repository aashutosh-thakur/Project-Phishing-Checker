// txt.js
export function analyzeText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function () {
      const content = reader.result;
      if (/login|verify|password|urgent|click here|security alert/i.test(content)) {
        resolve("⚠️ Potential phishing phrases detected in text.");
      } else {
        resolve("✅ Text appears clean.");
      }
    };

    reader.onerror = () => reject("Error reading text file.");
    reader.readAsText(file);
  });
}
