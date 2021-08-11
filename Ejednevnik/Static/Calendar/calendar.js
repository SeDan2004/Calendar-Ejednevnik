let Last_date,
    iterNextSlide = 1,
    Cloud = $('.TaskCloud')[0];

function AddEventCalendar() {

  $('.slider-button')[0].childNodes.forEach((arg) => {
    if (arg.nodeName === 'INPUT') {
      arg.addEventListener('click', CheckSliderButton)
    }
  })

}

function CheckSliderButton() {
  event.target.value === 'Следующий месяц' ? NextSlide() : PrevSlide();
}

function PrevSlide() {

  if ( $('.Calendar').children().length > 1 ) return;

  PrevDate = Last_date;
  PrevDate.setMonth( PrevDate.getMonth() - 1)

  Prev_slide = document.createElement('div');
  CreateCalendar(PrevDate, Prev_slide);

}

function NextSlide() {

  if ( $('.Calendar').children().length > 1 ) return;

  NextDate = Last_date;
  NextDate.setMonth( NextDate.getMonth() + 1 );

  Next_slide = document.createElement('div');
  CreateCalendar(NextDate, Next_slide);

}

function CreateCalendar(CalendarDate = new Date(), slide = undefined) {

  let next_month = CalendarDate.getMonth() + 1,
      Arr_day = [],
      Grid_Template = '',
      iter = 0,
      last_week,
      Points = 7,
      CurrentMonthAndYear = [CalendarDate.getMonth(), CalendarDate.getFullYear()];

  CalendarDate.setDate(1);

  if ( next_month === 12 ) next_month = 0;


  while ( CalendarDate.getMonth() !== next_month ) {

    Arr_day.push( CalendarDate.getDate() );
    CalendarDate.setDate( CalendarDate.getDate() + 1 );

  }

  CalendarDate.setMonth(CalendarDate.getMonth() - 1);
  CalendarDate.setDate(1);
  
  switch( CalendarDate.getDay() ) {

    case 0:
    Grid_Template += "\". . . . . . Num1\"\n\"";
    break;

    case 1:
    Grid_Template += '\"Num1 Num2 Num3 Num4 Num5 Num6 Num7\"\n\"';
    break;

    case 2:
    Grid_Template += '\". Num1 Num2 Num3 Num4 Num5 Num6\"\n\"';
    break;

    case 3:
    Grid_Template += '\". . Num1 Num2 Num3 Num4 Num5\"\n\"';
    break;

    case 4:
    Grid_Template += '\". . . Num1 Num2 Num3 Num4\"\n\"';
    break;

    case 5:
    Grid_Template += '\". . . . Num1 Num2 Num3\"\n\"';
    break;

    case 6:
    Grid_Template += '\". . . . . Num1 Num2\"\n\"';
    break;

  }

  i = +Grid_Template[Grid_Template.lastIndexOf('m') + 1];


  while ( i < Arr_day.length ) {

    if (iter === 7) {
      
      Grid_Template += '"\n\"';
      Grid_Template = Grid_Template.replace(' "', '"');
      iter = 0;

    }
    Grid_Template += 'Num' + Arr_day[i] + ' ';
    iter++;
    i++;
  }
  
  last_week = Grid_Template.slice( Grid_Template.lastIndexOf('"') + 1 );
  last_week = last_week.split(' ');
  last_week.pop();
  Points -= last_week.length;

  for (let i = 1; i <= Points; i++) {

    Grid_Template += ' . ';
    if ( i === Points ) Grid_Template += '"';

  }

  Grid_Template = Grid_Template.replace(' "', '"');
  
  if (slide === undefined) {
    calendar = document.createElement('div');
    calendar.style.display = 'grid';
  }

  for (let i = 0; i <= Arr_day.length - 1; i++) {
    
    h2 = document.createElement('h2');
    h2.innerText = Arr_day[i];
    h2.style.gridArea = 'Num' + Arr_day[i];
    h2.classList.add('NumDay');

    if (CreateCalendar.caller === NextSlide) slide.appendChild(h2);
    if (CreateCalendar.caller === PrevSlide) slide.appendChild(h2);
    if (slide === undefined) calendar.appendChild(h2);

  }

  if (CreateCalendar.caller === NextSlide) {

    slide.style.gridTemplateAreas = Grid_Template;
    slide.classList.add('SlideCalendar');
    slide.style.top = '-20.1rem';
    slide.style.left = '69rem';

    $('.Calendar')[0].appendChild(slide);

    prevElem = slide.previousElementSibling;

    TweenMax.to(prevElem, 0.8, {left: '-69rem'});
    TweenMax.to(slide, 0.8, {left: '0rem'});

    setTimeout(() => {
      prevElem.remove();
      slide.style.top = '0rem';
    }, 800)
    
  }

  if (CreateCalendar.caller === PrevSlide) {

    slide.style.gridTemplateAreas = Grid_Template;
    slide.classList.add('SlideCalendar');
    slide.style.top = '-20.1rem';
    slide.style.left = '-69rem';

    $('.Calendar')[0].appendChild(slide);

    prevElem = slide.previousElementSibling;

    TweenMax.to(prevElem, 0.8, {left: '69rem'});
    TweenMax.to(slide, 0.8, {left: '0rem'});

    setTimeout(() => {
      prevElem.remove();
      slide.style.top = '0rem';
    }, 800)

  }

  if (slide === undefined) {
    calendar.style.gridTemplateAreas = Grid_Template;
    calendar.classList.add('SlideCalendar')

    $('.Calendar')[0].appendChild(calendar);
  }


  if ( CurrentMonthAndYear.includes( new Date().getMonth() ) &&
       CurrentMonthAndYear.includes( new Date().getFullYear() ) ) {

    CurrentDay = $('.Calendar').children().last()[0].childNodes[new Date().getDate() - 1];
    CurrentDay.style.backgroundColor = 'black';
    CurrentDay.style.color = 'greenyellow';
    CurrentDay.style.boxShadow = '0px 0px 6px greenyellow';

    
    for ( let i = new Date().getDate() - 1; i < Arr_day.length; i++ ) {

      CurrentDay = $('.Calendar').children().last()[0].childNodes[i];
      CurrentDay.style.cursor = 'pointer';
      CurrentDay.addEventListener('mouseenter', () => {

        ElemColor = getComputedStyle( event.target ).color;

        if (event.target.getBoundingClientRect().left === 172.828125) {

          let Triangle = $('.Triangle')[0],
              ElemLeftPos = event.target.getBoundingClientRect().left,
              ElemTopPos = event.target.getBoundingClientRect().top;

          Triangle.style.borderRightColor = 'rgba(0, 0, 0, 0)';
          Triangle.style.borderLeftColor = 'rgb(2, 2, 87)';

          Cloud.style.left = (ElemLeftPos + 210) + 'px';
          Cloud.style.top = (ElemTopPos + 38) + 'px';
          
          TweenMax.to(Cloud, 1, {opacity: '100%'});
          
        } else {

          let Triangle = $('.Triangle')[0],
              ElemLeftPos = event.target.getBoundingClientRect().left,
              ElemTopPos = event.target.getBoundingClientRect().top,
              Cloud = $('.TaskCloud')[0];

          Triangle.style.borderLeftColor = 'rgba(0, 0, 0, 0)';
          Triangle.style.borderRightColor = 'rgb(2, 2, 87)';

          Cloud.style.left = (ElemLeftPos + 140) + 'px';
          Cloud.style.top = (ElemTopPos + 38) + 'px';

          TweenMax.to(Cloud, 1, {opacity: '100%'}); 
          
        }
        
        if (ElemColor === 'rgb(255, 0, 0)') {
          event.target.style.backgroundColor = 'darkred';
        } else {
          event.target.style.backgroundColor = 'darkgreen';
        }

        data_task = `${event.target.innerText}.${CalendarDate.getMonth()} + 1.${CalendarDate.getFullYear()}`;

        

      })

      CurrentDay.addEventListener('mouseout', () => {
        event.target.style.backgroundColor = 'black';

        setTimeout(() => {
        TweenMax.to(Cloud, 1, {opacity: '0%'});
        TweenMax.to(Cloud, 0.001, {left: '1rem'});
        }, 5000)

      })

      CurrentDay.addEventListener('click', OpenTaskForm);

    }

  }

  if ( CalendarDate.getMonth() > new Date().getMonth() || 
       CalendarDate.getFullYear() > new Date().getFullYear() ) {

    CurrentDay = $('.Calendar').children().last()[0].childNodes;

    for ( let i = 0; i < CurrentDay.length; i++ ) {

      CurrentDay[i].style.cursor = 'pointer';
      
      CurrentDay[i].addEventListener('mouseenter', () => {

        CurrentDay[i].style.backgroundColor = 'darkred';

        if (event.target.getBoundingClientRect().left === 172.828125) {

          let Triangle = $('.Triangle')[0],
              ElemLeftPos = event.target.getBoundingClientRect().left,
              ElemTopPos = event.target.getBoundingClientRect().top;

          Triangle.style.borderRightColor = 'rgba(0, 0, 0, 0)';
          Triangle.style.borderLeftColor = 'rgb(2, 2, 87)';

          Cloud.style.left = (ElemLeftPos + 210) + 'px';
          Cloud.style.top = (ElemTopPos + 38) + 'px';
          
          TweenMax.to(Cloud, 1, {opacity: '100%'});

        } else {

          let Triangle = $('.Triangle')[0],
              ElemLeftPos = event.target.getBoundingClientRect().left,
              ElemTopPos = event.target.getBoundingClientRect().top,
              Cloud = $('.TaskCloud')[0];

          Triangle.style.borderLeftColor = 'rgba(0, 0, 0, 0)';
          Triangle.style.borderRightColor = 'rgb(2, 2, 87)';

          Cloud.style.left = (ElemLeftPos + 140) + 'px';
          Cloud.style.top = (ElemTopPos + 38) + 'px';

          TweenMax.to(Cloud, 1, {opacity: '100%'});

        }

        $.ajax({

          method: 'POST',
          url: '../PHP_Scripts/CheckTasks.php',
          success: function(arg) {

            $('.TaskLnk')[0].innerText = arg;

          }          

        })

      })

      CurrentDay[i].addEventListener('mouseout', () => {

        CurrentDay[i].style.backgroundColor = 'black';

        setTimeout(() => {

        TweenMax.to(Cloud, 1, {opacity: '0%'});
        TweenMax.to(Cloud, 0.001, {left: '1rem'});

        }, 5000)

      })

      CurrentDay[i].addEventListener('click', OpenTaskForm);

    }
         

  }

  Last_date = CalendarDate;

  switch(CalendarDate.getMonth()) {

    case 0:
      $('.MonthAndYear').children()[0].innerText = 'Январь ' + CalendarDate.getFullYear() + 'г.' 
    break;

    case 1:
      $('.MonthAndYear').children()[0].innerText = 'Февраль ' + CalendarDate.getFullYear() + 'г.'
    break;

    case 2:
      $('.MonthAndYear').children()[0].innerText = 'Март ' + CalendarDate.getFullYear() + 'г.'
    break;

    case 3:
      $('.MonthAndYear').children()[0].innerText = 'Апрель ' + CalendarDate.getFullYear() + 'г.'
    break;

    case 4:
      $('.MonthAndYear').children()[0].innerText = 'Май ' + CalendarDate.getFullYear() + 'г.'
    break;

    case 5:
      $('.MonthAndYear').children()[0].innerText = 'Июнь ' + CalendarDate.getFullYear() + 'г.'
    break;

    case 6:
      $('.MonthAndYear').children()[0].innerText = 'Июль ' + CalendarDate.getFullYear() + 'г.'
    break;

    case 7:
      $('.MonthAndYear').children()[0].innerText = 'Август ' + CalendarDate.getFullYear() + 'г.'
    break;

    case 8:
      $('.MonthAndYear').children()[0].innerText = 'Сентябрь ' + CalendarDate.getFullYear() + 'г.'
    break;

    case 9:
      $('.MonthAndYear').children()[0].innerText = 'Октябрь ' + CalendarDate.getFullYear() + 'г.'
    break;

    case 10:
      $('.MonthAndYear').children()[0].innerText = 'Ноябрь ' + CalendarDate.getFullYear() + 'г.'
    break;

    case 11:
      $('.MonthAndYear').children()[0].innerText = 'Декабрь ' + CalendarDate.getFullYear() + 'г.'
    break;

  }

}

function OpenTaskForm() {

  data_task = `${event.target.innerText}.${Last_date.getMonth() + 1}.${Last_date.getFullYear()}`;
  $('.TaskForm')[0].style.visibility = 'visible';
  $('.TaskForm')[0].style.top = '16rem';
  $('.TaskForm')[0].style.opacity = '100%';

}

AddEventCalendar();
CreateCalendar();