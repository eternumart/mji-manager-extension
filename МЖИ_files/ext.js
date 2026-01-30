/* Расширения */

/****************************************************************/
/*                           String                             */
/****************************************************************/
// LTRIM, удаляет разделители слева
if ("undefined" == typeof String.prototype.ltrim) {
  String.prototype.ltrim = function() {
    return this.replace(/^[\t\n\r\f\v ]+/, "");
  }
}
// RTRIM, удаляет разделители справа
if ("undefined" == typeof String.prototype.rtrim) {
  String.prototype.rtrim = function() {
    return this.replace(/[\t\n\r\f\v ]+$/, "");
  }
}
// TRIM
if ("undefined" == typeof String.prototype.trim) {
  String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g,"");
  }
}
// CLEAN (REPLACE)
if ("undefined" == typeof String.prototype.replace) {
  String.prototype.replace = function() {
    return this.replace(/\s+/g,"");
  }
}
// REPEAT (повторяет строку n раз)
if ("undefined" == typeof String.prototype.repeat) {
  String.prototype.repeat = function(n) {
    var r="";
    if (typeof(n)=="number")
      for (var i=1;i<=n;i++) r+=this;
    return r;
  }
}
// очистка от разделителей
function stringClean(str) {
  str=(str)?str:"";
  return str.replace(/[\+\*\s\-\.\"\'|#@&?!;:,=~()]+/g," ");
}

// замена "критических" кавычек <'> или <"> на « и »
function formatQuot(txt) {
  var quotCodeLeft=171;   // «
  var quotCodeRight=187;  // »
  var quotLeft=String.fromCharCode(quotCodeLeft);
  var quotRight=String.fromCharCode(quotCodeRight);
  //
  txt=(txt)?txt+"":"";
  if (txt.length>0) {
    txt=txt.replace(/\'/g,'"');
    txt=txt.replace(/\"+/g,'"');
    txt=(txt.indexOf('"')>-1)?txt.replace(/(^|\s)"/g, "$1"+quotLeft).replace(/"([\s,.!?\-()]|$)/g, quotRight+"$1"):txt;
//    txt=(txt.indexOf('"')>-1)?txt.replace(/(^|\s)"/g, "$1«").replace(/"([\s,.!?\-()]|$)/g, "»$1"):txt;
  }
  return txt;
}

// PARSE NUMBER
// возвращает {int:<ttt>,dec:<ttt>,sep:<.|,>}
if ("undefined" == typeof String.prototype.parseNumber) {
  String.prototype.parseNumber=function(nstr) {
    var res={int:"",dec:"",sep:""}
    nstr=(nstr+"").replace(/\s+/g,"");
    var int=parseInt(nstr);
    if (isNaN(int)) return res;
    var sep="."; pos=nstr.indexOf(sep);
    if (pos<0) {sep=","; pos=nstr.indexOf(sep);}
    if (pos<0) res={int:nstr,dec:"",sep:""};
    else res={int:nstr.substr(0,pos),dec:nstr.substr(pos+1),sep:sep}
    return res;
  }
}
// NUMBER TO STRING (форматирование числа для показа)
// возвращает: {numValue:n+"",errCode:0,errMess:""}
// errCode (табл. T_MESSAGES):
//  1: "Значение не является числом"
//  2: "Не задан формат"
//  3: "Значение превышает максимально допустимое"
// 10: "Значение отсутствует"
if ("undefined" == typeof String.prototype.numToStr) {
  String.prototype.numToStr=function(f) {
    var res={numValue:this,errCode:0,errMess:""}
    res.numValue=(this)?(res.numValue+"").trim():"";
    // parse format
    f=(f+"").replace(/\s+/g,"");
    if (f.length==0) return res;
    var frm=f.parseNumber(f);
    if (frm.int.length==0) {res.errCode=2; res.errMess="Не задан формат"; return res;}                         // Не задан формат
    // parse number
    var n=this.replace(/\s+/g,"");
    if (n.length==0) return res;
    if (!/^\-?\d+[\.,]?\d*$/.test(n)) return {numValue:this,errCode:1,errMess:"Значение не является числом"};  // Значение не является числом
    var num=n.parseNumber(n);
    if (num.int.length==0) {res.errCode=10; res.errMess="Значение отсутствует"; return res;}                   // Значение отсутствует
    // check size
    var maxInt=parseInt(("9").repeat(frm.int.length))+((frm.dec.length>0)?1:0);
    if (parseInt(num.int)>maxInt) {res.errCode=3; res.errMess="Целая часть числа > "+maxInt; return res;}      // Число превышает max
    // округление
    var lenFrmDec=frm.dec.length;
    if (num.dec.length>lenFrmDec) {
      n=(parseFloat(num.int+"."+num.dec)).roundTo(lenFrmDec)+"";
      num=n.parseNumber(n); // новый парсинг числа после округления
    }
    // дополнение финальными нулями
    var lenNumDec=num.dec.length;
    if ((lenFrmDec>lenNumDec)&&(frm.dec.substr(lenFrmDec-1)=="0")) num.dec+=("0").repeat(lenFrmDec-lenNumDec);
    // дополнение ведущими нулями
    var d=frm.int.length-num.int.length;
    if ((d>0)&&(frm.int.substr(0,1)=="0")) num.int=("0").repeat(d)+num.int;
    // результат
    return {numValue:num.int+((num.dec.length>0)?frm.sep:"")+num.dec,errCode:0,errMess:""}
  }
}
// STRING TO NUMBER (конвертация в NUMBER)
if ("undefined" == typeof String.prototype.strToNum) {
  String.prototype.strToNum=function() {
    var res=this.replace(",",".");
    res=parseFloat(res);
    return ((isNaN(res))?null:res);
  }
}





// STRING TO DATE (конвертация в DATE)
if ("undefined" == typeof String.prototype.strToDate) {
  String.prototype.strToDate=function(f) {
    var res=null;
    var dt=getDATE(this);
    res=new Date(dt.y,parseInt(dt.m-1),dt.d);
    return res;
  }
}
// DATE TO STRING (конвертация в DATE)
//  errCode:
//    4: "Значение не является датой"
if ("undefined" == typeof String.prototype.dateToStr) {
  String.prototype.dateToStr=function(f) {
    var errCode=0;
    var s=this;
    if (s.length>0) {
      s=s.replace(/[\-\/\.:, ]/g,".");
      var res=dateToStr(s); // extDate.js
      errCode=(res.code)?0:4;
      s=(errCode==0)?res.value:s;
    }
    // результат
    return {value:s,errCode:errCode,errMess:""}
  }
}


/****************************************************************/
/*                           Number                             */
/****************************************************************/
// округляет число до заданного количества n знаков после (или перед) запятой
if ("undefined" == typeof Number.prototype.roundTo) {
  Number.prototype.roundTo=function(n) {
    var x=0;
    if (typeof(n)=='number') if (Math.round(n)==n) if (n>=-6&&n<=6) x=n;
    x=Math.pow(10,x);
    return Math.round(this*x)/x;
  }
}
//
if ("undefined" == typeof Number.prototype.isNumber) {
  Number.prototype.isNumber=function(n) {
    return !isNaN(parseFloat(n))&&isFinite(n);
  }
}

/****************************************************************/
/*                           Array                              */
/****************************************************************/
//* order by array
// key: 0/1 - asc/desc
function sortLength(arr,key) {
  if (arr.length<2) return arr;
  function asc(a,b) {
    var s1=""+a; var s2=""+b;
    return (s1.length<s2.length)?-1:(s1.length>s2.length)?1:0;
  }
  function desc(a,b) {
    var s1=""+a; var s2=""+b;
    return (s1.length>s2.length)?-1:(s1.length<s2.length)?1:0;
  };
  if (key==1) return arr.sort(desc); else return arr.sort(asc);
}

// возвращает true, если все элементы массива уникальны (как строки)
if ("undefined" == typeof Array.prototype.isUnique) {
  Array.prototype.isUnique = function() {
    var res=true; var m="";
    if (this.length<2) return res;
    for (var i=0; i<this.length; i++) this[i]=this[i]+"";
    this.sort();
    m=this[0];
    for (var i=1; i<this.length; i++)
      if (m==this[i]) {res=false; break;} else m=this[i];
    return res;
  }
} 

//
function NVL(str,def) {
  str=(str||"")+"";
  return (str.length==0)?def:str;
}

