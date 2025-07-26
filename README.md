# Phishing Content Checker

A web-based application that analyzes PDFs, images, and text content to detect potential phishing attempts using keyword matching and OCR technology.

## Features

- **PDF Analysis**: Extract text from PDF files and scan for phishing keywords
- **Image Analysis**: Use OCR (Tesseract.js) to extract text from images and detect phishing content
- **Text Analysis**: Direct text input analysis for phishing detection
- **Dark/Light Theme**: Toggle between light and dark themes
- **Real-time Results**: Instant feedback with color-coded results

## Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6 modules)
- **PDF Processing**: PDF.js
- **OCR**: Tesseract.js
- **Styling**: CSS custom properties with theme support

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd phishing-content-checker
```

2. Open `index.html` in a web browser or serve it using a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

3. Navigate to `http://localhost:8000` in your browser

## Usage

1. **Select Content Type**: Choose between PDF, Image, or Text
2. **Upload/Input Content**: 
   - For PDF/Image: Click to upload a file
   - For Text: Paste content directly into the text box
3. **Submit**: Click the Submit button to analyze
4. **View Results**: Results appear with color coding:
   - 🟢 Green: Safe content
   - 🔴 Red: Potential phishing detected

## File Structure

```
├── index.html          # Main HTML file
├── script.js           # Main JavaScript logic
├── style.css           # Styling and themes
├── pdf.js              # PDF analysis module
├── image.js            # Image OCR analysis module
├── text.js             # Text analysis module
├── result.js           # Result display utilities
├── constants.js        # Phishing detection patterns
├── assets/
│   ├── light.png       # Light theme background
│   └── dark.png        # Dark theme background
└── README.md           # This file
```

## Phishing Detection

The application detects phishing content by searching for common phishing keywords:
- login
- verify
- password
- urgent
- click here
- security alert

## Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.