import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import '../css/timer.css';
import 'flatpickr/dist/flatpickr.min.css';
import 'notiflix/dist/notiflix-3.2.2.min.css';

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let selectedDate = null;
let timerId = null;
let convertedTime = {};
disableBtn();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: 'today',
  minuteIncrement: 1,
  minDate: 'today',
  onClose(selectedDates) {
    const currentDate = new Date();
    selectedDate = selectedDates[0].getTime() - currentDate.getTime();
    activateBtn();
    if (selectedDates[0].getTime() < currentDate.getTime()) {
      Notiflix.Notify.warning('Please choose a date in the future');
      disableBtn();
    }
  },
};

flatpickr(refs.datePicker, options);

refs.startBtn.addEventListener('click', onTimerStart);

function disableBtn() {
  refs.startBtn.setAttribute('disabled', 'dasabled');
}

function activateBtn() {
  refs.startBtn.removeAttribute('disabled');
}

function onTimerStart() {
  timerId = setInterval(interv, 1000);
  disableBtn();
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function interv(timerId) {
  if (selectedDate < 1000) {
    clearInterval(timerId);
    activateBtn();
    return;
  }
  selectedDate -= 1000;
  convertedTime = convertMs(selectedDate);
  paintTime(convertedTime);
}

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

function paintTime(data) {
  const dataKeys = Object.keys(convertedTime);
  dataKeys.forEach(key => {
    refs[key].textContent = addLeadingZero(data[key]);
  });
}
