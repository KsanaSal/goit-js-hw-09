import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Вибір елементів з html
const form = document.querySelector('.form');
const input = document.querySelectorAll('input');
const label = document.querySelectorAll('label');
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step]');
const inputAmount = document.querySelector('input[name=amount]');
const btn = document.querySelector('button');

// Встановлення стилів
form.style.display = 'flex';
form.style.alignItems = 'flex-end';
input.forEach(el => {
  el.style.display = 'block';
});
label.forEach(el => {
  el.style.margin = '0 10px';
});
btn.style.height = '22px';

// Слухач форми
form.addEventListener('submit', e => {
  e.preventDefault();

  for (let i = 1; i <= inputAmount.valueAsNumber; i += 1) {
    let delay = inputDelay.valueAsNumber + (i - 1) * inputStep.valueAsNumber;
    setTimeout(() => {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delay);
  }
});

// promise функція
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
