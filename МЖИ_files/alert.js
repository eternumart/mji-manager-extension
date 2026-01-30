var BoxAlert = {
  boxName : "boxAlert",
  callElementId : "",                                          // id вызывающего элемента
  frame: null,                                                    // iframe для resizing
  frameId: "tooltipFormFrame",                      // ID фрейма
  sizeOldWidthAttrName:  "data-old-width",   // имя атрибута-буфера для хранения ширины при resize ondblclick
  sizeOldHeightAttrName: "data-old-height"   // имя атрибута-буфера для хранения высоты при resize ondblclick
}
BoxAlert.title=function(text) {
  var t=document.getElementById(this.boxName+"Title");
  if (t) t.innerHTML=text;
}
// TD-контейнер для контента
BoxAlert.contentContainer=function(table) {
//  return table.rows[2].cells[0];
  return table.rows[table.rows.length-1].cells[0];
}
// показать
//   focus: 0/1 - false/true
//   minY:  ограничение для перетаскивания - сверху, px
BoxAlert.show=function(container,focus,minY) {
  if (!container) container=document.getElementById(this.boxName);
  if (container) var table=domNodeFirstChild(container);
  if (table&&table.tagName=="TABLE") {
    var handle=table.rows[0];
    container.style.display="inline";

    // ограничения drag-n-drop области
    var posTop=0;
/*
    // относительно top фрейма формы (если форма существует)
    var F=self.frameElement;
    // фрейм-предок существует
    if (F) {
      posTop=getElementRect(F).top;
    } else {
      // фрейм-контейнер
      if (typeof(Container)=="object") {
        var F=Container.getCanvasFrame();
        if (F) posTop=getElementRect(F).top;
      }  else  {
        // относительно top body
        posTop=getElementRect(domNodeParent(container)).top;
      }
    }
*/
    minY=(minY>-100)?minY:posTop;
    minY=(minY)?minY:null;
    Drag.init(handle,container,null,null,minY);
//    container.onDragStart=function(x,y) {container.style.filter="alpha(opacity=70)";}
//    container.onDragEnd=function(x,y)   {container.style.filter="alpha(opacity=100)";}
    container.onDragStart=function(x,y) {container.style.opacity=0.7;}
    // защищаемся от выбрасывания "вверх" drag-панели окна
    container.onDragEnd=function(x,y)   {
      if (parseInt(container.style.top)<20) container.style.top="20px";
      container.style.opacity=1;
    }
    var menu=document.getElementById(this.boxName+"Menu");
    focus=((isNaN(parseInt(focus)))?1:focus)==1;
    if (menu&&focus) {
      domNodeFirstChild(menu).focus();
    }
  }
  return menu;
}
// возврат повторно используемых фрагментов
BoxAlert.reset=function(Container) {
  var Content=domNodeFirstChild(Container);
  if (Content) {
    if (typeof(Form)=="object") {
      if (typeof(TextTemplate)=="object") TextTemplate.reset(Content);  // текстовые шаблоны
    }
  }
  Container.innerHTML="";
}
// закрыть
BoxAlert.close=function(ev,control) {
  this.callElementId="";
  if (!control) return false;
  if (control.tagName=="A") {
    var table;
    if (control.id=="button") table=domNodeParent(control,8); else table=domNodeParent(control,4);
  }
  if (table&&table.tagName=="TABLE") {
//    domNodeParent(table).style.display="none";
    // возврат готовых фрагментов из контейнера
    var TD=this.contentContainer(table);
    this.reset(TD);
    var container=domNodeParent(table);
    if (container) container.style.display="none";
  }
  eventCancel(ev);
  return false;
}
// закрыть извне
BoxAlert.cancel=function() {
  this.callElementId="";
  var container=document.getElementById(this.boxName);
  if (container&&container.tagName=="DIV"&&container.style.display!="none") {
    var table=domNodeFirstChild(container);
    var TD=this.contentContainer(table);
    this.reset(TD);
    container.style.display="none";
  }
}

// изменение размера окна на dblclick
BoxAlert.resize=function(ev,elem) {
  if (elem) {
    var F=elem.getElementsByTagName('IFRAME')[0];
    if (F) {
     // ширина
      var defWidth=600;
      var w=parseInt(F.style.width);
      w=(w>0)?w:parseInt(F.width);
      // высота
      var defHeight=300;
      var h=parseInt(F.style.height);
      h=(h>0)?h:parseInt(F.height);
      // контейнер
      var C=domNodeParent(elem);
      if (C) {
        var d; var D;
        P=getElementRect(C);
        // viewport size
        var VP=COORD.getViewPort();
        // ширина
        d=parseInt(F.getAttribute(this.sizeOldWidthAttrName)); // attr get: data-old-width
        d=(d>0)?d:defWidth;
        D=((w+100+10)>P.width)?d:P.width-100;
        F.style.width=D+"px";
        if (D==d) elem.style.left=Math.round(VP.scrollLeft+P.width/2-parseInt(F.style.width)/2)+"px";
        else {
          F.setAttribute(this.sizeOldWidthAttrName,w);    // attr set: data-old-width
          elem.style.left="50px";
        }
        // высота
        P.height=VP.height-VP.scrollTop;
        d=parseInt(F.getAttribute(this.sizeOldHeightAttrName)); // attr get: data-old-height
        d=(d>0)?d:defHeight;
        D=((h+100+10)>P.height)?d:P.height-100;
        F.style.height=Math.round(D)+"px";
        if (D==d) elem.style.top=Math.round(VP.scrollTop+P.height/2-parseInt(F.style.height)/2)+"px";
        else {
          F.setAttribute(this.sizeOldHeightAttrName,h);    // attr set: data-old-height
          elem.style.top=(VP.scrollTop+30)+"px";
        }
      }
      F.style.minWidth="200px";
      F.style.minHeight="200px";
    }
  }
}

// изменение размера окна
BoxAlert.resizeStart=function(ev,Control) {
  if (Control) {
    var table=domNodeParent(Control,4);
    if (table&&table.tagName=="TABLE") {
      var frame=domNodeFirstChild(this.contentContainer(table));
      if (frame&&frame.tagName=="IFRAME") {
        this.frame=frame;
        var width=parseInt(frame.width);
        var height=parseInt(frame.height);
        document.onmousemove=BoxAlert.resizeMove;
        document.onmouseup=BoxAlert.resizeEnd;
      }
    }
  }
}

BoxAlert.resizeMove=function(ev) {

document.body.style.backgroundColor="#ccc";

  if (this.frame&&  this.frame.tagName=="IFRAME") {
alert(this.frame.width);
    this.frame.width=(parseInt(this.frame.width)+50)+"px";

  }

}

BoxAlert.resizeEnd=function() {
  document.onmousemove=null;
  document.onmouseup=null;
  document.body.style.cursor="default";
//  Drag.obj.style.cursor="default";
  document.body.style.backgroundColor="";
  this.frame=null;

alert("end");
}

// запомнить информацию в буффере обмена
BoxAlert.toClipboard=function(ev,control) {
  if (!control) return false;
  var table=domNodeParent(control,4);
  if (table&&table.tagName=="TABLE") {
//    var text=table.rows[2].cells[0].innerHTML;
    var text=this.contentContainer(table).innerHTML;
    window.clipboardData.clearData("Text");
    if (window.clipboardData.setData("Text",text)) alert("Информация в буфере обмена");
  }
  return false;
}

// 1. pos: CENTER
// 2. posX, posY, indentX, indentY - для позиционирования относительно элемента - elem
BoxAlert.message=function(fragment,pos,focus,elem,posX,posY,indentX,indentY) {
  if (typeof(fragment)=="string"&&fragment.length==0) return false;
  if (fragment) {
    var posTop=parseInt(pos);
    var container=document.getElementById(this.boxName);
    // регистрация id вызывающего элемента
    var callElementId=(typeof(elem)=="object")?elem.id:elem;
    this.callElementId=(callElementId)?callElementId+"":"";
    //
    if (container&&container.tagName=="DIV") {
      if (container.style.display!="inline") pos="CENTER";
      container.style.display="none";
      var TD=this.contentContainer(domNodeFirstChild(container));
      // отступ от рамок окна
      if (typeof(fragment)=="string"&&fragment.indexOf("<iframe")==0) TD.style.padding="2px"; else TD.style.padding="12px";
      //
      if (typeof(fragment)=="object") TD.appendChild(fragment); else TD.innerHTML=fragment;
      var menu=this.show(container,0);
      // позиционирование
      if (typeof(elem)=="object") COORD.positionRelative(elem,container,posX,posY,indentX,indentY);
      else {
        pos=(pos)?pos:"CENTER";
        pos=(typeof(pos)=="string")?pos:"CENTER";
        COORD.positionFix(container,pos);
      }
      // focus
      focus=((isNaN(parseInt(focus)))?1:0)==1;
      if (menu&&focus) {
        domNodeFirstChild(menu).focus();
      }
    }
  }
}

/*
// pos: CENTER
BoxAlert.message=function(fragment,pos,focus,callElementId) {
  if (typeof(fragment)=="string"&&fragment.length==0) return false;
  if (fragment) {
//    pos=pos||"CENTER";
    var posTop=parseInt(pos);
    var container=document.getElementById(this.boxName);
    // регистрация id вызывающего элемента
    this.callElementId=(callElementId)?callElementId+"":"";
    //
    if (container&&container.tagName=="DIV") {
      if (container.style.display!="inline") pos="CENTER";
      container.style.display="none";
//      var TD=domNodeFirstChild(container).rows[2].cells[0];
      var TD=this.contentContainer(domNodeFirstChild(container));
//      TD.innerHTML="";
//      this.reset(TD);
      if (typeof(fragment)=="object") TD.appendChild(fragment); else TD.innerHTML=fragment;
      // геометрия контейнера
      var B=getElementRect(container);
      var menu=this.show(container,0,B.top);
      if (pos=="CENTER") {
        var C=getCenter();
        // top окна не должен "уползать в невидимый верх" окна
        var t=Math.round(C.y-(B.bottom-B.top)/2);
        t=(t<50)?50:t;
        container.style.top=t+"px";
//        container.style.top=Math.round(C.y-(B.bottom-B.top)/2)+"px";
        container.style.left=Math.round(C.x-(B.right-B.left)/2)+"px";
      }
      if (posTop>0) {
        container.style.top=posTop+"px";
      }
      // focus
      focus=((isNaN(parseInt(focus)))?1:0)==1;
      if (menu&&focus) {
        domNodeFirstChild(menu).focus();
      }
    }
  }
}
*/

// установка вертикальной позиции
BoxAlert.topTo=function(topPos) {
  var container=document.getElementById(this.boxName);
  if (container&&container.tagName=="DIV") {
    container.style.top=topPos;
  }
}

