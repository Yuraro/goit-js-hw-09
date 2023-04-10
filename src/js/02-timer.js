import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate.getTime() <= new Date().getTime()) {
        Notiflix.Notify.warning('Please choose a date in the future');
        return;
    }

    startBtn.disabled = false;
    startBtn.addEventListener('click', () => {
    const timeRemaining = selectedDate.getTime() - new Date().getTime();
    startTimer(timeRemaining);
    });
    },
};


flatpickr('#datetime-picker', options);

function startTimer(timeRemaining) {
    function updateTimer() {
        const { days, hours, minutes, seconds } = convertMs(timeRemaining);

        daysEl.textContent = addLeadingZero(days);
        hoursEl.textContent = addLeadingZero(hours);
        minutesEl.textContent = addLeadingZero(minutes);
        secondsEl.textContent = addLeadingZero(seconds);

        if (timeRemaining <= 0) {
            clearInterval(timerId);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            Notiflix.Notify.success('Countdown timer finished!');
        }

        timeRemaining -= 1000;
    }

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);
}



function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
}