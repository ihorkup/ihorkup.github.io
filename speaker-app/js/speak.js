const speechSynthesis = window.speechSynthesis;

const voicesSelect = document.getElementById('voices');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const textarea = document.getElementById('textarea');

let voices = [];

const generateVoices = () => {
    voices = speechSynthesis.getVoices();

    voicesList = voices
        .map((v, index) => `<option value="${index}">${v.name} (${v.lang})</option>`)
        .join('');

    voicesSelect.innerHTML = voicesList;

}

const speak = () => {
    if (speechSynthesis.speaking) {
        console.log('speechSynthesis.speaking!');
        return
    }
    if (textarea !== '') {
        const ssUtterance = new SpeechSynthesisUtterance(textarea.value);

        ssUtterance.voice = voices[voicesSelect.value]
        ssUtterance.rate = rate.value;
        ssUtterance.pitch = pitch.value;


        speechSynthesis.speak(ssUtterance);
    }
}

document.getElementById('stopBtn').addEventListener('click', () => speechSynthesis.cancel());
document.getElementById('startBtn').addEventListener('click', speak);

rate.addEventListener('change', () => document.querySelector('.rateValue').textContent = rate.value);
pitch.addEventListener('change', () => document.querySelector('.pitchValue').textContent = pitch.value);

voicesSelect.addEventListener('change', speak)

generateVoices();
speechSynthesis.addEventListener('voiceschanged', generateVoices)