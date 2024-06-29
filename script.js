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

    // Attempt to start speech synthesis immediately with initial paragraph text
    startSpeechSynthesis();
}

// Function to start speech synthesis
function startSpeechSynthesis() {
    const paragraph = document.getElementById('paragraph');
    if (!synth.speaking) {
        utterance = new SpeechSynthesisUtterance(paragraph.textContent);
        utterance.addEventListener('end', () => {
            isSpeaking = false;
            updateButtonState();
        });
        synth.speak(utterance);
        isSpeaking = true;
        updateButtonState();
    } else {
        synth.resume();
        isSpeaking = true;
        updateButtonState();
    }
}

// Function to pause speech synthesis
function pauseSpeechSynthesis() {
    synth.pause();
    isSpeaking = false;
    updateButtonState();
}

// Function to stop speech synthesis
function stopSpeechSynthesis() {
    synth.cancel();
    isSpeaking = false;
    updateButtonState();
}

// Function to update button text based on speech synthesis state
function updateButtonState() {
    const startButton = document.getElementById('startButton');
    if (isSpeaking) {
        startButton.innerText = 'Pause Reading';
    } else {
        startButton.innerText = 'Resume Reading';
    }
}

// Event listeners for buttons
const startButton = document.getElementById('startButton');
if (startButton) {
    startButton.addEventListener('click', () => {
        if (!isSpeaking) {
            startSpeechSynthesis();
        } else {
            pauseSpeechSynthesis();
        }
    });
}

const stopButton = document.getElementById('stopButton');
if (stopButton) {
    stopButton.addEventListener('click', () => {
        stopSpeechSynthesis();
    });
}

// Event listener for text-to-speech conversion button
const convertButton = document.getElementById('convertButton');
if (convertButton) {
    convertButton.addEventListener('click', () => {
        const textToRead = document.getElementById('textToRead').value.trim();
        if (textToRead) {
            utterance = new SpeechSynthesisUtterance(textToRead);
            synth.speak(utterance);
            isSpeaking = true;
            updateButtonState();
        } else {
            alert('Please enter text to read.');
        }
    });
};