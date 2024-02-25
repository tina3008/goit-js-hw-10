import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    userSelectedDate = selectedDates[0];
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

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

//   +++++++++++++++++++++++++ begin code ===================++

const calendar = flatpickr('#datetime-picker', options);
const inputTime = document.querySelector('.input-block');
const startBtn = document.querySelector('button');
const showTime = document.querySelectorAll('.value');

inputTime.addEventListener('click', event => {
  let interval = userSelectedDate - options.defaultDate;
  const timer = convertMs(interval);

  if (interval < 1) {
    startBtn.disabled = true;

    for (const i of showTime) {
      i.innerText = '00';
      console.log(i.innerText);
    }

    iziToast.show({
      color: 'red',
      position: 'topRight',
      message: `Please choose a date in the future`,
    });
  } else {
    startBtn.disabled = true;

    const repeatTime = setInterval(() => {
      interval = userSelectedDate - new Date();

      if (interval < 1) return;

      const timer = convertMs(interval);

      showTime[0].innerText = timer.days.toString().padStart(2, '0');
      showTime[1].innerText = timer.hours.toString().padStart(2, '0');
      showTime[2].innerText = timer.minutes.toString().padStart(2, '0');
      showTime[3].innerText = timer.seconds.toString().padStart(2, '0');
    }, 1000);
  }
});
