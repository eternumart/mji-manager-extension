var Checkbox = {
  checkedClassName      : "checked",
  uncheckedClassName : "unchecked",
  disabledClassName     : "disabled",
  state : ["unchecked","checked","disabled"]
}
// возвращает индекс текущего состояния по className
Checkbox.getStateIndex=function(Control) {
  var res=-1;
  if (Control) {
    var cl=Control.className;
    for (var i=0;i<this.state.length;i++) {
      if (cl==this.state[i]) {
        res=i; break;
      }
    }
  }
  return res;    
}

Checkbox.changeState=function(ev,Control,newState) {
  if (Control) {
    var Result=Control;
    if (Control.tagName=="INPUT") Control=domNodeNext(Control);
    else Result=domNodePrev(Control);
    if (!Result) return false;
    var mode=(Result.getAttribute("data-mode")=="3")?3:2;
    newState=parseInt(newState);
    newState=(newState==0||newState==1||newState==2)?newState:null;
    // "следующее" состояние, если newState не задан
    if (newState==null) {
      newState=this.getStateIndex(Control)+1;
      newState=(newState<mode)?newState:0;
    }
    Control.className=this.state[newState];
    Result.value=(newState<2)?newState:"";
    // бинарный режим: пишем 0, если default задан, иначе 0=NULL
    if (mode==2&&Result.value=="0") {
      if (isNaN(parseInt(Result.getAttribute("data-default")))) Result.value="";
    }
  }
  return eventCancel(ev);
}
//
Checkbox.getState=function(Control) {
  var res=this.getStateIndex(Control);
  return (res>1)?-1:res;
//  var res;
//  if (Control) res=(Control.className==this.checkedClassName)?1:0;
//  return res;
}
// change state on <space> keyup
Checkbox.changeStateKey=function(ev,Control) {
  if (Control&&Control.tagName=="A") {
    ev=ev||window.event;
    if (ev) {
      var k=ev.keyCode;
      if (k==32) return Control.click(ev,Control);
//      if (k==9) return true;
    }
    return true;
  }
//  else return eventCancel(ev);
}
