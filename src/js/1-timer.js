import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);  
      userSelectedDate =  selectedDates[0];   
    },    
  };

  const Btn = document.querySelector('button');
  Btn.dataset.disabled = "true"
  console.log(saveBtn.dataset.disabled)
  
  flatpickr("input#datetime-picker", options, {
    if (options.defaultDate <= options.userSelectedDate) {
        iziToast.show({           
            message: 'Please choose a date in the future'
        });
        
    Btn.dataset.disabled = "true"; 
    } else {
        Btn.dataset.disabled="false";
    const timeelse = setInterval(convertMs(options.userSelectedDate),1000)
    };
  
  });

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