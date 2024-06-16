const paragraph = document.getElementById('paragraph');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
let isSpeaking = false;
let synth = window.speechSynthesis;
let utterance = null;

// Check if speech synthesis is supported
if (!synth) {
    console.error('Speech synthesis not supported.');
} else {
    // Check if speaking methods are supported
    if (!synth.speak || !synth.resume || !synth.pause || !synth.cancel) {
        console.warn('Speech synthesis methods not fully supported.');
    }

    // Attempt to start speech synthesis immediately
    startSpeechSynthesis();
}

// Function to start speech synthesis
function startSpeechSynthesis() {
    if (!synth.speaking) {
        utterance = new SpeechSynthesisUtterance(paragraph.textContent);
        utterance.addEventListener('end', () => {
            isSpeaking = false;
            if (startButton) startButton.innerText = 'Start Reading';
        });
        synth.speak(utterance);
        isSpeaking = true;
        if (startButton) startButton.innerText = 'Pause Reading';
    } else {
        synth.resume();
        isSpeaking = true;
        if (startButton) startButton.innerText = 'Pause Reading';
    }
}

// Event listeners for buttons (if needed)
if (startButton) {
    startButton.addEventListener('click', () => {
        if (!isSpeaking) {
            startSpeechSynthesis();
        } else {
            synth.pause();
            isSpeaking = false;
            startButton.innerText = 'Resume Reading';
        }
    });
}

if (stopButton) {
    stopButton.addEventListener('click', () => {
        if (isSpeaking) {
            synth.cancel();
            isSpeaking = false;
            if (startButton) startButton.innerText = 'Start Reading';
        }
    });
}
