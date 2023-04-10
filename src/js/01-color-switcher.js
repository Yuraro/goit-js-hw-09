const startButton = document.querySelector('[data-on]');
const stopButton = document.querySelector('[data-stop]');

let intervalId = null;

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    document.body.style.backgroundColor = randomColor;
    }, 1000);
});

stopButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    clearInterval(intervalId);
});

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

