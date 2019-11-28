let cardElement = document.querySelector(".card");

cardElement.addEventListener("click", flip);

function flip(){
  cardElement.classList.toggle("flipped");
}
const input = document.querySelector('#month');


const monthNames = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
function Calendar(input, options) {
    this.now = new Date();
    this.day = this.now.getDate();
    this.month = this.now.getMonth();
    this.year = this.now.getFullYear();
    this.input = input;
    this.divCnt = null;
    this.divTable = null;
    this.divDateText = null;
    this.divButtons = null;


    const defaultOptions = {
        closeOnSelect : true,
        onDateSelect : function(day, month, year) {
            const monthText = ((month + 1) < 10) ? "0" + (month + 1) : month + 1;
            const dayText =  (day < 10) ? "0" + day : day;
            this.input.value = dayText + '-' + monthText + '-' + this.year;
        }.bind(this)
    }
    this.options = Object.assign({}, defaultOptions, options);


    this.createButtons = function () {
        const buttonPrev = document.createElement('button');
        buttonPrev.innerText = '<';
        buttonPrev.type = "button";
        buttonPrev.classList.add('input-prev');
        buttonPrev.addEventListener('click', function () {

            this.month--;
            if (this.month < 0) {
                this.month = 11;
                this.year--;
            }
            this.createCalendarTable();
            this.createDateText();
        }.bind(this));
        this.divButtons.appendChild(buttonPrev);

        const buttonNext = document.createElement('button');
        buttonNext.classList.add('input-next');
        buttonNext.innerText = '>';
        buttonNext.type = "button";
        buttonNext.addEventListener('click', function () {
            this.month++;
            if (this.month > 11) {
                this.month = 0;
                this.year++;
            }
            this.createCalendarTable();
            this.createDateText();
        }.bind(this));
        this.divButtons.appendChild(buttonNext);
    };

    this.createCalendarTable = function () {
       //czyścimy div z tabelą
       this.divTable.innerHTML = '';

       //tworzymy tabelę z dniami kalendarza
       const tab = document.createElement('table');
       tab.classList.add('month');



       let tr = document.createElement('tr');
        tr.classList.add('orangeTr');

        const days = ['P', 'W', 'Ś', 'C', 'P', 'S', 'N'];
        for (let i=0; i<days.length; i++) {
            const th = document.createElement('th');
            th.innerHTML = days[i];

            tr.appendChild(th);
        }
        tab.appendChild(tr);
        const daysInMonth = new Date(this.year, this.month+1, 0).getDate();

        const tempDate = new Date(this.year, this.month, 1);
        let firstMonthDay = tempDate.getDay();

        //w JavaScript  pierwszym dniem jest niedziela, a poniedziałek ostatnim
        //w razie czego robimy korektę
        if (firstMonthDay === 0) {
            firstMonthDay = 7;
        }

        //liczba wszystkich komórek - i pustych i z dniami
        const j = daysInMonth + firstMonthDay - 1;
        if (firstMonthDay - 1 !== 0) {
            tr = document.createElement('tr');
            tab.appendChild(tr);
        }
        for (let i=0; i<firstMonthDay-1; i++) {
          const td = document.createElement('th');
          td.innerHTML = '';
          tr.appendChild(td);
      }

      //generujemy komórki z dniami miesiąca
      for (let i = firstMonthDay-1; i<j; i++) {
          if(i % 7 === 0){
              tr = document.createElement('tr');
              tab.appendChild(tr);
          }

          const td = document.createElement('th');
          td.innerText = i - firstMonthDay + 2;
          td.dayNr = i - firstMonthDay + 2;
          td.classList.add('day');


          if (this.year === this.now.getFullYear() && this.month === this.now.getMonth() && this.day === i - firstMonthDay + 2) {
                td.classList.add('current-day-date');

                td.classList.remove('day');
            }

          tr.appendChild(td);
      }
       tab.appendChild(tr);
      //tabelę dołączamy do div divTable
      this.divTable.appendChild(tab);

   };

    this.toggleShow = function() {
        this.divCnt.classList.toggle('calendar-show');
    }

    this.show = function() {
        this.divCnt.classList.remove('day');
        this.divCnt.classList.add('current-day');
    }

    this.hide = function() {
        this.divCnt.classList.remove('current-day');
        this.divCnt.classList.add('day');

    }
    this.createDateText = function () {
        // const monthNames = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];

        this.divDateText.innerHTML = monthNames[this.month] + ' ' + this.year;
    };
    // const node = document.getElementById("#month")
    this.bindTableDaysEvent = function() {
          this.divTable.addEventListener('click', function(e) {
              if (e.target.tagName.toLowerCase() === 'th' && e.target.classList.contains('day')) {
                  this.options.onDateSelect(e.target, e.target.dayNr, this.month,this.year);
                  console.log("XD1");


              }
              if(e.target.tagName.toLowerCase() === 'th' && e.target.classList.contains('current-day-date')){
                  this.options.onDateSelect(e.target, e.target.dayNr, this.month,this.year);
              }
          }.bind(this));
      }
    //metoda inicjująca obiekt

    this.init = function () {
        //zmieniany inputowi dodaję klasę - doda ona ikonkę kalendarza i zmieni jego kursor


        //tworzymy div z całą zawartością
        this.divCnt = document.createElement('div');
        this.divCnt.classList.add('contentfront');

        //tworzymy wrapper dla input
        this.calendarWrapper = document.createElement('div');
        this.calendarWrapper.classList.add('xd');
        this.input.parentElement.insertBefore(this.calendarWrapper, this.input);
        this.calendarWrapper.appendChild(this.divCnt);

        //tworzymy div z guzikami
        this.divButtons = document.createElement('div');
        this.divButtons.className = "calendar-prev-next";
        this.createButtons();



        //tworzymy div z nazwą miesiąca
        this.divDateText = document.createElement('div');
        this.divDateText.className = 'monthnames';
        this.divDateTextEvents = document.createElement('div');
        this.divDateTextEvents.className = 'events';
        this.divDateTextEventsDate = document.createElement('div');
        this.divDateTextEventsDate.className = 'eventsDate';
        this.divDateTextEventsDateAdd = document.createElement('button');
        this.divDateTextEventsDateAdd.className = 'eventsDateAdd';
        this.divDateTextEventsDateAdd.setAttribute("id", "eventsDateAddbutton");
        this.divDateTextEvents.setAttribute("id", "events");

        this.createDateText();

        this.divHeader = document.createElement('div');
        this.divHeader.classList.add('datecont');
        this.divHeader.classList.add('date');

        this.divHeader.appendChild(this.divButtons);
        this.divHeader.appendChild(this.divDateText);
        this.divHeader.appendChild(this.divDateTextEventsDate);
        this.divHeader.appendChild(this.divDateTextEvents);

        this.divHeader.appendChild(this.divDateTextEventsDateAdd)
        this.divCnt.appendChild(this.divHeader);

        //tworzymy div z tabelą kalendarza
        this.divTable = document.createElement('div');
        this.divTable.className = 'month';
        this.divCnt.appendChild(this.divTable);
        this.createCalendarTable();
        this.bindTableDaysEvent();

        this.input.addEventListener('click', function() {
            this.toggleShow();
        }.bind(this));


        this.input.addEventListener('click', function(e) {
            e.stopImmediatePropagation();
        });
        this.divCnt.addEventListener('click', function(e) {
            e.stopImmediatePropagation();
        });

        document.addEventListener('click', function() {
            this.hide();
        }.bind(this));

        //nasz div z zawartością wrzucamy na koniec body
        this.calendarWrapper.appendChild(this.divCnt);
    };

};
const opt1 = {
    closeOnSelect : false,
    onDateSelect : function(tgt, day, month, year, now, date2) {
        var elems = document.querySelector(".current-day");
        if(elems != null){
          elems.classList.add("day");
          elems.classList.remove("current-day");
        }

            tgt.classList.remove('day');
            tgt.classList.add('current-day');

            console.log("XD");
            var eventsshowDate = document.querySelector(".eventsDate");
            const dateevent = day + '  ' + monthNames[month] + '  ' + year;
            eventsshowDate.innerHTML = dateevent;
            var eventsshow = document.querySelector(".events");
            const d2 = date2;
            // var nd = Date(date2);
            // var nd2 = new Date(date2);
             // eventsshow.innerHTML = new Date(year,month,day);
             eventsshow.innerHTML = year + '-' + (month+1) + '-' + day;

        }.bind(this)
}

const cal = new Calendar(input, opt1);
cal.init();


// for(y=1;y<6;y++){
//    for(j=0;j<35;j++){
//      if(j == 0 || j == 1 || j == 33 || j == 34){
//          var di = tbl.rows[y].cells.length;
//          if( 1*j == days[j]){
//            tbl.rows[y].cells[j*y].innerHTML = " ";
//            }
//            else{
//              tbl.rows[y].cells[j].innerHTML = days[j];
//            }
//    }}}
