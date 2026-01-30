  // возвращает TRUE, если значение Null
  function isNull(src) {
    if (!src) return true;
    if (typeof src == "object") return false;
    src=src+""; src=src.trim();
    return (src.length==0)?true:false;
  }
  // возвращает TRUE, если значение NotNull
  function isNotNull(src) {
    return !isNull(src);
  }
  // слово из символов
  function isCharWord(src) {
    var res=true; var reg=/^([a-zA-Zа-яА-Я]+)$/;
    if (isNotNull(src)) if (!reg.test(src)) res=false;
    return res;
  }
  // integer
  function isInteger(src) {
    var res=false; var reg=/^([0-9]+)$/;
    if (reg.test(src)) res=true;
    return res;
  }

/*****************************************************
*                      Дата                          *
******************************************************/
// Зависимости:
//   validate.js
// Параметры:
//   strDate:      строковое представление даты
//   maskDate:     маска формата исходной даты для strDate (для правильной интерпретации формата)
//   isCheckMode:  0/1 - [читать errCode]/[alert с сообщением errMess]
function classDate(strDate,maskDate,isCheckMode)  {
  strDate = strDate || null;
  if (strDate!=null) strDate = (strDate.length==0) ? null : strDate;
  // public const
  this.errCode = null;              // код ошибки - индекс массива сообщений об ошибке
  this.maskDefault = "DD.MM.YYYY";  // дефолт. формат
  //*** private const
  var monthname  = new Array('январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь');
  var dayname = new Array('понедельник','вторник','среда','четверг','пятница','суббота','воскресенье');
  var daynameshort = new Array('пн','вт','ср','чт','пт','сб','вс');
  var separators="-/.:, ";
  var errMess = new Array("Неправильная дата","Неправильная маска","Неправильный разделитель разрядов","Неправильный день","Неправильный месяц","Неправильный год");
  // privat attr
  var dt=new Date();
  var day=null;
  var date=null;
  var month=null;
  var year=null;
  var maxdate=null;  // кол-во дней в месяце
  var firstday=null; // наименование первого дня месяца
   // включения
//  var valid = new classValidate();
  // методы
  var sysdate = function () {
    var today = new Date();
    return {day:today.getDate(), month:today.getMonth()+1, year:today.getFullYear()}
  }
  // interface присвоение атрибутов даты
  this.set = function(d,m,y) {
    date=d;
    month=m;
    year=y;
  }
  // установка заделителя в заданную позицию pos (начиная с 0)
  var splitter = function(str,separator,pos) {
    if ((pos<0)||(pos>str.length)) return str;
    return str.substr(0,pos)+separator+str.substr(pos);
  }
  // возвращает массив элементов маски
  var getArrMask = function (mask,separator) {
    var reg;
    reg=/D+/g; mask=mask.replace(reg,"D"); 
    reg=/M+/g; mask=mask.replace("MON","M"); mask=mask.replace(reg,"M"); 
    reg=/Y+/g; mask=mask.replace(reg,"Y");
    return mask.split(separator); // массив элементов маски
  }
  // возвращает номер месяца по контексту наименования
  var getMonthNum = function(src) {
    var res=null;
    src=src.toLowerCase(src);
    for (var i=0; i<monthname.length; i++) {
      if (monthname[i].indexOf(src)>=0) {res=i+1; break}
    }
    // поиск в варианте родительного падежа
    if (res==null) {
      for (var i=0; i<monthname.length; i++) {
        if (monthToGenitive(i).indexOf(src)>=0) {res=i+1; break}
      }
    }
    return res;
  }
  // форматирование данных в дефолт. формат (распознавание формата данных)
  this.getDefFormatDate = function (strDate) {
    var res="", s, flag=false, arrNum, arrMask;
    var d=null, m=null, y=null;
    var maskD=null, maskM=null, maskY=null;
    // форматирование исходной строки
    strDate=strDate.toUpperCase(); strDate=strDate.trim(); strDate=strDate.trim("."); strDate=strDate.trim(); strDate=strDate.trim("Г");
    if (isNotNull(strDate)) {
      s=this.getSeparator(strDate);
      // создание разделителей (если строка без разделителей)
      if (s.length==0) {

        s=this.getSeparator(this.maskDefault);
        strDate=this.repairSeparator(strDate,s,this.maskDefault);
      }
      else {strDate=this.setSeparator(strDate,s)}
      arrNum=strDate.split(s);
      // однозначные определения
      for (var i=0; i<arrNum.length; i++) {
        // если текст, то это наименование месяца
        if (isCharWord(arrNum[i])) {maskM="MON"; m=arrNum[i]};
        // если число 4 разряда, то год, однозначно
        if (isInteger(arrNum[i])&&(arrNum[i].length==4)) {maskY="YYYY"; y=arrNum[i]};
        // если 31>n>12, то число
        if ((parseInt(arrNum[i])>12)&&(parseInt(arrNum[i])<31)) {maskD = (arrNum[i].length==1) ? "D" : "DD"; d=arrNum[i]};
      }
      // уточнения
      //  попытка определить месяц
      if ((m==null)&&(d!=null)&&(y!=null)) {
        for (var i=0; i<arrNum.length; i++) if ((arrNum[i]!=d) && (arrNum[i]!=y)) {m = (parseInt(arrNum[i])<13) ? arrNum[i] : null; break}
        if (m!=null) maskM = (m.length==1) ? "M" : "MM";
      }
      // попытка определить день (который >12)
      if ((d==null)&&(y!=null)&&(parseInt(arrNum[i])>12)&&(parseInt(arrNum[i])<31)) {
        for (var i=0; i<arrNum.length; i++) if ((arrNum[i]!=m)&&(arrNum[i]!=y)) {d=arrNum[i]; break}
      }
      // попытка определить день (который <12), если месяц-текст
      if ((d==null)&&(maskM!=null)&&(y!=null)) {
        for (var i=0; i<arrNum.length; i++) if ((arrNum[i]!=m)&&(arrNum[i]!=y)) {d=arrNum[i]; break}
      }
      // !!! последний шанс: сборка в дефолт формате
      if ((d==null)||(m==null)||(y==null)) {
        arrMask=getArrMask(this.maskDefault,this.getSeparator(this.maskDefault)); // массив разрядов маски
        for (var i=0; i<arrMask.length; i++) {
          if ((d==null)&&(arrMask[i]=='D')) d=arrNum[i];
          if ((m==null)&&(arrMask[i]=='M')) m=arrNum[i];
          if ((y==null)&&(arrMask[i]=='Y')) y=arrNum[i];
        }
      }
      // формат для числа
      if (d!=null) maskD = (d.length==1) ? "D" : "DD";
      // формат распознать не удалось
      flag = ((m==null)||(d==null)||(y==null)) ? false : true;
    }
    // сборка строки в default-формате
    if (flag) {
      // конвертация наименования месяца в его номер
      m = (maskM=="MON") ? getMonthNum(m) : m;
      setDate(y,m,d);
      res=this.dateToString(this.maskDefault);
    }
    return res;
  }
  // возвращает строковое представление даты
  //   разряды маски: 
  //      d/dd     - число (dd обеспечиват число ведущими нулями)
  //      m/mm/mon - месяц (m/mm - число, mon - текст, mm обеспечиват число ведущими нулями)
  //      yy/yyyy  - год
  //   разделители разрядов: < ./-  >
  this.dateToString = function (mask) {
    var res="", d, m, y, separator, arrMask, arrNum = new Array(), flagDay=false;
    // приведение маски (по одному символу на разряд с одинаковым [первым] разделителем)
    mask=mask.toUpperCase(); 
    separator=this.getSeparator(mask); mask=this.setSeparator(mask,separator);
	arrMask=getArrMask(mask,separator); // массив элементов маски
    // значения разрядов
    d=date.toString(); m=month.toString(); y=year.toString();
    // цикл формирования рез. массива
	for (var i=0; i<3; i++) {
      // число
      if (arrMask[i]=="D") {
        if ((mask.indexOf("DD")>=0)&&(d.length<2)) d='0'+d;
        arrNum[i]=d;
        flagDay=true; // обработка числа (для оценки падежа текст-месяца)
      }
      // месяц
      if (arrMask[i]=="M") {
        if ((mask.indexOf("MM")>=0)&&(m.length<2)) m='0'+m;
        // текстовое представление месяца
        if (mask.indexOf("MON")>=0) {
          if (flagDay) m=monthToGenitive(month-1); // если после числа, родит. падеж
		  else m=monthname[month-1];               // иначе падеж именительный
        }
        arrNum[i]=m;
      }
      // год
      if (arrMask[i]=="Y") {
        if (mask.indexOf("YYYY")<0) y=y.substr(2,2);
        arrNum[i]=y;
      }
    }
    // сборка строки
    for (var i=0; i<arrNum.length; i++) res=res+arrNum[i]+separator;
    res=res.substr(0,res.length-1);
    return res;
  }

  // возвращает наименование дня недели
  //   numDay:   [1..7]
  //   isShort:  0/1 - полное/краткое
  this.getDayName = function (numDay,isShort) {
    var res="", num;
    num=parseInt(numDay)-1; isShort=isShort||0;
    if ((num>=0)&&(num<7)) {
      if (isShort==0) res=dayname[num];
      else res=daynameshort[num];
    }
    return res;
  }
  // конвертация наименования месяца в родительный падеж
  //   m: номер месяца
  var monthToGenitive = function (m) {
    var res=monthname[m], c=res.substr(res.length-1,1);
    if ((c=="ь")||(c=="й")) res=res.substr(0,res.length-1)+"я";
    else res=res+"а";
    return res;
  }
  // возвращает наименование месяца
  //   numMonth: номер месяца (numMonth=[1..12])
  //   case:  падеж (0/1 - именительный/родительный)
  this.getMonthName = function (numMonth,case_) {
    var res, m=parseInt(month)-1;
    if ((m<0)||(m>11)) return "";
	case_=parseInt(case_)||0;
    if (case_==0) res=monthname[m];
    if (case_==1) res=monthToGenitive(m);
    return res;
  }
  // наименование первого дня месяца
  var getFirstDay = function () {
    var res, d=new Date(year,month-1,1); 
    res=d.getDay();
    if (res==0) res=6; else res=res-1;
    return res;
  }
  // сколько дней в месяце
  var getMaxDate = function () {
    var res, m=month-1, d=new Date(year,month-1,date);
    d.setDate(28);
    for (i=0; i<4; i++) {
     res=d.getDate();
     d.setDate(res+1);
     if (d.getMonth()!=m) break;
    }
    return res;
  }
  // set для свойств класса
  var prepare = function () {
    day=dt.getDay();
    date=dt.getDate();
    month=dt.getMonth()+1;
    year=dt.getFullYear();
    maxdate=getMaxDate();
    firstday=getFirstDay();
  }
  // конвертация года в 4-знаковый формат
  var formatYear=function(year) {
    var today;
    year=year||""; year=year+"";
    if (year.length<4) {
      today=sysdate();
      year=(today.year+"").substr(0,4-year.length)+year;
    }
    return year;
  }
  // форматирование секции Год в 4-знаковое формат-представление даты с разделителем <.>
  var setFormatYear=function(strDate) {
    strDate=strDate||""; strDate=strDate+"";
    if (strDate.length>0) {
      var pos=strDate.lastIndexOf(".");
      if (pos>-1) {
        var year=strDate.substr(pos+1);
        strDate=strDate.substr(0,strDate.lastIndexOf(".")+1)+formatYear(year);
      }
    }
    return strDate;
  }
  // инициализация класса Date
  var setDate = function (year,month,date) {
    var len, today;
    if (year!=null) {
      len=year.length; 
      if (len<5) {today=sysdate(); year=today.year.toString().substr(0,4-len)+year}
    }
    if (year!=null && month!=null && date!=null) dt = new Date(year,month-1,date);
    prepare();
  }
  // попытка установить разделители
  // только целое число длиной от 4 до 6 цифр без разделителей
  // маска DD.MM.YYRR
  this.parseDateByValue=function(str,separator) {
    var len=str.length;
    if (len<3) return null;            //*** error
    if (len==8) {
      str=splitter(str,separator,2); str=splitter(str,separator,5);
      return str;                                                                    // RESULT: <XX.XX.YYYY>
    }
    if ((len>6)||(isNaN(parseInt(str)))) return str;                                 // RESULT: str
    if (len==3) {
      str=splitter(str,separator,1); str=splitter(str,separator,3);
      return str;                                                                    // RESULT: <X.X.Y> (год расширим до YYYY из sysdate)
    }
    var d=str; var m=str; var y=str;
    var pair1=d.substr(0,2);
    var pair2=d.substr(1,2);
    var pair3=d.substr(2,2);
    if (pair1=="00") return null;       //*** error
    //*** max значения число/месяц
    // число-цифра
    if (parseInt(pair1)>31) d=splitter(d,separator,1);
    // месяц-цифра
    if (d.indexOf(separator)>0) {
      if (parseInt(pair2)>12) {m=d; m=splitter(m,separator,3);}
    }
    // определили по значениям
    if (m.indexOf(separator)>0) return m;                                            // RESULT: <X.X.YYRR>
    else {
      //*** ведущий 0 в значениях число/месяц
      if (pair1.substr(0,1)=="0") d=splitter(d,separator,2);
      // 0X........
      if (d.indexOf(separator)>0) {
        if (len<5) return null;          //*** error
        if (pair3.substr(0,1)=="0") {m=d; m=splitter(m,separator,5);}
        // формат 0X.0X.XX
        if (m.indexOf(separator)>0) {
           if (len<6) return null;       //*** error
           else return m;                                                            // RESULT:  <0X.OX.YY>
        }
        // формат 0X.X
        else {
          if (len<5) return null;        //*** error
          if (len==5) {m=d; m=splitter(m,separator,4); return m;}                    // RESULT:  <0X.X.YY>
          if (len==6) {m=d; m=splitter(m,separator,5); return m;}                    // RESULT:  <0X.XX.YY>
        }
      }
      // ведущий ноль числа отсутствует
      else {
        // 0 в первом разряде месяца
        if (pair2.substr(0,1)=="0") {
          m=splitter(m,separator,1); m=splitter(m,separator,4);
          return m;                                                                   // RESULT:  <X.0X.YYRR>
        }
        if (len==6) {m=splitter(m,separator,2); m=splitter(m,separator,5); return m;} // RESULT:  <XX.XX.XX>
        if (len==5) {m=splitter(m,separator,1); m=splitter(m,separator,4); return m;} // RESULT:  <X.XX.XX>
        if (len==4) {m=splitter(m,separator,1); m=splitter(m,separator,3); return m;} // RESULT:  <X.X.XX>
      }
    }
  }
  // распознавание формата даты без разделителей (дефолт-формат число/месяц/год)
  this.splitByValue=function(str,separator) {
    return setFormatYear(this.parseDateByValue(str,separator));
  }
  // установить разделитель разделитель (одинаковый)
  this.setSeparator = function (strDate,separator) {
    var reg;
    reg=/[-/.: ]+/g;
    return strDate.replace(reg,separator);
  }
  // сделать разделение для default format число/месяц/год
  this.repairSeparator = function (strDate,separator,mask) {
    strDate=this.setSeparator(strDate,separator);
    // обработка строки без разделителей
    if (strDate.indexOf(separator)<0) {
      if (this.maskDefault.match(/D.*M.*Y.*/)==null) return "";
      var lenMask=mask.split(separator).join("").length;
      // если длина строки равна длине маски
      if (lenMask==strDate.length) {
        for (var i=0; i<mask.length; i++) if (mask.substr(i,1)==separator) strDate=splitter(strDate,separator,i);
      } else {
        // попытка расставить разделители
        strDate=this.splitByValue(strDate,separator);
      }
    }
    return strDate;
  }
  // разделитель (первый слева)
  this.getSeparator = function (mask) {
    var res;
    var reg=/^([a-zA-Zа-яА-Я0-9])*/;
    res=mask.replace(reg,"");
    res=res.substr(0,1);
    if (separators.indexOf(res)<0) this.errCode=2; // alert("Неправильный разделитель разрядов <"+res+">");
    return res;
  }
  // возврващает аттрибуты даты
  this.params=function() {
    return {day:day,date:date,month:month,year:year,maxdate:maxdate,firstday:firstday}
  }
  // возвращает объект Date
  this.getDate = function() {return dt}
  // создает объект и определяет выбранную дату
  //   strDate:      строка Дата
  //   srcMask:      маска формата для strDate
  //   isCheckMode:  0/1 - [читать errCode]/[alert с сообщением errMess], 0-дефолт
  this.create = function (strDate,srcMask,isCheckMode) {
    var str; var mask; var reg; var separator; var arrNum; var arrMask; var d=null; var m=null; var y=null;
    isCheckMode=(isCheckMode==0)?0:1;
    strDate=strDate+""; srcMask=srcMask+"";
    // удалить все пробелы
//    str=strDate.replacePart(" ",""); mask=srcMask.replacePart(" ","");
    str=strDate.trim(); mask=srcMask.trim();
    if (str.length==0) this.errCode=0;  // неправильная дата
    if (mask.length==0) this.errCode=1; // неправильная маска
    if (this.errCode==null) {
      mask=mask.toUpperCase(); separator=this.getSeparator(mask); mask=this.setSeparator(mask,separator); str=this.setSeparator(str,separator);
      // массивы разрядов Маски и Значений
      arrNum=str.split(separator); arrMask=getArrMask(mask,separator);
      // проверка разрядности Даты и Маски
      if ((this.errCode==null) && (arrNum.length!=3))  this.errCode=0; // неправильная дата
      if ((this.errCode==null) && (arrMask.length!=3)) this.errCode=1; // неправильная маска
      if (this.errCode==null) {
        for (var i=0; i<3; i++) {
          if (arrMask[i]=="D") d=parseInt(parseFloat(arrNum[i]));
          if (arrMask[i]=="M") m=parseInt(parseFloat(arrNum[i]));
          if (arrMask[i]=="Y") y=parseInt(parseFloat(arrNum[i]));
        }
        // проверка значений
        if ((this.errCode==null)&&(isNaN(d))||(d<1)||(d>31)) this.errCode=3; // Неправильный день
        if ((this.errCode==null)&&(isNaN(m))||(m<1)||(m>12)) this.errCode=4; // Неправильный месяц
        if ((this.errCode==null)&&(isNaN(y))||(y>9999))      this.errCode=5; // Неправильный год
        y = (y<100) ? 2000+y : y;
      }
    }

    if (this.errCode==null) setDate(y,m,d);
    else if (isCheckMode==1) Form.mess(4);  // значение поля не является датой

//    else alert("date error");
//    else if (isCheckMode==1) alert(errMess[this.errCode]);
    return this.errCode;
  }
  // create для класса
  if (strDate) this.create(strDate,maskDate,isCheckMode);
}

// Возвращает строковое представление даты
//   outputMask: маска формата результата
//   inputMask:  маска формата strDate (если null/"" - то пытаемся определить формат по strDate)
// разряды маски outputMask/inputMask: 
//      d/dd     - число (dd обеспечиват число ведущими нулями)
//      m/mm/mon - месяц (m/mm - число, mon - текст, mm обеспечиват число ведущими нулями)
//      yy/yyyy  - год
//   разделители разрядов: < ./-  >
if ('undefined' == typeof Date.prototype.parseDate) {
  Date.prototype.parseDate = function(strDate,outputMask,inputMask) {
    var res="", data;
//    var v = new classValidate();
    var dt = new classDate();
    strDate=strDate.trim();
    // выход если дата не задана
    if (!isNotNull(strDate)) return res;
    // если inputMask не задана, то приведение данных к дефолт. формату
    if (!isNotNull(inputMask)) strDate=dt.getDefFormatDate(strDate);
    inputMask=inputMask||dt.maskDefault;
    if (!isNotNull(outputMask)) outputMask=dt.maskDefault;
    dt.create(strDate,inputMask,1);
    if (dt.errCode==null) res=dt.dateToString(outputMask);
    return res;
  }
}

// Сравнение дат
// Возвращает -1/0/1, если strDate1 меньше/равна/больше strDate2
if ('undefined' == typeof Date.prototype.compare) {
  Date.prototype.compare = function(strDate1,strDate2,formatMask) {
    var res=null; var int1; var int2;
    var dt1 = new classDate(); var dt2 = new classDate();
    dt1.create(strDate1,formatMask,0);
    dt2.create(strDate2,formatMask,0);
    int1=dt1.getDate().getTime();
    int2=dt2.getDate().getTime();
    res=(int1>int2)?1:((int1<int2)?-1:0);
    return res;
  }
}

// парсит строковое представление даты и возвращает js-number-представление
if ('undefined' == typeof Date.prototype.toNumber) {
  Date.prototype.toNumber = function(strDate,formatMask) {
    var dt = new classDate();
    if (formatMask) formatMask=formatMask+""; else formatMask=dt.maskDefault;
    dt.create(strDate,formatMask,0);
    return (dt.getDate().getTime());
  }
}
// проверка
function isDate(val) {
  var res=false;
  if (val&&val.length>0) {
    val=val.replace(/[-/.: ]+/g,"-");
    var arr=val.split("-");
    var dt = new Date(arr[2],arr[1]-1,arr[0]);
    res=(dt.getFullYear()==arr[2]&&dt.getMonth()==arr[1]-1&&dt.getDate()==arr[0]);
  }
  return res;
}
// дата в формате DD.MM.YYYY или системная дата
//   code - результат выполнения операции: true/false - OK/ERROR
function dateToStr(strDate) {
  var res; var code=-1;
  strDate=(strDate||"")+"";
  if (strDate.length>0) {
    var dt = new classDate();
    code=dt.create(strDate,dt.maskDefault,0);
    if (code==null) {
      res=dt.dateToString(dt.maskDefault);
      code=-1;
    }
  } else {
    var dt=new Date();
    var delim=".";
    var d=dt.getDate(); d=(d<10)?'0'+d:d;
    var m=dt.getMonth()+1; m=(m<10)?'0'+m:m; 
    var y=dt.getFullYear(); y=(y<100)?2000+y:y;
    res=d+delim+m+delim+y;
  }
  code=(code<0);
  return {code:code,value:res};
}
// парсинг строки Дата (формат DD.MM.YYYY)
function getDATE(df) {
  var pos=df.indexOf(".");
  var d=df.substr(0,pos);
  df=df.substr(pos+1);
  pos=df.indexOf(".");
  var m=df.substr(0,pos);
  var y=df.substr(df.indexOf(".")+1);
  return {d:d,m:m,y:y}
}
//
function parseSysdate() {
  return getDATE(Form.sysdate);
}
