/*====================================================================================*/
/*                  Регистратор пользовательской конфигурации групп                   */
/*====================================================================================*/
var GroupConfig={
  name        : "GROUP_CONFIG",
  separator   : "@",
  arr         : [],
  Config      : null,
  groupTypes  : ["BM_PANEL","EXPAND","GRID","GRID_SQL"],
  prefGroupId : "group_"                        // префикс контейнера группы (id="group_N")
}
GroupConfig.prepare=function() {
  if (this.arr.length==0) {
    if (!this.Config) this.Config=document.getElementById(this.name);
    var txt=this.Config.value;
    if (txt.substr(0,1)==this.separator) txt=txt.substr(1);
    if (txt.substr(txt.length-1)==this.separator) txt=txt.substr(0,txt.length-2);
    this.arr=txt.split(this.separator);
  }
  return (this.arr.length==0);
}
GroupConfig.getGroupIdx=function(groupId) {
  var res;
  for (var i=0;i<this.arr.length;i++) {
    if (this.arr[i].indexOf("GROUP_ID:"+groupId+";")>-1) {res=i; break;}
  }
  return res;
}
GroupConfig.save=function(groupId,paramName,paramValue) {
  if (this.prepare()) return;
  var idx=this.getGroupIdx(groupId);
  if (idx>-1) {
    var pos=this.arr[idx].indexOf(";"+paramName+":")
    if (pos<0) return;
    var txt1=this.arr[idx].substr(pos,this.arr[idx].indexOf(";",pos));
    var txt2=";"+paramName+":"+paramValue+";";
    this.arr[idx]=this.arr[idx].replace(txt1,txt2);
  }
}
GroupConfig.getStr=function() {
  var res="";
  for (i=0;i<this.arr.length;i++) {
    res=res+this.arr[i]+this.separator;
  }
  return (res.length>0)?this.separator+res:"";
}
GroupConfig.write=function() {
  if (this.Config&&(this.arr.length>0)) this.Config.value=this.getStr();
}
// возвращает ID группы, которой принадлежит элемент
GroupConfig.getGroupByElement=function(Element) {
  while (Element&&Element.id.indexOf(this.prefGroupId)<0&&Element.tagName!="FORM") Element=Element.parentNode;
  return (Element&&(Element.id.indexOf(this.prefGroupId)>-1)?Element.id:null);
}
// возвращает контейнер группы по ID группы
GroupConfig.getGroupByGroupId=function(groupId) {
  var res;
  groupId=(groupId)?groupId+"":"";
  if (groupId.indexOf(this.prefGroupId)==0) {res=document.getElementById(groupId);}
  else {
    groupId=parseInt(groupId);
    if (isNaN(groupId)) {return res;} else {res=document.getElementById(this.prefGroupId+groupId);}
  }
  return res;
}
// возвращает GROUP_ID по элементу
GroupConfig.getGroupNumByElement=function(Element) {
  var id=this.getGroupByElement(Element);
  return (id==null)?null:id.replace(this.prefGroupId,"");
}

/*====================================================================================*/
/*                               Bookmark Panel In Memory                             */
/*====================================================================================*/
var BookmarkPanel={
  containerId      : "bmPanel",          // id контейнера панели управления FIELDSET (декларация в PLS: builder.form_body)
  panelId          : "groupTabInMemory", //"bmPanelTabs",      // id TABLE панели управления
  prefGroupId      : "group_",           // префикс контейнера группы (id="group_N")
  selectedId       : "bmPanelSelected",
  classNameDisable : "buttonLinkDisable",
  classNameActive  : "fixed"
}
// обработчик: change tab
BookmarkPanel.tabInMemAction=function(Tab) {
//  if (Tab&&(!this.isDisabled(Tab))&&(!this.isActive(Tab))) {
  if (Tab&&(!this.isDisabled(Tab))) {
    var tabTD=domNodeParent(Tab);
//    if (tabTD.id==this.selectedId) return false;
    var tabTABLE=domNodeParent(tabTD,3);
/*
// GROUP_ID: тэг <A id> - первый потомок TD
var groupId=domNodeFirstChild(tabTABLE.rows[0].cells[0]).id;
*/
    var groupId=tabTD.getAttribute("data-group");
    // fieldset
    var tabContainer=domNodeNext(tabTABLE);
    // отмена выбора
    var collect=tabTABLE.getElementsByTagName("A");
    for (var i=0;i<collect.length;i++) Button.setButtonFixState(collect[i],0);
    for (var i=0; i<tabTABLE.rows[0].cells.length; i++) tabTABLE.rows[0].cells[i].id="";
    // регистрация выбора
    tabTD.id=this.selectedId;
    Button.setButtonFixState(tabTD.getElementsByTagName("A")[0],1);

    // запомним конфигурацию
    GroupConfig.save(groupId,"TAB_SELECTED",parseInt(tabTD.cellIndex+1));
    // визуализация выбранной панели
    for (i=0; i<tabContainer.childNodes.length; i++) {
      var node=tabContainer.childNodes[i];
      if (node) {
        if (node.nodeType!=1) continue;
        if (node.id.indexOf("group_")>-1) {
          if (node.id=="group_"+Tab.id) node.style.display="";
          else node.style.display="none";
        }
      }
    }
  }
}
// set tab disable
BookmarkPanel.disable=function(Control,state) {
  if (Control) {
    state=(state)?true:false;
    var clName=Control.className;
    if (clName.length>0) {
      var flagOff=clName.indexOf(this.classNameDisable)>-1;
      if (state&&!flagOff) Control.className=clName+" "+this.classNameDisable;
      else {
        if (!state&&flagOff) Control.className=clName.replace(" "+this.classNameDisable,""); else return false;
      }
      Control.disabled=state;
    }
  }
}
// возвращает признак tab active: true/false
BookmarkPanel.isActive=function(Control) {
//  if (Control) return (Control.className.indexOf(this.classNameActive)>-1); else return true;
  return Button.isPressed(Control);
}
// возвращает признак disabled: true/false
BookmarkPanel.isDisabled=function(Control) {
//  var disable=Control.className.indexOf(this.classNameDisable);
  if (Control)
    return (Control.className.indexOf(this.classNameDisable)>-1);
  else 
    return true;
}
// возвращает контенер панели управления
BookmarkPanel.getControlPanel=function(Element) {
  if (Element) {
    var FS=Element;
    do {FS=FS.parentNode;} while (FS&&FS.tagName!="FIELDSET"&&FS.id!=this.containerId);
    if (FS&&FS.id==this.containerId) var panel=domNodePrev(FS);
  }
  return panel;
}
// активирует вкладку по входящему элементу
BookmarkPanel.activate=function(Element) {
  if (Element) {
    var container;
    var groupId;
    // по дереву к корню в поиске группы верхнего уровня и контенера панели
//    while (Element&&Element.tagName!="FIELDSET"&&Element.id!=this.containerId) {
    while (Element&&Element.id!=this.containerId) {
      if (Element.tagName=="FIELDSET"||Element.tagName=="DIV") {
        if (Element.id.indexOf(this.prefGroupId)>-1) groupId=Element.id;
      }
      Element=Element.parentNode;
      container=Element;
    }
    // ищем панель управления и активируем вкладку, соответствующую заданному groupId
    if (groupId&&container&&container.id==this.containerId) {
      groupId=parseInt(groupId.replace(this.prefGroupId,""));  // GROUP_ID верхнего уровня
      // панель управления TABLE (prev контейнера общего контейнера FIELDSET)
      var panel=domNodePrev(container);
      if (panel&&panel.tagName=="TABLE"&&panel.id==this.panelId&&!isNaN(groupId)) {
        for (var i=0;i<panel.rows[0].cells.length;i++)  {
          var Tab=domNodeFirstChild(panel.rows[0].cells[i]);
          if (Tab.id==groupId) {this.tabInMemAction(Tab); break;}
        }
      }
    }
  }
}

/*====================================================================================*/
/*                                Expand/Collapse Group                               */
/*====================================================================================*/
var ExpandGroup={
  imgNameExpand     : "btnPlus.png",
  imgNameCollapse   : "btnMinus.png",

  classNameExpand   : "expand",    // plus
  classNameCollapse : "collapse"   // minus
}
// Control: a href
ExpandGroup.action=function(Control) {
  var img="";
  if (Control) {
    var groupContainer=domNodeNext(domNodeParent(Control,2));
    if (groupContainer) {
      var state=(groupContainer.style.display=="none")?0:1;
      img=(state==0)?this.imgNameCollapse:this.imgNameExpand;
      ButtonGradient.changeImage(Control,img);
      groupContainer.style.display=(state==0)?"":"none";
      // фиксируем установленный статус
      var groupId=Control.getAttribute("data-value");
      if (groupId>0) GroupConfig.save(groupId,"STATE",((state==0)?1:0));
    }
  }
  return false;
}
// смена статуса
ExpandGroup.changeState=function(Element) {
  if (Element) {
    var FS=domFirstParentByTag(Element,"FIELDSET");
    if (FS) {
      var Control=domNodeFirstChild(domNodePrev(FS));
      Control=(Control&&Control.tagName=="SPAN")?domNodeFirstChild(Control):Control;
    }
    this.action(Control);
  }
}
// expand группы по невидимому элементу внутри нее
ExpandGroup.expandByElement=function(Element) {
  var Control;
  if (Element&&isHidden(Element)) {
    // expand для "самой" группы
    if (Element.getAttribute("data-group-type")=="EXPAND") Element=domNodePrev(Element);
    else {
      // видимый предок с id="groupExpand"
      do {Element=Element.parentNode;} while (Element&&Element.tagName!="DIV"&&Element.id!="groupExpand"&&!isHidden(Element));
      if (Element&&Element.tagName=="DIV") Element=domNodePrev(Element);
    }
    // кнопка управления группой
    if (Element&&Element.tagName=="DIV") Control=domNodeFirstChild(domNodeFirstChild(Element));
    if (Control&&Control.tagName=="A") this.action(Control);
  }
}
/*====================================================================================*/
/*                                      Grid Group                                    */
/*====================================================================================*/
var GridGroup={
  gridClassName   : "grid",           // класс контейнера (TABLE)
//  bgClass         : "gridBG",
//  bgClassSelected : "gridBGSelected",
  dataClass       : "gridData",
  markClass       : "gridCellIndicator",
  markClassSelect : "gridCellIndicatorSelect",
  elRecIdName     : "GRID_REC",
  cntOrder        : null,             // drag-n-drop контейнер строки
  mouseDownAt     : {x:null,y:null},  // стартовые координаты мыши
  curRow          : null,             // выбранная (для перетаскивания строка)
  arrPosTR        : [],               // массив координат {top/bottom} строк грида
  gridBody        : null,             // TBODY грид-таблицы
  gridDragCont    : null,             // drag-контейнер
  gridDragBounds  : null,             // геометрия drag-контейнера
  gridDragHeight  : 0,                // высота drag-контейнера
  firstRowIdx     : 2,
  lastRowIdx      : null
}
//
GridGroup.getContainerByElement=function(Element) {
  var res;
  if (Element) {
    var cnt=domFirstParentByTag(Element,"TABLE");
    if (cnt.className==this.gridClassName) res=cnt;
    else {
      // еще шаг для элементов с table-контейнером
      cnt=domFirstParentByTag(cnt,"TABLE");
      if (cnt.className==this.gridClassName) res=cnt;
    }
  }
  return res;
}
//
GridGroup.getCellByElement=function(Element) {
  var res;
  if (Element) {
    var cnt=domFirstParentByTag(Element,"TD");
    if (!cnt) return null;
    if (cnt.className==this.dataClass) res=cnt;
    else {
      cnt=domFirstParentByTag(cnt,"TD");
      if (cnt.className==this.dataClass) res=cnt;
    }
  }
  return res;
}
// возвращает компонент ячейки
GridGroup.getCellComponent=function(TD) {
  var c;
  if (TD&&TD.tagName=="TD") {
    c=domNodeFirstChild(TD);
    if (c) {
      if (c.tagName!="TEXTAREA") c=Component.getComponentInput(domNodeFirstChild(TD),"FIRST");
    }
  }
  return c;
}

// возвращает компонент ячейки по FIELD_NAME
GridGroup.getRowComponentByName=function(TR,name) {
  var res;
  if (TR&&TR.tagName=="TR") {
    for (var i=0;i<TR.cells.length;i++) {
      var obj=this.getCellComponent(TR.cells[i]);
      if (obj&&obj.name==name) {res=obj; break}
    }
  }
  return res;
}
// возвращает кол-во строк в гриде
GridGroup.getRecCount=function(TABLE) {
  return (TABLE&&TABLE.tagName=="TABLE")?TABLE.rows.length-this.firstRowIdx-1:0;
}
//
GridGroup.getRecId=function(Element) {
  var res=0;
  if (Element&&(Element.tagName=="TR")) {
    var c=Component.getComponentBody(Element.cells[0].firstChild);
    if (c&&(c.name==this.elRecIdName)) res=parseInt(c.value);
  }
  return res;
}
//
GridGroup.getRowByElement=function(Element) {
  var TD=this.getCellByElement(Element);
  return (TD)?domNodeParent(TD):null;
}
// возвращает TABLE грида по ID группы
GridGroup.getTableByGroupId=function(groupId) {
  var res=null;
  var cnt=GroupConfig.getGroupByGroupId(groupId);
  if (cnt) {
    var c=cnt.getElementsByTagName("TABLE");
    if (c) {
      for (var i=0;i<c.length;i++) if (c[i].id==groupId&&c[i].className==this.gridClassName) {res=c[i]; break;}
    }
  }
  return res;
}
GridGroup.getRowByGroupId=function(groupId,rowNum) {
  var res=null;
  rowNum=parseInt(rowNum);
  if (!isNaN(rowNum)) {
    var T=this.getTableByGroupId(groupId);
    if (T) res=T.rows[rowNum+this.firstRowIdx];
  }
  return res;
}
//
GridGroup.focusElement=function(Element) {
  var TABLE; var TR; var TD;
//  if (Element&&Element.tagName=="TR") TR=Element; else TR=domNodeParent(Element,2);
  if (Element&&Element.tagName=="TR") TR=Element; else TR=this.getRowByElement(Element);
  if (TR&&TR.tagName=="TR") {
    TD=TR.cells[0];
    TABLE=domNodeParent(TR,2);
    for (var i=1;i<TABLE.rows.length;i++) TABLE.rows[i].cells[0].className=this.dataClass+" "+this.markClass;
    TD.className=this.dataClass+" "+this.markClassSelect;
    GroupConfig.save(domNodeParent(TR,2).id,"ROW_SELECTED_IDX",parseInt(TR.rowIndex-1));
  }

/*
  if (TR&&(TR.tagName=="TR")&&(TR.className!=this.bgClassSelected)) {
    var tr=TR;
    while(tr){
      tr.className=this.bgClass;
      tr=tr.previousSibling;
    }
    tr=TR;
    while(tr){
      tr.className=this.bgClass;
      tr=tr.nextSibling;
    }
    TR.className=this.bgClassSelected;
    // фиксируем конфигурацию
    GroupConfig.save(domNodeParent(TR,2).id,"ROW_SELECTED_IDX",parseInt(TR.rowIndex-1));
  }
*/

}
// возвращает индекс выбранной строки
GridGroup.getSelectRowIdx=function(tbody) {
  var res=null;
  if (tbody&&(tbody.tagName.toUpperCase()=="TBODY")) {
    for (var i=1;i<tbody.rows.length;i++) {
      var TR=tbody.rows[i];
//      if (TR.className==this.bgClassSelected) {res=i; break;}
      if (TR.cells[0].className.indexOf(this.markClassSelect)>-1) {res=i; break;}
    }
  }
  return res;
}
// возвращает выбранную строку (TR)
GridGroup.getSelectRow=function(tbody) {
  return tbody.rows[this.getSelectRowIdx(tbody)];
}
// добавить строку
// шаблон: формат id: ID*NAME
// addMethod: метод добавления строки: 0/1 - first/last
GridGroup.rowAdd_=function(Control,maxRow,addMethod) {
  var TBL=domNodeParent(Control,4);
  if (TBL&&(TBL.tagName=="TABLE")) {
    // check max rows: ограничение на добавление строк
    if (maxRow>-1&&this.getRecCount(TBL)>=maxRow) return false;
    // добавляем строку
    var focused=false;
    var TM=TBL.rows[1]; // 0-col title, 1-шаблон строки
    var TBD=TBL.getElementsByTagName("tbody")[0];
    var TR;
    // вставка новой строки FIRST/LAST
    var flagFixRow=this.getFixRowFlag(TBD.rows[TBD.rows.length-1]);
    flagFixRow=(flagFixRow.length==0)?this.getFixRowFlag(TBD.rows[0]):flagFixRow;
    var pos=(flagFixRow=="L")?-1:(flagFixRow=="F")?1:0;
    if (addMethod>0) TR=TBD.insertRow(TBD.rows.length+pos); else TR=TBD.insertRow(1+pos);
//    if (addMethod>0) TR=TBD.insertRow(TBD.rows.length-1); else TR=TBD.insertRow(1);
    //
    TR.className=TM.className;
    for (i=0;i<TM.cells.length;i++) {
      var TD=TR.insertCell(i);
      TD.className=TM.cells[i].className+"";
      TD.innerHTML=TM.cells[i].innerHTML;
      TD.title=TM.cells[i].title;
      TD.style.textAlign=TM.cells[i].style.textAlign;
      TD.style.verticalAlign=TM.cells[i].style.verticalAlign;
      TD.style.display=TM.cells[i].style.display;
      TD.onmousedown=TM.cells[i].onmousedown;
      var d=domNodeFirstChild(TD);                                            // элемент или его контейнер
      var c=(Component.isComponent(d))?d:d.getElementsByTagName("INPUT")[0];  // сам элемент или первый input в контейнере
      // установка свойства name, id и focus
      if (c&&(c.id.length>0)&&(c.name.length==0)) {
        var pos=c.id.indexOf("*");
        c.name=(pos>-1)?c.id.substr(pos+1):c.id;
        var pos=c.name.indexOf("#");
        c.name=(pos>-1)?c.name.substr(0,pos):c.name;
        c.id=c.id.substr(0,c.id.indexOf("*"));
        // формат id элемента грида
        if (c.id.length>0) {
          var compData=Component.getData(c.id);
          var idxRow=parseInt(TR.rowIndex-1);
          c.id=Component.prefComp+c.id+"#"+idxRow;  // pref компонента+ # номер строки
//          c.id=Component.prefComp+c.id+"#"+parseInt(TR.rowIndex-1);  // pref компонента+ # номер строки
          // синхронизация id сложных элементов
          //   lookup
          if (compData.type==5) Lookup.setValue(c,c.value);
          //   file load
          if (compData.type==9) fileUploadBlob.changeId(c);
          // combobox
          if (compData.type==12) {
            var tbl=domNodeNext(c);
            if (tbl&&tbl.tagName=="TABLE") {
              var td=tbl.rows[0].cells[0];
              var pos=td.id.indexOf("#");
              if (pos>-1) {
                td.id=td.id.substr(0,pos)+"#"+idxRow;
              }
            }
          }
        }
        if (!focused&&i>0) {
          var e=c;
          e=(isHidden(e))?Component.getDisplayElement(e):e;
          if (e&&!isHidden(e)) {
            e.focus(); focused=true;
            // фиксируем конфигурацию
            GroupConfig.save(TBL.id,"ROW_SELECTED_IDX",parseInt(TR.rowIndex-1));
          }
        }
      }
    }
    // синхронизация зависимых элементов
    for (i=0;i<TR.cells.length;i++) {
      var d=domNodeFirstChild(TR.cells[i]);                                   // элемент или его контейнер
      var c=(Component.isComponent(d))?d:d.getElementsByTagName("INPUT")[0];  // сам элемент или первый input в контейнере
      if (c&&c.getAttribute("data-master")=="1") c.onchange();
    }
    if (!focused) this.focusElement(TR);
    // переводим форму в режим Редактирование
    Form.setEditMode(true);
  }
}

// interface: добавить строку
// шаблон: формат id: ID*NAME
// addMethod: метод добавления строки: 0/1 - first/last
// addRowQty: кол-во добавляемых строк
GridGroup.rowAdd=function(Control,maxRow,addMethod,addRowQty) {
  addRowQty=(addRowQty>0)?parseInt(addRowQty):1;
  var TBL=domNodeParent(Control,4);
  var recCount=this.getRecCount(TBL);
  addRowQty=(recCount==0)?addRowQty:1;
  for (var i=0;i<addRowQty;i++)
    this.rowAdd_(Control,maxRow,addMethod);
}

/*!!!
GridGroup.rowAdd=function(Control) {
  var TBL=domNodeParent(Control,4);
  if (TBL&&(TBL.tagName=="TABLE")) {
    var focused=false;
    var TM=TBL.rows[1]; // 0-col title, 1-шаблон строки
    var TBD=TBL.getElementsByTagName("tbody")[0];
    var TR=TBD.insertRow(TBD.rows.length);
    TR.className=TM.className;
    for (i=0;i<TM.cells.length;i++) {
      var TD=TR.insertCell(i);
      TD.className=TM.cells[i].className+"";
      TD.innerHTML=TM.cells[i].innerHTML;
      TD.title=TM.cells[i].title;
      TD.style.textAlign=TM.cells[i].style.textAlign;
      TD.style.verticalAlign=TM.cells[i].style.verticalAlign;
      TD.onmousedown=TM.cells[i].onmousedown;
//      var c=Component.getComponentBody(domNodeFirstChild(TD));
      var c=domNodeFirstChild(TD);
      // установка свойства name и focus
      if (c&&(c.id.length>0)&&(c.name.length==0)) {
        c.name=c.id.substr(c.id.indexOf("*")+1); c.id=c.id.substr(0,c.id.indexOf("*"));
        if (!focused&&!isHidden(c)) {
          c.focus(); focused=true;
          // фиксируем конфигурацию
          GroupConfig.save(TBL.id,"ROW_SELECTED_IDX",parseInt(TR.rowIndex-1));
        }
      }
    }
    if (!focused) this.focusElement(TR);
  }
}
*/

// возвращает флаг-признак фиксированной строки
GridGroup.getFixRowFlag=function(TR) {
  var res="";
  if (TR) {
    res=TR.cells[0].getAttribute("data-fix-row") ;
    res=(res&&res.length>0)?res:"";
  }
  return res;
}
//
GridGroup.rowDel=function(Control,minRow) {
  var TBL=domNodeParent(Control,4);
  if (TBL&&(TBL.tagName=="TABLE")) {
    // check max rows: ограничение на удаление строк
    if (minRow>-1&&this.getRecCount(TBL)<=minRow) return false;
    // удаляем строку
    var TBD=TBL.getElementsByTagName("tbody")[0];
    var idx=this.getSelectRowIdx(TBD);
    if (idx&&(idx>-1)) {
      var TR=TBD.rows[idx];
      // fix-row не удаляем
      if (this.getFixRowFlag(TR).length==0) {
        // delete
        var recId=this.getRecId(TR);
        TBD.deleteRow(idx);
        TR=TBD.rows[idx];
        if (!TR&&(idx>1)) TR=TBD.rows[idx-1];
        if (TR) this.focusElement(TR);
        if (recId>0) Form.setEditMode(true);
      }
    }
  }
}
// row Up
GridGroup.rowUp=function(Control) {
  var TBL=domNodeParent(Control,4);
  if (TBL&&(TBL.tagName=="TABLE")) {
    var TBD=TBL.getElementsByTagName("tbody")[0];
    var idx=this.getSelectRowIdx(TBD);
    if (idx>1&&idx<TBD.rows.length) {
      var TR=TBD.rows[idx];
      // если выбран не fix-row
      if (this.getFixRowFlag(TR).length==0) {
        TR=TBD.insertBefore(TBD.rows[idx],TBD.rows[idx-1]);
        Form.setEditMode(true);
        GroupConfig.save(TBL.id,"ROW_SELECTED_IDX",parseInt(TR.rowIndex-1));
      }
    }
  }
}
// row Down
GridGroup.rowDown=function(Control) {
  var TBL=domNodeParent(Control,4);
  if (TBL&&(TBL.tagName=="TABLE")) {
    var TBD=TBL.getElementsByTagName("tbody")[0];
    var idx=this.getSelectRowIdx(TBD);
    if (idx>0&&idx<TBD.rows.length-1) {
      var TR=TBD.rows[idx];
      // если выбран не fix-row
      if (this.getFixRowFlag(TR).length==0) {
        TR=TBD.insertBefore(TBD.rows[idx+1],TBD.rows[idx]);
        Form.setEditMode(true);
        GroupConfig.save(TBL.id,"ROW_SELECTED_IDX",TR.rowIndex);
      }
    }
  }
}
// row drag-n-drop, смена положения drag-контейнера: move (mousemove)
GridGroup.rowDragMove=function(ev,isFixed) {
  if (this.arrPosTR.length>0) {
    if (!isFixed) ev=fixMouseEvent(ev);
    this.gridDragCont.style.top=(ev.pageY-this.gridDragHeight)+"px";
  }
}
// row drag-n-drop, завершение перетаскивания - смена положения строки: applay (mouseup)
GridGroup.rowDragStop=function(ev) {
  var row2=null;
  if (this.curRow&&this.gridDragCont&&(this.gridDragCont.style.display=="block")) {
//    var posBottom=parseInt(this.gridDragCont.style.top)+this.gridDragBounds.height;
    var posBottom=getElementRect(this.gridDragCont).bottom;
    var TBL=domNodeParent(this.gridBody);
    if (posBottom<this.arrPosTR[0].top) row2=TBL.rows[this.firstRowIdx];
    else {
      for (var i=0;i<this.arrPosTR.length;i++) 
        if ((posBottom>=this.arrPosTR[i].top)&&(posBottom<=this.arrPosTR[i].bottom)) {
          row2=this.arrPosTR[i].row; break;
        }
    }
    this.gridDragCont.style.display="none";
    this.gridDragHeight=0;
    this.arrPosTR=[];
    this.mouseDownAt={x:null,y:null};
    document.onmousedown=document.onselectstart=null;
    document.onmouseup=null;
    // action
    var TR=this.gridBody.insertBefore(this.curRow,row2);
    Form.setEditMode(true);
    GroupConfig.save(TBL.id,"ROW_SELECTED_IDX",parseInt(TR.rowIndex-1));
  }
}
// row drag-n-drop, активация drag-контейнера: capture (mousedown)
GridGroup.rowDragStart=function(ev,Control) {
  if (Control) {
    ev=fixMouseEvent(ev);
    if (ev.which!=1) return;
    var TBL=domNodeParent(Control,3);
    this.gridBody=TBL.getElementsByTagName("tbody")[0];
    this.mouseDownAt={x:ev.pageX,y:ev.pageY}; // координаты клика
    for (var i=1;i<this.gridBody.rows.length;i++) {
//      var b=getBounds(this.gridBody.rows[i].cells[0]);
//      this.arrPosTR[i-1]={top:b.top,bottom:(b.top+b.height),row:this.gridBody.rows[i]};
      var B=getOffsetRect(this.gridBody.rows[i].cells[0]);
      this.arrPosTR[i-1]={top:B.viewTop,bottom: (B.viewTop+B.height),row:this.gridBody.rows[i]};
    }
    this.curRow=domNodeParent(Control);
    if (this.curRow.tagName!="TR") this.curRow=domNodeParent(Control,2);
    this.focusElement(this.curRow);
    this.gridDragCont=domNodeNext(TBL);
    var txt="";
    for (var i=1;i<this.curRow.cells.length;i++) {
      var cell=this.curRow.cells[i];
      // видимое значение компонента ячейки грида
      if (!isHidden(cell)) {
        var elem=this.getCellComponent(cell);
        elem=Component.getDisplayElement(elem);
        var text=(elem)?elem.value:"";
        txt=txt+"<span style='display:inline-block;text-align:center;width:"+getBounds(cell).width+"px'>"+text+"</span>";
//      txt=txt+"<span style='text-align:center;width:"+getBounds(cell).width+"px'>"+Component.getComponentBody(domNodeFirstChild(cell)).value+"</span>";
      }
    }
    this.gridDragCont.innerHTML="<div>"+txt+"</div>";
    // div-контейнер параметры

//    var cellBounds=getBounds(TBL.rows[0].cells[0]);
//    var cellBounds=getElementRect(TBL.rows[0].cells[0]);

    this.gridDragCont.style.width=getBounds(TBL).width+"px";
    this.gridDragCont.style.top=(this.mouseDownAt.y-5)+"px";
//    this.gridDragCont.style.left=this.mouseDownAt.x+getBounds(TBL.rows[0].cells[0]).width+3; // фиксируем горизонталь
//    this.gridDragCont.style.left=this.mouseDownAt.x+3; // фиксируем горизонталь

//    this.gridDragCont.style.left=(cellBounds.left+3)+"px"; // фиксируем горизонталь
//    this.gridDragCont.style.left="3px"; // фиксируем горизонталь
    this.gridDragCont.style.left=getElementRect(TBL).left+"px"; // фиксируем горизонталь

    this.gridDragCont.style.display="block";
    this.gridDragBounds=getBounds(this.gridDragCont);
    this.gridDragHeight=Math.round(this.gridDragBounds.height/2);
    this.rowDragMove(ev,true);
//    document.onmousemove=function() {GridGroup.rowDragMove(event)};
//    document.onmouseup=function() {GridGroup.rowDragStop(event);}
    document.onmousedown=document.onselectstart=function() {return false}
    document.onmouseup=function() {GridGroup.rowDragStop(event);}
  }
}
// check
// возвращает из столбца, где расположен Element, компонент с Component.classMarker (маркированный)
GridGroup.getClassMarketElement=function(Element) {
  var res;
  var container=this.getContainerByElement(Element);
  if (container) {
    if (container.rows.length>1) {
      var TD=domFirstParentByTag(Element,"TD");
      // с учетом компонентов, имеющих table в своей структуре
//      if (TD&&TD.className==this.dataClass) {} else TD=domFirstParentByTag(TD,"TD");
      TD=(TD&&TD.className==this.dataClass)?TD:domFirstParentByTag(TD,"TD");
      var idx=(TD)?TD.cellIndex:-1;
      if (idx>-1) {
        for (var i=this.firstRowIdx;i<container.rows.length;i++) {
          var TD=container.rows[i].cells[idx];
          if (TD) {
            var e=TD.getElementsByClassName(Component.classMarker)[0];
            if (e) {
              res=e; break;
            }
          }
//          var e=this.getCellComponent(container.rows[i].cells[idx]);
//          if (e&&e.className.indexOf(Component.classMarker)>-1) {res=e;break}
        }
      }
    }
  }
  return res;
}
// возвращает TRUE, если хотя бы один элемент столбца маркирован как Component.classMarker
GridGroup.isClassMarketCol=function(Element) {
  return (this.getClassMarketElement(Element))?true:false;
}

// возвращает массив элементов столбца грида
//  Element: элемент столбца
GridGroup.getColElements=function(Element) {
  var arr=new Array();
  var TD=this.getCellByElement(Element);
  if (TD) {
    var idx=TD.cellIndex;
    var TABLE=domNodeParent(TD,3); // TR,TBODY,TABLE
    if (TABLE&&TABLE.tagName=="TABLE") { 
      var j=0;
      for (var i=this.firstRowIdx;i<TABLE.rows.length-1;i++) {
        var e=this.getCellComponent(TABLE.rows[i].cells[idx]);
        if (e) arr[j++]=e;
      }
    }
  }
  return arr;
}


// возвращает массив значений столбца грида
//  Element: элемент столбца
GridGroup.getColValues=function(Element) {
  var obj;  var arr=new Array();
  var TD=this.getCellByElement(Element);
  if (TD) {
    var idx=TD.cellIndex;
    var TABLE=domNodeParent(TD,3); // TR,TBODY,TABLE
    if (TABLE&&TABLE.tagName=="TABLE") { 
      var j=0;
      for (var i=this.firstRowIdx;i<TABLE.rows.length-1;i++) {
        var e=this.getCellComponent(TABLE.rows[i].cells[idx]);
        if (e) {
          arr[j++]=e.value;
          if (!obj) obj=e;      // фиксируем первый элемент столбца для возврата
        }
      }
    }
  }
  return {colArray:arr,colObject:obj};
}
// уникальность значений столбца
// возвращает TRUE или FALSE если значение элемента неуникально
GridGroup.checkCellUnique=function(Element) {
  var res=true; var obj;
  var TD=this.getCellByElement(Element);
  if (TD) {
    var idx=TD.cellIndex;
    var TABLE=domNodeParent(TD,3); // TR,TBODY,TABLE
    if (TABLE&&TABLE.tagName=="TABLE") { 
      var arr=new Array();
      var j=0;
      for (var i=this.firstRowIdx;i<TABLE.rows.length-1;i++) {
        var e=this.getCellComponent(TABLE.rows[i].cells[idx]);
        if (e) {
          arr[j++]=e.value;
          if (!obj) obj=e;      // фиксируем первый элемент столбца для возврата
        }
      }
      if (!arr.isUnique()) res=false;
    }
  }
  return {isUnique:res, Element:obj};
}


// единственность значения в списке (неуникальных) значений столбца
//   возвращает результат проверки: true/false и ссылку на элемент первой строки столбца
GridGroup.checkColValueUnique=function(Element,value) {
  var res=true; var obj; var count=0;
  var col=this.getColValues(Element);
  var arr=col.colArray;
  if (arr&&arr.length>0) {
    obj=col.colObject; 
    for (var i=0;i<arr.length;i++) {
      count=(arr[i]==value)?count+1:count;
      if (count>1) {
        res=false; break;
      }
    }
  }
  return {result:res,element:obj};
}
// наличие значения в списке значений столбца
//   возвращает результат проверки: true/false и ссылку на элемент первой строки столбца
GridGroup.checkColValueExist=function(Element,value) {
  var res=false; var obj;
  var col=this.getColValues(Element);
  var arr=col.colArray;
  if (arr&&arr.length>0) {
    obj=col.colObject; 
    for (var i=0;i<arr.length;i++) {
      res=(arr[i]==value);
      if (res) break;
    }
  }
  return {result:res,element:obj};
}

// "типовая" по ключам проверка значения столбца
// ключи: E/U - существование/единственность
//   пример вызова:  GridGroup.checkCol(obj,['E','U',...],[7431])
GridGroup.checkCol=function(Element,arrKeys,arrValues) {
  var res={result:true,element:null};
  if (Element&&typeof(arrValues)=="object"&&typeof(arrKeys)=="object") {
    for (var i=0;i<arrKeys.length;i++) {
      // существование
      if (arrKeys[i]=="E"&&res.result) {
        for (var j=0;j<arrValues.length;j++) {
          res=this.checkColValueExist(Element,arrValues[j]);
          if (!res.result) break;
        }
      }
      // единственность
      if (arrKeys[i]=="U"&&res.result) {
        for (var j=0;j<arrValues.length;j++) {
          res=this.checkColValueUnique(Element,arrValues[j]);
          if (!res.result) break;
        }
      }
      if (!res.result) break;
    }
  }
  return res;
}
// возвращает ссылку на строку, содержащую первое значение fieldValue в столбце поля fieldName
GridGroup.getRowByField=function(groupId,fieldName,fieldValue) {

//alert(groupId+"/"+fieldName+"/"+fieldValue);

   return true;
}

/*====================================================================================*/
/*                             Grid Query Group                                       */
/*====================================================================================*/
var GridGroupQuery = {
  gridId             : null,
  groupId            : null,
  Container          : null,
  TableData          : null,
  prefGridId         : "gridSql_",
  orderClassNameNone : "orderNone",
  orderClassNameAsc  : "orderAsc",
  orderClassNameDesc : "orderDesc",
  colorBGselected    : "#ffffb0",           // global_data.colorBGselected  (yellow)
  colorBGselected2   : "#d2faff",           // global_data.colorBGselected2 (blue)
  colorBGmarked      : "#FFFFDC",           // key scroll marker
  btnRefreshName     : "BUTTON_REFRESH",
  msCheckedOnly      : "GRID_CHECKED_ONLY", // мультивыбор: режим - показать только выбранные
  headRowCount       : 0,
  recordCount        : 0,
  curRecId           : -1,
  curRow             : null
}

/********************************************************************************************************************/
/*** ELEMENTS ***/

// DIV CONTAINER BY GROUP
GridGroupQuery.getGridContainerByGroup=function(Group) {
  Group=(typeof(Group)=="object")?Group:GroupConfig.getGroupByGroupId(Group);
  if (Group) return Group.getElementsByClassName("gridSQLContainer")[0];
}
// DIV CONTAINER
GridGroupQuery.getGridContainer=function(TableData) {
  return domNodeParent(TableData,2);
}
// возвращает ссылку на TableData в ответ на GroupId
GridGroupQuery.getTableDataByGroup=function(groupId) {
  var TableData;
  var C=this.getGridContainerByGroup(groupId);
  if (C) {
    var TableHead=this.getTableHead(C);
    var DivData=domNodeNext(TableHead);       // DIV: class=dataContainer
    TableData=domNodeFirstChild(DivData);
  }
  return TableData;
}
// TableHead by Container
GridGroupQuery.getTableHead=function(Container) {
  if (Container) return domNodeNext(domNodeNext(domNodeFirstChild(Container))); // TABLE: class=bandContainer
}
// TableHead by TableData
GridGroupQuery.getTableHeadByData=function(TableData) {
  if (TableData&&TableData.tagName=="TABLE") return domNodePrev(domNodeParent(TableData));
}
// TableData by TableHead
GridGroupQuery.getTableData=function(TableHead) {
  var res;
  if (TableHead&&TableHead.tagName=="TABLE") { 
    var TableData=domNodeFirstChild(domNodeNext(TableHead));
    res=(TableData&&TableData.tagName=="TABLE")?TableData:null;
  }
  return res;
}
// возвращает THEAD by TableData
GridGroupQuery.getTHead=function(TableData) {
  return (TableData&&TableData.tagName=="TABLE")?TableData.getElementsByTagName("THEAD")[0]:null;
}
// filter row by TableData
GridGroupQuery.getFilterRow=function(TableData) {
  var res;
  var H=this.getTHead(TableData);
  if (H.rows.length>1) {
//    res=H.rows[2];
    res=H.rows[H.rows.length/2];
    res=(res&&res.className.indexOf("filter")>-1)?res:null;
  }
  return res;
}
// мультивыбор: возвращает ссылку на checkbox ALL
GridGroupQuery.getCheckBoxAll=function(TableData) {
  var res;
  if (TableData&&TableData.tagName=="TABLE") res=TableData.rows[0].cells[0].getElementsByTagName("A")[0];
  return (res&&res.tagName=="A")?res:null;
}
// возвращает ссылку на элемент панели управления
GridGroupQuery.getControlById=function(TableHead,elementId) {
  var res;
  if (TableHead&&TableHead.tagName=="TABLE") {
    var collect=TableHead.rows[0].cells[0].getElementsByTagName("A");
    for (key in collect) {if (collect[key].id==elementId) {res=collect[key]; break;}}
  }
  return res;
}
// возвращает ссылку на элемент панели управления
GridGroupQuery.getControlByGroup=function(group,elementId) {
  var cnt=this.getGridContainerByGroup(group);
  return this.getControlById(this.getTableHead(cnt),elementId);
}
// возвращает ссылки на контейнеры счетчиков: кол-во записей/выбранных записей
GridGroupQuery.getTotalElements=function(TableHead) {
  var recCountBox; var recSelectBox;
  if (TableHead&&TableHead.tagName=="TABLE") {
    var collect=TableHead.rows[0].cells[0].getElementsByTagName("SPAN");
    for (key in collect) {
      if (!recCountBox)  recCountBox=(collect[key].id=="gridRecCount")?collect[key]:recCountBox;
      if (!recSelectBox) recSelectBox=(collect[key].id=="gridRecSelect")?collect[key]:recSelectBox;
    }
  }
  return {recCountBox:recCountBox,recSelectBox:recSelectBox}
}
// маркировка кнопки Refsresh
GridGroupQuery.setButtonRefreshMark=function(TableData,flag) {
  if (TableData) {
    var TableHead=this.getTableHeadByData(TableData);
    var btn=this.getControlById(TableHead,this.btnRefreshName);
    if (btn) {
/*      if (flag) btn.style.borderColor="#00FF40"; else btn.style.borderColor="";*/
/*      if (flag) btn.style.borderColor="#70FFFF"; else btn.style.borderColor="";*/
      if (flag) btn.style.boxShadow="0px 0px 10px yellow"; else btn.style.boxShadow="none";
    }
  }
}

/********************************************************************************************************************/
/*** CONFIG ***/

// STORE config
GridGroupQuery.configStore=function(TableData,groupId,filerParam,orderParam,checkParam,curRecId,curRecNum,action) {
  if (typeof(parent.Container)=="object") {
    // сохранение конфигурации грида
    parent.GridSqlStore.store(groupId,filerParam,orderParam,checkParam,curRecId,curRecNum);
    // регистрация конфигурации группы
    action=(action)?true:false;
    parent.Container.regFormFocus(Form.formId,Form.recId,groupId,"BUTTON_REFRESH","",action);
  }
}
GridGroupQuery.toConfigStore=function(curRecId,curRecNum,action) {
  this.configStore(
    this.TableData,
    this.groupId,
    this.getFilterParam(this.TableData).join(";"),
    this.getOrderParam(this.TableData).join(";"),
    "",   // checkParam,
    curRecId,
    curRecNum,
    action
  );
}
// RESTORE config
GridGroupQuery.configRestore=function(TableData,groupId) {
  var res=false;
  if (typeof(parent.Container)=="object") {
    var conf=parent.GridSqlStore.restore(groupId);
    if (conf==null) {
      // из строки параметров url контейнера
      var url=window.parent.location.search+"";
      url=decodeURIComponent(url.substr(url.indexOf("&tag=")+5));
      parent.GridSqlStore.byString(url);
      conf=parent.GridSqlStore.restore(groupId);
    }
    if (conf!=null) {
      res=true;
      this.curRecId=(conf.focusRecId>0)?conf.focusRecId:-1;
      this.setFilterParam(TableData,conf.filter);
    }
  }
  return res;
}

/********************************************************************************************************************/
/*** FUNCTION ***/

// возвращает GROUP_ID из GRID_ID
GridGroupQuery.getGroupId=function(gridId) {
  return (gridId.indexOf(this.prefGridId)>-1)?gridId.replace(this.prefGridId,""):gridId;
}
// кол-во title-строк
GridGroupQuery.getHeadRowCount=function(TableData) {
  var H=this.getTHead(TableData);
  return (H)?H.rows.length:0;
}
// кол-во строк
GridGroupQuery.getRecordCount=function(TableData) {
//  var H=this.getTHead(TableData);
//  this.headRowCount=H.rows.length;
  this.headRowCount=this.getHeadRowCount(TableData);
  this.recordCount=TableData.rows.length-this.headRowCount;
  return this.recordCount;
}
// возвращает кол-во выбранных записей
GridGroupQuery.getRecCheckedCount=function(TableData,BoxResult) {
  var res=0;
//  if (!BoxResult&&TableData&&TableData.tagName=="TABLE") BoxResult=domNodeNext(this.getGridContainer(TableData));
//  if (BoxResult) res=BoxResult.value.split(";").length-1;
  var idx=this.getHeadRowCount(TableData);
  for (var i=idx;i<TableData.rows.length;i++) {
    var A=TableData.rows[i].cells[0].getElementsByTagName("A")[0];
    res=(Checkbox.getState(A)==1)?res+1:res;
  }
  return res;
}
// null-не актуализируем
GridGroupQuery.setTotal=function(TableHead,recCount,recSelect) {
  var total=this.getTotalElements(TableHead);
  if (recCount!=null&&total.recCountBox) total.recCountBox.innerHTML=(recCount>-1)?recCount:0;
  if (recSelect!=null&&total.recSelectBox) total.recSelectBox.innerHTML=(recSelect>-1)?recSelect:0;
}
// возвращает значения счетчиков: кол-во записей/выбранных записей
GridGroupQuery.getTotal=function(TableHead) {
  var recCount; var recSelect;
  var total=this.getTotalElements(TableHead);
  recCount=(total.recCountBox)?total.recCountBox.innerHTML:0;
  recSelect=(total.recSelectBox)?total.recSelectBox.innerHTML:null;
  return {recCount:parseInt(recCount),recSelect:parseInt(recSelect)}
}
// возвращает id-записи из строки
GridGroupQuery.getRecId=function(tr,td) {
  td=(td&&td.tagName=="TD")?td:tr.cells[0];
  if (td) return td.getAttribute("data-rec-id");
  else return "";
}

//!!!
// возвращает id-записи из строки
GridGroupQuery.getCellText=function(tr,cellIdx) {
  var res="";
  if (tr&&tr.tagName=="TR"&&cellIdx>0) res=tr.cells[cellIdx].innerHTML;
  return res;
}

/********************************************************************************************************************/
/*** OPERATION ***/

// управление режимом WAIT
GridGroupQuery.setWaitMode=function(TableData,flag) {
  if (TableData&&TableData.tagName=="TABLE") {  
    var CNT=this.getGridContainer(TableData);
    if (CNT) {
      var classCNT=CNT.className;
      var isWait=(classCNT.indexOf("gridSQLwait")>-1);
      if (flag&&!isWait) CNT.className=classCNT+" gridSQLwait";
      if (!flag&&isWait) CNT.className=classCNT.replace(" gridSQLwait","");
    }
  }
}
// REC POS: позиционирование на запись
GridGroupQuery.setRecPosition=function(recId) {
  var TR;
  if (recId>0&&this.recordCount>0) {
    var TD=document.getElementById(this.gridId+"_"+recId);
    if (TD&&TD.tagName=="TD") {
      this.rowSelect(domNodeParent(TD),recId);
      TR=domNodeParent(TD);
      if (TR.rowIndex>10) domNodeParent(TR,2).rows[TR.rowIndex-9].scrollIntoView();
    }
  }
  return TR;
}
// mark rec: отметка о выборе
GridGroupQuery.rowSelect=function(tr,recId) {
  if (tr&&tr.tagName=="TR") {
    for (var i=0;i<tr.cells.length;i++) tr.cells[i].className="selected";
//    for (var i=0;i<tr.cells.length;i++) tr.cells[i].className="marked";
    this.curRecId=recId;
    this.curRow=tr;
  }
}
// mark rec conf store: отметка о выборе с сохранением конфигурации
GridGroupQuery.recordSelect=function(ev,tr) {
  if (tr&&tr.tagName=="TR") {
    // отмена предыдущего выделения
    if (this.curRecId>0&&this.curRow)
      for (var i=0;i<this.curRow.cells.length;i++) this.curRow.cells[i].className="";
    //
    var td=tr.cells[0];
    this.curRecId=this.getRecId(null,td);
    this.rowSelect(tr,this.curRecId);
    this.toConfigStore(this.curRecId,tr.rowIndex-this.headRowCount,true);
  }
}

// multiselect: elements
GridGroupQuery.gridElements=function(TableData) {
  var TableHead; var DivContainer; var BoxResult;
  if (TableData&&TableData.tagName=="TABLE") {
    TableHead=domNodePrev(domNodeParent(TableData));
    DivContainer=this.getGridContainer(TableData);
    BoxResult=domNodeNext(DivContainer);                // result-box сразу за контейнером
  }
  return {Container:DivContainer,TableData:TableData,TableHead:TableHead,BoxResult:BoxResult}
}
// multiselect: выбрать/отменить выбор записи
GridGroupQuery.checkRec=function(ev,Control) {
  if (Control&&Control.tagName=="A") {
    var newState=Checkbox.getState(Control);
    var TR=domNodeParent(Control,3);
    var E=this.gridElements(domNodeParent(TR,2));
    if (!E.TableData) return false;
    var TD=domNodeParent(Control,2);
    var resultId=this.getRecId(null,TD)+";"
    var pos=E.BoxResult.value.indexOf(resultId);
    // добавляем id
    if (newState=="1"&&pos<0)  E.BoxResult.value=E.BoxResult.value+resultId;
    if (newState=="0"&&pos>-1) E.BoxResult.value=E.BoxResult.value.substr(0,pos)+E.BoxResult.value.substr(pos+resultId.length);
// кол-во выбранных записей по MS_RESULT_BOX
//    var recCheckedCount=Result.value.split(";").length-1;
    // total
    var stat=this.getTotal(E.TableHead);
    key=(newState>0)?1:-1;
    stat.recSelect=stat.recSelect+key;
    stat.recSelect=(stat.recSelect<0)?0:(stat.recSelect>stat.recCount)?stat.recCount:stat.recSelect;
    this.setTotal(E.TableHead,null,stat.recSelect);
    // реакция на "последний" check
    var res=stat.recCount-stat.recSelect;
    var sync=(newState==0&&res>0)?true:(newState==1&&res<1)?true:false;
    if (sync) Checkbox.changeState(ev,this.getCheckBoxAll(E.TableData),newState);
  }
}
//  multiselect: выбрать/отменить все
GridGroupQuery.checkAll=function(ev,Control) {
  var resultString="";
  if (Control) {
    var newState=(Control.className==Checkbox.checkedClassName)?1:0;
    var E=this.gridElements(domNodeParent(Control,5));
    if (E.TableData) {
      var recCount=this.getRecordCount(E.TableData);
      var idxFirst=E.TableData.rows.length-recCount;
      for (var i=idxFirst;i<E.TableData.rows.length;i++) {
        var TD=E.TableData.rows[i].cells[0];
        c=TD.getElementsByTagName("A")[0];
        if (c) {
          Checkbox.changeState(ev,c,newState);
          if (newState==1&&TD.id.length>0) resultString=resultString+this.getRecId(null,TD)+";";
        }
      }
      // фиксируем результат
      if (newState==1) E.BoxResult.value=resultString; else E.BoxResult.value="";
      this.setTotal(E.TableHead,null,(newState==1)?recCount:0);
    }
  }
}
// multiselect: возвращает строку мультивыбора
//   результат мультивыбора фиксируем в INPUT name==MULTI_SELECT:<GROUP_ID>, формат: REC_ID1;REC_ID2;..REC_IDN;
//   Control-элемент панели управления
//   isCancelMode: true/false - режим отмены выбора после регистрации
GridGroupQuery.getMultiselectResult=function(Control,TableData,isCancelMode) {
  var res=""; var sep=Form.separator3;
  if (Control||TableData) {
    if (!TableData) TableData=this.getTableData(domNodeParent(Control,4));
    if (TableData) {
      var recCount=this.getRecordCount(TableData);
      var idxFirst=TableData.rows.length-recCount;
      for (var i=idxFirst;i<TableData.rows.length;i++) {
        var TD=TableData.rows[i].cells[0];
        var ControlTD=domNodeNext(domNodeFirstChild(domNodeFirstChild(TD)));
        if (ControlTD&&ControlTD.tagName=="A"&&Checkbox.getState(ControlTD)==1&&TD.id.length>0) {
          res=res+this.getRecId(null,TD)+sep;
          if (isCancelMode) {
            Checkbox.changeState(null,ControlTD,0);
            this.checkRec(null,ControlTD);
          }
        }
      }
    }
  }
  if (res.length==0) Form.mess(114);
  return res;
}

/********************************************************************************************************************/
/*** GEOMETRY ***/
// для автовыравнивания: копия строки - fixed
GridGroupQuery.createCopyTR=function(Table,sourceTR,newIndex,gridHeight) {
  if (Table&&sourceTR) {
    var TR=Table.rows[newIndex];
    var cls=TR.className;
    var isNew=(cls.indexOf("absolute")<0);
    if (isNew) {
      TR=Table.insertRow(newIndex);
      TR.className=sourceTR.className+" absolute";
    }
    // copy cells
    for (var i=0;i<sourceTR.cells.length;i++) {
      var sourceTD=sourceTR.cells[i];
      if (isNew) {
        var td=TR.insertCell(i);
        td.innerHTML=sourceTD.innerHTML;
        td.id=sourceTD.id;
        td.align=sourceTD.align;
        td.style.paddingLeft=0;
        td.style.paddingRight=0;
        td.style.paddingTop="2px";
        td.style.paddingBottom=0;
      } else {
        var td=TR.cells[i];
      }
      var w=getElementRect(sourceTD).width-parseInt(getElementComputedStyle(sourceTD,"border-right-width"));
      td.style.width=w+"px";
      td.style.minWidth=td.style.width;
    }
    if (isNew) {
//     TR.className=sourceTR.className+" absolute";
/*     TR.style.height=getElementRect(sourceTR).height+"px";*/
      sourceTR.style.visibility="hidden";
      if (sourceTR.id.length>0) {
        TR.id=sourceTR.id;
        sourceTR.id="";
        TR.onkeypress=sourceTR.onkeypress;
     }
//      var r=getElementRect(Table);
//      TR.style.left=r.left+"px";
//    TR.style.top=r.top-1+"px";
    }
  }
  return TR;
}

/*** INITIALIZATION ***/

GridGroupQuery.init=function(groupId,isAutoFocus,modeFrameResize) {
  modeFrameResize=(modeFrameResize==-1)?false:true;
  this.groupId=groupId;
  this.gridId=this.prefGridId+this.groupId;
  var Group=GroupConfig.getGroupByGroupId(this.groupId);
  if (Group) this.Container=this.getGridContainerByGroup(Group);
  else this.Container=domNodeParent(document.getElementById(this.gridId));
  if (!this.Container) return false;
  var TableHead=this.getTableHead(this.Container);
  var DivData=domNodeNext(TableHead);               // DIV: class=dataContainer
  this.TableData=domNodeFirstChild(DivData);
  if (!this.TableData) return;

/*** 26.11.2014
  // корректировка ширины фрейма
  var frame=window.frameElement;;
  if (frame) {
    var frameRect=getElementRect(frame);
    frame.style.width="";
    if (DivData.scrollWidth>10) frame.style.width=(frameRect.width+DivData.scrollWidth-parseInt(DivData.clientWidth))+"px";
  }
***/

  //
  var attributeSizeY=DivData.getAttribute("data-size-y");
  attributeSizeY=(attributeSizeY)?attributeSizeY:"";
  if (attributeSizeY=="100%"&&modeFrameResize)  {
    parent.Container.resizeGroupId=groupId;
    var frameSize=parent.Container.size(0);
    this.Container.style.height=(parseInt(frameSize.frameHeight)-offsetPosition(DivData).top-20)+"px";
  }

  // ширина не задана
//  var gridWidth=this.Container.getAttribute("data-width");
//  if (gridWidth.length==0) this.Container.style.width=getElementRect(this.Container).width+"px";
//
//  this.TableData.style.width=parseInt(getBounds(this.TableData).width-1)+"px";

  // fix head
  var H=this.TableData.getElementsByTagName("THEAD")[0];
  var arr=H.getElementsByClassName("title");
  var titleTR=arr[arr.length-1];
  if (!titleTR) return;
//  if (!isHidden(titleTR)||attributeSizeY=="100%") {
  if (!isHidden(titleTR)||parseInt(attributeSizeY)>0) {
    titleTR=this.createCopyTR(H,titleTR,0,attributeSizeY);
    var arr=H.getElementsByClassName("filter");
    var filterTR=arr[arr.length-1];
    if (filterTR) filterTR=this.createCopyTR(H,filterTR, filterTR.rowIndex-arr.length+1,attributeSizeY);

    // коррекция top-позиции панели управления
    var top=getElementComputedStyle(titleTR,"top");
    if (parseInt(top)<0) {
      titleTR.style.top=(getElementRect(DivData).top-2)+"px";
      if (filterTR) filterTR.style.top=(getElementRect(titleTR).bottom-2)+"px";
    }
  }
  // статистика/ мультивыбор
  this.getRecordCount(this.TableData);
  var recSelect=this.getRecCheckedCount(this.TableData);
  recSelect=(recSelect>this.recordCount)?this.recordCount:recSelect;
  this.setTotal(TableHead,this.recordCount,recSelect);
  // checkbox "ВСЕ" set default
  var checkBoxAll=this.getCheckBoxAll(this.TableData);
  var isCheckAll=(this.recordCount>0&&this.recordCount==recSelect)?1:0;
  if (checkBoxAll) Checkbox.changeState(null,checkBoxAll,isCheckAll);

  // подчеркивание последней строки
//  if (this.recordCount>0) {
//    var tr=this.TableData.rows[this.TableData.rows.length-1];
//    for (var i=0;i<tr.cells.length;i++) tr.cells[i].className="lastRow";
//  }

  // восстановление конфигурации
  var curTR;
  if (this.configRestore(this.TableData,this.groupId)) curTR=this.setRecPosition(this.curRecId);
  this.setWaitMode(this.TableData,false);
  // фокус
  if (this.recordCount>0) {
    isAutoFocus=parseInt(isAutoFocus);
    isAutoFocus=(isNaN(isAutoFocus))?1:isAutoFocus;
    isAutoFocus=(isAutoFocus==1);
    curTR=(curTR)?curTR:this.TableData.rows[this.headRowCount];
    if (isAutoFocus) this.keyStep(null,curTR,curTR.rowIndex);
  }
  else {
    // фокус на элемент фильтр-панели
    if (filterTR) {
     var collect=filterTR.getElementsByTagName("INPUT");
      for (var key in collect) {
        var e=collect[key];
        if (e&&!isHidden(e)&&!e.readonly) {
          e.focus(); break;
        }
      }
    }
  }
}

GridGroupQuery.reorderCell=function() {

}
GridGroupQuery.reorderStop=function() {

}

// сортировка
GridGroupQuery.order=function(ev,Control) {
  // тип сортировки: 1/0 - single-/multi- cols
  var typeOrder=0;
  //
  if (typeOrder==1) {
    var mode=(Control.className==this.orderClassNameNone||Control.className==this.orderClassNameDesc)?this.orderClassNameAsc:this.orderClassNameDesc;
  } else {
    var mode=(Control.className==this.orderClassNameNone)?this.orderClassNameAsc:(Control.className==this.orderClassNameAsc)?this.orderClassNameDesc:(Control.className==this.orderClassNameDesc)?this.orderClassNameNone:this.orderClassNameNone;
  }
  var TR=domNodeParent(Control,6);
  if (typeOrder==1&&TR&&TR.tagName=="TR") {
    // колонку № игнорируем
    for (var i=1;i<TR.cells.length;i++) {
      var TABLE=domNodeFirstChild(TR.cells[i]);
      if (TABLE&&TABLE.tagName=="TABLE") {
        domNodeFirstChild(TABLE.rows[0].cells[1]).className=this.orderClassNameNone;
      }
    }
  }
  // отметим кнопку REFRESH
  this.setButtonRefreshMark(domFirstParentByTag(TR,"TABLE"),true);
  //
  Control.className=mode;
}

GridGroupQuery.orderKeyPressed=function(ev,Control) {
  ev=ev||window.event;
  if (ev.keyCode==32 && Control && Control.tagName=="A") {
      Control.click();
  }
}

/*** REFRESH ***/
// показать данные: callback для load
GridGroupQuery.show=function(data) {
  var pos=data.indexOf(Form.separator1);
  if (pos>-1) {
    var gridId=data.substr(0,pos);
    var cnt=document.getElementById(gridId);
    if (cnt) {
      cnt.innerHTML=data.substr(pos+1);
      this.init(this.getGroupId(gridId));
    }
  }
  document.body.style.cursor="default";
}
// перезагрузка грида
//   operation - тип операции: GRID_CHECKED_ONLY (msCheckedOnly)
GridGroupQuery.reload=function(TableData,groupId,operation) {
  if (groupId>0) {
    document.body.style.cursor="wait";
    this.setButtonRefreshMark(TableData,false);
    this.setWaitMode(TableData,true);
    var sep=Form.separator1;
    var cnt=this.getGridContainer(TableData);
    var gridId=this.prefGridId+groupId;
    var formId=cnt.getAttribute("data-form-id");
    formId=(formId>0)?formId:Form.formId;
//    var formId=Form.formId||"";
    var recId=Form.recId||"";
    // тип операции
    operation=(typeof(operation)=="string")?operation:"";
    var setting=sep+formId+sep+recId+sep+operation;
    var tag=TagVar.getString(Form.separator1);
    setting=(tag.length>0)?setting+tag:setting+sep;
    // фильтр
    var filerParam=this.getFilterParam(TableData).join(";");
    // сортировка
    var orderParam=this.getOrderParam(TableData).join(";");
    // CONFIG STORE: сохранить конфигурацию (контейнер: id,filter,order,focusRecId,focusRecNum)
    var action=(filerParam.length>0&&operation!=this.msCheckedOnly);
    this.configStore(TableData,groupId,filerParam,orderParam,null,this.curRecId,-1);
    // для режима "Показать только мультивыбранные" контекст поиска не нужен
    filerParam=(operation==this.msCheckedOnly)?"":filerParam;
    // вызов
    var url=Form.actOra+"?proc=GRID"+"&func="+gridId+"&param="+Form.separator3+orderParam+Form.separator3+filerParam+"&setting="+setting+"&userid="+Form.sessionId+"&random="+Math.random().toString();
//alert(url); toClipboard(url); return false;
//    queryXmlHttp(url,'GET',1,parent.Process.checkConnectDialog);
    // ссылка на контейнер (из фреймов)
    var CNT;
    if (typeof(parent.Process)=="object") CNT=parent;
    else {
      if (typeof(parent.parent.Process)=="object") CNT=parent.parent;
      else CNT=parent.parent.parent;
    }
    queryXmlHttp(url,'GET',1,CNT.Process.checkConnectDialog);   // с функцией обработки ошибок (проверка связи)
  }
}
// сервер-вызов на BUTTON CLICK (grid refresh)
GridGroupQuery.load=function(ev,btn) {
  if (btn) {
    var TableHead=domNodeParent(btn,4);
    var TableData=domNodeFirstChild(domNodeNext(TableHead));
    var gridId=btn.getAttribute("data-value");
//    var groupId=(gridId.indexOf(this.prefGridId)>-1)?gridId.replace(this.prefGridId,""):gridId;
    var groupId=this.getGroupId(gridId);
    var operation="";
    if (btn.id.length>0) {
      operation=(btn.id==this.msCheckedOnly)?btn.id:"";
    }
    this.reload(TableData,groupId,operation);
  }
}
// grid refresh (на GROUP_ID)
//   groupId: ID группы
GridGroupQuery.refresh=function(ev,groupId) {
  if (groupId>0) {
    var TableData=this.getTableDataByGroup(groupId);
    if (TableData)  this.reload(TableData,groupId);
  }
}

/************************************************************************************************/
/*** CONTROL PANEL ***/
// возвращает массив переменных для формирования поиск-контекста
GridGroupQuery.getFilterParam=function(TableData) {
  var arr=[];
  var row=this.getFilterRow(TableData);
  if (row) {
    arr[0]="";
    for (var i=1; i<row.cells.length; i++) {
      var obj=Component.getComponentInput(row.cells[i],"FIRST");
      if (obj) {
        var val=Component.getValue(obj,"VALUE");
        arr[i]="";
        if (val!=null&&val.length>0) {
          var dataType=row.cells[i].getAttribute("data-type");
          if (dataType!="DATE") val=Component.getNativeValue(val,dataType,row.cells[i].getAttribute("data-format"));
        }
        // очистка
        val=(val==Form.separator3)?"":val;
        val=(val==null)?"":val+"";
        val=val.replace(/;/g," ");
        val=encodeURIComponent(val); // для GET-отправки
        arr[i]=val;
//        arr[i]=Component.getNativeValue(val,row.cells[i].getAttribute("data-type"),row.cells[i].getAttribute("data-format"));
      }
    }
  }
  return arr;
}
// устанавливает значения фильтра
//   param format: из getFilterParam
GridGroupQuery.setFilterParam=function(TableData,param) {
  param=(param)?param+"":"";
  if (param.length==0) return false;
  var row=this.getFilterRow(TableData);
  if (row) {
    var arr=param.split(";");
    // без ячейки-нумератора
    for (var i=1; i<row.cells.length; i++) {
      var obj=Component.getComponentInput(row.cells[i],"FIRST");
      if (obj) {
        var val=decodeURIComponent(arr[i]);
        val=(val&&val!=null)?val:"";
//          var dataType=row.cells[i].getAttribute("data-type");
        Component.setValue(obj,val);
      }
    }
  }
}
// очищает значения фильтра
GridGroupQuery.clearFilterParam=function(ev,btn) {
  var flag=true;
  if (btn) {
    var TableHead=domNodeParent(btn,4);
    var TableData=domNodeFirstChild(domNodeNext(TableHead));
    var row=this.getFilterRow(TableData);
    if (row) {
      // без ячейки-нумератора
      for (var i=1; i<row.cells.length; i++) {
        var obj=Component.getComponentInput(row.cells[i],"FIRST");
        if (obj) {
          Component.setValue(obj,"");
          // установка фокуса на первый компонент фильтра
          if (flag&&!isHidden(obj)) {
            flag=false;
            obj.focus();
          }
        }
      }
    }
  }
}
// возвращает массив ключей сортировки (параметр в img) для каждой ячейки
//   формат: <field_N:M>
GridGroupQuery.getOrderParam=function(TableData) {
  var arr=[];
  var row=this.getTHead(TableData).rows[0];
  arr[0]="0:0";
  for (var i=1; i<row.cells.length; i++) {
    var TABLE=domNodeFirstChild(row.cells[i]);
    if (TABLE&&TABLE.tagName=="TABLE") {
      var order=-1;
      var node=domNodeFirstChild(TABLE.rows[0].cells[1]);
      if (node) {
        var res=node.className;
        order=(res==this.orderClassNameNone)?0:
              (res==this.orderClassNameAsc)?1:
              (res==this.orderClassNameDesc)?2:
              -1;
      }
      arr[i]=row.cells[i].id+":"+order;
    }
  }
  return arr;
}

/************************************************************************************************/
/*** ACTION ***/
// callback для акции с параметрами мультивыбора
//   text: @RESULT_CODE@GROUP_ID@FORM_ID@
function callbackMultiselectResult(text) {
  var sep=Form.separator1;
  if (text&&text.length>0) {
    text=csvFormat(text,sep);
    var arr=getCsvArr(text,sep);
    if (arr.length>0) {
      if (arr[0]>0) Form.mess(arr[0]);          // error: message error code
      else {
        GridGroupQuery.refresh(null,arr[1]);    //  grid refresh, параметр GROUP_ID
        if (arr[0]!==0) Message.text(arr[0]);
      }
    }
  }
}
// асинхронная акция с параметрами мультивыбора
GridGroupQuery.multiselectResult=function(Control,gridGroupId) {
  var groupId=(gridGroupId>0)?gridGroupId:-1;
  var TableData=this.getTableDataByGroup(groupId);
  var res=this.getMultiselectResult(Control,TableData,true);
  if (res.length>0) {
    var pls=Control.getAttribute("data-buffer");  // pls-handler name
    if (pls&&pls.length>0) {
      var cbFuncName="callbackMultiselectResult";
      // group_id для grid-refresh callback
      groupId=(groupId>0)?groupId:GroupConfig.getGroupNumByElement(Control);
      groupId=(groupId==null)?"":groupId;
      // contorl_item_id - id элемента управления как инициатора акции
      var id=parseInt(Control.id);
      id=(isNaN(id))?"":id;
      // REC_ID формы
      var recId=Form.recId||"";
      //  ACTION: GROUP_ID, FORM_ID, CONTROL_PANEL_ITEM_ID, REC_ID
      var proc="ACTION"+Form.separator1+groupId+Form.separator1+Form.formId+Form.separator1+id+Form.separator1+recId+Form.separator1;
      var url=Form.actOra+"?proc="+proc+"&func="+cbFuncName+"&param="+res+"&setting="+pls+"&userid="+Form.sessionId+"&random="+Math.random().toString();
//alert(url); toClipboard(url); return false;
      queryXmlHttp(url,'GET',0);
    }
  }
}
//!!!  multiselectResult+param: тип акции - sync
// синхронная акция с параметрами мультивыбора
GridGroupQuery.multiAction=function(Control,gridGroupId) {
  var groupId=(gridGroupId>0)?gridGroupId:-1;
  var TableData=this.getTableDataByGroup(groupId);
  var res=this.getMultiselectResult(Control,TableData);
  if (res.length>0) {
    var pls=Control.getAttribute("data-buffer");  // pls-handler name
    if (pls&&pls.length>0) {
      // group_id
      groupId=(groupId>0)?groupId:GroupConfig.getGroupNumByElement(Control);
      groupId=(groupId==null)?"":groupId;
      // contorl_item_id - id элемента управления как инициатора акции
      var id=parseInt(Control.id);
      id=(isNaN(id))?"":id;
      // REC_ID формы
      var recId=Form.recId||"";
      // ACTION: GROUP_ID, FORM_ID, CONTROL_PANEL_ITEM_ID, REC_ID
      var proc="ACTION"+Form.separator1+groupId+Form.separator1+Form.formId+Form.separator1+id+Form.separator1+recId+Form.separator1;
      // POST ACTION
      if (Control.getAttribute("data-form-method")=="POST") {
        Form.actionSync(proc,"",res,pls);
      }
      else {
        // GET ACTION
        var url=Form.actOra+"?proc="+proc+"&func="+"&param="+res+"&setting="+pls+"&userid="+Form.sessionId+"&random="+Math.random().toString();
        var C=document.getElementById("actionControl");
//alert(url); toClipboard(url); return false;
        if (C&&C.tagName=="A") {C.href=url; C.click();}
      }
    }  
  }
}
// асинхронная акция с параметрами мультивыбора и сообщением с подтверждением
GridGroupQuery.multiActionConfirm=function(Control,gridGroupId,messId) {
  if (gridGroupId+messId>0 && confirm(arrFormMessage[messId])) {
    GridGroupQuery.multiselectResult(Control,gridGroupId);
  }
}
// Enter Action
GridGroupQuery.keyFilterPanel=function(ev,element) {
  if (element) {
    ev=ev||window.event;
    if (ev.keyCode==13) {
      if (element&&element.tagName=="TR") {
        var TableHead=domNodePrev(domNodeParent(element,3));
        var btn=this.getControlById(TableHead,this.btnRefreshName);
        if (btn&&btn.tagName=="A") btn.click();
      }
    }
  }
}

/************************************************************************************************/
/*** NAVIGATOR ***/
// позиционирование на строку idx (+1/-1 : next/prev)
GridGroupQuery.keyStep=function(ev,TR,idx) {
  var tr;
  switch (idx) {
    case  1: tr=domNodeNext(TR); break;
    case -1: tr=domNodePrev(TR); break;
    default: tr=domNodeParent(TR,2).rows[idx]; break;
  }
  if (tr) {
    TR.style.backgroundColor="";
    tr.style.backgroundColor=this.colorBGmarked;
    var f=tr.getElementsByTagName("A")[0];
    f.focus();
//    tr.getElementsByTagName("A")[0].focus();
  }
  return tr;
}
// key navigator
GridGroupQuery.key=function(ev,Control) {
  var isContinue=false;
  var TR;
  if (Control) {
    TR=domNodeParent(Control,2);
    TR=(TR.tagName=="TD")?domNodeParent(TR):TR;
    if (TR&&TR.tagName=="TR") {} else return true;
  }
  ev=ev||window.event;
  var keyCode=ev.keyCode;
  switch (keyCode) {
    case 9:  // Tab
      return true;
    case 13: // Enter
      TR.click();
      eventCancel(ev);
      return false;
      break;
    case 35: // End
      this.keyStep(ev,TR,domNodeParent(TR,2).rows.length-1);
      break;
    case 36: // Home
      var T=domNodeParent(TR,2);
      var headRowCount=this.getTHead(T).rows.length;
      TR=this.keyStep(ev,TR,headRowCount);
      TR.scrollIntoView(false);
      break;
    case 38: // ArrUp
      if (TR.rowIndex>3) this.keyStep(ev,TR,-1);
      TR.scrollIntoView(false);
      break;
    case 40: // ArrDown
      if (TR.rowIndex<domNodeParent(TR,2).rows.length-1) this.keyStep(ev,TR,1);
      break;
    default:
      break;
  }
  if (!isContinue) eventCancel(ev);
  return isContinue;
}

/*====================================================================================*/
/*                             Grid Query Sql                                         */
/*====================================================================================*/
var GridGroupSql={
  orderClassNameNone : "gridOrderNone",
  orderClassNameAsc  : "gridOrderAsc",
  orderClassNameDesc : "gridOrderDesc"
}
// кол-во строк
GridGroupSql.getRecordCount=function(TableData) {
  return (TableData)?TableData.rows.length-1:0;
}
// синхронизация ширины ячеек заголовка
GridGroupSql.setHeadCellWidth=function(tblHead,tblData) {
  if (tblHead&&tblHead.tagName=="TABLE"&&tblData&&tblData.tagName=="TABLE") {
    tblHead.style.width=parseInt(getBounds(tblData).width-getScrollBarWidth())+"px";
    var rowData=tblData.rows[tblData.rows.length-1];
    if (rowData) {
      tblHead.style.tableLayout="fixed";
      var groupHead=domNodeNext(domNodeFirstChild(tblHead));
      if (groupHead.tagName=="COLGROUP") {
        for (var i=0;i<rowData.cells.length;i++) groupHead.children[i].width=getBounds(rowData.cells[i]).width+"px";
      }
    }
  }
}
// сортировка
GridGroupSql.order=function(Control) {
  var cellTD=domNodeParent(Control);
  var mode=(cellTD.id=="0"||cellTD.id=="2")?"1":"2";
  var cntTR=domNodeParent(cellTD,5);
  // колонку № игнорируем
  for (var i=1;i<cntTR.cells.length;i++) {
    var tbl=domNodeFirstChild(cntTR.cells[i]);
    var obj=tbl.rows[0].cells[1];
    obj.className=this.orderClassNameNone;
    obj.id="0";
  }
  cellTD.className=(mode=="1")?this.orderClassNameAsc:this.orderClassNameDesc;
  cellTD.id=mode;
}

/*
// корректировка высоты (последняя ячейка должна быть видна полностью)
GridSql.setLastRowHeight=function(tblData) {
  if (!tblData) return false;
  var cnt=domNodeParent(tblData); // контейнер для таблицы с данными
  if (!cnt) return false;
  var cellSpacing=parseInt(tblData.cellSpacing); cellSpacing=(isNaN(cellSpacing))?0:cellSpacing;
  var cellBorder=parseInt(tblData.border); cellBorder=(isNaN(cellBorder))?cellBorder:1;
  gridHeight=parseInt(cnt.clientHeight);
  // если высота контейнера ограничена
  if (!isNaN(parseInt(cnt.style.height))) {
    // высота контейнера VS высота таблицы данных
    var lastRec=tblData.rows[tblData.rows.length-2];
    if (!lastRec) return false;
    var lastCellBounds=getBounds(lastRec.cells[0]);
    var cntBounds=getBounds(cnt);
    // уменьшаем высоту контейнера
    var cntBottom=cntBounds.top+cntBounds.height;
    var lastCellBottom=lastCellBounds.top+lastCellBounds.height;
    if (cntBottom>lastCellBottom)
      cnt.style.height=cntBounds.height-cntBottom+lastCellBottom+lastCellBounds.height;
    else {
      // показываем последнюю ячейку полностью, если она не входит в контейнер
      var sum=0;
      for (var i=0; i<tblData.rows.length-1; i++) {
        var cell=tblData.rows[i].cells[0];
        sum=sum+cell.offsetHeight+cellBorder;  //+cellSpacing+cellBorder*2;
        if (sum>gridHeight) {cnt.style.height=sum-1; break;}
      }
    }
  }
}
*/

// инициализация
GridGroupSql.init=function(gridId) {
  var Container=document.getElementById(gridId);
  if (Container&&Container.tagName=="DIV") {
//var tblHead=domNodeFirstChild(Container);
//var tblData=domNodeFirstChild(domNodeNext(tblHead));
    var tblHead=domNodeNext(domNodeNext(domNodeFirstChild(Container))); // без pointer и drag-container
    var tblData=domNodeFirstChild(domNodeNext(tblHead));
    this.setHeadCellWidth(tblHead,tblData);    // синхронизация head-data ширины ячеек
//    this.setLastRowHeight(tblData);          // высота последней строки
  }
}

// мультивыбор
// результат мультивыбора фиксируем в INPUT name==MULTI_SELECT:<GROUP_ID>, формат: REC_ID1;REC_ID2;..REC_IDN;
// мультивыбор: возвращает checkbox ALL
GridGroupSql.getCheckBoxAll=function(TableHead) {
  var res;
  if (TableHead&&TableHead.tagName=="TABLE") res=domNodeNext(domNodeFirstChild(domNodeNext(domNodeFirstChild(TableHead.rows[0].cells[0]))));
  if (res&&res.tagName=="A") return res; else return null;
}
// мультивыбор: выбрать/отменить все
GridGroupSql.checkAll=function(ev,Control) {
  var resultString="";
  if (Control) {
    var newState=(Control.className==Checkbox.checkedClassName)?1:0;
    // грид
    var tableHead=domNodeParent(Control,5);
    var divData=domNodeNext(tableHead);
    var tableData=domNodeFirstChild(divData);
    if (tableData&&tableData.tagName=="TABLE") {
      var recCount=this.getRecordCount(tableData);
      for (var i=0;i<recCount;i++) {
        var TD=tableData.rows[i].cells[0];
        var ControlTD=domNodeNext(domNodeFirstChild(domNodeFirstChild(TD)));
        if (ControlTD&&ControlTD.tagName=="A") Checkbox.changeState(ev,ControlTD,newState);
        if (newState==1&&TD.id.length>0) resultString=resultString+TD.id+";";
      }
      // фиксируем результат
      var Result=domNodeNext(domNodeParent(divData));
      if (newState==1) Result.value=resultString; else Result.value="";
    }
  }
}
// мультивыбор: выбрать/отменить выбор записи
GridGroupSql.checkRec=function(ev,Control) {
  if (Control&&Control.tagName=="A") {
    var newState=Checkbox.getState(Control);
    var TR=domNodeParent(Control,3);
    var TableData=domNodeParent(TR,2);
    var TableHead=domNodePrev(domNodeParent(TableData));
    var DivContainer=domNodeParent(TableData,2);
    var Result=domNodeNext(DivContainer); // result-box сразу за контейнером
    //
    var TD=domNodeParent(Control,2);
    var resultId=TD.id+";"
    var pos=Result.value.indexOf(resultId);
    // добавляем id
    if (newState=="1"&&pos<0)  Result.value=Result.value+resultId;
    if (newState=="0"&&pos>-1) Result.value=Result.value.substr(0,pos)+Result.value.substr(pos+resultId.length);
    // реакция на "последний" check
    var sync=(newState==0&&Result.value.length==0);
    if (!sync) sync=(newState==1&&Result.value.length>0&&this.getRecordCount(TableData)==Result.value.split(";").length-1);
    if (sync) Checkbox.changeState(ev,this.getCheckBoxAll(TableHead),newState);
  }
}

GridGroupSql.reorderCell=function() {

}
GridGroupSql.reorderStop=function() {

}

/*====================================================================================*/
/*                                  Grid Frame Group                                  */
/*                           фрейм-модуль: grid.js, grid.css                          */
/*====================================================================================*/
var GridFrame={
  pref : "gridFrame_"
}
//
GridFrame.refresh=function(ev,Button) {
  if (Button) {
    var Control=domNodeParent(Button,4);  // table панели управления
    if (!Control||Control.tagName!="TABLE") return false;
    var F=domNodeFirstChild(Control.rows[1].cells[0]);  domNodeNext(Control);
    if (F&&F.tagName=="IFRAME") {
      var Content=F.contentWindow.document.body;
      if (Content&&Content.tagName=="BODY") Content.className="wait";
      var tag=TagVar.getString();
      var groupId=Button.getAttribute("data-value");
      if (groupId>0) {
//      var url=Form.actOra+"?gridid="+Button.id+"&fields="+ "" +"&filters="+ "" +"&orders="+ "" +"&userid="+Form.sessionId+"&tagvar="+tag+"&random=";
        var url=Form.actOra+"?gridid="+groupId+"&fields="+"&filters="+"&orders="+"&userid="+Form.sessionId+"&tagvar="+tag+"&random="+Math.random().toString();
//alert(url);toClipboard(url);return false;
        F.src=url;
      }
      eventCancel();
    }
  }
  return false;
}
// размер грида от iframe.onload
GridFrame.viewportSize=function(Frame) {
  if (Frame&&Frame.height=="100%") {
    var bobyHeight=document.body.clientHeight;
    var Table=domNodeParent(Frame,4);
    if (Table&&Table.tagName=="TABLE") {
      var controlHeight=(Table.rows.length>0)?Table.rows[0].cells[0].clientHeight:0;
      var idx=(controlHeight>0)?1:0;
      if (bobyHeight>controlHeight) {
        var CNT=Table.rows[idx].cells[0];
        CNT.style.height=(bobyHeight-controlHeight)+"px";
      }
    }
//    var tableHeight=document.getElementById("containerTable").rows[0].cells[0].clientHeight;
//    if (bobyHeight>tableHeight) {
//    domNodeParent(Frame)
 }
//  return viewportSize();
}
