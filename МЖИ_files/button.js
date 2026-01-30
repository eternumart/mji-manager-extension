/********************************/
/*         кнопка: a href       */
/********************************/
var ButtonLink={
  classNameDisable : "buttonLinkDisable"
}
// активировать/деактивировать
//   Control: tag a href
ButtonLink.disable=function(Control,state) {
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
// возвращает признак disabled: true/false
ButtonLink.isDisabled=function(Control) {
  if (Control) return (Control.className.indexOf(this.classNameDisable)>-1);
  else return true;
}

/********************************/
/* кнопка: a href text gradient */
/********************************/
var ButtonGradient={
  classNameEnable  : "buttonGradientEnable",
  classNameDisable : "buttonGradientDisable",
  classNamePress   : "buttonGradientPress"
}
// проверка на покидание формы с данными (с confirm-диалогом)
ButtonGradient.isUnsavedData=function(Control) {
  var res=0; var cnt;
  if (typeof(Container)=="object" ) cnt=Container;
  if (!cnt&&typeof(parent.Container)=="object")  cnt=parent.Container;
  if (cnt) res=cnt.isUnsavedData("CONFIRM",Control);
  return res;
}
// смена статуса кнопки с фиксацией нажатия
//   state: 0/1 - отжать/нажать
ButtonGradient.setButtonFixState=function(Control,state) {
  if (Control) {
    if (state==1&&parseInt(Control.getAttribute("data-press"))==0) {
      Control.className=Control.className+" "+this.classNamePress;
      Control.setAttribute("data-press","1");
    }
    if (state==0&&parseInt(Control.getAttribute("data-press"))==1) {
      Control.className=Control.className.replace(" "+this.classNamePress,"");
      Control.setAttribute("data-press","0");
    }
  }
}
// radio-group
// возвращает соседний элемент группы
//   groupId: номер группы
//   mode:    PREV/NEXT
ButtonGradient.getGroupButtonSibling=function(Control,groupId,mode) {
  var res;
  mode=(mode=="PREV")?mode:"NEXT";
  var TD=(Control&&groupId>0)?domNodeParent(Control):null;
  if (TD&&TD.tagName=="TD") {
    var idx=TD.cellIndex;
    if (idx>0) {
      TD=(mode=="PREV")?domNodeParent(TD).cells[idx-1]:domNodeParent(TD).cells[idx+1];
      res=(TD)?domNodeFirstChild(TD):null;
    }
  }
  return (res&&parseInt(res.getAttribute("data-group"))==groupId)?res:null;
}
// radio-group
// синхронизировать состояние элементов группы
//   state: 0/1 - выключить/включить
ButtonGradient.actionGroupSync=function(ev,Control,state) {
  if (Control) {
    var group=parseInt(Control.getAttribute("data-group"));
    if (group>0) {
      // элементы группы справа от Control
      var btn=Control;
      while (btn!=null) {
        btn=this.getGroupButtonSibling(btn,group,"NEXT");
        this.setButtonFixState(btn,state);
      }
      // элементы группы слева от Control
      var btn=Control;
      while (btn!=null) {
        btn=this.getGroupButtonSibling(btn,group,"PREV");
        this.setButtonFixState(btn,state);
      }
    }
  }
}
//
ButtonGradient.action=function(ev,Control) {
  var state=0;
  var flagEventCancel=false;
  if (Control) {
    // проверка на покидание формы с изменениями
    if (Control.getAttribute("data-check-changed")=="1") {
      if (this.isUnsavedData(Control)==1) return false;
      flagEventCancel=false;
    }
    ev=window.event;
    state=parseInt(Control.getAttribute("data-disabled"));
    if (state==1&&ev) {
//      ev.returnValue=false; // для IE
//      if (ev.preventDefault) ev.preventDefault();
//      return false;
      return eventCancel(ev);
    }
    // radio-group
    var group=parseInt(Control.getAttribute("data-group"));
    this.actionGroupSync(ev,Control,0);  // выключить все
    // режим с фиксацией нажатия
    var fix=parseInt(Control.getAttribute("data-press"));
    if (fix==0) this.setButtonFixState(Control,1);
    state=(fix==1)?1:state;
    if (flagEventCancel) eventCancel(ev);
    Control.blur();
  }
  return (state==0);
}


/*
ButtonGradient.action=function(ev,Control) {
  var state=0;
  if (Control) {
    ev=window.event;
    state=parseInt(Control.getAttribute("data-disabled"));
    if (state==1) {
      ev.returnValue=false; // для IE
      if (ev.preventDefault) ev.preventDefault();
    } else {
      // режим с фиксацией нажатия
      var fix=parseInt(Control.getAttribute("data-press"));
      if (fix==0) {
        Control.className=Control.className+" "+this.classNamePress;
        Control.setAttribute("data-press","1");
//        eventCancel(ev);
        state=1;
      }
    }
  }
  return (state==0);
}
*/

// активировать/деактивировать
//   Control: tag a href
ButtonGradient.disable=function(Control,state) {
  if (Control) {
    state=(state)?true:false;
    Control.setAttribute("data-disabled",(state)?"1":"0");
    var clName=Control.className;
    if (clName.length>0) {
      var flagOff=clName.indexOf(this.classNameDisable)>-1;
      // --> disable
      if (state&&!flagOff) Control.className=clName.replace(" "+this.classNameEnable," "+this.classNameDisable);
      // --> enable
      else {
        if (!state&&flagOff) Control.className=clName.replace(" "+this.classNameDisable," "+this.classNameEnable);
        else return false;
      }
      Control.disabled=state;
    }
  }
}
// возвращает признак disabled: true/false
ButtonGradient.isDisabled=function(Control) {
  if (Control) return (Control.className.indexOf(this.classNameDisable)>-1);
  else return true;
}
// смена рисунка
ButtonGradient.changeImage=function(Control,imgName) {
  if (Control&&Control.tagName=="A") {
    var img=domNodeFirstChild(domNodeFirstChild(Control));
    if (img) img.src=Form.pathImage+imgName;
  }
}



/********************************/
/*             кнопка             */
/********************************/
var Button={
  classNameDisable : "disabled",
  classNamePress     : "fixed"
}
// проверка на покидание формы с данными (с confirm-диалогом)
Button.isUnsavedData=function(Control) {
  var res=0; var cnt;
  if (typeof(Container)=="object" ) cnt=Container;
  if (!cnt&&typeof(parent.Container)=="object")  cnt=parent.Container;
  if (cnt) res=cnt.isUnsavedData("CONFIRM",Control);
  return res;
}
// смена статуса кнопки с фиксацией нажатия
//   state: 0/1 - отжать/нажать
Button.setButtonFixState=function(Control,state) {
  if (Control) {
    var press=parseInt(Control.getAttribute("data-press"));
    press=(press==1)?1:0;
//    if (state==1&&parseInt(Control.getAttribute("data-press"))==0) {
    if (state==1&&press==0) {
      Control.className=Control.className+" "+this.classNamePress;
      Control.setAttribute("data-press","1");
    }
//    if (state==0&&parseInt(Control.getAttribute("data-press"))==1) {
    if (state==0&&press==1) {
      Control.className=Control.className.replace(" "+this.classNamePress,"");
      Control.setAttribute("data-press","0");
    }
  }
}
// статус кнопки с фиксацией нажатия, нажата: true
Button.isPressed=function(Control) {
  if (Control)
    return (parseInt(Control.getAttribute("data-press"))==1);
 else 
  return false;
}
// radio-group
// возвращает соседний элемент группы
//   groupId: номер группы
//   mode:    PREV/NEXT
Button.getGroupButtonSibling=function(Control,groupId,mode) {
  var res;
  mode=(mode=="PREV")?mode:"NEXT";
  var TD=(Control&&groupId>0)?domNodeParent(Control):null;
  if (TD&&TD.tagName=="TD") {
    var idx=TD.cellIndex;
    if (idx>0) {
      TD=(mode=="PREV")?domNodeParent(TD).cells[idx-1]:domNodeParent(TD).cells[idx+1];
      res=(TD)?domNodeFirstChild(TD):null;
    }
  }
  return (res&&parseInt(res.getAttribute("data-group"))==groupId)?res:null;
}
// radio-group
// синхронизировать состояние элементов группы
//   state: 0/1 - выключить/включить
Button.actionGroupSync=function(ev,Control,state) {
  if (Control) {
    var group=parseInt(Control.getAttribute("data-group"));
    if (group>0) {
      // элементы группы справа от Control
      var btn=Control;
      while (btn!=null) {
        btn=this.getGroupButtonSibling(btn,group,"NEXT");
        this.setButtonFixState(btn,state);
      }
      // элементы группы слева от Control
      var btn=Control;
      while (btn!=null) {
        btn=this.getGroupButtonSibling(btn,group,"PREV");
        this.setButtonFixState(btn,state);
      }
    }
  }
}
//
Button.action=function(ev,Control) {
  var state=0;
  var flagEventCancel=false;
  if (Control) {
    // проверка на покидание формы с изменениями
    if (Control.getAttribute("data-check-changed")=="1") {
      if (this.isUnsavedData(Control)==1) return false;
      flagEventCancel=false;
    }
    ev=window.event;
    state=parseInt(Control.getAttribute("data-disabled"));
    if (state==1&&ev) {
      return eventCancel(ev);
    }
    // radio-group
    var group=parseInt(Control.getAttribute("data-group"));
    this.actionGroupSync(ev,Control,0);  // выключить все
    // режим с фиксацией нажатия
    var fix=parseInt(Control.getAttribute("data-press"));
    if (fix==0) this.setButtonFixState(Control,1);
    state=(fix==1)?1:state;
    if (flagEventCancel) eventCancel(ev);
//    Control.blur();
  }
  return (state==0);
}
// активировать/деактивировать
//   Control: tag a href
Button.disable=function(Control,state) {
  if (Control) {
    state=(state)?true:false;
    Control.setAttribute("data-disabled",(state)?"1":"0");
    var clName=Control.className;
    if (clName.length>0) {
      var flagOff=clName.indexOf(this.classNameDisable)>-1;
      // --> disable
      if (state&&!flagOff) Control.className=Control.className+" "+this.classNameDisable;
      // --> enable
      else {
        if (!state&&flagOff) Control.className=Control.className.replace(" "+this.classNameDisable,"");
        else return false;
      }
      Control.disabled=state;
    }
  }
}
// возвращает признак disabled: true/false
Button.isDisabled=function(Control) {
  if (Control) return (Control.className.indexOf(this.classNameDisable)>-1);
  else return true;
}


/********************************/
// возвращает признак disabled: true/false
function isButtonDisabled(Control) {
  return (Control&&(ButtonGradient.isDisabled(Control)||ButtonLink.isDisabled(Control)));
}
