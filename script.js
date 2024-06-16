const paragraph = document.getElementById('paragraph');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
let isSpeaking = false;
let synth = window.speechSynthesis;
let utterance = null;

startButton.addEventListener('click', () => {
    if (!isSpeaking) {
        if (!synth.speaking) {
            utterance = new SpeechSynthesisUtterance(paragraph.textContent);
            utterance.addEventListener('end', () => {
                isSpeaking = false;
                startButton.innerText = 'Start Reading';
            });
            synth.speak(utterance);
            isSpeaking = true;
            startButton.innerText = 'Pause Reading';
        } else {
            synth.resume();
            isSpeaking = true;
            startButton.innerText = 'Pause Reading';
        }
    } else {
        synth.pause();
        isSpeaking = false;
        startButton.innerText = 'Resume Reading';
    }
});

stopButton.addEventListener('click', () => {
    if (isSpeaking) {
        synth.cancel();
        isSpeaking = false;
        startButton.innerText = 'Start Reading';
    }
});

if (!synth) {
    console.error('Speech synthesis not supported.');
} else {
    if (!synth.speaking) {
        console.warn('Speech synthesis speaking not supported.');
    }
}
