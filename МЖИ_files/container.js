var Container = {
  isFormLoad       : false,
  pathApp          : null,
  pathOra          : null,
  actOra           : null,
  hostPublisher    : null,
  urlReport         : null,                  // url-вызов BI- регламентированные отчеты
  urlBIConstructor : null,                   // url-вызов BI EE - конструктор
  containerId      : null,
  containerTypeId  : null,
  sessionId        : null,
  curFormId        : null,
  curRecId         : null,

  resizeGroupId : "",                         // id группы с height=100% (требует синхронизации размеров)
  resizeState : -1,

  btnSaveForm      : null,                  // кнопка Сохранить
  btnRefreshForm   : null,
  btnDraftForm     : null,                  // кнопка Черновик
  btnPrintForm     : null,
  btnReportForm    : null,
  panelTopName   : "containerTopPanel",
  btnSaveName      : "buttonFormSave",
  btnRefreshName : "buttonFormRefresh",
  btnDraftName       : "buttonFormDraft",
  btnBlankName     : "buttonFormBlank",     // загрузка по сценарию Blank
  btnPrintName     : "buttonFormPrint",
  btnReportName    : "buttonFormReport",
  btnSearchName    : "buttonFormSearch",
  btnCreateName    : "buttonFormCreate",    // создание (commit) перед показом
  formCanvasName   : "formCanvas",
  frameForm        : null,
  frameTreeName    : "groupTreeview",       // навигатор по группам формы
  frameTreeview    : null,
  reportTypeCode   : "",                    // путь к формуляр-отчету на тип контейнера
  controlNavigator : null,
  lkpContainerType : "CONTAINER_TYPE",      // lookup Тип контейнера
  isAction         : false,                 // признак обращения к серверу
  separator1       : "@",
  separator4       : ":",
  FormFocus        : {formId:null,recId:null,groupId:null,elementId:null,elementName:null,action:false},
//  isFormBackMode : false,                  // true/false: регистация режима Возврат для загрузки формы
  pingTimeout        : 1000                   // максимальное время ожиданиия ответа сервера, мс
}

Container.getContainerAttributeByName=function(parName) {
  var obj=document.getElementById(parName);
  if (obj) return obj.value;
  else return "";
}
//
Container.ini=function(sessionId,pathApp,pathOra,oraProcName,containerId,containerTypeId,hostPublisher,reportTypeCode,urlReport,pingTimeout,urlBIConstructor) {
  this.sessionId=sessionId;
  this.pathApp=pathApp;
  this.pathOra=pathOra;
  this.actOra=pathOra+oraProcName;
  this.hostPublisher=hostPublisher;
  this.containerId=parseInt(containerId);
  this.containerId=(isNaN(this.containerId))?0:this.containerId;
  this.containerTypeId=parseInt(containerTypeId);
  this.hostPublisher=hostPublisher;
  this.reportTypeCode=reportTypeCode;
  this.urlReport=urlReport;
  this.pingTimeout=pingTimeout;
  this.urlBIConstructor=urlBIConstructor;
}

// корректировка высоты таблицы рабочей области
//  mode: 0/1 - resize/load
Container.size=function(mode) {
  mode=(mode==1)?1:0;
//  if (mode==1&&this.resizeState==1) return false;
  this.resizeState=(mode==0)?-1:1;
  var F=document.getElementById(this.formCanvasName);
  var b=parseInt(getElementComputedStyle(F,"border-top-width"));
  b=(b)?b:1;
  var VP=getViewportSize();
  var h=parseInt(VP.height);
  F.style.height=(h-offsetPosition(F).top-b*2 )+"px";
  F.style.width="";

//  var frm=this.getCanvasFrame();
//  frm.style.width="";

  // resize: синхронизация размеров грид-группы с высотой 100%
  if (mode==1&&this.resizeGroupId.length>0) {
    var frm=this.getCanvasFrame();
    if (frm&&frm.GridGroupQuery) {
//      frm.GridGroupQuery.init(this.resizeGroupId,null,-1);
      frm.GridGroupQuery.init(this.resizeGroupId);
    }
  }
  document.body.style.overflow="auto";
  return {frameHeight:F.style.height}
}
//
Container.set=function(sessionId,curFormId,curRecId) {
//  this.size();    // размеры рабочей области
  this.sessionId=sessionId;
  this.curFormId=curFormId;
  this.curRecId=curRecId;
  this.btnSaveForm=document.getElementById(this.btnSaveName);
  this.btnDraftForm=document.getElementById(this.btnDraftName);
  this.isAction=false;
}
// возвращает признак наличия несохраненных данных: 0/1 - нет/есть
// mode: CONFIRM -  показать диалог: Продолжить? (mess_id=102)
Container.isUnsavedData=function(mode,Control) {
  var res=0;
  var frm=this.getCanvasFrame();
  // активная форма существует
  if (frm.Form) {
    res=(frm.Form.lockState==0)?0:1;
    res=(res==0&&frm.Form.isChanged)?1:res;
    res=(res==1&&Control&&Control.id==frm.Form.btnSaveName)?0:res;
  }
  else res=0;
  if (res==1&&mode=="CONFIRM") {
    res=(window.confirm(frm.arrFormMessage[102]))?0:res;
    // разблокируем (синхронно)
    if (res==0) frm.Form.block("UNLOCK",0);
  }
  return res;
}
// A HREF
Container.getAhref=function() {
  return document.getElementById("actionControl");
}
// A HREF execute
Container.getAhrefAction=function(url,target) {
  if (url&&url.length>0) {
    var A=this.getAhref();
    if (A) {
      if (target&&target.length>0) A.target=target;
      A.href=url;
      A.click();
    }
  }
}
// MENU
Container.getMenuTop=function() {
  return document.getElementById("panelMenuTop");
}
// TITLE
Container.getTitleBox=function() {
  return document.getElementById("title");
}
Container.setTitle=function(txt) {
  txt=txt||"";
  if (txt.length>0) {
    var A=this.getTitleBox();
    if (A) A.innerHTML=txt;
  }
}
//
Container.disable=function(flag) {
  var div=document.getElementById("containerOverlay");
  if (flag==1) {
    if (div&&div.className=="off") div.className="on"; 
  } else {
    if (div&&div.className=="on")  div.className="off";
  }
}
//
Container.setActiveButton=function(containerTypeId) {
  containerTypeId=parseInt(containerTypeId);
  if (containerTypeId>0) {
    this.containerTypeId=containerTypeId;
    // активация кнопки вызова контейнера
    var menuTop=this.getMenuTop();
    if (menuTop) {
      var arr=menuTop.getElementsByTagName("A");
      if (arr&&arr.length>0) {
        for (var i=0;i<arr.length;i++) {
          var id=arr[i].getAttribute("data-container");
          var list=arr[i].getAttribute("data-overload");
          list=(list)?list:"";
          if (id>0||list.length>0) {
            var flag=false;
            flag=(id==this.containerTypeId) ;
            if (!flag) {
              // список overload вариаций
//              var list=arr[i].getAttribute("data-overload");
              flag=(list.indexOf("|"+this.containerTypeId+"|")>-1);
            }
            if (flag) {Button.action(null,arr[i]); break;}
          }
        }
      }
    }
  }
}
// видимость элементов сохранения/обновления формы
Container.buttonSaveDisable=function(flag) {
  if (!this.btnSaveForm)  this.btnSaveForm=document.getElementById(this.btnSaveName);
  if (!this.btnDraftForm) this.btnDraftForm=document.getElementById(this.btnDraftName);
  if (this.btnSaveForm)  ButtonGradient.disable(this.btnSaveForm,flag);
  if (this.btnDraftForm) ButtonGradient.disable(this.btnDraftForm,flag);
}
// возвращает контейнер <a> имени пользователя
Container.getUserBox=function() {
  var res;
  var box=document.getElementById("userBox");
  if (box) {
    res=domNodeNext(domNodeFirstChild(box));
  }
  return res;
}
// set для Login
Container.setUserName=function(userName) {
  userName=userName||"";
  if (userName.length>0) {
//    var box=document.getElementById("userBox");
//    if (box) domNodeFirstChild(box).innerHTML=userName;
    var box=this.getUserBox();
    if (box) box.innerHTML=userName;
  }
}
//
Container.formRefresh=function(control) {
  var frm=this.getCanvasFrame();
  if (frm.Form) {
    frm.Form.refresh();

  }
}
// возвращает ссылку на "рабочий" iframe
Container.getCanvasFrame=function() {
  var frm;
  for (var i=0;i<window.frames.length;i++) {
    if (window.frames[i].name==this.formCanvasName) {frm=window.frames[i]; break;}
  }
  if (!frm) window.frames[0];
  return frm;
}
//
//  mode: 1:BACK
Container.formLoad=function(formId,recId,mode) {
  var conTypeId;
  var frm=this.getCanvasFrame();
  if (frm.Form) {
    if (mode==1) {
      // грид-конфигурация
      var conf=GridSqlStore.data[0];
      if (conf==null) {
        // из строки параметров url контейнера
        var url=window.location.search+"";
        url=decodeURIComponent(url.substr(url.indexOf("&tag=")+5));
        GridSqlStore.byString(url);
        conf=GridSqlStore.data[0];
      }
      if (conf) {
        if (conf.id>0&&conf.filter.length>0) {
          this.regFormFocus(formId,recId,conf.id,"BUTTON_REFRESH","",true);
        }
      }
    }
//    frm.Form.disable(true);
    frm.Form.load(formId,recId);
  }
  else {
    if (!this.frameForm) this.frameForm=document.getElementById(this.formCanvasName);
    if (this.frameForm) this.frameForm.src=this.actOra+getCallFormParam(formId,recId,this.sessionId,this.containerTypeId,this.containerId);
  }
//  if (this.frameTreeview) this.frameTreeview.style.display="none";
}
// Сохранение активной формы контейнера
//   mode: 0/1 - DRAFT/CHECK (0 - как черновик со статусом INVALID)
Container.formSave=function(button,mode) {
  var frm=this.getCanvasFrame();
  if (frm.Form) {
    frm.Form.save(button,mode);
  }
}
//
// Сохранение активной формы контейнера с предварительной проверкой связи
//   timeout<50ms игнорируем (табл. T_TUNINGS, параметр PING_TIMEOUT)
Container.formSavePing=function(button,mode) {
  if (button) {
    if (this.pingTimeout>50) Process.checkConnect(1,button.id+";"+mode); else this.formSave(button,mode);
  }
}
//
Container.load=function(containerTypeId,containerId,tagList,control,formId,recId) {
  tagList=(tagList)?tagList:"<";
  // регистрация элемента-инициатора акции
  if (control) {
    var btnName=(control.getAttribute("data-press")==1)?control.id:"";
    // popup
    var menuLevel=parseInt(control.getAttribute("data-menu-level"));
    if (menuLevel>1) {
      var controlParent=domNodeFirstChild(domFirstParentByTag(control,"TD"));
      btnName=(controlParent)?controlParent.id:btnName;
    }
    tagList=tagList+"ACTIVE_COMPONENT:"+btnName+">";
  }
//  if (control&&control.getAttribute("data-press")==1) tagList=tagList+"ACTIVE_COMPONENT:"+control.id+">";
  // восстановим тип контейнера для показа бланка
  if (control&&control.id==this.btnBlankName) {
    containerTypeId=containerTypeId||this.containerTypeId;
    containerId=-1;
  }
  if (!containerId) containerTypeId=containerTypeId||this.containerTypeId;
  tagList=(tagList=="<")?"":tagList;
  // !!! GRID CONFIG STORAGE: сохранение параметров активной группы для get-хранения
  if (tagList.length==0) {
    tagList=GridSqlStore.toString();
    tagList=encodeURIComponent(tagList);
  }
//  var url=this.actOra+getCallContainerParam(containerTypeId,containerId,this.sessionId,encodeURIComponent(tagList));
  var url=this.actOra+getCallContainerParam(containerTypeId,containerId,this.sessionId,tagList,formId,recId);
  document.location.replace(url);
}
//
Container.loadChildBlank=function(containerTypeId,formId) {
  var frm=this.getCanvasFrame();
  if (frm) {
    var parentId=frm.Form.getAttributeNumber("CONTAINER_PARENT_ID");
    parentId=(parentId>0)?parentId:this.containerId;
    this.load(containerTypeId,-1,"<CONTAINER_PARENT_ID|"+parentId+">",null,formId);
  }
}
//
Container.action=function(id,params) {
  var objForm=document.forms["frmParams"];
  if (objForm) {
    objForm.elements["userid"].value=this.sessionId;
    objForm.elements["id"].value=id;
    objForm.elements["params"].value=params;
    objForm.action=Form.actOra;
    objForm.submit();
  }
}
//
Container.create=function(containerTypeId,recId) {
  var frm=this.getCanvasFrame();
  containerTypeId=(containerTypeId)?containerTypeId:this.containerTypeId;
  if (recId>0&&frm&&frm.Form) frm.Form.action(containerTypeId,recId);
}
// load: tree view group-navigator
Container.loadTreeGroupNavigator=function(formId) {
/*
  if (formId>0) {
    if (!this.frameTreeview) this.frameTreeview=document.getElementById(this.frameTreeName);
    if (this.frameTreeview) {
      this.frameTreeview.style.display="block";
      var url=this.actOra+"?proc=TREEVIEW&func=&param="+formId+"&setting=&userid=&random=";
      this.frameTreeview.src=url;
    }
  }
*/
}

Container.resizeTreeGroupNavigator=function(Frame) {
//  Frame.style.height=Frame.contentWindow.document.body.scrollHeight+4+"px";
}

// показать элемент
Container.actionTreeGroupNavigator=function(groupId) {
  if (groupId>0) {
    var frm=this.getCanvasFrame();
    if (frm) frm.Form.elementScrollView("group_"+groupId);
  }
//  if (groupId>0&&window.frames[1].Form) window.frames[1].Form.elementScrollView("group_"+groupId);
//  return false;
}
// фокус группы (первый активный элемент)
Container.tabTreeGroupNavigator=function(node) {
  if (node&&node.tagName=="LI") {
    var groupId=node.id.split("|")[0];
    if (groupId>0) {
      var frm=this.getCanvasFrame();
      if (frm) frm.Form.setFocusGroup("group_"+groupId);
    }
//    if (groupId>0&&window.frames[1].Form) window.frames[1].Form.setFocusGroup("group_"+groupId);
  }
  return false;
}
// завершение сеанса пользователя
Container.logout=function(Control) {
  this.sessionId="";
  // внешний AM
  if (Control) this.getAhrefAction(Control.getAttribute("data-logout-url"));
  // внутренний вариант отключения
  else {
    var frm=this.getCanvasFrame();
    if (frm.Form) frm.Form.logout();
  }
}

// регистрация характеристик фокус-элемента
Container.regFormFocus=function(formId,recId,groupId,elementId,elementName,action) {
  this.FormFocus.formId=formId;
  this.FormFocus.recId=recId;
  this.FormFocus.groupId=groupId;
  this.FormFocus.elementId=elementId;
  this.FormFocus.elementName=elementName;
  this.FormFocus.action=(action)?true:false;
}

// печать
Container.print=function(path) {
  path=path||"";
  // путь к отчету
  var str=(path.length>0)?path:"";
  // печать формуляра контейнера (на containerId)
  if (str.length==0) {
    if (this.reportTypeCode.length==0) alert("Container type: <"+this.containerTypeId+"> - UNDEFINED");
    str=(this.containerId>0)?this.reportTypeCode+this.containerId:"";
  }
  // show
  if (str.length>0) window.open(this.hostPublisher+str,"_blank");
/*
  if (str.length>0) {
    var a=this.getAhref();
    a.target="_blank";
    a.href=this.hostPublisher+str;
    a.click();
  }
*/
}
// отчеты регламентированные
Container.report=function() {
  window.open(this.urlReport);
}
//
// BI EE конструктор отчетов
Container.reportConstructor=function() {
  window.open(this.urlBIConstructor);
}
// HELP
Container.help=function() {
  window.open(this.pathApp+"help/index.html");
}
// смена типа контейнера
function changeTypeCallback(text) {
  if (text) {
    var pos=text.indexOf(Container.separator1);
    if (pos<0) return false;
    var res=(text)?parseInt(text.substr(0,pos)):null;
    text=text.substr(pos);
    // reload form
    if (res==1) {
      // разбор строки параметров: recId / formId / containerId / containerTypeId (сборка в web.main, proc=CONTAINER_TYPE)
      var arr=getCsvArr(text,Container.separator1);
      if (arr.length>0) {
        Container.containerId=arr[2];
        Container.containerTypeId=arr[3];
        Container.formLoad(arr[1],arr[0]);
      }
    }
    // ошибка
    if (res<1) {
      // воccтановим состояние lookup Тип контейнера
      var lkpContainerType=document.getElementById(Container.lkpContainerType);
      Lookup.setValue(lkpContainerType,Container.containerTypeId);
      var frm=Container.getCanvasFrame();
      if (frm.Form) frm.Form.text(text.substr(1)); else alert(text.substr(1));
    }
  }
}
// смена типа контейнера
Container.changeType=function(ev,Control,newTypeId) {
  newTypeId=parseInt(newTypeId);
  newTypeId=(isNaN(newTypeId))?"":newTypeId+"";
  newTypeId=(newTypeId.length==0)?Control.value:newTypeId;
  if (newTypeId.length==0||parseInt(newTypeId)==this.containerTypeId) return false;
  var frm=this.getCanvasFrame();
  if (frm&&frm.Form&&this.containerTypeId&&this.containerId&&frm.Form.recId>0) {
    var sep=this.separator1;
    var cbFuncName="changeTypeCallback";
    // сборка строки параметров: recId / formId / containerId / containerTypeId
    var param=sep+frm.Form.recId+sep+frm.Form.formId+sep+this.containerId+sep+newTypeId+sep;
    var url=this.actOra+"?proc=CONTAINER_TYPE"+"&func="+cbFuncName+"&param="+param+"&setting="+""+"&userid="+frm.Form.sessionId+"&random="+Math.random().toString();
//alert(url);
//toClipboard(url);
    queryXmlHttp(url,'GET',1);
  }
}

// статус
Container.formStatus=function(status) {
  var frm=this.getCanvasFrame();
  if (frm&&frm.Form) frm.Form.changeStatus(this.containerTypeId,this.containerId,status);
}

Container.query=function(Control,callbackFuncName,param) {
  if (!Control) return false;
  var frm=this.getCanvasFrame();
  if (!frm) return false;
  var groupId=0;
  // элемент панели управления Control.id=CONTROL_PANEL_ITEM_ID
  if (parseInt(Control.id)>0) groupId=0;
  else groupId=(frm.GroupConfig)?frm.GroupConfig.getGroupNumByElement(Control):0;
  var serverFuncName=Control.getAttribute("data-buffer");
  var elementId=Control.id;
  // в атрибуте "data-version-element" находится item_id для запроса к истории
  var verElementId=parseInt(Control.getAttribute("data-version-element"));
  elementId=(isNaN(verElementId))?elementId:verElementId;
//alert(Control.tagName+"\n"+callbackFuncName +"\n"+param);
  if (frm.Form) frm.Form.actionAsync(serverFuncName,"callbackQuery",param,groupId,elementId,callbackFuncName);
}

/*===============================================*/
/*                   process                     */
/*===============================================*/
// server process params
var Process = {
  progressId      : null,
  control         : null,
  boxCheckConnect : "checkConnect"
}
// before start server proc
Process.start=function(control) {
  document.getElementById("userBox").style.display="none";
  // кнопки
//  process.control=null;
//  if (control) {control.disabled=true; process.control=control;}
  document.body.style.cursor="wait";
}
// after show server proc
Process.stop=function() {
  document.getElementById("userBox").style.display="inline";
  // кнопки
  document.body.style.cursor="default";
}
// управление индикаторами проверки связи
Process.checkConnectControl=function(key) {
  key=parseInt(key);
  // активируем попытку перевести форму в режим Редактирование
  if (key>-1&&typeof(Container)=="object") {
    var frm=Container.getCanvasFrame();
    if (frm&&frm.Form) frm.Form.setEditMode(true);
  }
//  var boxUser=Container.getUserBox();
  var boxUser=Container.getTitleBox();
  var color="";
  if (boxUser) {
//    color=(key<0)?"red":(key>0)?"green":color;
//    boxUser.style.color=color;
//    boxUser.style.cursor="default";
    color=(key<0)?"red":"";
    boxUser.style.color=color;
    domNodeParent(boxUser).style.cursor="";
  }
/*
  // лампочки
  var box0=document.getElementById(Process.boxCheckConnect+"None");
  var box1=document.getElementById(Process.boxCheckConnect);
  var box2=document.getElementById(Process.boxCheckConnect+"Error");
  if (box0&&box1&&box2) {
    if (key==-1) {
      box0.style.display="none";
      box1.style.display="none";
      box2.style.display="inline";
    }
    if (key==0) {
      box0.style.display="inline";
      box1.style.display="none";
      box2.style.display="none";
    }
    if (key==1) {
      box1.style.display="inline";
      box0.style.display="none";
      box2.style.display="none";
    }
  }
*/
} 
// check connect
// callback для проверки связи
function errHandlerCheckConnect() {
  Process.checkConnectControl(-1);
  var frm=Container.getCanvasFrame();
  if (frm.Form) frm.Form.mess(401);
//  alert("Connect error");
}
// callback для проверки связи
function callbackCheckConnect(text) {
  Process.checkConnectControl(1);
  // передача управления процедуре сохранения формы
  var pos=text.indexOf(";");
  if (pos>-1) {
    text=text.substr(pos+1);
    var pos=text.indexOf(";");
    if (pos>-1) {
      var Control=document.getElementById(text.substr(0,pos));
      Container.formSave(Control,text.substr(pos+1));
    }
  }
//  var box=document.getElementById(Process.boxCheckConnect);
//  if (box) box.className=box.id;
//  alert("check result: "+text);
}
// mode:  1-режим проверки связи перед сохранением
// param: параметры для обработки возврата в режиме 1
Process.checkConnect=function(mode,param,Control) {
  // для UserBox
  if (Control&&Control.tagName=="A") {
//    Control.style.color="#ccc";
    Control.style.cursor="wait";
    domNodeFirstChild(Control).style.color="#eee";
  }
  param=(param&&param.length>0)?param:"";
  mode=parseInt(mode); if (isNaN(mode)) mode=""; 
  mode=(mode==1)?param:"";
  //
  var funcName="callbackCheckConnect";
  var url=Container.actOra+"?proc=CHECK"+"&func="+funcName+"&param="+mode+"&setting=&userid=&random="+Math.random().toString();
  queryXmlHttp(url,'GET',1,errHandlerCheckConnect,Container.pingTimeout);
}

Process.checkConnectDialog=function(Control) {
  if (Control) {
    var controlRect=getElementRect(Control);
  } else {
    var controlRect={left:200}
  }
  var url=Container.pathApp+"serverPing.html";
  var params = "width=400,height=300,status=0,resizable=0,toolbar=0,menubar=0,scrollbars=0,location=0,channelmode=0,directories=0,left="+(controlRect.left-100)+",top=100"; // fullscreen=1
  var pingWindow=window.open(url,"_blank",params);
//    var pingWindow=openWindow(Container.pathApp+"serverPing.html");
}

/*===============================================*/
/*                 function                      */
/*===============================================*/
// интерфейс для обработчика TAB KEY PRESS
// node: LI позиции дерева
function treeTabKeyPress(node) {
  Container.tabTreeGroupNavigator(node);
}

/*===============================================*/
/*          Изменение размеров области           */
/*===============================================*/
var Splitter = {
  panelLeft  : null,
  separator  : null,
  posX       : null,
  posY       : null,
  panelWidth : null
}
Splitter.start=function(e,obj) {
  this.cancel();
  document.onmouseup=function(e) {Splitter.cancel()}
  document.onmousemove=function(e) {Splitter.move(e)}
  document.onmousedown=document.onselectstart=function() {return false}
  if (obj) {
    e=e||window.event;
    this.panelLeft=domNodePrev(obj);
    if (this.panelLeft.tagName!="TD") return false;
//    var panelRight=domNodeNext(obj);
//    panelRight.style.width=getBounds(panelRight).width+"px";
    this.separator=obj;
    this.separator.style.backgroundColor="#eee";  //"#718B8E";
    this.separator.style.cursor="move";
    document.body.style.cursor="move";
    // горизонтально
    if (this.separator.className=="x-separator") {
      posY=null;
      posX=getMouseCoord(e).x+document.body.scrollLeft-obj.offsetWidth;  //начальная точка захвата
    }
    else {}
  }
}
Splitter.cancel=function() {
  document.onmouseup=null;
  document.onmousedown=null;
  document.onmousemove=null;
  document.onselectstart=null;
  if (this.separator) {
    this.separator.style.cursor="col-resize";
    this.separator.style.backgroundColor="#fff";
    this.separator=null;
    this.panelLeft=null;
    this.posX=null;
    this.posY=null;
  }
  document.body.style.cursor="default";
}
Splitter.move=function(e) {
  if (this.panelLeft) {
    e=e||window.event;
    var d=getMouseCoord(e).x;
    if (d>0) this.panelLeft.style.width=d+"px";
  }
}
Splitter.full=function(e,key,panel) {
  function act(panel,pair) {
    if (panel.style.width=="100%") {
      panel.style.width=this.panelWidth;      // восстанавливаем размер
//      pair.style.width="";
      pair.style.width=getBounds(pair).width+"px";
    } else {
      this.panelWidth=getBounds(panel).width; // запоминаем для возврата
      panel.style.width="100%";
//      pair.style.width="";
      pair.style.width=getBounds(pair).width+"px";
    }
  }
  key=parseInt(key);
  if (panel&&panel.tagName=="TD") {
    var objLeft=domNodeFirstChild(domNodeParent(panel));
    var objRight=panel;
    if (objLeft&&objRight) (key==0)?act(objLeft,objRight):act(objRight,objLeft);
  }
}

// хранитель конфигурации групп GRID_SQL
//    сохранить:       GridSqlStore.store
//    восстановить: GridSqlStore.restore
var GridSqlStore={
  sep       : "SG:",   // разделитель групп при строковой сборке
  data     : [],
  getIdx  : 
    function(id) {
      var idx=null;
      if (id>0) {
        if (this.data.length>0) {
          for (var key in this.data) {if (this.data[key].id==id) {idx=key; break;}}
        }
      }
      return idx;
    },
  save     : 
    function(conf) {
      var idx=null;
      if (conf) {
        idx=this.getIdx(conf.id);
        // восстановим REC_ID, если новый отсутствует
        if (idx&&idx!=null&&conf.focusRecId<0) {
          conf.focusRecId=this.data[idx].focusRecId;
          conf.focusRecNum=this.data[idx].focusRecNum;
        }
        idx=(idx>-1)?idx:(this.data.length>0)?this.data.length-1:0;
        idx=(idx)?idx:0;
        this.data[idx]=conf;
      }
      return idx;
    },
  store    : 
    function(id,filter,order,check,focusRecId,focusRecNum) {
      var conf = new Object();
      if (id>0) {
        conf.id=id;
        conf.filter=NVL(filter,"");
        conf.order=NVL(order,"");
        conf.check=NVL(check,"");
        conf.focusRecId=parseInt(focusRecId);
        conf.focusRecId=(isNaN(conf.focusRecId) )?-1:conf.focusRecId;
        conf.focusRecNum=focusRecNum;
        this.save(conf);
      }
    },
  restore:
    function(id) {
       var idx=this.getIdx(id);
       if (idx==null) return null; else return this.data[idx];
    },
  //
  tagStart:
    function(groupId) {
       return this.sep+groupId+"@";
    },
  tagEnd:
    function() {
       return this.sep+"0@";
    },
  toString:
    function() {
       var res="";
       if (this.data.length>0) {
         for (var i=0;i<this.data.length;i++)
           res=this.tagStart(this.data[i].id)+this.data[i].id+"|"+this.data[i].filter+"|"+this.data[i].order+"|"+this.data[i].check+"|"+this.data[i].focusRecId+"|"+this.data[i].focusRecNum+this.tagEnd();
      }
      return res;
    },
  byString:
    function(str) {
      str=(str)?str+"":"";
      if (str.length==0) return null;
      var arr=str.split(this.sep);
      // по группам
      for (var i=0;i<arr.length;i++) {
        var n=parseInt(arr[i].substr(0,arr[i].indexOf("@")));
        if (n>0) {
          arr[i]=arr[i].substr(arr[i].indexOf("@")+1);
          // по элементам
          var a=arr[i].split("|");
          this.store(a[0],a[1],a[2],a[3],a[4],a[5]);
        }
      }
    }
}
