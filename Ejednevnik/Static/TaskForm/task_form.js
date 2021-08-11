function addEventInTaskForm() {

  $('.CloseTaskForm')[0].addEventListener('click', () => {

  $('.TaskForm')[0].style.opacity = '0%';
  TweenMax.to($('.TaskForm'), 1, {top: '10rem'});
  $('.TaskForm')[0].style.visibility = 'hidden';

  $('.TaskForm')[0].childNodes.forEach((elem) => {

    if (elem.nodeName === 'INPUT') {
      elem.value = '';
    }

  })

  })

  $('.AcceptButton')[0].addEventListener('click', setTask);

}

function setTask() {

  Task_info = $('.InpTxt')[0].value;
  Clock_info = $('.ClockTxt')[0].value;

  regexp = /(\d{2}:\d{2})|\d{1}:\d{2}/;
  result = Clock_info.match(regexp);

  console.log(Clock_info);

  if (result === null) {

    alert('Введено неверное время!!!');
    return;

  }

  if ( +Clock_info.split(':')[0] > 23 || +Clock_info.split(':')[1] > 59) {

    alert('Введены значения часов больше 23\nИли значения минут больше 59');
    return;

  }

  if (Task_info.length === 0) {

    alert('Вы ничего не ввели!!!');
    return;

  }

  if (true) {

    let iter = 0;

    for (i of Task_info) {

      if (i === ' ') iter++;

    }

    if (iter === Task_info.length) {

      alert('Вы ничего не ввели!!!');
      return;

    }

  }

  if (
    new Date().getDate() === +data_task.split('.')[0] && 
    new Date().getMonth() === +data_task.split('.')[1] - 1 &&
    new Date().getFullYear() === +data_task.split('.')[2]
  ) {
    
    if ( +Clock_info.split(':')[0] < new Date().getHours() ) {

      alert('Это время уже прошло!!!');
      return;

    }

    if ( +Clock_info.split(':')[0] === new Date().getHours() ) {

      if ( +Clock_info.split(':')[1] <= new Date().getMinutes() ) {

        alert('Это время уже прошло!!!');
        return;

      }

    }
    
  }

  $('.TaskForm')[0].style.opacity = '0%';
  TweenMax.to($('.TaskForm'), 1, {top: '10rem'});
  $('.TaskForm')[0].style.visibility = 'hidden';

  $('.TaskForm')[0].childNodes.forEach((elem) => {

    if (elem.nodeName === 'INPUT') {
      elem.value = '';
    }

  });

   $.ajax({

    method: 'POST',
    data: {task: Task_info, data_task: data_task + ` ${Clock_info}`},
    url: '../PHP_Scripts/SetTask.php',
    success: function (arg) {

      console.log(arg);

    }

  })  

}

addEventInTaskForm();