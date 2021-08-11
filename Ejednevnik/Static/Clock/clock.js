clock = $('.clock')[0];

function CreateClock() {

  function UpdateClock() {
    CreateClock();
  }

  let ClockDate = new Date(),
      msc;

  clock.innerText = ClockDate.toLocaleTimeString().slice(0, 5);
  VisibleClock = clock.innerText;
  msc = 60000 - (ClockDate.getSeconds() * 1000);

  setInterval(UpdateClock, msc);

}

CreateClock();