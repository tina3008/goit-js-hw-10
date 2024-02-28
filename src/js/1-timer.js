import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
let interval;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
    interval = userSelectedDate - options.defaultDate;
    // console.log(interval);
    if (interval < 1) {
      iziToast.error({
        color: 'red',
        position: 'topRight',
        message: `Please choose a date in the future`,
      });
    } else {
      startBtn.disabled = false;
      event.preventDefault();
    }
  },
};
//   ++++++++++++++++++++

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

//   +++++++++++++++++++++++++ begin code ===================++

const calendar = flatpickr('#datetime-picker', options);
// const inputTime = document.querySelector('.input-block');
const startBtn = document.querySelector('button');
const showTime = document.querySelectorAll('.value');

startBtn.disabled = true;

startBtn.addEventListener('click', event => {
  const repeatTime = setInterval(() => {
    interval = userSelectedDate - new Date();

    if (interval < 1) {
      startBtn.disabled = true;
      clearInterval(repeatTime);
      return;
    }

    const timer = convertMs(interval);

    showTime[0].innerText = timer.days.toString().padStart(2, '0');
    showTime[1].innerText = timer.hours.toString().padStart(2, '0');
    showTime[2].innerText = timer.minutes.toString().padStart(2, '0');
    showTime[3].innerText = timer.seconds.toString().padStart(2, '0');
  }, 1000);
});
