//  ora-параметры вызовов
function formatIntParam(par,sign) {
  par=parseInt(par);
  if (sign) return ((isNaN(par))?"":par);
  else return ((par>0)?par:"");
}
// вызов: showForm
function getCallFormParam(formId,recId,sessionId,conTypeId,conId) {
  formId=formatIntParam(formId,true);
//  recId=formatIntParam(recId);
  recId=parseInt(recId);
  recId=(isNaN(recId))?0:recId;
  recId=(recId==0)?"":recId;
  conTypeId=formatIntParam(conTypeId);
  conId=formatIntParam(conId);
  sessionId=(sessionId==null)?"":sessionId;
  return "?formid="+formId+"&recid="+recId+"&userid="+sessionId+"&contypeid="+conTypeId+"&conid="+conId;
}
// вызов: showContainer
function getCallContainerParam(containerTypeId,containerId,sessionId,tagList,formId,recId) {
//  containerTypeId=formatIntParam(containerTypeId);
  containerTypeId=(isNaN(parseInt(containerTypeId)))?"":containerTypeId;
//  containerId=formatIntParam(containerId);
//  containerId=(isNaN(parseInt(containerId)))?"":containerId;
  containerId=(containerId==null||(containerId+"").length==0)?"":containerId;
  sessionId=(sessionId==null)?"":sessionId;
  formId=formatIntParam(formId)+"";
  recId=parseInt(recId);
  recId=(isNaN(recId))?0:recId;
  recId=(recId==0)?"":recId+"";
  // формирование ID
  if (formId.length>0) containerId=containerId+":"+formId;
  if (recId.length>0)   containerId=containerId+":"+recId;
  //
  return "?id="+containerId+"&typeid="+containerTypeId+"&userid="+sessionId+"&tag="+tagList;
}
// возвращает ссылку на класс container
function getContainer() {
  var res;
  if (typeof(Container)=="object") res=Container;
  else {
    if (typeof(parent.Container)=="object") res=parent.Container;
  }
  return res;
}
//
function containerDisable(flag) {
  var C=getContainer();
  if (C) C.disable(flag);
}
// вызов (асинхронный, уровня Форма) pls-функции
function formQuery(Control,callbackFuncName,param) {
  if (!Control) return false;
  var groupId=0;
  // элемент панели управления Control.id=CONTROL_PANEL_ITEM_ID
  if (parseInt(Control.id)>0) groupId=0;
  else groupId=(GroupConfig)?GroupConfig.getGroupNumByElement(Control):0;
  var serverFuncName=Control.getAttribute("data-buffer");
  var elementId=Control.id;
  // в атрибуте "data-version-element" находится item_id для запроса к истории
  var verElementId=parseInt(Control.getAttribute("data-version-element"));
  elementId=(isNaN(verElementId))?elementId:verElementId;
//alert(Control.tagName+"\n"+callbackFuncName +"\n"+param);
  if (typeof(Form)=="object") Form.actionAsync(serverFuncName,"callbackQuery",param,groupId,elementId,callbackFuncName);
}
// вызов (асинхронный) pls-функции
function execSrvFunc(Control,callbackFuncName,param) {
  Control=(typeof(Control)=="string")?document.getElementById(Control):Control;
  if (Control) {
    param=(param)?param:"";
    if (param.length>0) param=param.replace("#","$");
    if (typeof(Container)=="object") Container.query(Control,callbackFuncName,param);
    else {
      if (typeof(parent.Container)=="object") parent.Container.query(Control,callbackFuncName,param);
      else {
        formQuery(Control,callbackFuncName,param); // вызов уровня Форма
      }
    }
  }
}

function actionHREF(url,target) {
  if (typeof(Container)=="object") Container.getAhrefAction(url,target);
  else {
    if (typeof(parent.Container)=="object") parent.Container.getAhrefAction(url,target);
  }
}

// замена тег-значения в выражении формата: <startTag><value><endTag>...
function setTagValue(source,startTag,endTag,value) {
  var res=source;
  if (source&&source.length>0) {
    source=source.replace(/\s+/g,"");
    var pos1=source.indexOf(startTag);
    var pos2=source.indexOf(endTag,pos1);
    if (pos1>-1&&pos2>0) {
      var buf=source.substr(pos1,pos2-pos1+1);
      res=res.replace(buf,startTag+value+endTag);
    }
  }
  return res;
}

// html-text в стандартный tooltip
//    передача заголовка окна в начале text-параметра: <TITLE>заголовок</TITLE>контент...
function tooltip(text,posY,title) {
  text=(text)?text+"":"";
  if (text.length==0) return false;
  // возврат заголовка окна: <TITLE>заголовок</TITLE>
  if (text.substr(0,7)=="<TITLE>") {
    var pos=text.indexOf("</TITLE>");
    if (pos>0) {
      title=text.substr(0,pos+8);
      text=text.substr(title.length);
      title=title.substr(7,title.length-15);
    }
  }
  //
  if (typeof(Container)=="object") {
    var frm=Container.getCanvasFrame();
    // активная форма существует
    if (frm.Form) {
      frm.Message.text(text,posY,null,null,title);
    }
  }
  else {
    Message.text(text,posY,null,null,title);
  }
}

// html-text в tooltip с передачей id вызывающего элемента
//   первый параметр в text: id элемента: @elementId@html@
function tooltipElement(text,posY,title) {
  text=(text)?text+"":"";
  title=(title)?title+"":"";
  var elementId="";
  var sep1=(typeof(Form)=="object")?Form.separator1:Container.separator1;
  var pos=text.indexOf(sep1);
  if (pos>-1) {
    elementId=text.substr(0,pos);
    text=text.substr(pos+1);
  }
  Message.text(text,posY,null,elementId,title);
}
// tooltip для работы с формой
//  levelRef - уровень ссылки: 0/1 - контейнер/экземпляр формы
function tooltipForm(Control,formId,recId,width,height,title,elementId,levelRef) {
  width=parseInt(width)+"px";
  height=parseInt(height)+"px";
  levelRef=parseInt(levelRef);
  levelRef=(isNaN(levelRef))?1:levelRef;
  var containerId="";
  if (levelRef==0) {
    containerId=recId;
    recId="";
  }
//  var text="<iframe style='overflow:auto;resize:both;' src="+Form.actOra+getCallFormParam(formId,recId,Form.sessionId,"",containerId)+" width="+width+" height="+height+"></iframe>";
  elementId=(elementId)?elementId:"";
  if (typeof(Form)=="object") var F=Form; else var F=Container.getCanvasFrame().Form;
  var text="<iframe id="+BoxAlert.frameId+" style='overflow:auto;resize:both;border:none;' src="+F.actOra+getCallFormParam(formId,recId,F.sessionId,"",containerId)+" width="+width+" height="+height+" data-old-width=0"+" data-old-height=0"+" data-prev-element="+elementId+"></iframe>";
  Message.text(text,null,null,elementId,title);
}

// tooltip для показа результата работы сервер-функции во фрейме
function tooltipFrame(Control,width,height,title,containerId,containerTypeId,plsFuncName) {
  plsFuncName=(plsFuncName)?plsFuncName+"":"";
  plsFuncName=(plsFuncName.length==0)?"ACTION":plsFuncName;
  width=parseInt(width)+"px";
  height=parseInt(height)+"px";
  var Cls=(typeof(Form)=="object")?Form:Container;
  if (!Cls) return false;
  var formId="";
  var recId="";
  if (typeof(Form)=="object") {
    containerTypeId=Form.objForm.elements["CONTAINER_TYPE_ID"].value;
    containerId=formatIntParam(containerId)+"";
    containerId=(containerId.length>0)?containerId:Form.objForm.elements["CONTAINER_ID"].value;
//  containerId=Form.objForm.elements["CONTAINER_ID"].value;
    formId=Form.formId;
    recId=Form.recId;
  }
  var controlId=(typeof(Control)=="object")?Control.id:Control;
// param=Form.separator1+formatIntParam(Form.formId)+Form.separator1+formatIntParam(Form.recId)+Form.separator1+formatIntParam(containerTypeId)+Form.separator1+formatIntParam(containerId)+Form.separator1;
 param=Cls.separator1+formatIntParam(formId)+Cls.separator1+formatIntParam(recId)+Cls.separator1+formatIntParam(containerTypeId)+Cls.separator1+formatIntParam(containerId)+Cls.separator1+controlId+Cls.separator1;
  var text="<iframe style='overflow:auto;resize:both;border:none;' class='frameAction' src="+Cls.actOra+"?proc="+plsFuncName+"&func=&param="+param+"&setting=&userid="+Cls.sessionId+"&random="+" width="+width+" height="+height+"></iframe>";
  Message.text(text,null,null,null,title);
}

// mess в буфер обмена
function toClipboard(mess) {
  if (typeof(window.clipboardData)=="object"&&typeof(window.clipboardData.setData)=="function") window.clipboardData.setData("Text",mess);
}

// отмена события
function eventCancel(ev) {
  ev=ev||window.event;
  if (!ev) return true;
  ev.stopPropagation ? ev.stopPropagation() : (ev.cancelBubble=true);
  ev.preventDefault  ? ev.preventDefault()  : (ev.returnValue=false);
  return false;
}

//  контроль выхода onunload (снятие блокировок, если выход без сохранения)
//    страница должна иметь обработчики событий:
//      window.onbeforeunload = formCheckUnload;
//      window.onunload = formFinalize;
function formFinalize() {
  if ((typeof Form == "object")&&(Form.lockState==1)&&(Form.checkUnload))
    Form.block("UNLOCK",0); // разблокируем синхронно
//    Form.block("UNLOCK"); // разблокируем
  return true;
}
// снятие блокировок на before unload
function formCheckUnload(ev) {
//  var mess="Остались несохраненные изменения, которые будут потеряны в случае продолжения.";
  if ((typeof Form == "object")&&(Form.checkUnload)) {
    var mess=arrFormMessage[102];
    ev=ev||window.event;
    // предупреждение об оставшихся изменениях
    if (Form.lockState==1) {
      ev.returnValue=mess;
      return mess;
    }
    else {
      eventCancel(ev);
    }
  }
//  else return ""; FF
}
// mouse
function fixMouseEvent(e) {
  // получить объект событие для IE
  e=e||window.event
  // добавить pageX/pageY для IE
  if (e.pageX==null&&e.clientX!=null) {
    var html=document.documentElement;
    var body=document.body;
    e.pageX=e.clientX+(html&&html.scrollLeft||body&&body.scrollLeft||0)-(html.clientLeft||0);
    e.pageY=e.clientY+(html&&html.scrollTop ||body&&body.scrollTop ||0)-(html.clientTop ||0);
  }
  // добавить which для IE
  if (!e.which&&e.button) e.which=e.button&1?1:(e.button&2?3:(e.button&4?2:0));
  return e;
}
// координаты мыши
function getMouseCoord(e){
  var pageX; var pageY;
  e=e||window.event;
  if (e.pageX==null&&e.clientX!=null) {
    var html=document.documentElement;
    var body=document.body;
    pageX=e.clientX+(html&&html.scrollLeft||body&&body.scrollLeft||0)-(html.clientLeft||0);
    pageY=e.clientY+(html&&html.scrollTop||body&&body.scrollTop||0)-(html.clientTop||0);
  }
  return {x:pageX|e.pageX,y:pageY|e.pageY}
}
// key
// keypress символ (event.type должен быть keypress)
function getKeypressChar(event) {
  if (event.which==null) {  // IE
    if (event.keyCode<32) return null; // спец. символ
    return String.fromCharCode(event.keyCode)
  }
  if (event.which!=0&&event.charCode!=0) { // все кроме IE
    if (event.which<32) return null; // спец. символ
    return String.fromCharCode(event.which); // остальные
  }
  return null; // спец. символ
}
// event: srcElement

function getEventElement(ev) {
  return (ev.target)?ev.target:ev.srcElement;
}

/* тег-переменные */
//   формат: @FIELD_NAME_1|FIELD_VALUE_1@FIELD_NAME_2|FIELD_VALUE_2@..
var TagVar={
  TagVarArr : [],
  sep1      : "@",
  sep3      : "|",
  tagBegin   : "<%",
  tagEnd      : "%>",
  container : "containerTagVar",
  Container : null,
  Controls   : null     // массив INPUT элементов
}
// возвращает индекс переменной в массиве
TagVar.getIdx=function(name) {
  var idx;
  for (var i=0;i<this.TagVarArr.length;i++) {
    if (this.TagVarArr[i].name==name) {idx=i; break;}
  }
  return idx;
}
// добавляет/изменяет значение переменной name на value
TagVar.add=function(name,value) {
  if (name.length==0) return;
  var idx=this.getIdx(name);
  var obj={name:name,value:value};
  idx=(idx>-1)?idx:this.TagVarArr.length;
  this.TagVarArr[idx]=obj;
}
// возвращает строковую сборку переменных в формате: @FIELD_NAME_1|FIELD_VALUE_1@FIELD_NAME_2|FIELD_VALUE_2@..
TagVar.getStr=function() {
  var res=this.sep1;
  for (var i=0;i<this.TagVarArr.length;i++) res=res+this.TagVarArr[i].name+this.sep3+this.TagVarArr[i].value+this.sep1;
  res=(res==this.sep1)?"":res;
  return res;
}



TagVar.init=function() {
  if (!this.Controls) {
    if (!this.Container) this.Container=document.getElementById(this.container);
    if (this.Container) this.Controls=this.Container.getElementsByTagName("INPUT");
  }
}
//
TagVar.getControl=function(name) {
  var res;
  if (name&&name.length>0) {
    this.init();
    if (this.Controls) {
      for (var i=0;i<this.Controls.length;i++) {
        if (this.Controls[i].id==name) {res=this.Controls[i]; break;}
      }
    }
  }
  return res;
}
// присвоить значение переменной контейнера
TagVar.setValue=function(name,value) {
  var obj=this.getControl(name);
  if (obj) obj.value=value;
}
// возвращает значение переменной контейнера
TagVar.getValue=function(name) {
  var obj=this.getControl(name);
  return ((obj)?obj.value:"");
}
//!!! вместо getStr
// возвращает строковую сборку переменных в формате: @FIELD_NAME_1|FIELD_VALUE_1@FIELD_NAME_2|FIELD_VALUE_2@..
TagVar.getString=function(tagBegin,tagEnd) {
  tagBegin=tagBegin||""; tagBegin=(tagBegin.length==0)?this.sep1:tagBegin;
  tagEnd=tagEnd||""; tagEnd=(tagEnd.length==0)?tagBegin:tagEnd;
  var res="";
  if (tagBegin==tagEnd) {
    tagBegin="";
    res=tagEnd;
  }
  this.init();
  for (var i=0;i<this.Controls.length;i++)  {
//    if (this.Controls[i].id!="GROUP_CONFIG"&&this.Controls[i].value.length>0) res=res+this.Controls[i].name+this.sep3+this.Controls[i].value+this.sep1;
    if (this.Controls[i].id!="GROUP_CONFIG"&&this.Controls[i].value.length>0) 
      res=res+tagBegin+this.Controls[i].name+this.sep3+this.Controls[i].value+tagEnd;
  }
  return (res==tagEnd)?"":res;
}

/*
// возвращает строковую сборку переменных в формате: @FIELD_NAME_1|FIELD_VALUE_1@FIELD_NAME_2|FIELD_VALUE_2@..
TagVar.getString=function() {
  var res=this.sep1;
  this.init();
  for (var i=0;i<this.Controls.length;i++)  {
    if (this.Controls[i].id!="GROUP_CONFIG"&&this.Controls[i].value.length>0) res=res+this.Controls[i].name+this.sep3+this.Controls[i].value+this.sep1;
  }
  return (res==this.sep1)?"":res;
}
*/


// csv
// format
function csvFormat(pstr, pchr) {
  if (pstr) pstr=pstr+""; else return "";
  if (pstr==pchr) return "";
  pstr=(pstr.substr(0,1)==pchr)?pstr:pchr+pstr;
  pstr=(pstr.substr(pstr.length-1,1)==pchr)?pstr:pstr+pchr;
  return pstr;
}
// возвращает массив из строки с разделителями
function getCsvArr(pstr, pchr) {
var arr = new Array();
if ((pstr.length==0)||(pstr.indexOf(pchr)<0)) return arr;
// если первое значение null
if (pstr.substr(0,2)==(pchr+pchr)) pstr=pchr+"*"+pchr+pstr.substr(2);
// если последнее значение null
if (pstr.substr(pstr.length-2)==(pchr+pchr)) pstr=pstr.substr(0,pstr.length-1)+"*"+pchr;
// удаляем разделители слева и справа
if (pstr.substr(0,1)==pchr) pstr=pstr.substr(1); 
if (pstr.substr(pstr.length-1,1)==pchr) pstr=pstr.substr(0,pstr.length-1);
arr=pstr.split(pchr);
for (var i in arr) if (arr[i]=="*") arr[i]="";
return arr;
}
// возвращает элемент idx (от 1) из csv или null
function csvGetVal(str,sep,idx) {
str=str+""; str=(str.indexOf(sep)<0)?sep+str+sep:str;
var a=getCsvArr(str,sep);
return ((a.length>0)&&(idx>0)&&(idx<=a.length)) ? a[idx-1]: null;
}
// присваивает элементу idx (от 1) из csv значение val
function csvSetVal(str,val,sep,idx) {
var res=sep;
str=str+""; str=(str.indexOf(sep)<0)?sep+str+sep:str;
var a=getCsvArr(str,sep);
for (var i=0; i<a.length; i++) res=(i==idx-1)?res=res+val+sep:res=res+a[i]+sep;
res=(res==sep)?"":res;
return res;
}

// окно: mode: CENTER
function openWindow(url,width,height,title,mode) {
//  url=setParVal(url,"bind",getTagValues());
  var size;
  title=title||""; title=(title.length==0)?"":" - "+title;
  var params = "status=no,resizable=yes,toolbar=no,menubar=no,scrollbars=yes,location=no,channelmode=no,directories=no"; // fullscreen=1
  width = parseInt(width) || window.screen.availWidth-30;
  height = parseInt(height) || window.screen.availHeight-60;
  size="width="+width+","+"height="+height;
  params = size+","+params;
  var win;
  if (url.length>0) {
    win=window.open( "", "deltaExtWindow" );
    if (win) win.close();
    win=window.open(url,"deltaExtWindow",params);
    win.focus();
    // корректировка окна после загрузки
    win.onload=function() {
      var doc=this.document;
      doc.title=title;
      if (mode=="CENTER") {
        // корректировка размера окна под изображение
        var B=doc.documentElement.getElementsByTagName("BODY")[0];
        B.style.margin=0; B.style.padding=0;
        B.style.backgroundColor="#000";
        var M=domNodeFirstChild(B);
        if (M&&M.tagName=="IMG") {
//          width=Math.min(M.naturalWidth,screen.availWidth-100);
//          height=Math.min(M.naturalHeight+55,screen.availHeight-100);
          width=Math.min(M.width,screen.availWidth-100);
          height=Math.min(M.height+55,screen.availHeight-100);
          this.resizeTo(width,height);
          M.style.display="block";
          M.style.margin="0 auto";
        }
        // позиционирование
        width=Math.min(width,screen.availWidth); height=Math.min(height,screen.availHeight);
        this.moveTo(Math.max(0,(screen.availWidth-width)/2),Math.max(0,(screen.availHeight-height)/2));
      }
    }
  }
  return win;
}
