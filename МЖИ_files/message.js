// id: mess_id из табл. T_MESSAGES
// инициализация в pls: BUILDER.FORM_CREATE
var arrFormMessage=[];

var Message={
  partForm        : 1,      // раздел Форма
  callElementId : ""     // id вызывающего элемента
}
//
// возвращает: messResult - true/false
//   focus: 0/1
// для позиционирования относительно элемента:
//   elem:   ссылка на элемент, относительно которого производится позиционирование
//   posX,posY,indentX,indentY: параметры относительного позиционирования для coord.js
Message.show=function(messId,messPart,messResult,pos,focus,elem,posX,posY,indentX,indentY) {
  if (messId>0) {
    messPart=(messPart>0)?messPart:this.partForm;
    // раздел Форма
    if (messPart==this.partForm) {
      this.close();
      if (pos>0) {
        var root=document.compatMode=="CSS1Compat"?document.documentElement:document.body;
        var t=parseFloat(root.scrollTop);
        pos=(t>0)?pos+t:pos;
      }
      BoxAlert.message(arrFormMessage[messId],pos,focus,elem,posX,posY,indentX,indentY);
    }
  }
  return messResult;
}
//
function messageShow(messId,messPart,messResult,pos,focus) {
  Message.show(messId,messPart,messResult,pos,focus);
}
//
Message.close=function() {
  this.callElementId="";
  BoxAlert.cancel();
}
//
Message.text=function(fragment,pos,focus,callElementId,title) {
  if (fragment) {
    this.close();
    this.callElementId=(callElementId)?callElementId+"":"";
    // заголовок окна в контексте элемента
    if (this.callElementId.length>0) {
      var e=document.getElementById(this.callElementId);
      if (e) {
        // combo-компоненты
        if (e.tagName="TD") {
          e=domNodeParent(e,3);
          if (e.id==Lookup.lookupName) e=Lookup.getResultBox(e);
        }
        var t=e.getAttribute("data-title");
        title=(t)?t+"":"";
      }
    }
    title=(title)?title+"":"";
    if (title.length>0) BoxAlert.title(title);
    // show
    BoxAlert.message(fragment,pos,focus);
  }
}
// возвращает текст сообщения
Message.getTextById=function(id) {
  txt=(id>0)?arrFormMessage[id]:"";
  return (txt)?txt:"";
}
