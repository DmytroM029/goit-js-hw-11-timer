class CountdownTimer {

  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;

      this.refs = {
          seconds: document.querySelector(`${this.selector} [data-value="secs"]`),
             minutes: document.querySelector(`${this.selector} [data-value="mins"]`),
          hours: document.querySelector(`${this.selector} [data-value="hours"]`),
          days: document.querySelector(`${this.selector} [data-value="days"]`),
   
        }
  }

  start() {
    this.intervalId = setInterval(() => {

      const timeNow = Date.now();
      const timeDif = this.targetDate.getTime() - timeNow;

      const day = Math.floor(timeDif / (1000 * 60 * 60 * 24));
      const hour = this.pad(Math.floor((timeDif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      const minute = this.pad(Math.floor((timeDif % (1000 * 60 * 60)) / (1000 * 60)));
      const second = this.pad(Math.floor((timeDif % (1000 * 60)) / 1000));


      this.updateTimer(day, hour, minute, second);

      if (timeDif < 0) {
        clearInterval(this.intervalId);
        this.clearTimer();
        console.log('Период акции закончился')
      }

    }, 1000)
    }
    
  clearTimer() {
    this.refs.days.textContent = '00';
    this.refs.hours.textContent = '00';
    this.refs.minutes.textContent = '00';
    this.refs.seconds.textContent = '00';

    this.refs.timerField.insertAdjacentHTML('afterend', '<div class="add-div"> Период акции закончился :(  </div>')
  }

  updateTimer(day, hour, minute, second) {
    this.refs.days.textContent = day;
    this.refs.hours.textContent = hour;
    this.refs.minutes.textContent = minute;
    this.refs.seconds.textContent = second;
  }


  pad(value) {
    return String(value).padStart(2, '0');
  }
};


const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('July 17, 2021'),
});

timer.start()
