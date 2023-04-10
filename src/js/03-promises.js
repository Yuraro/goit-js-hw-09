import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = form.querySelector('[name="delay"]');
const stepInput = form.querySelector('[name="step"]');
const amountInput = form.querySelector('[name="amount"]');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const delay = parseInt(delayInput.value);
    const step = parseInt(stepInput.value);
    const amount = parseInt(amountInput.value);

if (isNaN(delay) || isNaN(step) || isNaN(amount) || delay < 0 || step < 0 || amount < 0) {
    Notiflix.Notify.failure('Invalid input. Please enter positive numbers.');
    return;
}

    const promises = [];
    for (let i = 1; i <= amount; i++) {
    const promise = createPromise(i, delay + step * (i - 1));
    promises.push(promise);
    }
try {
    const results = await Promise.all(promises);
    const successfulPromises = results.filter((result) => result.success);
    const lastPromise = successfulPromises[successfulPromises.length - 1];
    const lastPromiseDelay = lastPromise ? lastPromise.delay : 0;
    Notiflix.Notify.success(`Successfully resolved ${successfulPromises.length} promises. Last promise resolved in ${lastPromiseDelay}ms.`);
} catch (error) {
    console.error(error);
    Notiflix.Notify.failure('Failed to resolve promises.');
}
});

function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        const shouldResolve = Math.random() > 0.3;
        if (shouldResolve) {
        resolve({ position, delay, success: true });
    } else {
        reject({ position, delay, success: false });
    }
    }, delay);
});
};

