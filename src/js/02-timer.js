// Описаний в документації
import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Вибір елементів з html
const btn = document.querySelector('button[data-start]');
const day = document.querySelector('.value[data-days]');
const hour = document.querySelector('.value[data-hours]');
const minut = document.querySelector('.value[data-minutes]');
const second = document.querySelector('.value[data-seconds]');
const timerContainer = document.querySelector('.timer');
const span = document.querySelectorAll('span');
const value = document.querySelectorAll('.value');
const label = document.querySelectorAll('.label');

// Встановлення початкових значень
let finishTime = 0;
let timerId = null;
btn.disabled = true;

// Встановлення стилів
timerContainer.style.display = 'flex';
span.forEach(el => {
  el.style.display = 'block';
  el.style.textAlign = 'center';
  el.style.margin = '5px 10px';
});
value.forEach(el => {
  el.style.fontSize = '30px';
  el.style.fontWeight = 'bold';
});
label.forEach(el => {
  el.style.fontSize = '14px';
});

// Встановлення початкових значень таймеру
function setFormatedTime(currentDate) {
  const timeLeft = finishTime - currentDate;

  day.innerHTML = addLeadingZero(convertMs(timeLeft).days);
  hour.innerHTML = addLeadingZero(convertMs(timeLeft).hours);
  minut.innerHTML = addLeadingZero(convertMs(timeLeft).minutes);
  second.innerHTML = addLeadingZero(convertMs(timeLeft).seconds);
}

// Опції flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentDate = Date.now();
    if (currentDate > selectedDates[0].getTime()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btn.disabled = false;
      finishTime = selectedDates[0].getTime();
      setFormatedTime(currentDate);
    }
  },
};

flatpickr('#datetime-picker', options);

// Слухач кнопки
btn.addEventListener('click', () => {
  timerId = setInterval(() => {
    const currentDate = Date.now();
    if (currentDate > finishTime) {
      clearInterval(timerId);
      Notify.info('Time is up');
    } else {
      setFormatedTime(currentDate);
    }
  }, 1000);
  btn.disabled = true;
});

// Конвертер часу
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// Дадавання форматування часу
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
