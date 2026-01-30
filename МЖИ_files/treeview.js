//**********************************************************************************//
//   Tree View
// Params:
//   homePath:            url сервера
//   isCascadeCheck:      0/1 - каскадная синхронизация значений checkbox-потомков
//   isCheckboxHighlight: 0/1 - checkbox выделенного стиля
//**********************************************************************************//
function classTreeView(isCascadeCheck,isCheckboxHighlight) {

  // parameters
  isCascadeCheck=(isCascadeCheck=="0")?false:true;
  isCheckboxHighlight=(isCheckboxHighlight=="0")?false:true;
  // constant
  var checkboxStyleSelected=(isCheckboxHighlight)?"CheckboxHighlightSelected":"CheckboxSelected";
  var classNameClose="ExpandClosed";
  var classNameOpen="ExpandOpen";

  var curNode;
  var firstNode;
  var counterCheckIdx=0;

  this.treeToggle=function(event,elem) {
    var clickedElem;
    if (elem) clickedElem=elem;
    else {
      event=event||window.event;
      clickedElem=event.target||event.srcElement;
    }
    // mouse-навигация (выделение элемента)
//    if (hasClass(clickedElem,"Content")) selectNode(clickedElem);
    if ((clickedElem.tagName=="A")||hasClass(clickedElem,"Content")) {
      if (clickedElem.tagName=="A") clickedElem=domNodeParent(clickedElem);
      selectNode(clickedElem);
    }
    // проверка
    if (!hasClass(clickedElem,"Expand")) {
      return; // клик не там
    }
    // click checkbox
    if (clickedElem.className.indexOf("Checkbox")>-1) {
      // каскадная синхронизация значений потомков
      if (isCascadeCheck) this.setCheckboxAll(domNodeParent(clickedElem),(clickedElem.name=="1")?"0":"1");
      else checkboxState(clickedElem);
      return;
    }
    // click leaf
    var node=clickedElem.parentNode;
    if (hasClass(node,"ExpandLeaf")) {
      return // клик на листе
    }
    // определить новый класс для узла
    var newClass=hasClass(node,"ExpandOpen")?"ExpandClosed":"ExpandOpen";
    // заменить текущий класс на newClass
    // регексп находит отдельно стоящий open|close и меняет на newClass
    var re=/(^|\s)(ExpandOpen|ExpandClosed)(\s|$)/;
    node.className=node.className.replace(re,'$1'+newClass+'$3');
  }

  var hasClass=function(elem,className) {
    return new RegExp("(^|\\s)"+className+"(\\s|$)").test(elem.className);
  }

  // checkbox click
  var checkboxState=function(obj,value) {
    if (obj.readonly=="1") return false;
    value=(isNaN(value))?((obj.name=="0")?"1":"0"):value;
    obj.name=value;
    var newClass=(obj.name=="0")?obj.className.replace(checkboxStyleSelected,"CheckboxNone"):obj.className.replace("CheckboxNone",checkboxStyleSelected);
    obj.className=newClass;
  }

  // установка значений value всем checkbox дерева
  //   value: 0/1
  // направление: toChild
  this.setCheckboxAll=function(container,value) {
    if (container) {
      var collect=container.childNodes;
      for(var key in collect) {  
        if ((collect[key].tagName=='UL')||(collect[key].tagName=='LI')) this.setCheckboxAll(collect[key],value); 
        else
          if ((collect[key].tagName=='DIV')&&(collect[key].className.indexOf("Checkbox")>-1)) {
            checkboxState(collect[key],value);
            this.setCheckboxAll(collect[key],value);
          }
      }
    }
  }

  // установка статуса узлу <LI>
  // mode: EXPAND/COLLAPSE
  var setNodeStatus=function(obj,mode) {
    if (mode=="EXPAND") obj.className=obj.className.replace(classNameClose,classNameOpen);
    else if (mode=="COLLAPSE") obj.className=obj.className.replace(classNameOpen,classNameClose);
  }

  // mode: EXPAND/COLLAPSE
  // направление: toChild
  this.setMode=function(container,mode) {
    if (container) {
      var collect=container.getElementsByTagName("LI");
      for (var i=0; i<collect.length; i++) setNodeStatus(collect[i],mode);
    }
  }

  // container: LI
  // mode: EXPAND/COLLAPSE
  // направление: toRoot
  var setModeReverse=function(container,mode) {
    if ((container)&&(container.tagName=="LI")) {
      setNodeStatus(container,mode);
      // рекурсивно для родителя/родителя текущего LI (LI-UL-LI)
      setModeReverse(domNodeParent(container,2),mode);
    }
  }

  // изменить режим представления: expand/collapse
  this.changeMode=function(obj) {
    if (obj) {
      var key=parseInt(obj.name);
      key=(isNaN(key))?0:key;
      obj.blur();
      var cnt=domNodeParent(obj);
      if (cnt) {
        if (key==0) {obj.name="1"; obj.src=Container.pathApp+"img/treeview/folder-open.gif"; this.setMode(cnt,"EXPAND")}
        else {obj.name="0"; obj.src=Container.pathApp+"img/treeview/folder-close.gif"; this.setMode(cnt,"COLLAPSE")}
      }
    }
  }

  // установка статусов выбранным узлам
  // mode selected nodes: expand/collapse
  this.setModeSelected=function(container,mode) {
    if (container) {
      this.setMode(container,"COLLAPSE");
      var collect=container.childNodes;
      for (var key in collect) {
        if ((collect[key].tagName=="UL")||(collect[key].tagName=="LI")) this.setModeSelected(collect[key],mode); 
        if ((collect[key].tagName=="DIV")&&(collect[key].className.indexOf(checkboxStyleSelected)>-1)) {
          var LI=domNodeParent(collect[key]);
          if (LI) {
            // выбранный нод оставляем в COLLAPSE состоянии
            LI=domNodeParent(domNodeParent(LI));
            if (LI) {
              var flag=((mode=="EXPAND")&&(LI.className.indexOf(classNameOpen)<0)) ||
                       ((mode=="COLLAPSE")&&(LI.className.indexOf(classNameClose)<0));
              if (flag) setModeReverse(LI,mode); // рекурсия к корню от LI в котором находится DIV-Selected
            }
          }
        }
      }
    }
  }

  // визуализация нажатия кнопки
  this.buttonClick=function(obj) {
    var X; var Y; var arr=[];
    if ((obj)&&(obj.tagName=="INPUT")&&(obj.type=="button")) {
      obj.blur();
      var res=getElementComputedStyle(obj,"background-position");
      if (typeof(res)=="string") arr=res.split(" ");
      if ((arr.length==0)&&(obj.currentStyle)) {
        arr[0]=obj.currentStyle.backgroundPositionX;
        arr[1]=obj.currentStyle.backgroundPositionY;
      }
      if (arr.length>0) {
        X=parseInt(arr[0]); Y=parseInt(arr[1]);
        obj.style.backgroundPosition=parseInt(X-1)+"px "+parseInt(Y-1)+"px";
        setTimeout(function(){obj.style.backgroundPosition=X+"px "+Y+"px"},200);
      }
    }
  }

  // handler button ALL: EXPAND/COLLAPSE
  this.buttonChangeStateAll=function(container,button,mode) {
    this.buttonClick(button);
    this.setMode(container,mode);
    if (isHidden(curNode)) {
      this.setCursor(1); counterCheckIdx=0; // инициализация счетчика checked позиций
    }
    else selectNode(curNode);
  }

  // handler button checkbox ALL: check/uncheck - 1/0
  this.buttonChangeCheckboxAll=function(container,button,value) {
    counterCheckIdx=0; // инициализация счетчика checked позиций
    this.buttonClick(button);
    this.setCheckboxAll(container,value);
    selectNode(curNode);
  }

  // handler button checked all (установка статуса checkbox=true узлам)
  //   mode: EXPAND/COLLAPSE
  this.buttonLocateCheckedAll=function(container,button,mode) {
    var curIdx=0; var node=null; var isCycle=true;
    var curLI=domNodeParent(curNode);
    this.buttonClick(button);
    this.setModeSelected(container,mode);
    // позиционирование на первый выделенный элемент
    var collect=container.getElementsByTagName("DIV");
    for (var key in collect) {
      if ((typeof(collect[key])=="object")&&(collect[key].className.indexOf(checkboxStyleSelected)>-1)) {
        // фиксируем первый checked node, для циклического позиционирования
        if (node==null) node=collect[key];
        if (++curIdx>counterCheckIdx) {
          if (domNodeParent(collect[key])==curLI) counterCheckIdx++;
          else {node=collect[key]; isCycle=false; break;}
        }
      }
    }
    // выбираем нод
    if (node) {
      counterCheckIdx=(isCycle)?1:counterCheckIdx+1;
      selectNode(firstChildNodeByClass(domNodeParent(node),"Content"));
    }
    else {
      // если выбранные ноды отсутствуют, то выделяем текущий или первый нод
      if (isHidden(curNode)) this.setCursor(1); else selectNode(curNode); // возвратим фокус
    }
  }

  // выбор позиции
  var selectNode=function(obj) {
    if (!hasClass(obj,"ContentSelected")) {
      if (curNode) curNode.className="Content";
      obj.className="Content ContentSelected";
      curNode=obj;
    }
    if (curNode) domNodeFirstChild(curNode).focus(); // фокус на <a href>
  }

  // возвращает первый дочерний нод по классу
  var firstChildNodeByClass=function(obj,name) {
    var res;
    if (obj&&name) {
      var collect=obj.childNodes;
      for (var key in collect) {
        if ((collect[key].nodeType==1)&&(collect[key].className.indexOf(name)>-1)) {res=collect[key]; break}
      }
    }
    return res;
  }

  // возвращает первый parent-узел с ветвлением
  var getNodeParentBranch=function(container) {
    if (container&&(container.tagName=="LI")&&hasClass(container,"IsRoot")) return container;
    // рекурсивно для родителя/родителя текущего LI (LI-UL-LI)
    return (hasClass(container,"IsLast"))?getNodeParentBranch(domNodeParent(container,2)):container;
  }

  // возвращает первый LI-элемент дерева
  var getFirstNode=function() {
    if (!curNode) return null;
    if (!firstNode) {
      var node=domNodeParent(curNode);
      if (parseInt(node.getAttribute("level"))>1) do {node=node.parentNode} while (node&&!hasClass(node,"IsRoot"));
      while (node&&parseInt(node.getAttribute("index"))>1) node=domNodePrev(node);
      if (node) firstNode=node;
    }
    return firstNode;
  }

  // target: NextSibling/PrevSibling/FirstChild/LastChild/Parent/Prev
  var getNode=function(LI,target) {
    var res;    
    if (!LI) return false;
    switch (target) {
      case "NextSibling":
        res=domNodeNext(LI);
        break;
      case "PrevSibling":
        res=domNodePrev(LI);
        break;
      case "FirstChild":
        res=LI.getElementsByTagName("LI")[0];
        break;
      case "LastChild":
        res=domNodeParent(domNodeLastChild2(LI));
        while (res.tagName!="LI") res=domNodeParent(res);
        break;
      case "Parent":
        res=domNodeParent(LI,2);
        break;
      case "Prev":
        res=domNodePrev(LI);
        res=(res)?res:domNodeParent(LI,2); // если sibling отсутствует, возвратим parent
        break;
    }
    return res;
  }

  // key-navigator
  this.keyPressed=function(ev) {
    counterCheckIdx=0; // инициализация счетчика checked позиций
    ev=ev||window.event;
    if (curNode) {
      var node=domNodeParent(curNode);
      var isSelectMode=true;
      if (!node) return false;
      var keyCode=ev.keyCode;
      //* hot key
      var hotKeyMode;
      // <+> или <Shift+[+]>: expand all
      if ((keyCode==107)||(ev.shiftKey&&keyCode==187)) hotKeyMode="EXPAND";
      // <->: collapse all
      if ((keyCode==109)||(keyCode==189)) hotKeyMode="COLLAPSE";
      // expand/collapse all
      if (hotKeyMode=="EXPAND"||hotKeyMode=="COLLAPSE") this.buttonChangeStateAll(domNodeParent(getFirstNode(),2),null,hotKeyMode);
      // <Ctrl+L>: locate checked
      if (ev.ctrlKey&&keyCode==76) this.buttonLocateCheckedAll(domNodeParent(getFirstNode(),2),null,"EXPAND")
      // <Ctrl+C>: check all
      if (ev.ctrlKey&&keyCode==67) this.buttonChangeCheckboxAll(domNodeParent(getFirstNode(),2),null,1);
      // <Ctrl+U>: uncheck all
      if (ev.ctrlKey&&keyCode==85) this.buttonChangeCheckboxAll(domNodeParent(getFirstNode(),2),null,0);
      //* case
      switch (keyCode) {
        case 9:  // Tab
          if (parent&&typeof(parent.treeTabKeyPress)=="function") parent.treeTabKeyPress(node);
          break;
        case 13: // Enter
          return true;
        case 27: // Esc
          // popup - close window
          if (typeof(parent.popupStandard)=="object") {parent.popupStandard.hide(ev); isSelectMode=false}
          break;
        case 32: //Space: change checkbox state
          isSelectMode=false;
          node=firstChildNodeByClass(node,"Checkbox");
          if (node) {
            // каскадная синхронизация значений потомков
            if (isCascadeCheck) this.setCheckboxAll(domNodeParent(node),(node.name=="1")?"0":"1");
            else checkboxState(node);
          }
          break;
        case 35: // End
          if (parseInt(node.getAttribute("level"))>1) do {node=node.parentNode} while (node&&!hasClass(node,"IsRoot"));
          if (node) {
            // последний элемент первого уровня
            var obj=node;
            while (obj) {obj=getNode(obj,"NextSibling"); node=(obj)?obj:node;}
            // последний "видимый" потомок последнего элемента
            node=getNode(node,"LastChild");
            while (node&&isHidden(node)) {node=getNode(node,"Prev")}
          }
          break;
        case 36: // Home
//          if (parseInt(node.getAttribute("level"))>1) do {node=node.parentNode} while (node&&!hasClass(node,"IsRoot"));
//          while (node&&parseInt(node.getAttribute("index"))>1) node=domNodePrev(node);
          node=getFirstNode();
          break;
        case 37: // Left
          isSelectMode=false;
          if (hasClass(node,"ExpandOpen")) this.treeToggle(null,domNodeFirstChild(node));
          else { // auto collapse до корня
            if (hasClass(node,"ExpandClosed")||hasClass(node,"ExpandLeaf")) {
              var level=parseInt(node.getAttribute("level"));
              if (level<2) node=null; else node=getNode(node,"Parent");
              if (node) isSelectMode=true;
            }
          }
          break;
        case 39: // Right
          isSelectMode=false;
          if (hasClass(node,"ExpandClosed")) this.treeToggle(null,domNodeFirstChild(node));
          else { // auto expand до последнего уровня ветки
            if (hasClass(node,"ExpandOpen")&&!hasClass(node,"ExpandLeaf")) {
              node=getNode(node,"FirstChild");
              node=(node&&isHidden(node))?null:node;
              if (node) isSelectMode=true;
            };
          }
          break;
        case 38: // Up
          var index=parseInt(node.getAttribute("index"));
          if (index<2) return false;
          // предыдущий нод того же уровня
          var prevNode=getNode(node,"PrevSibling");
          // если предыдущий нод того же уровня отсутствует, то непосредственный предок
          prevNode=(prevNode)?prevNode:getNode(node,"Parent");
          // монотонное движение вверх
          if (index-parseInt(prevNode.getAttribute("index"))==1) node=prevNode;
          else {
            node=getNode(prevNode,"LastChild"); // последний потомок предыдущего узла
            while (node&&isHidden(node)) {node=getNode(node,"Prev")}
          }
          break;
        case 40: // Down
          var obj;
          // первый потомок
          obj=getNode(node,"FirstChild");
          obj=(obj&&isHidden(obj))?null:obj;
          // первый нод того же уровня
          obj=(obj)?obj:getNode(node,"NextSibling");
          obj=(obj&&isHidden(obj))?null:obj;
          // следующий элемент уровня предка
          obj=(obj)?obj:getNode(getNodeParentBranch(node),"NextSibling");
          node=(obj)?obj:null;
          break;
        default:
          isSelectMode=false;
      }
      // выделение node
      if (isSelectMode && node) selectNode(firstChildNodeByClass(node,"Content"));
      if (ev.stopPropagation) ev.stopPropagation(); else ev.cancelBubble=true;
      if ((keyCode==35||keyCode==36)&&(node)) node.scrollIntoView(false);
      ev.returnValue=false;
    }
  }

  // возвращает node по индексу idx
  var getElementByIdx=function(idx,ID) {
    var res;
    idx=parseInt(idx); idx=(isNaN(idx))?1:idx;
    ID=(ID)?ID:"treeView";
    var obj=document.getElementById(ID);
    if (obj) {
      var collect=obj.getElementsByTagName("LI");
      for (key in collect) {
        if ((typeof(collect[key])=="object")&&(collect[key].getAttribute("index")==idx)) {
          res=collect[key];
          break;
        }
      }
    }  
    return res;
  }

  // устанавливает курсор на позицию дерева с индексом idx
  this.setCursor=function(idx,ID) {
    var res=getElementByIdx(idx,ID);
    if (res) {
      if (isHidden(res)) setModeReverse(res,"EXPAND"); // покажем
      selectNode(firstChildNodeByClass(res,"Content"));
    }
  }

}
