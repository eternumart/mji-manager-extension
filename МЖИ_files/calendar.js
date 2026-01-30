/*****************************************************
*                     Календарь                      *
******************************************************/

/* Interface */

var Calendar={
  containerDataId : "containerData",
  calendarBody    : "calendarBody",
  InputEdit            : null,
  classHide           : "hide",
  classDisable      : "disable",
  //
  show : function(Control) {
               if (Control) {
                 // readonly/disable
                 if (Control.tabIndex&&Control.tabIndex<0) return false;
                 //
                 Form.popupCancel();                                             // закроем предыдущий popup
                 var container=domNodeParent(Control,6);
                 var containerData=domNodeLastChild(container);
                 // div-контейнер тела календаря
                 var calendarBody=document.getElementById(this.calendarBody);
//                 var table=domNodeFirstChild(containerData);
//                 if (table) containerData.style.display=""; else containerData.appendChild(domNodeFirstChild(calendarBody));
                 // table-сетка календаря
                 var table=calendarBody.getElementsByTagName("TABLE")[0];
                 // добавить table-сетку календаря в div-контейнер компонента
                 containerData.appendChild(table);
                 //
                 Control.setAttribute("data-state","1");
                 this.InputEdit=domNodePrev(Control);
                 Form.popupRegistr(this.InputEdit,"CALENDAR");                   // и запомним себя для close при потере фокуса
                 calendar.showBox(containerData,this.InputEdit);
                 Control.className="show";
               }
             },
  close :    function(Control,ev) {
               if (Control) {
                 if (parseInt(Control.getAttribute("data-state"))==0) return false;
                 var container=domNodeParent(Control,6);
                 var containerData=domNodeLastChild(container);
//                 containerData.style.display="none";
                 // delete table-сетку календаря из контейнера компонента
                 var table=containerData.removeChild(domNodeFirstChild(containerData));
                 // вернуть table-сетку календаря в буфер-контейнер
                 document.getElementById(this.calendarBody).appendChild(table);
                 // элементы управления
                 Control.setAttribute("data-state","0");
                 Control.className="hide";
                 this.InputEdit.focus();
                 ev=ev||window.event;
                 eventCancel(ev);
               }
             },
  state :    function(Control) {
               if (Control) {
                 var status=parseInt(Control.getAttribute("data-state"));
                 if (status==0) this.show(Control); else this.close(Control);
               }
             },
  setMonth : function(month) {
               calendar.changeMonth(month)
             },
  setYear  : function(obj,diff) {
               var val=parseInt(obj.value)+parseInt(diff);
               calendar.changeYear(val);
             },
  closeBtn : function(Button) {
               if (Button) {
                 var div=domNodeParent(Button,6);
                 if (div) this.close(div.getElementsByTagName("A")[0]);
               }
             },
  select   : function(Cell) {calendar.selectDay(Cell);},
  enter    : function() {calendar.enter();},
  today    : function() {calendar.enterToday();},
  key      : function(ev,box) {
               ev=ev||window.event;
               var res=true;
               if (box) {
                 var Control=domNodeNext(box);
                 if (Control.getAttribute("data-state")=="1") res=calendar.keyNavigator(ev);
                 else {
                   if (ev.keyCode==40) this.show(Control);
                 }
               }
               return res;
             },
  setReadonly: function(Edit,flag) {
                          if (Edit&&Edit.tagName=="INPUT") {
                            var Control=domNodeNext(Edit);
                            if (Control&&Control.tagName=="A") Component.setReadonlyAttribute(Edit,Control,flag,this.classHide,this.classDisable);
                          }
                        }
}


/* Body */

var calendar = {
  editBox        : null,         // объект-вызывающий элемент
  format         : "DD.MM.YYYY",
  isCancelKey    : false,
  timeoutId      : null,         // id процесса cancel (автозакрытие окна)
  // id элементов
  nameContainer  : "calendar",
  namePanelYear  : "PanelYear",
  namePanelMonth : "PanelMonth",
  namePanelDay   : "PanelDay",
  nameBtnOK      : "BtnOK",
  nameBtnCancel  : "BtnCancel",
  // панели
  container    : null,
  panelYear    : null,
  panelMonth   : null,
  panelDay     : null,
//  classMonthBox : null, // компонент месяц
//  classYearBox  : null, // компонент год
  btnOK         : null, // компонент кнопка OK
  // цветовая гамма
  colorBase    : '#ffffff',
  colorActive  : '#e8e8e8',//'#FFE1E1';//'#d6e0ee';
  fontFamily   : 'verdana, Arial, Arial Cyr, Helvetica, Sans-Serif',
  fontSize     : '10px',
  fontColor    : '#000000',
  borderColor  : '#eeeeee',
  borderActive : '#646464',
  // координаты текущей даты (индексы ячеек)
  curRow       : null,
  curCell      : null,
  maxRow       : 7,
  minCell      : 0,
  maxCell      : 6,
//  monthname    : new Array('Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'),
  monthname    : new Array({id:1,text:"Январь"},{id:2,text:"Февраль"},{id:3,text:"Март"},{id:4,text:"Апрель"},{id:5,text:"Май"},{id:6,text:"Июнь"},{id:7,text:"Июль"},{id:8,text:"Август"},{id:9,text:"Сентябрь"},{id:10,text:"Октябрь"},{id:11,text:"Ноябрь"},{id:12,text:"Декабрь"}),
  dayname      : new Array('Воскресенье','Понедельник','Вторник','Среда','Четверг','Пятница','Суббота'),
  daynameshort : new Array('пн','вт','ср','чт','пт','сб','вс'),
  // дата
  curDate      : null,
  curDateAttr  : {},    // {day,date,month,year,maxdate,firstday}
  Sysdate      : null,
  // возвращает индексы ячейки из td.id
  cellAttr     : function(cell) {
                   var s=cell.id.replace("row_","").replace("cell_","");
                   return {i:parseInt(s.substr(0,s.indexOf("_")))+2,j:parseInt(s.substr(s.indexOf("_")+1))}  
                 },
  prepareDate  : function(strDate) {
                   var res=false;
                   var DT=dateToStr(strDate);
                   if (DT.code) {
                     this.curDate = new classDate(DT.value,this.format,0);
                     this.curDateAttr=this.curDate.params();
                     res=true;
                   }
                   return res;
                 },
  // вывод чисел на месяц
  printDay      : function() {
                    // месяц/год сервер-даты
//                    var isSysdate=(parseInt(this.Sysdate.m)==this.curDateAttr.month-1)&&(this.Sysdate.y==this.curDateAttr.year);
                    var isSysdate=(parseInt(this.Sysdate.m)==this.curDateAttr.month)&&(this.Sysdate.y==this.curDateAttr.year);
                    var n=0;
                    this.maxRow=null; this.maxCell=null;
                    for (var i=2; i<8; i++) {
                      for (var j=0; j<7; j++) {
                        if (i==2 && j<this.curDateAttr.firstday) this.setCell(i,j," ");
                        else 
                          if (n<this.curDateAttr.maxdate) {
                            n=n+1;
                            this.setCell(i,j,n,(isSysdate&&n==this.Sysdate.d));
                            if (n==1) this.minCell=j;
                            if (n==this.curDateAttr.date) this.selCell(i,j);
                          }
                          else {
                            this.setCell(i,j," ");
                            if (this.maxRow==null) this.maxRow=(j==0)?i-1:i;
                            if (this.maxCell==null) this.maxCell=j-1;
                            if ((j==6)&&(isNaN(this.maxCell)||this.maxCell<0)) this.maxCell=6;
                          }
                      }
                    }
                    if (this.maxRow==null) this.maxRow=(isNaN(this.getCell(7,0)))?6:7;
                    this.maxCell=(this.maxCell<0)?0:this.maxCell;
                    this.maxCell=(isNaN(this.getCell(this.maxRow,this.maxCell)))?6:this.maxCell;
//                    this.editBox.focus();
                  },
  // устанавливает содержимое ячейки
  setCell      : function(i,j,txt,isToday) {
                   var obj=this.panelDay.rows[i].cells[j];
                   obj.innerHTML=txt;
                   if (isToday) obj.style.color="blue"; else obj.style.color="";
//				   obj.style.fontWeight="normal";
//                   obj.style.color=""; obj.style.fontWeight="normal";
                 },
  // возвращает содержимое ячейки
  getCell      : function(i,j) {
                   return parseInt(this.panelDay.rows[i].cells[j].innerHTML);
                 },
  // выделение ячейки
  selCell      : function (i,j) {
                   var res=false;
                   var obj1;
                   if (this.curRow!=null&&this.curCell!=null) obj1=this.panelDay.rows[this.curRow].cells[this.curCell];
                   var obj2=this.panelDay.rows[i].cells[j];
                   var num=this.getCell(i,j);
                   if (!isNaN(num)) {
                     res=true;
                     if (obj1) obj1.className="";   // отменим выделение
                     obj2.className="selected";     // выделим
                     this.curDateAttr.date=num;
                     this.curRow=i; this.curCell=j; // зафиксируем координаты текущей даты
                   }
                   return res;
                 },
  // смена месяца
  //   генерация события change isChange: true/false - да/нет
  setMonth     : function(month,isChange) {
                   month=parseInt(month);
                   if ((month>-1)&&(month<12)) {
                     this.panelMonth.value=month;
                     if (isChange) this.panelMonth.onchange();
                   }
                 },
  setYear      : function(year) {
                   this.panelYear.value=year;
                   this.curDateAttr.year=year;
                 },

  //*** обработчики событий

  // смена месяца
  changeMonth  : function(month) {
                   month=parseInt(month);
                   if ((month<0)||(month>11)) return false;
                   var res; var bufDay=this.curDateAttr.date;
                   res=this.prepareDate("10."+parseInt(month+1)+"."+this.curDateAttr.year);
                   // не переходить на следующий месяц
                   if (res) {
                     this.curDateAttr.date=(bufDay>this.curDateAttr.maxdate)?this.curDateAttr.maxdate:bufDay;
                     this.printDay(); // перерисовка
                     this.editBox.focus();
                   }
                 },
  // смена года
  changeYear   : function(year) {
                   year=parseInt(year);
//                   year=(isNaN(year))?parseInt(this.panelYear.value):year;  
                   if (!isNaN(year)&&year>1000&&this.curDateAttr.year!=year) {
                     res=this.prepareDate(this.curDateAttr.date+"."+parseInt(this.curDateAttr.month)+"."+year);
                     if (res) {
                       this.panelYear.value=year;
                       this.printDay(); // перерисовка
                       this.editBox.focus();
                     }
                   }
                 },
  // подготовить
  prepare      : function(strDate) {
                   var res;
                   res=this.prepareDate(strDate);
                   if (res) {
                     if (!this.container)  this.container=document.getElementById(this.nameContainer);
                     if (!this.panelYear)  this.panelYear=document.getElementById(this.nameContainer+this.namePanelYear);
                     if (!this.panelMonth) this.panelMonth=document.getElementById(this.nameContainer+this.namePanelMonth);
                     if (!this.panelDay)   this.panelDay=document.getElementById(this.nameContainer+this.namePanelDay);
                     if (!this.btnOK)      this.btnOK=document.getElementById(this.nameContainer+this.nameBtnOK);
                   }
                   return res;
                 },
  // показать
  show         : function(strDate,boxLeft,boxTop,boxWidth,boxHeight) {
                   if (!this.container||!this.editBox) return false;
                   var res; var posX; var posY;
                   this.Sysdate=parseSysdate();
                   this.isCancelKey=false;
                   res=this.prepare(strDate);
                   var year=domNodeLastChild(domNodeFirstChild(this.container).rows[0].cells[0]);
                   panelYear=year.getElementsByTagName("INPUT")[0];
                   // handler: year dec
                   domNodePrev(panelYear).onmousedown = function () {
                     stopYearChange=setInterval(function () {panelYear.value--;},300);
                     document.onmouseup=panelYear.onmouseup=function () {clearInterval(window.stopYearChange);}
                   }
                   // handler: year inc
                   domNodeNext(panelYear).onmousedown = function () {
                     stopYearChange=setInterval(function () {panelYear.value++;},300);
                     document.onmouseup=panelYear.onmouseup=function () {clearInterval(window.stopYearChange);}
                   }
                   var bounds=getBounds(this.container);
                   // положение editBox: posY
                   if (bounds.height*2>document.body.clientHeight) {
                     var h=boxTop-bounds.height/2; posY=(h<0)?boxTop:h;
                   }
                   else {
                     if (boxTop+bounds.height>document.body.clientHeight) posY=boxTop-bounds.height+boxHeight;
                     else posY=boxTop;
                   }
                   // положение editBox: posX
                   if (boxLeft+boxWidth+bounds.width>document.body.clientWidth) posX=boxLeft-bounds.width;
                   else posX=boxLeft+boxWidth;
                   // left,top
//                   if (posX) this.container.style.left=posX+"px";
//                   if (posY) this.container.style.top=posY+"px";
                   if (res) {
                     this.setYear(this.curDateAttr.year);
                     this.setMonth(parseInt(this.curDateAttr.month-1));
                     this.printDay();
                   }
                 },
  // показать от edit-компонента
  showBox      : function(Container,editBox,formatDate) {
                   if (Container&&editBox) {
                     this.format=(formatDate)?formatDate:this.format;
                     this.container=Container;
                     this.editBox=editBox;
                     // edit-геометрия
//                     var bounds=getBounds(this.editBox);
                     var bounds=getElementRect(this.editBox);
//                     var bounds=getElementPosition(this.editBox);
                     // текущее значение даты
                     var dt=this.editBox.value;
                     if (dt.length>0) {
                       var reg=/^[0-9|\.|\-|\/ ]+$/g;
                       dt=(reg.test(dt))?dt:"";
                     }
                     dt=(dt.length>0)?dt:Form.sysdate;
//                     this.show(this.editBox.value,bounds.left,bounds.top,bounds.width,bounds.height);
                     this.show(dt,bounds.left,bounds.top,bounds.width,bounds.height);
                     editBox.focus();
                   }
                 },
  // выбрать день
  selectDay    : function(cell) {
                   var attr=this.cellAttr(cell);
                   if (this.selCell(attr.i,attr.j)) this.enter(); else this.editBox.focus();
                 },
  // выбрать дату
  enter        : function() {
                   this.curDate.set(this.curDateAttr.date,this.curDateAttr.month,this.curDateAttr.year);
                   this.editBox.value=this.curDate.dateToString(this.format);
                   this.cancel();
                   if (typeof(this.editBox.onchange)=="function") this.editBox.onchange();
                 },
  // отменить
  cancel       : function(ev) {
                   Calendar.close(domNodeNext(this.editBox));
                 },
  // установка фокуса на OK
  focusSet     : function(ev) {
                   ev=ev||window.event;
                   if (ev.srcElement.tagName!="BUTTON") this.btnOK.focus();
                 },
  // управление автозакрытием окна
  //   key: true/false - onfocus/onblur
  focusControl : function(key) {
    if (key) {
      if (this.timeoutId!=null) {
        clearTimeout(this.timeoutId);
        this.timeoutId=null;
      }
    }
    else {
      var self=this;
      this.timeoutId=setTimeout(function(){self.cancel()},500);
    }
  },
  // установить год
  setEditYear  : function(obj,diff) {
                   var val=parseInt(obj.value)+parseInt(diff);
//                   this.setYear(val);
                   this.changeYear(val);
                },

  // выбрать СЕГОДНЯ
  enterToday    : function() {
                    this.curDateAttr.date=this.Sysdate.d;
					this.curDateAttr.month=this.Sysdate.m;
					this.curDateAttr.year=this.Sysdate.y;
                    this.enter();
                  },
  // прокрутка от клавиш: key: +/-
  scrolling    : function(key) {
                   if (key=="-") {
                     if (this.curDateAttr.month==1) {
                       this.setYear(this.curDateAttr.year-1);        // предыдущий год
                       this.setMonth(11,true);                       // последний месяц
                     } else {
                       this.setMonth(this.curDateAttr.month-2,true); // предыдущий месяц
                     }
                   } else {
                     if (this.curDateAttr.month==12) {
                       this.setYear(this.curDateAttr.year+1);        // следующий год
                       this.setMonth(0,true);                        // первый месяц
                     } else {
                       this.setMonth(this.curDateAttr.month,true);   // следующий месяц
                     }
                   }
  },
  // обработчик нажатия клавиш
  keyNavigator : function(ev) {
                   var isContinue=false;
                   ev=(ev)?ev:window.event;
                   var obj=ev.srcElement;
                   var keyCode=ev.keyCode;
                   // TAB на кнопках
                   if ((keyCode==9)&&(obj.tagName=="BUTTON")) {
                     return true;
                   }
                   // Enter
                   if (keyCode==13) {this.enter(); return false;}
                   // Esc
                   if (keyCode==27) {this.cancel(); return false;}
                   // навигация
                   var i=this.curRow; var j=this.curCell;
                   switch (keyCode) {
                     case 37: // ArrLeft
                       j=this.curCell-1; if (i>2 && j<0) {i=this.curRow-1; j=6}; break;
                     case 39: // ArrRight
                       j=this.curCell+1; if (i<this.maxRow && j>6) {i=this.curRow+1; j=0}; break;
                     case 38: // ArrUp
                       i=this.curRow-1; break;
                     case 40: // ArrDown
                       i=this.curRow+1; break;
                     case 36: // Home
                       i=2; j=this.minCell; break;
                     case 35: // End
                       i=this.maxRow; j=this.maxCell; break;
                       // месяц-1
                     case 33: // PageUp
                       // scroll
                       if (this.curDateAttr.month==1) {this.curDateAttr.month=13; this.setYear(this.curDateAttr.year-1);}
                       this.setMonth(this.curDateAttr.month-2,true);
                       eventCancel(ev);
                       return false;
                     // месяц+1
                     case 34: // PageDown
                       // scroll
                       if (this.curDateAttr.month==12) {this.curDateAttr.month=0; this.setYear(this.curDateAttr.year+1);}
                       this.setMonth(this.curDateAttr.month,true);
                       eventCancel(ev);
                       return false;
                     default:
                       isContinue=true;
                       break;
                   }
                   // check i/j
                   i=(i<3)?2:(i>this.maxRow)?this.maxRow:i;
                   j=(j<1)?0:(j>5)?6:j;
                   // down-удержание (scroll)
                   // scroll right
                   if (keyCode==39 && this.curRow==this.maxRow && (j>this.maxCell || this.curCell==6)) {
                     this.scrolling("+"); i=2; j=this.minCell;
                   }
                   // scroll left
                   if (keyCode==37 && this.curRow==2 && (j<this.minCell || this.curCell==0)) {
                     this.scrolling("-"); i=this.maxRow; j=this.maxCell;
                   }
                   // scroll rewind (up)
                   if ((keyCode==38)&&(i==2)) {
                     if ((this.curRow==2)||(this.curRow==3 && j<this.minCell)) {
                       this.scrolling("-"); i=this.maxRow; i=(j>this.maxCell)?i-1:i;
                     }
                   }
                   // scroll forward (down)
                   if (keyCode==40 && this.curRow>this.maxRow-2) {
                     if ((this.curRow==this.maxRow)||(this.curRow==this.maxRow-1 && j>this.maxCell)) {
                       this.scrolling("+"); i=2; i=(j<this.minCell)?i+1:i;
                     }
                   }
                   // выделение ячейки
                   this.selCell(i,j);
                   if (!isContinue) eventCancel(ev);
                   return isContinue;
                 }
}
