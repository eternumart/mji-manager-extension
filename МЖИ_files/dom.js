// *** DOM Navigator
function domNodePrev(elem){
  if (elem) {
    do {elem=elem.previousSibling;} while (elem&&elem.nodeType!=1);
  }
  return elem;
}
function domNodeNext(elem){
  if (elem) {
    do {elem=elem.nextSibling;} while (elem&&elem.nodeType!=1);
  }
  return elem;
}
function domNodeFirstChild(elem) {
  if (elem&&elem.firstChild) elem=elem.firstChild;
  return elem&&elem.nodeType!=1?elem.nextSibling:elem;
}
// возвращает элемент, €вл€ющийс€ последним непосредственным потомком
function domNodeLastChild(elem) {
  elem=elem.lastChild;
  return elem&&elem.nodeType!=1?elem.previousSibling:elem;
}
// возвращает последний элемент ветки потомков нода elem
function domNodeLastChild2(elem) {
  var obj=elem;
  do {obj=domNodeLastChild(obj); elem=(obj)?obj:elem;} while (obj);
  return elem;
}
function domNodeParent(elem,num) {
  num=num||1;
  for (var i=0; i<num; i++) if (elem!=null) elem=elem.parentNode;
  return elem;
}
// первый предок с заданным тэгом
function domFirstParentByTag(elem,tag) {
  tag=tag.toUpperCase();
  if (elem&&tag.length>0) do {elem=elem.parentNode;} while (elem&&elem.tagName!=tag);
  return elem;
}
// возвращает первый элемент того же уровн€ по имени тэга, oper: NEXT/PREV
function getFirstSiblingByTag(obj,tag,oper) {
var res;
  tag=tag+""; oper=oper+"";
  if (tag.length==0||oper.length==0) return res;
  tag=tag.toUpperCase(); oper=oper.toUpperCase();
  if (obj) {
    switch (oper) {
      // PREV
      case "PREV":
        for (var i=0; i<100; i++) {
          obj=domNodePrev(obj);
          if (obj) if (obj.tagName==tag) {res=obj; break;}
        }
        break;
      // NEXT
      case "NEXT":
        for (var i=0; i<100; i++) {
          obj=domNodeNext(obj);
          if (obj) if (obj.tagName==tag) {res=obj; break;}
        }
        break;
    }
  }
  return res;
}
// возвращает первый дочерний элемент по тегу
function getFirstChildByTag(obj,tag) {
  var res;
  if (obj&&tag) {
    var collect=obj.childNodes;
    for (var key in collect) if (collect[key].tagName==tag) {res=collect[key]; break}
  }
  return res;
}

function viewportSize() {
/*
  var w=document.documentElement.clientWidth==0?document.body.clientWidth:document.documentElement.clientWidth;
  var h=document.documentElement.clientHeight==0?document.body.clientHeight:document.documentElement.clientHeight;
  var sw=document.documentElement.scrollWidth==0?document.body.scrollWidth:document.documentElement.scrollWidth;
  var sh=document.documentElement.scrollHeight==0?document.body.scrollHeight:document.documentElement.scrollHeight;
  return {width:w,height:h,scrollWidth:sw,scrollHeight:sh}
*/
//  var d=(document.documentElement.clientWidth==0)?document.body:document.documentElement;
//  var rect=getElementRect(d);
//  return {width:rect.width,height:rect.height,scrollWidth:d.scrollWidth,scrollHeight:d.scrollHeight}
  var html=document.documentElement;
  var body=document.body;
  var w=(html.clientWidth==0||html.clientWidth>body.clientWidth)?body.clientWidth:html.clientWidth;
  var h=(html.clientHeight==0||html.clientHeight>body.clientHeight)?body.clientHeight:html.clientHeight;
  var sw=(html.scrollWidth==0||html.scrollWidth>body.scrollWidth)?body.scrollWidth:html.scrollWidth;
  var sh=(html.scrollHeight==0||html.scrollHeight>body.scrollHeight)?body.scrollHeight:html.scrollHeight;
  return {width:w,height:h,scrollWidth:sw,scrollHeight:sh}
}

// вариант
function getViewportSize(doc) {
  var w=0; var h=0;
  doc=doc||document;
  var elem=doc.compatMode=="CSS1Compat"?doc.documentElement:doc.body;
  if (elem) {
    w=parseInt(elem.clientWidth); h=parseInt(elem.clientHeight);
  }
  w=(w>0)?w:(document.parentWindow||document.defaultView).innerWidth;
  h=(h>0)?h:(document.parentWindow||document.defaultView).innerHeight;
  return {width:parseInt(w),height:parseInt(h)};
}

function DOC() {
  var root=document.compatMode=="CSS1Compat"?document.documentElement:document.body;
  return root;
}

function getFrameDocument (frame) {
 return (frame.contentDocument)?frame.contentDocument:((frame.contentWindow)?frame.contentWindow.document:null);
}

function getCenter() {
  var x=0; var y=0;
//  var root = (typeof document.compatMode != 'undefined')? document.documentElement : document.body;
//  var root=document.compatMode=="CSS1Compat"?document.documentElement:document.body;
  var root=DOC();
  if (root) {
    var vp=getViewportSize(root);
    var x=Math.round(vp.width/2+root.scrollLeft);
    var y=Math.round(vp.height/2+root.scrollTop);
  }
  return {x:x,y:y}
}


/*
// ширина окна просмотра
function clientWidth() {
  return document.documentElement.clientWidth==0?document.body.clientWidth:document.documentElement.clientWidth;
}
// высота окна просмотра
function clientHeight() {
  return document.documentElement.clientHeight==0?document.body.clientHeight:document.documentElement.clientHeight;
}
*/

// *** рамки элемента (геометри€)
function getElementRect(element) {
  if (element)
    return element.getBoundingClientRect();
  else
    return document.documentElement.clientHeight==0?document.body.getBoundingClientRect():document.documentElement.getBoundingClientRect();
}

// *** возвращает координаты верхнего левого угла элемента:
//    viewTop/viewLeft   - относительно окна
//    scrollTop/scrollLeft - с учетом скроллинга
function getOffsetRect(elem) {
  if (!elem) return;
  var box=elem.getBoundingClientRect();
  //
  var body=document.body;
  var docElem=document.documentElement;
  //
  var scrollTop=window.pageYOffset||docElem.scrollTop||body.scrollTop;
  var scrollLeft=window.pageXOffset||docElem.scrollLeft||body.scrollLeft;
  //
  var clientTop=docElem.clientTop||body.clientTop||0;
  var clientLeft=docElem.clientLeft||body.clientLeft||0;
  //
  var top=box.top-clientTop;
  var left=box.left-clientLeft;
  //
  var height=Math.round(box.bottom-box.top);
  //
  return {viewTop:Math.round(top),viewLeft:Math.round(left),scrollTop:Math.round(top+scrollTop),scrollLeft:Math.round(left+scrollLeft),height:height}
}

// *** рамки элемента (геометри€)
function getBounds(element) {
  if (element==null) return null;
  var left = element.offsetLeft;
  var top = element.offsetTop;
//  var width = element.clientWidth||element.offsetWidth;
  for (var parent = element.offsetParent; parent; parent = parent.offsetParent) {left += parent.offsetLeft; top += parent.offsetTop;}
  return {left: left, top: top, width: element.offsetWidth, height: element.offsetHeight};
}

// *** координаты элемента
function getElementPosition(_element) {
  var elem;
  if(typeof(_element)=="string") elem = document.getElementById(_element);
  else elem=_element;
  var w=elem.offsetWidth;
  var h=elem.offsetHeight;
  var l=0;
  var t=0;
  while (elem) {
    l+=elem.offsetLeft;
    t+=elem.offsetTop;
    elem=elem.offsetParent;
  }
  return {left:l, top:t, width: w, height:h};
};

function offsetPosition(element) {
  var offsetLeft=0; var offsetTop=0;
  do {
    offsetLeft+=element.offsetLeft;
    offsetTop+=element.offsetTop;
  } while (element=element.offsetParent);
  return {left:offsetLeft,top:offsetTop};
}



// *** вычисл€емые свойства элемента (напр.: prop="border-width")
function getElementComputedStyle(elem,prop) {
  var res="";
  if (typeof elem!="object") elem = document.getElementById(elem);
  if (document.defaultView && document.defaultView.getComputedStyle) {
    if (prop.match(/[A-Z]/)) prop = prop.replace(/([A-Z])/g, "-$1").toLowerCase();
    res=document.defaultView.getComputedStyle(elem, "").getPropertyValue(prop);
  }
  res=(res)?res+"":"";
  if (res.length==0&&elem.currentStyle) {
    var i;
    while ((i=prop.indexOf("-"))!=-1) prop = prop.substr(0, i) + prop.substr(i+1,1).toUpperCase() + prop.substr(i+2);
    res=elem.currentStyle[prop];
  }
  return res;
}

// *** возвращает ширину строки (parent: элемент, в котором расположена строка)
function getStrWidth(str,parent) {
  var res=null;
  if ((str+"").length==0) return null;
  if (parent) {
    var ff=getElementComputedStyle(parent,"font-family");
    var fs=getElementComputedStyle(parent,"font-size");
    var p=getElementComputedStyle(parent,"padding");
    var bw=getElementComputedStyle(parent,"border-width");
    var bs=getElementComputedStyle(parent,"border-style");
  } else return null;
  var s=document.createElement("SPAN");
  s.style.fontFamily=ff;
  s.style.fontSize=fs;
  s.style.borderWidth=bw;
  s.style.borderStyle=bs;
  s.style.borderColor="#000";
  s.style.margin="0px";
  s.style.padding=parseInt(p)*2;
  s.innerHTML=str;
  document.body.appendChild(s);
  res=s.offsetWidth;
  document.body.removeChild(s);
  return res;
}

// *** возвращает ширину ScrollBar
function getScrollBarWidth() {
  document.body.style.overflow="hidden";
  var width=document.body.clientWidth;
  document.body.style.overflow="scroll";
  width-=document.body.clientWidth;
  if (!width) width=document.body.offsetWidth-document.body.clientWidth;
  document.body.style.overflow="";
  return width;
}
// наличие полосы прокрутки
//  position: Width/Height
function scrollbarExist(position) {
  var d=document;
  var b=d.body;
  var e=d.documentElement;
  var c="client"+position;
  var position="scroll"+position;
  return /CSS/.test(d.compatMode)?(e[c]<e[position]):(b[c]<b[position]);
}

// *** видимость элемента
function getRealDisplay(e) {
  if (e.currentStyle) {
    return e.currentStyle.display;
  }
  else if (window.getComputedStyle) {
    var computedStyle=window.getComputedStyle(e,null);
    return computedStyle.getPropertyValue("display");
  }
}
function isHidden(e) {
  if (!e) return false;
  if (e&&typeof(e.disabled)=="boolean") if (e.disabled) return true;
  var width=e.offsetWidth;
  var height=e.offsetHeight;
  tr=e.nodeName.toLowerCase()==="tr";
  return width===0&&height===0&&!tr?true:width>0&&height>0&&!tr?false:getRealDisplay(e);
}