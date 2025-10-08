# Project Title: AI Rewriter Chrome Extension

## Text Description
This extension helps users rewrite selected text into different tones using Google's Gemini API. It solves the problem of needing to quickly adjust the tone of writing for different audiences (e.g., making an email more formal or a social media post more casual).

## APIs Used
*   Google Gemini API (via `https://generativelanguage.googleapis.com`)

## Setup and Testing Instructions
To test this extension, you will need to provide your own Google Gemini API key.

1.  Clone or download this repository.
2.  In the main folder, create a new file named `config.js`.
3.  Add the following line to the `config.js` file, replacing the placeholder with your own API key:
    ```javascript
    const API_KEY = "PASTE_YOUR_GEMINI_API_KEY_HERE";
    ```
4.  Open Google Chrome, go to `chrome://extensions`, and turn on "Developer mode".
5.  Click "Load unpacked" and select this project's folder. The extension will now be active and ready to use.