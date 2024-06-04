document.addEventListener('DOMContentLoaded', function () {
  const datetimePicker = document.querySelector('#datetime-picker');
  const startButton = document.querySelector('button[data-start]');
  const timerDisplay = {
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minutes: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
  };

  let userSelectedDate;
  let intervalId;

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      const selectedDate = selectedDates[0];
      if (selectedDate <= new Date()) {
        iziToast.error({ title: 'Error', message: 'Please choose a date in the future' });
        startButton.disabled = true;
      } else {
        userSelectedDate = selectedDate;
        startButton.disabled = false;
      }
    },
  };

  flatpickr(datetimePicker, options);

  startButton.addEventListener('click', startTimer);

  function startTimer() {
    startButton.disabled = true;
    datetimePicker.disabled = true;

    intervalId = setInterval(() => {
      const now = new Date();
      const timeDifference = userSelectedDate - now;

      if (timeDifference <= 0) {
        clearInterval(intervalId);
        datetimePicker.disabled = false;
        return;
      }

      const timeLeft = convertMs(timeDifference);

      timerDisplay.days.textContent = addLeadingZero(timeLeft.days);
      timerDisplay.hours.textContent = addLeadingZero(timeLeft.hours);
      timerDisplay.minutes.textContent = addLeadingZero(timeLeft.minutes);
      timerDisplay.seconds.textContent = addLeadingZero(timeLeft.seconds);
    }, 1000);
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
    return String(value).padStart(2, '0');
  }
});
