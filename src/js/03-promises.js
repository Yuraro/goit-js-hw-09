import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = form.querySelector('[name="delay"]');
const stepInput = form.querySelector('[name="step"]');
const amountInput = form.querySelector('[name="amount"]');

form.addEventListener('submit', (event) => {
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
        const promise = new Promise((resolve, reject) => {
            const promiseDelay = delay + step * (i - 1);
            setTimeout(() => {
                const shouldResolve = Math.random() > 0.3;
                if (shouldResolve) {
                    resolve({ position: i, delay: promiseDelay, success: true });
                    Notiflix.Notify.success(`Promise ${i} resolved in ${promiseDelay}ms.`);
                } else {
                    reject({ position: i, delay: promiseDelay, success: false });
                    Notiflix.Notify.failure(`Promise ${i} rejected in ${promiseDelay}ms.`);
                }
            }, promiseDelay);
        });
        promises.push(promise);
    }

    Promise.all(promises)
        .then((results) => {
            const successfulPromises = results.filter((result) => result.success);
            const lastPromise = successfulPromises[successfulPromises.length - 1];
            const lastPromiseDelay = lastPromise ? lastPromise.delay : 0;
            Notiflix.Notify.success(`Successfully resolved ${successfulPromises.length} promises. Last promise resolved in ${lastPromiseDelay}ms.`);
        })
        .catch((error) => {
            console.error(error);
            Notiflix.Notify.failure('Failed to resolve promises.');
        });
});

