document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const toneSelect = document.getElementById('tone');
    const rewriteBtn = document.getElementById('rewriteBtn');
    const outputContainer = document.getElementById('outputContainer');
    const originalText = document.getElementById('originalText');
    const outputText = document.getElementById('outputText');
    const copyBtn = document.getElementById('copyBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    const statusDiv = document.getElementById('status');
    chrome.storage.local.get(['selectedText'], (result) => {
        if (result.selectedText) {
            inputText.value = result.selectedText;
            chrome.storage.local.remove('selectedText');
        }
    });
    rewriteBtn.addEventListener('click', handleRewrite);
    regenerateBtn.addEventListener('click', handleRewrite);
    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(outputText.innerText);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
    });
    async function handleRewrite() {
        const text = inputText.value.trim();
        const tone = toneSelect.value;

        if (!text) {
            showStatus('Please enter some text.', 'error');
            return;
        }

        showStatus('Rewriting...', 'loading');
        outputContainer.classList.add('hidden');

        try {
            const rewritten = await rewriteWithGeminiAPI(text, tone);
            originalText.innerText = text;
            outputText.innerText = rewritten;
            outputContainer.classList.remove('hidden');
            statusDiv.classList.add('hidden'); 
            statusDiv.textContent = '';
        } catch (err) {
            showStatus(`❌ Error: ${err.message}`, 'error');
            console.error(err);
        }
    }

   async function rewriteWithGeminiAPI(text, tone) {
    

    if (API_KEY === "YOUR_REAL_GEMINI_API_KEY_GOES_HERE") {
        throw new Error("Please add your Gemini API key to popup.js");
    }
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const fullPrompt = `Rewrite the following text in a ${tone} tone. Provide only the rewritten text and nothing else. Original text: "${text}" Rewritten text:`;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "contents": [{
                    "parts": [{
                        "text": fullPrompt
                    }]
                }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMessage = errorData.error?.message || `HTTP error! status: ${response.status}`;
            throw new Error(errorMessage);
        }

        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0]?.content?.parts[0]?.text) {
             throw new Error("Invalid response format from the API.");
        }

        const rewrittenText = data.candidates[0].content.parts[0].text;
        return rewrittenText.trim();

    } catch (error) {
        console.error("Error during Gemini API call:", error);
        throw error; // Re-throw the original error to be caught by handleRewrite
    }
}
    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = `status-${type}`; 
        statusDiv.classList.remove('hidden');
    }
});