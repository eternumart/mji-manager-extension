/***************************************************************

  1. позиционирование относительно viewport
       COORD.positionFix(element,0,1,0,0);
  2. позиционирование относительно другого элемента
       COORD.positionRelative(domElement,subElement,1,1,0,0);

****************************************************************/
var COORD={
  top: 0,
  left: 0,
  width: 0,
  height: 0,
  clientTop: 0,
  clientLeft: 0,
  scrollTop: 0,
  scrollLeft: 0,
  //
  init: function() {
    this.top=0;
    this.left=0;
    this.width=0;
    this.height=0;
    this.clientTop=0;
    this.clientLeft=0;
    this.scrollTop=0;
    this.scrollLeft=0;
  },
  setAttr: function() {
    this.init();
    var body=document.body;
    var docElem=document.documentElement;
    this.scrollTop=window.pageYOffset||docElem.scrollTop||body.scrollTop;
    this.scrollLeft=window.pageXOffset||docElem.scrollLeft||body.scrollLeft;
    this.clientTop=docElem.clientTop||body.clientTop||0;
    this.clientLeft=docElem.clientLeft||body.clientLeft||0;
    //
    this.top=Math.round(this.scrollTop-this.clientTop);
    this.left=Math.round(this.scrollLeft-this.clientLeft);
    this.width=(docElem.clientWidth==0||docElem.clientWidth>body.clientWidth)?body.clientWidth:docElem.clientWidth;
    this.height=(docElem.clientHeight==0||docElem.clientHeight>body.clientHeight)?body.clientHeight:docElem.clientHeight;
  },
  getOffsetRect: function(elem) {
    var top; var left;
    if (elem) {
      this.setAttr();
      var box=elem.getBoundingClientRect();
      if (box) {
        top=Math.round(box.top+this.scrollTop-this.clientTop);
        left=Math.round(box.left+this.scrollLeft-this.clientLeft);
      }
    }
    return {top:top, left:left, width:box.width, height:box.height}
  },
  getOffsetSum: function(elem) {
    var top=0; var left=0;
    var width=elem.offsetWidth;
    var height=elem.offsetHeight;
    while(elem) {
      top=top+parseInt(elem.offsetTop);
      left=left+parseInt(elem.offsetLeft);
      elem=elem.offsetParent;
    }
    return {top:top, left:left, width:width||0, height:height||0}
  },
  getOffset: function(elem) {
    var result;
    if (elem) {
      if (typeof(elem.getBoundingClientRect)=="function") result=this.getOffsetRect(elem);
      else result=this.getOffsetSum(elem);
    }
    return result;
  },
  // viewport
  getViewPort: function() {
    this.setAttr();
    return {top:this.top, right:this.left+this.width, bottom:this.top+this.height, left:this.left, width:this.width, height:this.height, scrollTop:this.scrollTop, scrollLeft:this.scrollLeft}
  },
  // позиционирование элемента относительно viewport (с учетом scroll)
  //   posX: CENTER/LEFT/RIGHT [0/1/2]
  //   posY: MIDDLE/TOP/BOTTOM [0/1/2]
  //   default: CENTER,MIDDLE    [0,0]
  //   indentX/indentY: дополнительный отступ
  positionFix: function(elem, posX, posY, indentX, indentY) {
    if (!elem) return;
    // дополнительный отступ
    indentX=parseInt(indentX); indentX=(isNaN(indentX))?0:indentX;
    indentY=parseInt(indentY); indentY=(isNaN(indentY))?0:indentY;
    //
    var x=(typeof(posX)=="string")?posX.toUpperCase():posX;
    var y=(typeof(posY)=="string")?posY.toUpperCase():posY;
    x=(x=="LEFT")?1:(x=="RIGHT")?2:parseInt(posX);
    y=(y=="TOP")?1:(y=="BOTTOM")?2:parseInt(posY);
    x=(x>-1)?x:0;
    y=(y>-1)?y:0;
    //
    var VP=COORD.getViewPort();
  //  var EB=elem.getBoundingClientRect();
    var EB=COORD.getOffset(elem);
    // горизонтально
    var coordX=0;
    switch (x) {
      // left
      case 1: coordX=VP.left+indentX; break;
      //right
      case 2: coordX=VP.right-EB.width-indentX; break;
      // center
      default: coordX=(VP.right-VP.left)/2-EB.width/2+indentX; break;
    }
    // вертикально
    var coordY=0;
    switch (y) {
      // top
      case 1: coordY=VP.top+indentY; break;
      // bottom
      case 2: coordY=VP.bottom-EB.height-indentY; break;
      // middle
      default: coordY=VP.height/2+VP.top-EB.height/2+indentY; break;
    }
    // позиционирование элемента
    if (coordX) {
      elem.style.left=Math.round(coordX)+"px";
      coordY=(VP.top>coordY)?VP.top:coordY;
      elem.style.top=Math.round(coordY)+"px"
    }
  },
  // позиционирование элемента относительно другого элемента
  //   posX:            -3/-2/-1/0/1  - центр/слева полностью/с left-позиции dom/относительно середины dom/справа
  //   posY:            -1/0/1           - над dom/на dom/под dom
  //   default:         -1,1
  //   indentX/indentY: дополнительный отступ, px
  positionRelative: function(domElem, subElem, posX, posY, indentX, indentY) {
    if (!domElem||!subElem) return;
    // дополнительный отступ
    indentX=parseInt(indentX); indentX=(isNaN(indentX))?0:indentX;
    indentY=parseInt(indentY); indentY=(isNaN(indentY))?0:indentY;
    //
    var D=COORD.getOffset(domElem);
    var E=COORD.getOffset(subElem);
    posX=parseInt(posX); posY=parseInt(posY);
    posX=(posX>-10)?posX:-1; posY=(posY>-10)?posY:1;
    // горизонтально
    var coordX=0;
    switch (posX) {
      // слева от dom
      case -2: coordX=D.left-E.width-indentX; break;
      // с left-позиции dom
      case -1: coordX=D.left+indentX; break;
      // относительно середины dom
      case 0: 
        coordX=D.left+D.width/2-E.width/2;
      break;
      // справа
      case 1:
        coordX=D.left+D.width+indentX;
      break;
    }
    // вертикально
    var coordY=0;
    switch (posY) {
      // над dom
      case -1: coordY=D.top-E.height-indentY; break;
      // на dom
      case 0: coordY=D.top+indentY; break;
      // под dom
      case 1: coordY=D.top+D.height+indentY; break;
    }
    // позиционирование
    subElem.style.left=Math.round(coordX)+"px";
    subElem.style.top=Math.round(coordY)+"px";
    // корректировка
    var VP=COORD.getViewPort();
    // центр по горизонтали
    if (posX==-3) subElem.style.left=parseInt((VP.right-VP.left)/2-E.width/2)+"px";
    // по горизонтали
    var vPosX;
    if (posX>-3&&(VP.width>D.width+E.width+indentX+2)) {
      // меняем поз. справа на поз. по центру
      if (posX>-2&&coordX+E.width>VP.right) vPosX=-3;  // vPosX=-2;
/*
      // меняем поз. справа на поз. слева
      if (posX>-2&&coordX+E.width>VP.right) vPosX=-2;
*/
      // меняем поз. слева на поз. справа
      if (posX==-2&&coordX<VP.left) vPosX=1;
    }
    // по вертикали
    var vPosY;
    if (VP.height>E.height+D.height+indentY+2) {
      // меняем поз. сверху на поз. снизу
      if (posY==-1&&VP.top>coordY) vPosY=1;
      // меняем поз. снизу на поз. сверху
      if (posY==1&&coordY+E.height>VP.bottom) vPosY=-1;
    }
    // рекурс. вызов для корректировки
    if (vPosX>-10||vPosY>-10) {
      vPosX=(isNaN(vPosX))?posX:vPosX;
      vPosY=(isNaN(vPosY))?posY:vPosY;
      this.positionRelative(domElem, subElem, vPosX, vPosY, indentX, indentY);
    }
  }
}
