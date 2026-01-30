var Component = {
  data        : [],
  classMarker : "dataMarker",
  tagBegin    : "<%",
  tagEnd      : "%>",
  prefComp    : "comp_"
}

//
Component.getIdxById=function(id) {
  if (id.indexOf(this.prefComp)==0) return parseInt(id.substr(this.prefComp.length));
  else return parseInt(id);
}
// возвращает ID компонента (индекс массива data) по имени компонента (FIELD_NAME)
Component.getIdByName=function(name) {
  var res=0;
  var obj=document.getElementsByName(name)[0];
//  if (obj) res=obj.id;
  if (obj) res=this.getIdxById(obj.id);
  return res;
}
// возвращает массив описаний по ID компонента
Component.getData=function(id) {
//  return Component.data[parseInt(id)];
  return Component.data[this.getIdxById(id)];
}
// возвращает группу по ID компонента
Component.getGroupId=function(id) {
  var res=Component.data[this.getIdxById(id)];
  return ((res)?res.groupId:0);
}
//  регистрация компонента с невалидным значением
//    focus: 0/1
Component.setState=function(ev,idx,Obj,isChecked,errMessCode,focus,showErrorMessage) {
  var Src=Obj;
  // видимый элемент компонента формы
  Obj=this.getDisplayElement(Obj,idx);
  if (!Obj) return true;
  // border element: BOX_LOOKUP, BOX_DATE, BOX_COMBO
  var Cnt=(this.data[idx].type==4||this.data[idx].type==5||this.data[idx].type==10||this.data[idx].type==12)?domNodeParent(Obj):Obj;
  if (isChecked==1) {
    if (Obj.className.indexOf(this.classMarker)>-1) Cnt=Obj;
    if (this.data[idx].isChecked==0) Form.messClose();
    this.data[idx].isChecked=1;
//    Obj.className=Obj.className.replace(" "+this.classMarker,"");
    Cnt.className=Cnt.className.replace(" "+this.classMarker,"");
    // статус вложенных структур
    if (this.data[idx].groupTypeCode=="GRID") {
      var isMarketGridCol=GridGroup.isClassMarketCol(Obj);
      // восстановим маркировку НЕ проверено, если НЕ все элементы столбца грида валидны
      if (isMarketGridCol) this.data[idx].isChecked=0;
    }
  }
  else {
    eventCancel(ev);
    this.data[idx].isChecked=0;
    if (Cnt.className.indexOf(" "+this.classMarker)==-1) Cnt.className+=" "+this.classMarker;
    // визуализация невидимок в группах
    if (isHidden(Obj)) {
      if (this.data[idx].groupTypeCode=="EXPAND") ExpandGroup.changeState(Obj);  // группы: EXPAND/COLLAPSE
      else BookmarkPanel.activate(document.getElementById(this.prefComp+idx));   // группы: BM_PANEL
    }
//    if (errMessCode>0) Form.mess(errMessCode,null,null,"CENTER",focus); else Form.messClose();
    if (errMessCode<1) Form.messClose();
    if (!isHidden(Obj)) {
      // показывать сообщение
      showErrorMessage=(showErrorMessage==1)?1:0;
      // позиционирование сообщения относительно компонента: по левой границе компонента, сверху с отступом 50px
      if (errMessCode>0&&showErrorMessage==1) Form.mess(errMessCode,null,null,null,focus,Obj,-1,-1,10,60);
//      if (errMessCode>0&&showErrorMessage==1) Form.mess(errMessCode,null,null,45,focus);
//      if (errMessCode>0&&showErrorMessage==1) Form.mess(errMessCode,null,null,getOffsetRect(Obj).scrollTop,focus);
//      if (errMessCode>0&&showErrorMessage==1) Form.mess(errMessCode,null,null,getBounds(Obj).top,focus);
      if (focus==1) {
        Obj.focus();
//        Obj.scrollIntoView(false);
//        window.scrollBy(0,-100);
//        window.scrollTo(200,200);
      }
    }
  }
  if (errMessCode<1) Form.messClose();
}

// возвращает js-формат display-значения
Component.getNativeValue=function(displayValue,dataType,formatMask) {
  var res=null;
  switch (dataType) {
    case "NONE"   : break;
    case "NUMBER" : res=displayValue.strToNum(); break;
    case "DATE"   : res=displayValue.strToDate(formatMask); break;
    case "TEXT"   : res=displayValue.trim(); break;
    default       : res=displayValue; break;
  }
  return res;
}

// элемент с тегом компонента
Component.isComponent=function(el) {
  var res=false;
  if (el) {
    var t=el.tagName;
    res=(t=="INPUT"||t=="TEXTAREA");
  }
  return res;
}

// возвращает ссылку на INPUT компонента
//   key: FIRST/DISPLAY
Component.getComponentInput=function(el,key) {
  var res=null;
  if (!el) return null;
  if (el&&el.tagName=="INPUT") res=(key=="FIRST")?el:(el.style.display!="none")?el:null;
  if (!res) {
    var collect=el.getElementsByTagName("INPUT");
    if (collect) {
      for (var i=0;i<collect.length;i++) {
        if (key=="FIRST") {res=collect[i]; break;}
        else {
          if (collect[i].style.display!="none") {res=collect[i]; break;}
        }
      }
    }
  }
  return res;
}
// возвращает ссылку на элемент-носитель значения компонента (сам элемент или ближайший потомок с заданным св-вом name)
Component.getComponentBody=function(Control) {
  var el;
  if (Control) {
    if (Control.name&&Control.name.length>0) el=Control;
    else {
      var e=Control.getElementsByTagName("INPUT");
      if (e) {
        for (var i=0;i<e.length;i++) if (e[i].name&&e[i].name.length>0) {el=e[i]; break;}
      }
    }
  }
  return el;
}
// возвращает ссылку на видимый элемент компонента
Component.getDisplayElement=function(Control,idx) {
  var el=Control;
  if (Control) {
    idx=(idx>-1)?idx:this.getIdxById(Control.id);
    // LOOKUP, COMBOBOX
    if ((this.data[idx].type==4||this.data[idx].type==5||this.data[idx].type==6||this.data[idx].type==12)&&Control.name&&Control.name.length>0) el=Lookup.getEditByResult(Control);
    // file load
    if (this.data[idx].type==9&&Control.name.length>0) {
      var p=domNodeParent(Control);
      var flag=true;
      // активный INPUT
      var c=p.getElementsByTagName("INPUT");
      for (var i=0;i<c.length;i++) if (!isHidden(c[i])) {el=c[i]; flag=false; break;}
      // активный A href
      if (flag) {
        var c=p.getElementsByTagName("A");
        for (var i=0;i<c.length;i++) if (!isHidden(c[i])) {el=c[i]; break;}
      }
    }
  }
  return el;
}

// mode: DISPLAY/NATIVE/VALUE
Component.getValue=function(Control,mode) {
  var res; var e;
  if (mode=="VALUE") e=this.getComponentInput(Control,"FIRST"); else e=this.getComponentBody(Control);
  if (e) {
    if (mode=="NATIVE") res=this.getNativeValue(e.value,this.data[this.getIdxById(Control.id)].dataType,this.data[this.getIdxById(Control.id)].formatMask);
    else res=e.value;
  }
  return res;
}
// присвоить значение компоненту
Component.setValue=function(Element,value) {
  if (!Element) return;
  var compData=Component.getData(Element.id);
  if (typeof(compData)=="object") {
    if  (compData.type==1 ||compData.type==10) {
      if (Element.getAttribute("data-vcl-type")==14 || Element.getAttribute("data-vcl-type")==18) Interval.set(Element,value);  // трансформация в number-интервал
      else Element.value=value;
    }
    // autocomplete lookup/combobox
    if (compData.type==4) {
      // очистка
      value=(value)?value+"":"";
//      if (value.length==0) Combobox.setValue(Element,"","");
      if (value.length==0) Combobox.clear(Element);
    }
    if (compData.type==7||compData.type==10) Element.value=value;
    //   lookup
    if (compData.type==5) {
      value=(value)?value+"":"";
      value=(value.length==0)?0:value;
      Lookup.setValue(Element,value);
    }
    // checkbox
    if (compData.type==8) {
      value=(Element.getAttribute("data-mode")=="3"&&isNaN(parseInt(value)))?2:value; // для 3-поз. дефолт=2
      Checkbox.changeState(null,Element,value);
    }
  }
  else Element.value=value;

/*
    var idx=this.getIdxById(Element.id);
    if (isNaN(idx)||idx==null) return true; // не элемент формы

    if (typeof(this.data[idx].type)=="number") {
      //   LOOKUP, SELECT
      if (this.data[idx].type==5||this.data[idx].type==6)
        Lookup.setValue(Element,value);

    }
*/

}

//
// формат тега: <%FIELD_NAME.g[m]%>, 
//   FIELD_NAME - имя поля,
//   g -          GROUP_ID,
//   m -          номер строки грида
Component.parseTagVar=function(tag) {
  var pos; var G=""; var F=""; var R="";
  if (typeof(tag)=="string") {
    if (tag.indexOf(this.tagBegin)==0) {
      tag=tag.substr(2);
      pos=tag.indexOf(this.tagEnd);
      if (pos>0) {
        tag=tag.substr(0,pos);
        pos=tag.indexOf(".");
        if (pos<0) F=tag;
        else {
          F=tag.substr(0,pos);
          tag=tag.substr(pos+1);
          pos=tag.indexOf("[");
          if (pos<0) G=tag;
          else {
            G=tag.substr(0,pos);
            if (G.length>0) {
              tag=tag.substr(pos+1);
              pos=tag.indexOf("]");
              if (pos>0) R=tag.substr(0,pos);
            }
          }
        }
        if (F.length==0) {G=""; R="";}
      }
    }
  }
  return {fieldName:F,groupId:(G.length>0)?parseInt(G):-1,rowNum:(R.length>0)?parseInt(R):-1}
}

// актуализация тэг-переменных выражения
//   expression : выражение
//   value      : значение компонента-владельца выражения
//   gridRow    : своя строка грида для грид-полей (для адресации уровня записи)
Component.parseExpression=function(expression,value,gridRow,dataType) {
  var tag; var pos; var val; var data;
  if (expression.length==0) return "";
  // актуализация тега <SYSDATE>
  if (expression.indexOf(this.tagBegin+"SYSDATE"+this.tagEnd)>-1)
    expression=expression.replace(new RegExp(this.tagBegin+"SYSDATE"+this.tagEnd,"g"),dateConstructorStr(Form.sysdate.strToDate()));
  // актуализация self-тэга <VALUE>
  value=(dataType=="TEXT")?'("'+value+'")':value;
  value=(dataType=="DATE")?dateConstructorStr(value):value;
//  if ((value+"").length>0) expression=expression.replace(new RegExp(this.tagBegin+"VALUE"+this.tagEnd,"g"),value);
  if ((value+"").length==0&&dataType!="TEXT") value="null";
  expression=expression.replace(new RegExp(this.tagBegin+"VALUE"+this.tagEnd,"g"),value);
  // актуализация тега <GRID_ROWNUM>
  if (gridRow&&gridRow.tagName=="TR"&&gridRow.rowIndex-1>0) expression=expression.replace(new RegExp(this.tagBegin+"GRID_ROWNUM"+this.tagEnd,"g"),gridRow.rowIndex-1);
  //
  if (this.data.length>0) {
    for (var i in this.data) {
      var val=null;
      var curGridRow;
      // обращение к ячейке строки грида по имени поля, id группы и номеру строки: <%FIELD_NAME.GROUP_ID[N]%>
      tag=this.tagBegin+this.data[i].name+".";
      pos=expression.indexOf(tag);
      if (pos>-1) {
        tag=expression.substr(pos,expression.indexOf(this.tagEnd,pos)-pos+2);
        var grid=this.parseTagVar(tag);
        // заданная строка грида
        curGridRow=GridGroup.getRowByGroupId(grid.groupId,grid.rowNum-1);
        if (curGridRow) {
          // модификация expression (замена грид поля на формат обычной тег-переменной)
          tag=this.tagBegin+this.data[i].name+"\\."+grid.groupId+"\\["+grid.rowNum+"\\]"+this.tagEnd;
//          expression=expression.replace(new RegExp(tag,"g"),this.tagBegin+this.data[i].name+this.tagEnd);
        }
      }
      // тег уровня строки
      if (pos<0) {
        tag=this.tagBegin+this.data[i].name+this.tagEnd;
        pos=expression.indexOf(tag);
        curGridRow=gridRow;
      }
      if (pos>-1&&val==null) {
        // компонент уровня заданной или своей строки грида
        if (curGridRow) {
          var obj=GridGroup.getRowComponentByName(curGridRow,this.data[i].name);
          if (obj) val=this.getValue(obj,"NATIVE");
          else {
            val=this.getValue(document.getElementById(this.prefComp+i),"NATIVE");
          }
        }
        else {
          // атомарный компонент
          if (val==null) {
            val=this.getValue(document.getElementById(this.prefComp+i),"NATIVE");
          }
        }
        // результат
        if (this.data[i].dataType=="TEXT") val='("'+val+'")';
        if (this.data[i].dataType=="DATE") val=dateConstructorStr(val);
        expression=expression.replace(new RegExp(tag,"g"),val);
//        if (val==null) {expression=""; break;}
//        else {
//          if (this.data[i].dataType=="TEXT") val='("'+val+'")';
//          expression=expression.replace(new RegExp(tag,"g"),val);
//        }
      }
    }
  }
  return expression.replace(/\n/g," ");
}
// вычисление значения калькулируемого поля (по FIELD_EXPRESSION)
Component.getCalcFieldValue=function(value,dataType,expression,gridRow) {
//  if ((dataType=="NUMBER")&&(value.length==0)) return "";
//  if ((dataType=="TEXT")&&(value==null)) value="";
  var res="";
  var txt=this.parseExpression(expression,value,gridRow,dataType);
//  if (txt.length>0&&txt.indexOf("null")<0) res=eval(txt)+"";
//  if (txt.length>0) res=eval(txt)+"";
  if (txt.length>0) try {res=eval(txt)+"";} catch(e) {res=""}
  res=(dataType=="NUMBER"&&(isNaN(res)||parseFloat(res)>Number.MAX_VALUE))?"":res;
  return res;
}
// проверка условия на значение поля (по FIELD_CONDITION)
//   gridRow: своя строка грида для грид-полей
Component.checkConditionValue=function(value,dataType,condition,gridRow) {
  if ((dataType=="NUMBER")&&isNaN(value)) return "";
  if ((dataType=="TEXT")&&(value==null)) value="";
  var res=true;
  var txt=this.parseExpression(condition,value,gridRow,dataType);
//  if (txt.length>0) res=eval(txt);
  if (txt.length>0) try {res=eval(txt)} catch(e) {alert("error calc: "+txt); toClipboard(txt);}
  return res;
}

// форматирование значения:
//  elementValue:   элемент-носитель значения
//  elementDisplay: элемент с display-представлением значения (для фокуса)
//  focus:          0/1- признак необходимости фокусирования
Component.format=function(ev,elementValue,elementDisplay,focus,showErrorMessage) {
  var res=true;
  var flag=true;  // флаг потребности в форматировании (для ref-элементов =false)
  // показ сообщений об ошибках в процессе ввода данных
  showErrorMessage= (showErrorMessage==1)?showErrorMessage:Form.showErrorMessage;
//  var errMess="";
  var errCode=0;
  var isCondition=true;
  var formatValue=null; // типизированое значение
  var displayValue="";  // значение для показа
  if (!elementDisplay) elementDisplay=elementValue;
  if (elementValue&&elementDisplay) {
    var idx=this.getIdxById(elementValue.id);
    if (isNaN(idx)||idx==null)  return true; // не элемент формы
    if (idx>this.data.length-1) return true; // не элемент формы
    if (!this.data[idx])        return true; // не элемент формы
    // элемент грида
    var gridRow;
    if (this.data[idx].groupTypeCode=="GRID") gridRow=GridGroup.getRowByElement(elementValue);
    // компоненты, правильность форматов значений которых не вызывает сомнений
    //   LOOKUP, SELECT, COMBOBOX
    if (this.data[idx].type==4||this.data[idx].type==5||this.data[idx].type==6||this.data[idx].type==12) {
      flag=false;
      formatValue=elementValue.value;
    }
    var value=elementValue.value;
    // расчет полей без значения
    if (value.length==0&&this.data[idx].expression.length!=0) {
      flag=false;
      if (this.data[idx].dataType=="NUMBER") {
        displayValue=this.getCalcFieldValue(value,this.data[idx].dataType,this.data[idx].expression,gridRow);
        formatValue=displayValue.strToNum();
      }
    }
    // проверка и форматирование корректных значений
    if (flag&&value.length>0) {
      switch (this.data[idx].dataType) {
      case "NONE":
        break;
      case "DATE":
        value=value.trim();
        var frm=value.dateToStr(this.data[idx].formatMask);
        displayValue=frm.value;
        res=frm.errCode==0;
        if (!res) errCode=frm.errCode;                                     // errCode (data type)
        else formatValue=displayValue.strToDate();
        break;
      case "NUMBER":
        var frm=value.numToStr(this.data[idx].formatMask);
        res=frm.errCode==0;
        if (!res) errCode=frm.errCode;                                     // errCode (data type)
        else {
          displayValue=frm.numValue;
          formatValue=displayValue.strToNum();
          // calc expression
          if (this.data[idx].expression.length>0) {
            displayValue=this.getCalcFieldValue(formatValue,this.data[idx].dataType,this.data[idx].expression);
            frm=displayValue.numToStr(this.data[idx].formatMask);
            displayValue=frm.numValue;
            formatValue=displayValue.strToNum();
          }
        }
        break;
      case "TEXT":
        displayValue=formatQuot(value.trim());
// 1.
//        displayValue=value.trim();
//        displayValue=displayValue.replace(/\'/g,'"');
//        displayValue=displayValue.replace(/"/g,'')
// 2.       displayValue=displayValue.replace(/"([^"]*)"/g,'«$1»');  //  left: String.fromCharCode(171); right: String.fromCharCode(187)
        // calc expression
        formatValue=displayValue;
        elementValue.value=displayValue;
        break;
      case "CODE":
        displayValue=value.trim(); formatValue=displayValue; elementValue.value=displayValue; break;
      case "PHONE":
        break;
      case "INN":
        break;
      case "EMAIL":
        break;
      default:
        res=true;
//        this.data[idx].isChecked=1; break;
      }
    }
    // незаполненное поле 
    var isNotNull=displayValue.length>0;
    // регистраторы ссылок
    if (this.data[idx].type==4||this.data[idx].type==5||this.data[idx].type==6||this.data[idx].type==12) {
      displayValue=elementValue.value;
      isNotNull=(parseInt(displayValue)>0)?true:false;
      res=true;
    }
    // результат проверки формата
    this.data[idx].isChecked=(res)?1:0;
    //
    if (res&&this.data[idx].isNotNull==1&&!isNotNull) {res=false; errCode=51;}                                       // Поле должно иметь значение
    // calc expression

    // check condition
    elementDisplay.setAttribute("data-state","1");
    if (res&&this.data[idx].condition.length>0) {
      var val=formatValue;
      val=(this.data[idx].dataType=="TEXT")?'("'+(val==null)?"":val+'")':val;
//      if (formatValue!=null) {
      res=this.checkConditionValue(formatValue,this.data[idx].dataType,this.data[idx].condition,gridRow);
      if (!res) {
        errCode=52;                                                                                                 // Значение не удовлетворяет заданному условию
        // переопределение стандартного errCode для check-элемента
        var errCheckCode=parseInt(elementDisplay.getAttribute("data-mess"));
        errCode=(errCheckCode>0)?errCheckCode:errCode;
        // регистрация статуса невалидности по условию condition
        elementDisplay.setAttribute("data-state","-1");
        isCondition=false;
      }
//      }
    }
    // финал
    if (res) elementValue.value=displayValue;
    focus=(focus>0)?1:0;
    if (this.data[idx].groupTypeCode!="GRID_SQL") this.setState(ev,idx,elementDisplay,(res)?1:0,errCode,focus,showErrorMessage);
    // lookup не удовлетворяющий условию имеет формат-значение и нуждается в синхронизации
//    if  (!res&&!isCondition&&(this.data[idx].type==5||this.data[idx].type==6)) res=true;
    if  (!res&&(this.data[idx].type==4||this.data[idx].type==5||this.data[idx].type==6||this.data[idx].type==12)) {
      // регистрация статуса невалидности в атрибуте, а res=true для разрешения синхронизаций
      elementDisplay.setAttribute("data-state","-1");
      res=true;
    }
  }
  // стиль для полей с изменеными значениями
  if (res) {
    var ve= this.getDisplayElement(elementDisplay);
    if (ve&&ve.className.indexOf("valueChanged")<0) ve.className=ve.className+" valueChanged";
//    if (ve&& elementDisplay.className.indexOf("valueChanged")<0) {
//      elementDisplay.className=elementDisplay.className+" valueChanged";
//    }
  }
  //
  return res;
}
// синхронизация зависимых компонентов (связи)
// listRelationId - список ID зависимых компонентов в формате: FormItemId1/FormItemId2/FormItemId3/...
//   FormItemId - id элемента DOM
Component.syncRelation=function(srcObj,listRelationId) {
  if (!srcObj||listRelationId&&listRelationId.length==0) return true;
  listRelationId=(listRelationId.substr(0,1)=="/")?listRelationId.substr(1):listRelationId;
  listRelationId=(listRelationId.substr(listRelationId.length-1,1)=="/")?listRelationId.substr(0,listRelationId.length-1):listRelationId;
  if (listRelationId.length>0) {
    // группа элемента
    var group=GroupConfig.getGroupByGroupId(GroupConfig.getGroupByElement(srcObj));
    var gridRow;
    if (group&&group.getAttribute("data-group-type")=="GRID") gridRow=GridGroup.getRowByElement(srcObj);
    var arr=listRelationId.split("/");
    for (var i=0;i<arr.length;i++) {
      var obj=null;
      // если src-грид, то пытаемся искать зависимости в своей строке
      if (gridRow) {
        var fname=Component.getData(this.prefComp+arr[i]).name;
        obj=GridGroup.getRowComponentByName(gridRow,fname);
      }
      // иначе на форме как уникальный элемент
      if (!obj) obj=document.getElementById(this.prefComp+arr[i]);
      if (obj&&typeof(obj.onchange)=="function") obj.onchange();
    }
  }
}
// проверка атрибута isChecked всех элементов формы
//   isFull - false: формат и условия
Component.checkForm=function(ev,isFull,isStrong) {
  var res=true; var isNotNull;
  isFull=(isFull)?true:false;
  isStrong=(isStrong)?true:false;
  for (var i in this.data) {
    var obj;
    // проверка столбцов GRID-группы
    if (this.data[i].groupTypeCode=="GRID") {
      obj=document.getElementById(this.prefComp+i+"#1");
      // проверка уникальности значений элементов столбцов GRID
      if (this.data[i].isUnique==1) {
//        obj=document.getElementById(this.prefComp+i+"#1");
        // фиксируем невалидность по неуникальности
        var U=GridGroup.checkCellUnique(obj);
        if (!U.isUnique) {
          this.setState(ev,i,U.Element,0,50,1);
          res=false; break;
        }
      }
      // condition check
      // формат параметров обработчика: GridGroup.checkCol(obj,['key1','key2',...],[n1,n2,...])
      if ((isFull||isStrong)&&(this.data[i].colCondition.length>0)) {
//        var C=eval(this.data[i].colCondition);
        var C=eval(this.parseExpression(this.data[i].colCondition));
        if (C&&C.element&&!C.result) {
          var errCode=parseInt(C.element.getAttribute("data-mess"));
          errCode=(errCode>0)?errCode:68;
          this.setState(ev,i,C.element,0,errCode,1,1);
          res=false; break;
        }
      }
      // отмена маркировки, если столбец валиден
      if (this.data[i].isUnique==1||this.data[i].colCondition.length>0) {
        var objMark=obj;
        if (this.data[i].type==4||this.data[i].type==5||this.data[i].type==6||this.data[i].type==12) objMark=Lookup.getResultByElement(objMark);
        if (objMark) {
          objMark=GridGroup.getClassMarketElement(objMark);
          if (objMark) Component.setState(ev,i,objMark,1);
        }
      }
    }
    // обязательность проверки
    if (this.data[i].isMandatoryCheck==1) this.data[i].isChecked=0;
    // элементы, отмеченные как невалидные
    if (this.data[i].isChecked==0||isStrong) {
      var arrElements=new Array();
      // GRID
      if (this.data[i].groupTypeCode=="GRID") {
        var e=document.getElementById(this.prefComp+i);
        if (isStrong||(this.data[i].isMandatoryCheck==1)) arrElements=GridGroup.getColElements(e);
        else obj=GridGroup.getClassMarketElement(document.getElementById(this.prefComp+i));
      }  else {
        obj=document.getElementById(this.prefComp+i);
      }
      if (obj&&arrElements.length==0) arrElements[0]=obj;
//      if (obj) {
      for (var n=0;n<arrElements.length;n++) {
        obj=arrElements[n];
        // наличие значения
        //  lookup, select, combobox
        if (this.data[i].type==4||this.data[i].type==5||this.data[i].type==6||this.data[i].type==12) {
          obj=Lookup.getResultByElement(obj);
          isNotNull=(parseInt(obj.value)>0);
        } else {
            if (this.data[i].type==10) {
              obj=this.getComponentBody(obj);
              if (obj)  isNotNull=(obj.value.length>0);
            }
            else isNotNull=(obj.value.length>0);
        }
        // незаполненные поля черновика разрешаем сохранять
        if (obj&&!isHidden(this.getDisplayElement(obj))&&(isFull||isNotNull)) {
          res=this.format(null,obj,null,1,1);
          // статус условных проверок (разрешаем сохранять черновик с НЕ condition полями)
          var objState=parseInt(obj.getAttribute("data-state"));
          if (res) {
            res=(isFull&&objState==-1)?false:res;
          }
          if (!res) break;
//          if (!isFull&&objState==-1) {}  // разрешаем сохранять черновик с НЕ condition полями
//          else {res=false; break;}
        }
      }
      if (!res) break;
    }
  }
  return res;
}
// устанавливает свойства READONLY компонентам с INPUT и A
Component.setReadonlyAttribute=function(Edit,Control,flag,classHide,classDisable) {
  if (Edit&&Control) {
    if (Edit.tagName=="INPUT"&&Control.tagName=="A") {
      flag=(flag)?true:false;
      // readonly=true
      if (flag) {
        // INPUT
        Edit.readonly=true;
        Edit.tabindex=-1;
        Edit.setAttribute("readonly","readonly");
        Edit.setAttribute("tabindex","-1");
        // A
        Control.tabindex=-1;
        Control.setAttribute("tabindex","-1");
        if (classDisable) {Control.className=classDisable;}
      } else {
        // readonly=false
        // INPUT
        Edit.readonly=false;
        Edit.tabindex=undefined;
        Edit.removeAttribute("readonly","");
        Edit.setAttribute("tabindex","");
        // A
        Control.tabindex=undefined;
        Control.setAttribute("tabindex","");
        if (classHide) {Control.className=classHide;}
      }
    }
  }
}
// устанавливает/отменяет READONLY элемента
Component.READONLY=function(Element,type,flag) {
  if (Element) {
    flag=(flag)?true:false;
    type=parseInt(type);
    if (isNaN(type)) {
      var objData=Component.getData(Element.id);
      type=(objData)?objData.type:null;
    }
    Element.disabled=flag;
    if (!isNaN(type)) {
      // lookup
      if (type==5) Lookup.setReadonly(Element,flag);
      // date
      if (type==10) Calendar.setReadonly(Element,flag);
    }
  }
}

/******************************************************************/
/*                  Функции форматирования типов                  */
/******************************************************************/


