var Lookup={
  lookupName : "lookup",
  classShow     : "show",
  classHide      : "hide",
  classDisable : "disable",
  classSelected : "selected",
  classOption :      "option",
  Box         : null,              // контейнер INPUT+BUTTON
  Edit        : null,              // редактор INPUT
  Result      : null,              // контейнер результат INPUT
  List        : null,              // список UL
  Control     : null,              // кнопка IMG
  isHide      : true,
  curOption   : null,
  boundList   : null,
  bufValue    : null,
  bufText     : "",
  resultText  : null               // текст выбранной опции для восстановления
}
// возвращает значение lookup-компонента
//   Control - button
Lookup.getValue=function(Control) {
  return (Control&&Control.tagName=="A")?domNodeFirstChild(domNodeParent(Control)):0;
}
// new
Lookup.value=function(Control) {
  var res=this.getResultBox(Control);
  return (res)?res.value:0;
}
// устанавливает значение lookup-компоненту
Lookup.setValue=function(InputResult,newValue) {
  if (newValue>-10&&InputResult&&InputResult.tagName=="INPUT") {
    var Container=domNodeParent(InputResult);
    var collect=Container.getElementsByTagName("LI");
    for (var i=0;i<collect.length;i++) {
      if (collect[i]&&collect[i].id==newValue) {this.choice(collect[i],0); break;}
    }
  }
}
// очистить (для варианта Combobox)
Lookup.clear=function(Control) {
  var res=this.getResultBox(Control);
  if (res) {
    res.value=0;
    this.getEditByResult(res).value="";
    res.onchange();
  }
}
//
Lookup.getEditByOption=function(Option) {
  return (Option&&Option.tagName=="LI")?domNodeFirstChild(domNodePrev(domNodeParent(Option,2))):null;
}
// возвращает видимый INPUT по form-элементу (носителю значения)
Lookup.getEditByResult=function(InputResult) {
  var res;
//  if (InputResult&&InputResult.tagName=="INPUT"&&InputResult.name.length>0) {
  if (InputResult&&InputResult.tagName=="INPUT") {
    var TABLE=domNodeNext(InputResult);
    if (TABLE&&TABLE.tagName=="TABLE") res=domNodeFirstChild(domNodeFirstChild(TABLE.rows[0].cells[0])); // first child DIV
  }
  return res;
}

// возвращает INPUT с результатом по lookup-элементу
Lookup.getResultBox=function(Element) {
  var res;
  if (Element&&Element.tagName) {
    var tag=Element.tagName;
    if (tag=="INPUT"&&Element.name&&Element.name.length>0)
      res=Element;   // сам result input
    if (!res) {
      if (Element) {
        var T;
        if (tag=="A")         T=domNodeParent(Element,5); // div,td,tr,tbody,table
        if (tag=="INPUT") T=domNodeParent(Element,5); // div,td,tr,tbody,table
        if (tag=="DIV")      T=domNodeParent(Element,4); // td,tr,tbody,table
        if (tag=="TD")       T=domNodeParent(Element,3); // tr,tbody,table
        if (tag=="TR")       T=domNodeParent(Element,2); // tbody,table
        if (tag=="TABLE") T=Element;                               // table
        if (T) res=domNodePrev(T);
        res=(res&&res.tagName=="INPUT")?res:null;
      }
    }
  }
  return res;
}

// возвращает RESULT INPUT по lookup-элементу
Lookup.getResultByElement=function(Element) {
/*
  var res;
  if (Element&&Element.tagName) {
    var tag=Element.tagName;
    if (tag=="INPUT"&&Element.name&&Element.name.length>0)
      res=Element;   // сам result input
    if (!res) {
      if (Element) {
        var T;
        if (tag=="A")         T=domNodeParent(Element,5); // div,td,tr,tbody,table
        if (tag=="INPUT") T=domNodeParent(Element,5); // div,td,tr,tbody,table
        if (tag=="DIV")      T=domNodeParent(Element,4); // td,tr,tbody,table
        if (tag=="TD")       T=domNodeParent(Element,3); // tr,tbody,table
        if (tag=="TR")       T=domNodeParent(Element,2); // tbody,table
        if (tag=="TABLE") T=Element;                               // table
        if (T) res=domNodePrev(T);
        res=(res&&res.tagName=="INPUT"&&res.name&&res.name.length>0)?res:null;
      }
    }
  }
*/
  var res=this.getResultBox(Element);
  return (res&&res.name&&res.name.length>0)?res:null;
}

//
// режим READONLY (DISABLE)
Lookup.setReadonly=function(InputResult,flag) {
  var InputEdit=this.getEditByResult(InputResult);
  if (InputEdit) {
    var Control=domNodeNext(InputEdit);
    if (Control&&Control.tagName=="A") Component.setReadonlyAttribute(InputEdit,Control,flag,this.classHide,this.classDisable);
  }
}

// type - тип элемента управления: BUTTON
Lookup.set=function(control,type) {
  if (!control) return false;
  this.Control=control;
  if (this.Control.tagName=="A"&&type=="BUTTON") {
    this.Box=domNodeParent(this.Control);
    this.List=domNodeFirstChild(domNodeNext(this.Box)); // UL
    this.Edit=domNodePrev(this.Control);
    this.Result=domNodePrev(domNodeParent(this.Box,4)); // INPUT для результат
  }
  return true;
}

Lookup.show=function(control) {
  if (typeof(Form)=="object") Form.popupCancel();                                   // закроем предыдущий popup
  if (this.set(control,"BUTTON")) {
    if (typeof(Form)=="object") Form.popupRegistr(this.Edit,"LOOKUP");  // и запомним себя для close при потере фокуса
    // readonly/disable
    if (this.Control.tabIndex&&this.Control.tabIndex<0) return false;
    //
    this.boundList=null;
    this.isHide=false;
    this.List.className=this.classShow;
    this.Control.className=this.List.className;
//    if (parseInt(this.List.style.height)>0) {
      this.boundList=getBounds(this.List);
      var LI; var res=0;
      var parentValue=this.List.getAttribute("data-parent");
      for (var i=0;i<this.List.children.length;i++) {
        LI=this.List.children[i];
        // parent LI показанной группы запомним в parent UL
        if (i==0&&isNaN(parseInt(parentValue))) this.List.setAttribute("data-parent",LI.getAttribute("data-parent")); 
        res=res+getBounds(LI).height;
        if (res>=this.boundList.height-1) {
          this.List.style.height=res+"px";
          break;
        }
      }
//    }
    // буфер
    this.bufValue=this.Result.value;
    this.bufText=this.Edit.value;
    //
    this.curOption=null;
    this.setFocusOption(this.Result.value);
  }
}

Lookup.close=function(control) {
  if (this.set(control,"BUTTON")) {
    this.boundList=null;
    this.isHide=true;
    this.List.className=this.classHide;
    this.Control.className=this.List.className;
  }
}

Lookup.controlClick=function(Control) {
  if (Control&&Control.className!=this.classDisable) {
    if (Control.className==this.classHide) this.show(Control); else this.close(Control);
  }
}

Lookup.hide=function() {
  if (!this.isHide&&this.List) this.List.className=this.classHide;
}
// id: TD контейнера в формате: ITEM_ID#ROW_NUM, ROW_NUM=0 или для грида - номер строки
Lookup.init=function(id,strMaxLen,defaultValue,defaultText,isWidthAuto) {
  var obj=document.getElementById(id);
  if (obj) {
    this.Result=domNodePrev(domNodeParent(obj,3)); // INPUT для результата
    obj=domNodeFirstChild(obj);                    // DIV_1
    this.Edit=domNodeFirstChild(obj);
    this.List=domNodeFirstChild(domNodeNext(obj));
//    this.Result=obj; // INPUT для результата
//    obj=domNodeFirstChild(domNodeFirstChild(domNodeFirstChild(domNodeFirstChild(domNodeNext(obj))))); // INPUT-TABLE..TD-DIV_1 контейнер
//    this.Edit=domNodeFirstChild(obj);
//    this.List=domNodeFirstChild(domNodeNext(obj));
    this.Control=domNodeNext(this.Edit);
    if (isWidthAuto==1) {
      var LI=domNodeFirstChild(this.List);
      // ширина INPUT по max размеру самой длинной строки в списке
      var w=getStrWidth(strMaxLen,LI); 
      var widthControl=getBounds(this.Control).width;
      widthControl=(widthControl==0)?10:widthControl;
      if (w>0) this.Edit.style.width=parseInt(w+widthControl)+"px";
    } else this.Edit.title=defaultText;
    //
    if (this.Result) {
      this.Result.value=defaultValue;
      this.Result.setAttribute("data-text",defaultText);
      this.Edit.value=defaultText;
      this.List.id=defaultText;
      this.resultText=defaultText;
    }
  }
}
// выделение элемента
// mode: 0/1 - unselected/selected
Lookup.selected=function(Option,mode) {
  if (Option) {
    Option.className=(mode==1)?this.classSelected:this.classOption;
    if (mode==1) {
      Option.className=this.classSelected;
      this.curOption=Option;
    }
  }
}
// установка фокуса на элемент списка
Lookup.setFocusOption=function(id) {
  var isSelected=false;
  var firstOption;                    // первая видимая опция
  if (id&&id.length>0&&this.List) {
    var collect=this.List.childNodes;
    var LI;
    for (var key in collect) {  
      LI=collect[key];
      if (LI.nodeType==1) {
        if (!isSelected&&!firstOption&&LI.style.display!="none") firstOption=LI;  // первая видимая опция
        if (LI.id==id) {
          if (!isSelected&&LI.style.display!="none") {this.selected(LI,1); isSelected=true;};
        }
        else this.selected(LI,0);
      }
    }
    // если опция не встретилась в варианте display, то отметим первую видимую
    if (!isSelected&&firstOption) {this.selected(firstOption,1); isSelected=true}
    if (isSelected) domNodeFirstChild(this.curOption).focus();
    this.Edit.focus();
  }
}
// mode: 0 - sync
Lookup.choice=function(Option,mode) {
  if (Option&&Option.tagName=="LI") {
    var a=domNodeFirstChild(Option);
    this.Result=domNodePrev(domNodeParent(Option,6));  // INPUT для результата от опции списка
    this.Result.value=a.id;
    this.Edit=domNodeFirstChild(domNodePrev(domNodeParent(Option,2)));
    this.Edit.value=a.innerHTML;
    this.Result.setAttribute("data-text",this.Edit.value);  // result-буфер для синхронного текста выбранной опции
    if (this.Edit.title.length>0) this.Edit.title=this.Edit.value;
    this.List.id=this.Edit.value;  // статический буфер текста выбранной опции
    this.resultText=this.Edit.value;
//    this.bufValue=this.Result.value;
//    this.bufText=this.resultText;
    this.bufValue=null;
    this.bufText="";
//    this.isHide=true;
//    a=domNodeNext(this.Edit);
//    if (a&&a.tagName=="A") a.click();
    if (mode==0) {}
    else {
      this.close(domNodeNext(this.Edit));
      this.Result.onchange();
    }
  }
}

Lookup.cancel=function(ev,Input) {
  if (!this.isHide&&Input) {
    var Control=domNodeNext(Input);
    if (Control.tagName=="A") {
      this.close(Control);
//      this.show(Control);
//      this.Edit.value=this.resultText;
      var Table=domNodeParent(Control,5);
      if (Table.tagName=="TABLE") this.Result=domNodePrev(Table);
      this.Edit.value=this.Result.getAttribute("data-text");
      this.filter(ev,Input,0);
      this.bufText="";
      this.isHide=true;
    }
  }
}

// синхронизация с новым значением мастер-компонента
Lookup.syncMaster=function(ev,Result) {
  if (Result) {
    ev=ev||window.event;
    var Table=domNodeNext(Result);
    if (Table&&Table.tagName=="TABLE") {
      var DIV=domNodeFirstChild(Table.rows[0].cells[0]); // DIV -edit
      var Input=domNodeFirstChild(DIV);
      var UL=domNodeFirstChild(domNodeNext(DIV));
      if (UL&&UL.tagName=="UL") {
        var data=Component.getData(Result.id);
        var gridRow;
        if (data.groupTypeCode=="GRID") gridRow=GridGroup.getRowByElement(Result);
        var parentValue=Component.parseExpression(data.expression,"",gridRow);
        parentValue=eval(parentValue);
        parentValue=(parentValue)?parentValue+"":"";
        if (parentValue.length>0&&UL.getAttribute("data-parent")!=parentValue) {
          UL.setAttribute("data-parent",parentValue);
          var firstLI=this.filter(ev,Input,0);
          this.choice(firstLI,0);
        }
      }
    }
  }
}

// фильтр: mode: 0/1 - REFRESH/SHOW
Lookup.filter=function(ev,Input,mode) {
  if (!Input) return;
  this.bufText=Input.value;
//  var UL=this.List;
//  if (!UL) UL=domNodeFirstChild(domNodeNext(domNodeParent(Input)));
  var UL=domNodeFirstChild(domNodeNext(domNodeParent(Input)));
  if (!UL) return;
  var isParentFilter=(parseInt(UL.getAttribute("data-parent"))>0); // признак фильтрации по внешнему ключу
  if (mode==1) {
   var text=Input.value.replace(/^\s+|-|,|\+|&|\$|;|\.$/g," ");
   text=text.replace(/\s+/g," ").replace(/^ | $/g,"").toUpperCase();
//   if (text.length==0) return;
   var arr=text.split(" ");
   arr=sortLength(arr,1);       // order desc
  }
  var isResultExist=false;
  var firstLI=null;            // первая видимая опция в списке
  var collect=UL.childNodes;
  for (key in collect) {
    var result=false;
    var LI=collect[key];
    if (LI.nodeType==1) {
      // фильтр по внешнему ключу
      if (!isParentFilter||LI.getAttribute("data-parent")==UL.getAttribute("data-parent")) {
        result=true;
        // фильтр по поиск-контексту
        if (mode==1) {
          var dataNorm=LI.getAttribute("data-norm");
          for (var i=0;i<arr.length;i++) if (dataNorm.indexOf(arr[i])<0) {result=false;break;}
        }
      }
      if (result) {
        if (LI.style.display=="none") LI.style.display="";
        // присутствие выбранной опции в результирующем наборе данных
        if (!isResultExist) {isResultExist=true; firstLI=LI}
      } else {
        if (LI.style.display!="none") LI.style.display="none";
      }
    }
  }
  // позиционирование
  if (mode==1&&isResultExist) {
    this.selected(this.curOption,0);
    this.selected(firstLI,1);
    domNodeFirstChild(firstLI).focus();
    this.Edit.focus();
  }
  return (isResultExist)?firstLI:null;
}
Lookup.setFilter=function(ev,Input) {
  if (!Input) return;
  if (Input.value.length!=this.bufText.length) {
    ev=ev||window.event;
    if (ev.ctrlKey||ev.altKey||ev.metaKey) return;
    if (ev.keyCode!=8&&ev.keyCode<41) return;
    if (this.isHide) {
//      this.resultText=domNodeFirstChild(domNodeNext(domNodeParent(Input))).id;  // input-div-div-ul: result text
      this.show(domNodeNext(Input));
    }
    this.filter(ev,Input,1);
  }
}

Lookup.nextOption=function(Option) {
  var elem=Option;
  if (!this.Hide&&elem) {
    do {elem=domNodeNext(elem)} while (elem&&elem.style.display=="none");
  }
  return elem;
}
Lookup.prevOption=function(Option) {
  var elem=Option;
  if (!this.Hide&&elem) {
    do {elem=domNodePrev(elem)} while (elem&&elem.style.display=="none");
  }
  return elem;
}
Lookup.firstOption=function(Option) {
  var elem=Option;
  if (!this.Hide&&elem) {
    elem=domNodeFirstChild(domNodeParent(elem));
    if (elem.style.display=="none")
      do {elem=domNodeNext(elem)} while (elem&&elem.style.display=="none");
  }
  return elem;
}
Lookup.lastOption=function(Option) {
  var elem=Option;
  if (!this.Hide&&elem) {
    elem=domNodeLastChild(domNodeParent(elem));
    if (elem.style.display=="none")
      do {elem=domNodePrev(elem)} while (elem&&elem.style.display=="none");
  }
  return elem;
}
/* key navigator */
Lookup.key=function(ev,Control) {
  var isContinue=false;
  ev=ev||window.event;
  var keyCode=ev.keyCode;
  var LI;
  switch (keyCode) {
    case 9:  // Tab
      this.cancel(ev,this.getEditByOption(this.curOption));
      return true;
    case 13: // Enter
      if (this.isHide) return true;
      if (this.curOption) {
        this.choice(this.curOption);
        eventCancel(ev);
        return false;
      } else {
        isContinue=true;
      }
      break;
    case 27: // Esc
      this.cancel(ev,this.getEditByOption(this.curOption));
      eventCancel(ev);
      return false;
      break;
    case 35: // End
      LI=this.lastOption(this.curOption);
      break;
    case 36: // Home
      LI=this.firstOption(this.curOption);
      break;
    case 38: // ArrUp
      if (!this.isHide) LI=this.prevOption(this.curOption);
      else return false;
      break;
    case 40: // ArrDown
      if (this.isHide) this.show(domNodeNext(Control));
      else LI=this.nextOption(this.curOption);
      break;
    default:
      isContinue=true;
      break;
  }
  if (!this.isHide&&LI&&LI.style.display!="none") {
    this.selected(this.curOption,0);
    this.selected(LI,1);
    domNodeFirstChild(LI).focus();
    this.Edit.focus();
  }
  if (!isContinue) eventCancel(ev);
  return isContinue;
}

// отмена стандартных обработчиков (onKeyDown)
Lookup.eventRevoke=function(e) {
  var e=e||window.event;
  // обработка Tab
  if (e.keyCode==9) {
//      this.boxBlur();
      // генерация события onChange
//      if (objInput.value.length==0) objInput.onchange();
  }
  if (e.keyCode==38||e.keyCode==40) {
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
  }
}
// возвращает индекс опции, которая выбрана (value==LI.id) и кол-во опций элемента {index,count}
Lookup.optionIndex=function(Element) {
  var res=-1;
  var count=0;
  var InputResult=this.getResultBox(Element);
  if (InputResult) {
    var value=parseInt(InputResult.value);
    if (value>0) {} else return res;                             // выход: значение компонента отсутствует
    var TABLE=domNodeNext(InputResult);
    if (TABLE&&TABLE.tagName=="TABLE") {
      var UL=domNodeFirstChild(domNodeNext(domNodeFirstChild(TABLE.rows[0].cells[0])));
      if (UL&&UL.tagName=="UL") {
        var parent=parseInt(UL.getAttribute("data-parent"));
        parent=(isNaN(parent))?0:parent;
        var collect=UL.getElementsByTagName("LI");
        var num=0;
        for (var i=0;i<collect.length;i++) {
          var LI=collect[i];
          var p=parseInt(LI.getAttribute("data-parent"));
          p=(isNaN(p))?0:p;
          if (num>0&&p!=parent) break;  // выход по признаку начало другой группы
          if (p==parent&&parseInt(LI.id)>0) {
            num=num+1;
            if (parseInt(LI.id)==value&&res<0) res=num;
          }
        }  // for LI
        count=num;
      }    // UL
    }
  } 
  return {count:count,index:res};
}

/**************************/
/*         Интервал         */
/**************************/
var Interval={
  inputFirstName : "edit_1",
  inputLastName : "edit_2"
}
Interval.getSeparator=function() {
  var res="|";
  if (typeof(Form)=="object") res=Form.separator3;
  return res;
}
Interval.getResultBox=function(Element) {
  var res;
  if (Element) {
    if (Element.tagName=="INPUT") {
      if (Element.style.display=="none") res=Element;
      else {
//        var div=domFirstParentByTag(Element,"DIV");
        var div=Element.closest("#interval");
        if (div) res=domNodeFirstChild(div);
      }
    }
  }
  return res;
}
// возвращает ссылки на edit-боксы
Interval.getEditBox=function(Input) {
  var res={edit1:null,edit2:null};
  if (Input&&Input.tagName=="INPUT") {
    var div=Input.closest("#interval");
    if (div) {
      var collect=div.getElementsByTagName("INPUT");
      res={edit1:collect[1],edit2:collect[2]};
    }  
  }
/*
    var TD;
    if (Input.getAttribute("data-vcl-type")==14 || Input.getAttribute("data-vcl-type")==18)
      TD=domNodeNext(Input).rows[0].cells[1];
    else
      TD=domNodeParent(Input);
    if (TD&&TD.tagName=="TD") {
      var Input1=domNodeFirstChild(TD);
      Input=domNodeNext(Input1);
      if (Input&&Input.tagName=="INPUT") res={edit1:Input1,edit2:Input};
    }
  }
*/
  return res;
}
//
Interval.set=function(Result,value) {
  var box=this.getEditBox(Result);
  if (box.edit1!=null) {
    var sep=this.getSeparator();
    if (value.indexOf(sep)>-1) {
       Result.value=value;
       var arr=value.split(sep);
       box.edit1.value=arr[0];
       box.edit2.value=arr[1];
    }
  }
}
// присваивает значение idx-редактору (1/2) и/или возвращает результат
Interval.result=function(Result,val,idx) {
  if (!Result) return "";
  var res=Result.value;
  var sep=this.getSeparator();
  idx=parseInt(idx);
  // set
  if (idx==1||idx==2) {
      idx=idx-1;
      if (Result.value.indexOf(sep)>-1) {
        var arr=Result.value.split(sep);
      }
      else arr=["",""];
      val=(val)?val+"":"";
      arr[idx]=val;
      Result.value=arr[0]+sep+arr[1];
      res=Result.value;
  }
  res=(res.length==0)?sep:res;
  return res;
}
Interval.checkValue=function(type,value) {
  var res=true;
  value=(value)?value+"":"";
  if (value.length>0) {
    if (type=="NUMBER") res=!isNaN(parseFloat(value));
    if (type=="DATE")   res=(value.dateToStr("DD.MM.YYYY").errCode==0);
  }
  return res;
}
// NUMBER
Interval.setNumber=function(Input,mode) {
  var errCode=[1,11]; // не число, нижняя граница>верхней
  var errIdx=-1;
  if (Input) {
    var Result=this.getResultBox(Input);
    if (Result) {
      var idx=(Input.id==this.inputFirstName)?1:(Input.id==this.inputLastName)?2:0;
      if (this.checkValue("NUMBER",Input.value)) {
        // set
        var res=this.result(Result,Input.value,idx);
        // валидация
        var arr=res.split(this.getSeparator());
        // тип данных
        if (typeof(Form)=="object") {
          // тип данных
          if (this.checkValue("NUMBER",arr[0])&&this.checkValue("NUMBER",arr[1])) {} else errIdx=0;
          // нижняя граница больше верхней
          if (errIdx<0&&arr[0].length>0&&arr[1].length>0) {
            arr[0]=parseFloat(arr[0]); arr[1]=parseFloat(arr[1]);
            errIdx=(arr[0]>arr[1])?1:errIdx;
          }
        }
      } else {
        // не число
        Input.value="";
        errIdx=0;
      }
      if (typeof(Form)=="object") {
        if (errIdx>-1) {
          Form.mess(errCode[errIdx],null,null,120);
          Input.focus();
        } else Form.messClose();
      }
    }
  }
}
// DATE
Interval.setDate=function(Input,mode) {
  var errCode=[4,11]; // не дата, нижняя граница>верхней
  var errIdx=-1;
  if (Input) {
    var Result=this.getResultBox(Input);
    if (Result) {
      var idx=(Input.id==this.inputFirstName)?1:(Input.id==this.inputLastName)?2:0;
      var value=Input.value.trim();
      var frm=value.dateToStr("DD.MM.YYYY");
      if (frm.errCode==0) {
        Input.value=frm.value;
        var res=this.result(Result,Input.value,idx);
        // валидация
        var arr=res.split(this.getSeparator());
        // тип данных
        if (typeof(Form)=="object") {
          // тип данных
          if (this.checkValue("DATE",arr[0])&&this.checkValue("DATE",arr[1])) {} else errIdx=0;
          // возвращает 1, если Date1>Date2
          if (errIdx<0 && arr[0].length>0 && arr[1].length>0) {
            var D=new Date();
		    if (D.compare(arr[0],arr[1],"DD.MM.YYYY")==1) errIdx=1;
          }	  
        }
      } else { // не дата
        Input.value="";
        errIdx=0;
      }
      if (typeof(Form)=="object") {
        if (errIdx>-1) {
          Form.mess(errCode[errIdx],null,null,120);
          Input.focus();
        } else Form.messClose();
      }
    }
  }
  return true;
}
