var Combobox={
  classShow     : "show",
  classHide      : "hide",
  classDisable : "disable",
  classSelected : "selected",
  Box         : null,              // контейнер INPUT+BUTTON
  Edit        : null,              // редактор INPUT
  Result      : null,              // контейнер результат INPUT
  List        : null,              // список UL
  Control     : null,              // кнопка IMG
  isHide      : true,
  isChoice  :  false,
  curOption   : null,
  boundList   : null,
  bufValue    : null,
  bufText     : "",
  resultText  : null               // текст выбранной опции для восстановления
}


/*** REFRESH ***/
// вызов: delay:200
// onkeyup="comboboxKeyRefresh.defer(200,this,[this]);"
// глобальный идентификатор timeout-процесса refresh
var comboboxDeferTimer;
// очистка timeout процесса
function comboboxClearRefresh() {
  if (comboboxDeferTimer) clearTimeout(comboboxDeferTimer);
}
Function.prototype.defer=function(delay,ctx,args) {
  var that=this;
//  if (comboboxDeferTimer) clearTimeout(comboboxDeferTimer);
  comboboxClearRefresh();
  comboboxDeferTimer=setTimeout(function(){that.apply(ctx,args||[]);},delay);
};
function comboboxKeyRefresh(Edit) {
  if (Edit) {
    var l=Edit.value.length;
    if (l==0||l>2) Combobox.refresh(domNodeNext(Edit));
  }
}

/*** FUNCTION ***/

// возвращает значение lookup-компонента
//   Control - button
Combobox.getValue=function(Control) {
  return (Control&&Control.tagName=="A")?domNodeFirstChild(domNodeParent(Control)):0;
}
// устанавливает новое значение (ID/TEXT)
Combobox.setValue=function(InputResult,newValue,newText) {
  if (newValue&&InputResult&&InputResult.tagName=="INPUT") {
    var InputEdit=domNodeNext(InputResult).getElementsByTagName("INPUT")[0];
    if (InputEdit) {
      InputResult.value=newValue;
      InputEdit.value=newText;
      InputResult.onchange();
    }
  }
  return {boxResult:InputResult,boxEdit:InputEdit}
}


/*** ELEMENTS ***/
// контейнер (внешний) компонента
Combobox.getContainerByControl=function(Control) {
  return (Control&&Control.tagName=="A")?domNodeParent(Control,5):null;
}
Combobox.getBoxId=function(Control) {
  var res=(Control&&Control.tagName=="A")?domNodeParent(Control,2):null;
  res=(res&&res.id.indexOf("*")>-1) ?this.getResultByElement(res):res;
  return (res)?res.id:"";
}
//
Combobox.getEditByOption=function(Option) {
  return (Option&&Option.tagName=="LI")?domNodeFirstChild(domNodePrev(domNodeParent(Option,2))):null;
}
// возвращает видимый INPUT по form-элементу (носителю значения)
Combobox.getEditByResult=function(InputResult) {
  var res;
//  if (InputResult&&InputResult.tagName=="INPUT"&&InputResult.name.length>0) {
  if (InputResult&&InputResult.tagName=="INPUT") {
    var TABLE=domNodeNext(InputResult);
    if (TABLE&&TABLE.tagName=="TABLE") res=domNodeFirstChild(domNodeFirstChild(TABLE.rows[0].cells[0])); // first child DIV
  }
  return res;
}
// возвращает RESULT INPUT по lookup-элементу
Combobox.getResultByElement=function(Element) {
  var res;
  if (Element&&Element.tagName) {
    var tag=Element.tagName;
//    if (tag=="INPUT"&&Element.name&&Element.name.length>0)
    if (tag=="INPUT"&&Element.id&&Element.id.length>0&&Element.style.display=="none")
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
//        res=(res&&res.tagName=="INPUT"&&res.name&&res.name.length>0)?res:null;
        res=(res&&res.tagName=="INPUT")?res:null;
      }
    }
  }
  return res;
}

/*** OPERATION ***/
//
// режим READONLY (DISABLE)
Combobox.setReadonly=function(InputResult,flag) {
  var InputEdit=this.getEditByResult(InputResult);
  if (InputEdit) {
    var Control=domNodeNext(InputEdit);
    if (Control&&Control.tagName=="A") Component.setReadonlyAttribute(InputEdit,Control,flag,this.classHide,this.classDisable);
  }
}


// type - тип элемента управления: BUTTON
Combobox.set=function(control,type) {
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
//
Combobox.show=function(control) {
  if (typeof(Form)=="object") Form.popupCancel();                                   // закроем предыдущий popup
  if (this.set(control,"BUTTON")) {
    if (typeof(Form)=="object") Form.popupRegistr(this.Edit,"COMBOBOX");  // и запомним себя для close при потере фокуса
    // readonly/disable
    if (this.Control.tabIndex&&this.Control.tabIndex<0) return false;
    if (this.List.children.length<1) return false;
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
        res=res+getBounds(LI).height-1;
        if (res>this.boundList.height) {
          this.List.style.height=res+"px";
          break;
        }
      }
//    }

    // буфер
    this.bufValue=this.Result.value;
    this.bufText=this.Edit.value;
    this.Edit.setAttribute("data-old-value", this.textNorm(stringClean(this.Edit.value)));
    //
    this.curOption=null;
    this.setFocusOption(this.Result.value);
  }
}
Combobox.close=function(control) {
  if (this.set(control,"BUTTON")) {
    this.boundList=null;
    this.isHide=true;
    this.List.className=this.classHide;
    this.Control.className=this.List.className;
    comboboxClearRefresh();
  }
}
// mode: 0/1 - поиск/асинхронная загрузка
Combobox.controlClick=function(Control,mode) {
  if (Control&&Control.className!=this.classDisable) {
    if (Control.className==this.classHide) {
      if (typeof(Form)=="object") Form.popupCancel();  // закроем предыдущий popup
      // загрузка sql-списка или списка с результатом поиска
      if (mode==1) this.list(Control); else this.refresh(Control,true);
    }
    else {
      this.close(Control);
    }
  }
}
Combobox.hide=function() {
  if (!this.isHide&&this.List) this.List.className=this.classHide;
}
// нормализация текста (после stringClean) для обнаружения фактов модификации
Combobox.textNorm=function(text) {
  text=(text)?text:"";
  return text.replace(/\s*/g,"").toUpperCase();    // del space/upperCase
}

// асинхронный вызов
//  mode:   режим - 0/1 - поиск/sql-список
//  param:  контекст поиска или строка tag-переменных
Combobox.call=function(Control,mode,param) {
  if (Control) {
    mode=(isNaN(parseInt(mode)))?0:mode;
    // id компонента
    var id=this.getBoxId(Control);
    id=(id.length>0)?id.replace("#","$"):"";
    // вызов
    var url=Form.actOra+"?proc=COMBOBOX"+"&func="+mode+"&param="+param+"&setting="+id+"&userid="+Form.sessionId+"&random="+Math.random().toString();
//alert(url); toClipboard(url); return false;
    queryXmlHttp(url,"GET",1);
  }
}

// LIST LOAD ASYNC
Combobox.list=function(Control) {
  var Edit=domNodePrev(Control);
  if (!Edit) return false;
  var tagVal=TagVar.getString();
  // вызов
  this.call(Control,1,TagVar.getString());
}

// REFRESH
//  mode: true/false - бузусловно/при изменении контекста
Combobox.refresh=function(Control,mode) {
  // isChoice для отмены keyup при выборе позиции
  if (!Control||this.isChoice) {
    this.isChoice=false;  return false;
  }
  var Edit=domNodePrev(Control);
  if (!Edit) return false;
  if (Edit.value.length==0) {
//    this.close(Control); return false;

/*
    if (!this.isHide) this.controlClick(Control);
    var Result=this.getResultByElement(Edit);
    Result.value=0;
    Result.onchange();
*/
    this.clear(Control);
    Edit.focus();
    return false;
  }
  // контекст поиска
  var text=stringClean(Edit.value);
  // проверка факта изменения контекста поиска
  var strNorm=this.textNorm(text);      //text.replace(/\s*/g,"").toUpperCase();  // del space/upperCase
//  if (Edit.getAttribute("data-old-value")==strNorm) return false; else Edit.setAttribute("data-old-value",strNorm);
  if (mode) Edit.setAttribute("data-old-value",strNorm);
  else {
    if (Edit.getAttribute("data-old-value")==strNorm) return false;
    else Edit.setAttribute("data-old-value",strNorm);
  }
  // id компонента
  var id=this.getBoxId(Control);
  id=(id.length>0)?id.replace("#","$"):"";
  // вызов
  var url=Form.actOra+"?proc=COMBOBOX"+"&func="+0+"&param="+text+"&setting="+id+"&userid=&random="+Math.random().toString();
//alert(url); toClipboard(url); return false;
  queryXmlHttp(url,'GET',1);
}
// callback for refresh
function comboboxRefresh(data) {
  Combobox.load(data);
}
// показать данные: callback для refresh
Combobox.load=function(data) {
  var pos=data.indexOf(Form.separator1);
  if (pos>-1) {
    var boxId=data.substr(0,pos);
    var TD=document.getElementById(boxId);
    if (TD&&TD.tagName=="INPUT") TD=domNodeNext(TD).rows[0].cells[0];
    var DIV=(TD&&TD.tagName=="TD")?domNodeFirstChild(TD):null;
    if (DIV&&DIV.tagName=="DIV") {
      var UL=domNodeFirstChild(domNodeNext(DIV));
      if (UL) {
        UL.innerHTML=data.substr(pos+1);
        var Control=DIV.getElementsByTagName("A")[0];
        // show если невидим
        if (this.isHide) {
          this.show(Control);
        }
        else {
           // позиционирование
           var cnt=this.getContainerByControl(Control);
           this.curOption=null;
           this.setFocusOption(this.Result.value);
        }
      }
    }
  }
  document.body.style.cursor="default";
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
Combobox.selected=function(Option,mode) {
  if (Option) {
    Option.className=(mode==1)?this.classSelected:"option";
    if (mode==1) {
      Option.className=this.classSelected;
      this.curOption=Option;
    }
  }
}
// установка фокуса на элемент списка
Combobox.setFocusOption=function(id) {
  var isSelected=false;
  var firstOption;                    // первая видимая опция
  // id отсутствует - фокус на первую опцию списка
  id=(id)?id+"":"";
  if (this.List) {
    if (id.length==0) {
      var LI=domNodeFirstChild(this.List);
      id=(LI)?LI.id:"";
    }
  }
  else return false;
  if (id&&id.length>0) {
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
    if (isSelected&&this.curOption) {
      var o=domNodeFirstChild(this.curOption);
      if (o) o.focus();
    }
    this.Edit.focus();
  }
}
// mode: 0 - sync
Combobox.choice=function(Option,mode) {
  if (Option&&Option.tagName=="LI") {
    this.isChoice=true;   // отмена load
    var a=domNodeFirstChild(Option);
    this.Result=domNodePrev(domNodeParent(Option,6));  // INPUT для результата от опции списка
    this.Result.value=a.id;
    this.Edit=domNodeFirstChild(domNodePrev(domNodeParent(Option,2)));
    this.Edit.value=a.innerHTML;
    this.Edit.setAttribute("data-old-value", this.textNorm(stringClean(this.Edit.value)));
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
    if (this.Edit) this.Edit.focus();
  }
}
Combobox.cancel=function(ev,Input) {
  if (!this.isHide&&Input) {
    var Control=domNodeNext(Input);
    if (Control.tagName=="A") {
      this.close(Control);
//      this.show(Control);
//      this.Edit.value=this.resultText;
      var Table=domNodeParent(Control,5);
      if (Table.tagName=="TABLE") this.Result=domNodePrev(Table);
      this.Edit.value=this.Result.getAttribute("data-text");
//      this.filter(ev,Input,0);
      this.bufText="";
      this.isHide=true;
    }
  }
}
// очистить
Combobox.clear=function(Control) {
  var res=this.getResultByElement(Control);
  if (res) {
    res.value=0;
    this.getEditByResult(res).value="";
//    this.close(domNodePrev(Control));
    if (Control) {
      if (Control.tagName=="A") {
        var e=domNodePrev(Control);
        Control=(e&&e.tagName=="INPUT")?Control:e;
      }
      if (Control.tagName=="INPUT")  Control=domNodeNext(Control);
    }
    this.close(Control);
    res.onchange();
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


Combobox.nextOption=function(Option) {
  var elem=Option;
  if (!this.Hide&&elem) {
    do {elem=domNodeNext(elem)} while (elem&&elem.style.display=="none");
  }
  return elem;
}
Combobox.prevOption=function(Option) {
  var elem=Option;
  if (!this.Hide&&elem) {
    do {elem=domNodePrev(elem)} while (elem&&elem.style.display=="none");
  }
  return elem;
}
Combobox.firstOption=function(Option) {
  var elem=Option;
  if (!this.Hide&&elem) {
    elem=domNodeFirstChild(domNodeParent(elem));
    if (elem.style.display=="none")
      do {elem=domNodeNext(elem)} while (elem&&elem.style.display=="none");
  }
  return elem;
}
Combobox.lastOption=function(Option) {
  var elem=Option;
  if (!this.Hide&&elem) {
    elem=domNodeLastChild(domNodeParent(elem));
    if (elem.style.display=="none")
      do {elem=domNodePrev(elem)} while (elem&&elem.style.display=="none");
  }
  return elem;
}
/* key navigator */
Combobox.key=function(ev,Control) {
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
      if (!this.isHide) {
        this.isChoice=true;
        this.cancel(ev,this.getEditByOption(this.curOption));
      }
      eventCancel(ev);
      return false;
      break;
    case 35: // End
      if (!this.isHide) {
        LI=this.lastOption(this.curOption);
        isContinue=false;
      }
      break;
    case 36: // Home
      if (!this.isHide) {
        LI=this.firstOption(this.curOption);
        isContinue=false;
      }
      break;
    case 38: // ArrUp
      if (!this.isHide) LI=this.prevOption(this.curOption);
      else {
        eventCancel(ev); return false;
      }
      break;
    case 40: // ArrDown
      if (this.isHide) this.show(domNodeNext(Control));
      else LI=this.nextOption(this.curOption);
      isContinue=false;
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

/*** COMBOBOX GRID выбор  ***/
Combobox.gridRecAction=function(ev,recId,cellText,containerId,obj) {
  // определение вызывающего элемента
  var callElementId="";
  var doc=document;
  // имя вызывающего компонента находится в атрибуте iframe
  var F=window.frameElement;
  if (F&&F.id==BoxAlert.frameId) {
    callElementId=F.getAttribute("data-prev-element");
    callElementId=(callElementId)?callElementId:"";
  }
  if (callElementId.length==0) callElementId=(typeof(Message)=="object")?Message.callElementId:"";
  else doc=parent.document;
  var Element=doc.getElementById(callElementId);
  // возврат значений
  if (Element) {
    // уровень ссылки: контейнер/форма
    var resultBox=this.getResultByElement(Element);
    if (containerId>0) {
      var level=parseInt(resultBox.getAttribute("data-level"));
      recId=(level==0)?containerId:recId;
    }
    var box=this.setValue(resultBox,recId,cellText);
//    var box=this.setValue(this.getResultByElement(Element),recId,cellText);
    Message.close();
    if (box.boxEdit) {
      var Control=domNodeNext(box.boxEdit);
      if (Control) Control.focus(); else box.boxEdit.focus();
    }
  }
}
/*** COMBOBOX CARD сохранение  ***/
// обработчик onload формы-диалога после транзакции
// name: имя поля, содержащего текст (display name combobox)
Combobox.dialogAction=function(ev,name) {
  name=(name)?name+"":"";
  if (typeof(parent.Combobox)=="object"&&name.length>0) {
    // display name компонента
    var e=document.getElementsByName(name)[0];
    if (e) {
      var text=e.value;
      // передача управления (от фрейма) компоненту из основного документа
      var containerId=Form.objForm.elements["CONTAINER_ID"].value;
      parent.Combobox.gridRecAction(ev,Form.recId,text,containerId);
    }
  }
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
