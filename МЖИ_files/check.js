/*** валидации ***/

/*** Integer ***/
function intFormat(n) {
  n=parseInt(n);
  return (isNaN(n))?null:n;
}
// проверка существования
//   low:      нижняя граница (default: >=0)
//   height:   верхняя граница
//   operator: >= и =< (включая границы)
//   empty: true/false - разрешение не иметь значение
function intExist(n,low,height,empty) {
  // разрешение не иметь значение или принадлежать интервалу
  empty=(empty)?empty:false;
  if (empty&&!n) return true;
  //
  var res=false;
  n=intFormat(n);
  if (n==null) return false;
  low=parseInt(low); low=((isNaN(low))?0:low);
  height=parseInt(height); height=(isNaN(height))?null:height;
  res=(n>low-1)?true:false;
  if (height!=null) res=(res&&(n<height+1))?true:false;
  return res;
}
// существование всех элементов массива
//   low:      нижняя граница (default: >=0)
//   height:   верхняя граница
function intExists(arr,low,height) {
  if (!arr) return false;
  var res=true;
  if (arr.length>0) {
    for (var i=0;i<arr.length;i++) if (!intExist(arr[i],low,height)) {res=false; break;}
  }
  else res=false;
  return res;
}
// НЕ существование хотя бы одного элемента массива
//   low:      нижняя граница (default: >=0)
//   height:   верхняя граница
function intNotExists(arr,low,height) {
  if (!arr) return true;
  var res=true;
  if (arr.length>0) {
    for (var i=0;i<arr.length;i++) if (intExist(arr[i],low,height)) {res=false; break;}
  }
  return res;
}

// НЕ существование ВСЕХ элементов массива
function intEmpty(arr) {
  if (!arr) return true;
  var res=true;
  if (arr.length>0) {
    for (var i=0;i<arr.length;i++) 
      if (((arr[i]==null)?"":arr[i]+"").length>0) {res=false; break;}
  }
  return res;
}

// положительность всех элементов массива
function numPositive(arr) {
  if (!arr) return false;
  var res=true;
  if (arr.length>0) {
    for (var i=0;i<arr.length;i++)
      if (arr[i]&&arr[i]>0) {} else {res=false; break;}
  }
  return res;
}

/*** Date ***/
function Sysdate() {
  var dt=parseSysdate();
  return new Date(dt.y,parseInt(dt.m-1),dt.d);
}
// возвращает строку конструктора даты для использования в выражении
function dateConstructorStr(dt) {
  if (dt&&typeof(dt)=="object"&&typeof(dt.getYear)=="function" )
    return "new Date("+dt.getFullYear()+","+dt.getMonth()+","+dt.getDate()+")";
  else
    return dt;
}


function IIF(exp,val1,val2) {
  return (expr)?val1:val2;
}

/*****************************************/

function getGridColMaxLookupIndex(elements) {
  var res=null;
  if (elements&&elements.length>0) {
    for (var i=0;i<elements.length;i++) {
       var obj=Lookup.optionIndex(elements[i]);
       obj.index=(obj.index==obj.count)?null:obj.index;     // последняя опция - Н/о = null
       res=(obj.index>res)?obj.index:res;
    }
  }
  return res;
}

// grid-проверка Итого для элементов с детализацией (оценка выставляется по наихудшей из оценок подэлементов)
// возвращает стандартный для check form: {result:res,element:obj};
function checkTotalRate(element,parentId) {
  var res=true; var total=null;
  if (element) {
    // балконы, вестибюли, система отопления, ГВС, ХВС, канализация
    if (parentId==166||parentId==182||parentId==186||parentId==193||parentId==195||parentId==202) {
      var elements=GridGroup.getColElements(element);
      total=elements.pop();  // последний элемент Итого
      // max значение среди подэлементов
      var maxValue=getGridColMaxLookupIndex(elements);
      // итого
      var totalAttr=Lookup.optionIndex(total);
      totalAttr.index=(totalAttr.index==totalAttr.count)?null:totalAttr.index;       // последняя опция - Н/о = null
      //
      res=(totalAttr.index>=maxValue);
    }
  }
  return {result:res,element:total};
}

