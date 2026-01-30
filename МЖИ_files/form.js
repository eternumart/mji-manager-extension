/*====================================*/
/*               Form                 */
/*====================================*/
var Form = {
  // доступ
  pathApp           : null,
  pathOra           : null,
  actOra            : null,
  actOraFlex        : null,
  pathBI            : null,
  pathImage         : null,
  // константы/атрибуты
  separator1        : "@",
  separator3        : "|",
  formName          : null,                // dom-id формы
  formTitle         : "",
  recId             : null,
  formId            : null,
  sessionId         : null,
  lockMode          : 2,                   // код метода управления конкурентным доступом
  lockState         : 0,                   // статус: -1/0/1 : ожидание блокировки/чтение/редактирование
  isNewRec          : false,               // признак: новый экземпляр формы
  isChanged         : false,               // признак изменения данных
  isContainerForm   : false,
  isGroupNavigator  : false,               // признак присутствия навигатора групп
  checkUnload       : true,                // проверка покидания формы
  messText          : "",                  // сообщение от сервера
  messType          : 0,                   // тип сообщения от сервера: -1/0/1 - ошибка/пусто/сообщение
  // элементы
  objForm           : null,                // форма
  pnlControl        : null,                // панель управления
  btnSaveForm       : null,                // кнопка Сохранить
  btnRefreshForm    : null,                // кнопка Обновить
  btnDraftForm      : null,                // кнопка Черновик
  btnCleanForm      : null,                // кнопка Очистить
  btnCheckForm      : null,                // кнопка Проверить
  btnCorrectForm    : null,                // кнопка Корректировать
  btnSaveName       : "buttonFormSave",
  btnSaveDialogName : "buttonFormSaveDialog",
  btnRefreshName    : "buttonFormRefresh",
  btnDraftName      : "buttonFormDraft",
  btnCleanName      :  "buttonFormClean",
  btnCheckName      :  "buttonFormCheck",
  btnCorrectName    :  "buttonFormCorrect",
  controlContainerChange : "CONTROL_CONTAINER_CHANGE",
  //
  PopupElement      : {obj:null,type:null},
  activeElement     : null,
  //
  sysdate           : null,
  readonlyBackgroundColor : "#eee",
  showErrorMessage  : 1                   // показывать сообщения об ошибках в процессе ввода данных
}
// initialization
Form.set=function(pathApp,pathOra,oraProcName,pathImage,formName,lockMode,formTitle,messText,messType,isGroupNavigator,showErrorMessage,pathBI) {
  this.pathApp=pathApp;
  this.pathOra=pathOra;
  this.pathBI=pathBI;
  this.actOra=pathOra+oraProcName;
  this.actOraFlex=pathOra+"!"+oraProcName;
  this.pathImage=pathImage;
  this.formName=formName;
  if (lockMode) this.lockMode=parseInt(lockMode);
  this.messText=messText||"";
  this.messType=parseInt(messType);
  this.isGroupNavigator=(isGroupNavigator>0);
  this.showErrorMessage=showErrorMessage;
  this.formTitle=formTitle;
}
// onload
Form.ini=function() {
  this.objForm=document.forms[this.formName];
  this.pnlControl=domNodeFirstChild(domNodePrev(domNodePrev(this.objForm)));
  if (this.pnlControl) {
    this.btnSaveForm=document.getElementById(this.btnSaveName);
    this.btnCleanForm=document.getElementById(this.btnCleanName);
    this.btnCorrectForm=document.getElementById(this.btnCorrectName);
/*
    var ctrlTD=this.pnlControl.rows[0].cells[0];
    for (var i=0; i<ctrlTD.children.length; i++) {
      if (ctrlTD.children[i].id==this.btnSaveName) {
//        this.btnSaveForm=domNodeFirstChild(ctrlTD.children[i]);
        this.btnSaveForm=ctrlTD.children[i];
      }
      if (ctrlTD.children[i].id==this.btnDraftName) {
//        this.btnDraftForm=domNodeFirstChild(ctrlTD.children[i]);
        this.btnDraftForm=ctrlTD.children[i];
      }
    }
*/
  }
  // оперативные атрибуты формы
  if (this.objForm) {
    this.formId=parseInt(this.objForm.elements["FORM_ID"].value);
    this.recId=parseInt(this.objForm.elements["REC_ID"].value);
    this.recId=(this.recId>0)?this.recId:null;
    this.sessionId=this.objForm.elements["USER_CODE"].value;
    this.sysdate=this.objForm.elements["SYSDATE"].value;
    // версионная форма в режим редактирования
    if (this.getAttributeNumber("VERSION_NUM")==2) {
      this.recId=parseInt(this.getAttributeNumber("H_REC_ID"));
      var verRecId=parseInt(this.getAttributeNumber("REC_ID"));
      this.setAttributeForm("REC_ID",this.recId);
      this.setAttributeForm("H_REC_ID",verRecId);
//      this.setAttributeForm("H_PARENT_REC_ID","");
    }
  }
  this.isNewRec=(this.recId===null);
  // сообщение от сервера
  if (this.messText.length>0) {
    this.mess(this.messText);
  }
  // передача сведений о загрузке контейнеру
  if (typeof(parent.Container)=="object") {
    parent.Container.set(this.sessionId,this.formId,this.recId);
    this.isContainerForm=true;
    if (parent.Container.containerId>0) {
      // load: container --> form
      if (this.objForm.elements["CONTAINER_ID"].value.length==0) {
        this.objForm.elements["CONTAINER_TYPE_ID"].value=parent.Container.containerTypeId;
        this.objForm.elements["CONTAINER_ID"].value=parent.Container.containerId;
      }
    } else {
      // create: form --> container
      parent.Container.containerTypeId=this.objForm.elements["CONTAINER_TYPE_ID"].value;
      parent.Container.containerId=this.objForm.elements["CONTAINER_ID"].value;
    }
    // активация кнопки вызова контейнера
    parent.Container.setActiveButton(this.objForm.elements["CONTAINER_TYPE_ID"].value);
//    if (this.isContainerForm) this.buttonSaveDisable(false);
//    if (this.isGroupNavigator) parent.Container.loadTreeGroupNavigator(this.formId);
    parent.Container.setUserName(this.objForm.elements["USER_NAME"].value);
    // Title
    if (this.formTitle.length>0) parent.Container.setTitle(this.formTitle);
    // восстановление фокуса и конфигурации
    var FormFocus=parent.Container.FormFocus;
//    if (FormFocus&&FormFocus.formId&&FormFocus.formId==this.formId&&FormFocus.recId==this.recId) {
    if (FormFocus&&FormFocus.formId&&FormFocus.formId==this.formId) {
      // action onload
      if (FormFocus.action) {
        // первая грид-группа
        var btn=GridGroupQuery.getControlByGroup(FormFocus.groupId,"BUTTON_REFRESH");
        FormFocus.action=false;
        if (btn&&btn.tagName=="A") btn.click();
      }
      // фокус
      if (FormFocus.elementId) var obj=document.getElementById(FormFocus.elementId);
      if (obj&&(obj.tagName=="INPUT"||obj.tagName=="TEXTAREA")) obj.focus();
      else {
        var group=document.getElementById(FormFocus.groupId);
        if (group) {
          group.focus();
          group.scrollIntoView(true);
        }
      }
    } else {
      //alert("default");
      this.setFocusElement();
    }
  }
  document.body.style.cursor="default";
  // установка фокуса
//  this.setFocusElement();
}
// возвращает NUMBER значение глобального атрибута
Form.getAttributeNumber=function(name) {
  if (this.objForm) return this.objForm.elements[name].value;
  else return 0;
}
// возвращает NUMBER значение глобального атрибута
Form.setAttributeForm=function(name,value) {
  if (this.objForm) this.objForm.elements[name].value=value;
}
// submit
//    mode: 0/1 - DRAFT/CHECK
Form.save=function(Control,mode) {
  Control=(Control)?Control:this.btnSaveForm;
  if (!isButtonDisabled(Control)) {
    mode=parseInt(mode); mode=(isNaN(mode))?1:mode;
    // Проверка
//    if (Control&&(Control.id==this.btnCheckName||Control.id==this.btnCorrectName)) {
//       mode=(Control.id==this.btnCheckName)?2:(Control.id==this.btnCorrectName)?0:mode;
//    }
    if (Control&&Control.id==this.btnCheckName) mode=2;
    else {
      // ********* //
      //  !!! Статус документа
      var objStatus=this.objForm.elements["DOC_STATUS"][0];
      objStatus=(objStatus&&objStatus.id.indexOf("comp_")>-1)?objStatus:this.objForm.elements["DOC_STATUS"][1];
      if (!objStatus) document.getElementsByName("DOC_STATUS")[0];
      var status=(objStatus)?objStatus.value:TagVar.getValue("DOC_STATUS");
//      var status=TagVar.getValue("DOC_STATUS");
      mode=(status=="6933"||status=="6911")?0:1;            // бланк/черновик
      mode=(status=="6912")?2:mode;                             // на проверку (полная валидация)
      mode=(status=="6916"||status=="7180")?-1:mode;   // аннулировано/на аннулировании
    }
    // ********* //
    //
    var isStrongMode=(mode==2);   // true/false - полная проверка значений ВСЕХ компонентов формы
    var isCheckMode=(mode>0);     // true/false - полная проверка/проверка только заполненых полей
    // корректировка
    if (Control&&Control.id==this.btnCorrectName) mode=-1;
    // валидация
    if (mode>-1&&!Component.checkForm(null,isCheckMode,isStrongMode)) {
      eventCancel();
      return false;
    }
/*
    if (isCheckMode) {
      if (!Component.checkForm(null,  )) {
        Control.style.cursor="default";
        eventCancel();
        return false;
      }
    }
*/
    this.objForm.elements["REC_STATUS"].value=(mode==0)?0:1;
    if (Control.id==this.btnDraftName)
      this.setActiveComponent(Control.id,"0","");  // регистрация акции Черновик
    this.buttonSaveDisable(true);                  // деактивация кнопки Save
    GroupConfig.write();                           // запись в input строки с текущей конфигурацией групп
    containerDisable(1);
    this.objForm.action=Form.actOraFlex;
    this.checkUnload=false;
    this.objForm.submit();
  }
}
// Сохранение активной формы контейнера с предварительной проверкой связи
//   timeout<50ms игнорируем (табл. T_TUNINGS, параметр PING_TIMEOUT)
Form.savePing=function(Control) {
    Form.messClose();
    // режим: draft/save - 0/1
    var mode=0;
    if (typeof(parent.Container)=="object") parent.Container.formSavePing(Control,mode);
    else {
      // диалог
        if (typeof(parent.parent.Container)=="object") parent.parent.Container.formSavePing(Control,mode);
    }
}
// load
Form.load=function(formId,recId) {
//  this.block("UNLOCK");
  document.body.style.cursor="wait";
  if (this.isContainerForm) {
    var conTypeId=parent.Container.containerTypeId;
    var conId=parent.Container.containerId;
  }
  var url=this.actOra+getCallFormParam(formId,recId,this.sessionId,conTypeId,conId);
//  this.checkUnload=false;
  window.location.replace(url);
}
// refresh
Form.refresh=function() {
  containerDisable(1);
  this.load(this.formId,this.recId);
}
//
Form.version=function(Control) {
  if (Control&&Control.tagName=="INPUT") {
    var recId=parseInt(Control.value);
    if (typeof(parent.Container.FormFocus)=="object") {
      var FF=parent.Container.FormFocus;
      FF.elementId="";
      FF.groupId="";
    }
    if (recId==0) {
      this.load(this.formId,this.objForm.elements["H_REC_ID"].value);
    }
    else {
      recId=(isNaN(recId))?0:recId;
      if (recId>0) this.load(this.formId,recId*-1);
    }
  }
}
// clean: очистить форму от данных
Form.clean=function(Control,mode) {
  Control=(Control)?Control:this.btnSaveForm;
  if (!confirm(arrFormMessage[118])) return false;       // Удалить данные формы?
  if (!isButtonDisabled(Control)) {
    Control.style.cursor="wait";
    // Статус документа: ИНИЦИАЛИЗАЦИЯ
    this.objForm.elements["REC_STATUS"].value="-100";
    //
    this.buttonSaveDisable(true);                               // деактивация кнопки Save
    document.body.style.cursor="wait";
    this.objForm.action=Form.actOraFlex;
    this.checkUnload=false;
    Control.style.cursor="default";
    this.objForm.submit();
  }
}
//
Form.print=function(param) {
  if (typeof(parent.Container)=="object") {
    parent.Container.print(param);
  }
}
// добавить экземпляр формы
Form.add=function(Control) {
  this.objForm.elements["PARENT_REC_ID"].value=this.objForm.elements["REC_ID"].value;
  this.objForm.elements["REC_ID"].value="";
  Control=(this.btnSaveForm)?this.btnSaveForm:document.getElementById(this.btnSaveDialogName);
  this.save(Control,0);
}
// удалить (деактивировать) экземпляр формы
Form.del=function(Control) {
//  Control=(this.btnSaveForm)?this.btnSaveForm:document.getElementById(this.btnSaveDialogName);
//  this.save(Control,0);
//Message.text("<b>ТЕСТ</b>","CENTER",true,null,"Выбрать");

  if (!confirm(arrFormMessage[118])) return false;       // Удалить данные формы?
  this.objForm.elements["IS_ACTIVE"].value=-1;
  containerDisable(1);
  this.objForm.action=Form.actOraFlex;
  this.checkUnload=false;
  this.objForm.submit();
}
// focus
Form.regFocusElement=function(obj) {
  if (obj&&this.isContainerForm) {
    parent.Container.regFormFocus(this.formId,this.recId,GroupConfig.getGroupByElement(obj),obj.id,obj.name);
  }
}
//    установка фокуса на элемент ID или на первый видимый элемент
Form.setFocusElement=function(id,obj) {
  if (!obj&&id&&id.length>0) obj=document.getElementById(id);
  else {
    if (this.objForm) {
      for (var i=0;i<this.objForm.length;i++) {
        obj=this.objForm.elements[i];
        if (obj.tagName=="INPUT"||obj.tagName=="SELECT"||obj.tagName=="BUTTON"||obj.tagName=="TEXTAREA") {
          if (obj) {
            if (!obj.readOnly&&!isHidden(obj)) break;
            else {
               var E=domNodeNext(obj);
               if (E&&E.id&&E.id=="lookup") {
                 E=E.getElementsByTagName("A")[0];
                 if (E&&E.className&&E.className!="disable") {obj=E; break;}
               }
            }
          }
//          if (obj&&(!obj.readOnly)&&(!isHidden(obj))) break;
        }
      }
   }
  }
  if (obj&&(!isHidden(obj))) obj.focus();
}
// регистрация активного компонента (инициатора акции) в поле ACTIVE_COMPONENT
//   фокус-элемент формы на момент совершения транзакции.
//   формат: ID:NNN;FOCUS:1;ACTION:func_name;
//     ACTION: js-function для передачи управления после refresh
Form.setActiveComponent=function(id,focus,action) {
  var obj=document.getElementById("ACTIVE_COMPONENT");
  if (obj&&obj.value.length>0) {
    if (id.length>0) obj.value=setTagValue(obj.value,"ID:",";",id);
    if ((focus+"").length>0) obj.value=setTagValue(obj.value,"FOCUS:",";",focus);
    if (action.length>0) obj.value=setTagValue(obj.value,"ACTION:",";",action);
  }
}
// установка фокуса на первый активный элемент группы
Form.setFocusGroup=function(groupId) {
  if (groupId&&groupId.length>0) {
    var GRP=document.getElementById(groupId);
    if (GRP) {
      var res;
      var collect=GRP.getElementsByTagName("*");
      if (collect) {
        for (var i=0;i<collect.length;i++) {
           if (collect[i].tagName=="INPUT"||collect[i].tagName=="TEXTAREA"||collect[i].tagName=="BUTTON"||collect[i].tagName=="A") {
             if (!isHidden(collect[i])) {
               res=collect[i];
               break;
             }
           }
        }
      }
      if (res&&(!res.readOnly)) res.focus();
//      var collect=GRP.childNodes;
//      for (var key in collect) if (collect[key].tagName=="INPUT"||collect[key].tagName=="TEXTAREA"||collect[key].tagName=="BUTTON"||collect[key].tagName=="A") {res=collect[key]; break}
//      if (res) this.setFocusElement(null,res);
    }
  }
}
//
Form.buttonSaveDisable=function(flag) {
  if (this.btnSaveForm)    Button.disable(this.btnSaveForm,flag);
  if (this.btnCleanForm)   Button.disable(this.btnCleanForm,flag);
  if (this.btnCorrectForm) Button.disable(this.btnCorrectForm,flag);
}
// disable
Form.disable=function(flag) {
  this.buttonSaveDisable(flag);
  for (var i=0;i<this.objForm.elements.length;i++) {
    var obj=this.objForm.elements[i];
    Component.READONLY(obj,null,flag);
  }
  if (flag) document.body.style.backgroundColor=this.readonlyBackgroundColor; else document.body.style.backgroundColor="";
//  this.objForm.disabled=true;
}
// message show
//  focus: 0/1
//   elem:   ссылка на элемент, относительно которого производится позиционирование (coord.js)
//     posX, posY, indentX, indentY - для позиционирования относительно элемента - elem
Form.mess=function(messId,messType,messResult,pos,focus,elem,posX,posY,indentX,indentY) {
  if (!messType) Message.show(messId,1,messResult,pos,focus,elem,posX,posY,indentX,indentY);
  return messResult;
}
// message close
Form.messClose=function() {
  Message.close();
}
// text show
Form.text=function(text,pos,focus) {
  Message.text(text,pos,focus);
}
// режим управления, key: EDIT/READ
Form.setControlMode=function(key) {
  switch (key) {
    case "EDIT":
      this.buttonSaveDisable(false);
      this.isChanged=true;
      break;
    case "READ": 
      this.buttonSaveDisable(true);
      this.isChanged=false;
      break;
    default: break;
  } 
  // lookup смены типа контейнера
  Lookup.setReadonly(document.getElementById(this.controlContainerChange),this.isChanged);
}
// callback для logout
function callbackLogout(text) {
  Form.mess(400);
}
// завершение сеанса пользователя
Form.logout=function() {
  var func="callbackLogout";
  var UserCode=this.objForm.elements["USER_CODE"];
  var url=this.actOra+"?proc=LOGOUT"+"&func="+func+"&param=&setting=&userid="+UserCode.value+"&random="+Math.random().toString();
  UserCode.value="";
  this.sessionId="";
  queryXmlHttp(url,'GET',1);
}
// пессимистическое блокирование/разблокирование записи
//    mode: LOCK/UNLOCK
//    async: 0/1
//  возвращает признак выполнения запроса
Form.block=function(mode,async) {
  mode=mode||"";
  if (mode.length==0) return false;
  async=(async==0)?0:1;
  var flag=false;
  var sep=this.separator1;
  var cbFuncName="callbackFormLock";
  if ((this.recId>0)&&(this.lockMode==2)) {
    if ((mode=="LOCK")&&(this.lockState==0)) flag=true;   // LOCK для формы, находящейся в режиме READ
    if ((mode=="UNLOCK")&&(this.lockState==1)) flag=true; // UNLOCK для формы, находящейся в режиме EDIT
    if (flag) {
      var param=sep+this.recId+sep+this.formId+sep+this.objForm.elements["DATA_CODE"].value+sep+this.lockMode+sep;
      var url=this.actOra+"?proc=BLOCK"+"&func="+cbFuncName+"&param="+param+"&setting="+mode+"&userid="+this.objForm.elements["USER_CODE"].value+"&random="+Math.random().toString();
      this.lockState=-1;  // wait
      queryXmlHttp(url,'GET',async);
    }
  }
  return flag;
}
// установка режима редактирования формы (flag: true/false - установить/отменить)
Form.setEditMode=function(flag) {
  var key=(flag)?"EDIT":"READ";
  if (flag&&this.lockState==1) return true;
  if (this.isNewRec) this.setControlMode(key);
  else {
    var mode=(flag)?"LOCK":"UNLOCK";
    if (!this.block(mode)) this.setControlMode(key); // иначе ждем callback блокировки
  }
}
// результат попытки пессимистического блокирования
function callbackFormLock(text) {
  text=text||"";
  if (text.length>0) {
    var pos=text.indexOf(Form.separator1);
//    if (pos>0) var resultCode=parseInt(text.substr(0,pos));
    var resultCode=(pos>0)?parseInt(text.substr(0,pos)):null;
    // выполнено LOCK
    if (resultCode==1) {
      Form.setControlMode("EDIT");
      Form.lockState=1; // lock
    }
    // выполнено UNLOCK
    if (resultCode==2) {
      Form.lockState=0; // read
    }
    text=(pos>0)?parseInt(text.substr(pos+1)):"";
    // занято
    if (resultCode==0) {
      Form.lockState=0; // read
      Form.disable(true);
//      Form.mess(text.substr(pos+1));
      Form.mess(text);
    }
    // изменено другим пользователем
    if (resultCode==-2) {
      Form.lockState=0; // read
//      Form.mess(text.substr(pos+1));
      Form.mess(text);
      Form.refresh();
    }
    // ошибка
    if (resultCode==-1) {
      Form.lockState=0; // read
      Form.refresh();
    }
  }
  else Form.lockState=0; // read   (выполнено UNLOCK)
}
//
Form.action=function(id,params) {
  var objForm=document.forms["frmParams"];
  if (objForm) {
    objForm.elements["userid"].value=this.sessionId;
    objForm.elements["id"].value=id;
    objForm.elements["params"].value=params;
    objForm.action=Form.actOra;
    objForm.submit();
  }
}
// POST для синхронной web.main proc=ACTION
Form.actionSync=function(proc,func,param,setting) {
  const maxStrLen = 16000;
  var F=document.forms["frmAction"];
  if (F) {
    //F.reset();
    F.elements["proc"].value=proc;
    F.elements["func"].value=func;
    F.elements["setting"].value=setting;
    F.elements["userid"].value=this.sessionId;
    // remove all param
    const paramElements = document.getElementsByName("param");
    // console.log("frmAction","paramElements", paramElements);
    Array.from(paramElements).forEach((e, i) => {
      // console.log("remove", i, e)
      F.removeChild(e);
    });
    // set param: split large string in to n-size chunks
    param.match(new RegExp(".{1," + maxStrLen + "}","g")).forEach((p, i) => {
      // console.log(i, p);
      const input = document.createElement("input");
      input.setAttribute("name", "param");
      input.setAttribute("style", "display:none");
      input.setAttribute("value", p);
      // console.log("add", i, input);
      F.appendChild(input);
    });
    F.submit();
  }
}
// стандартная асинхронная акция "через pls handler: web.main - ACTION"
//   executeFuncName: имя функции, которой будет передано управление в callback
Form.actionAsync=function(serverFuncName,callbackFuncName,param,groupId,controlItemId,executeFuncName) {
  serverFuncName=serverFuncName||"";
  callbackFuncName=callbackFuncName||"";
  if (serverFuncName.length==0||callbackFuncName==0) return false;
  var recId=(this.recId>0)?this.recId:0;

  // для версионной формы акция от основной формы
  if (this.objForm.elements["VERSION_NUM"].value>0) {
    recId=this.objForm.elements["H_REC_ID"].value;
    recId=(recId>0)?recId:0;
  }
  groupId=(groupId)?groupId:"";
  controlItemId=(controlItemId)?controlItemId:"";
  executeFuncName=(executeFuncName)?executeFuncName:"";
  //  ACTION: GROUP_ID, FORM_ID, CONTROL_ID, REC_ID, JS_EXEC_FUNC_NAME
  var proc="ACTION"+this.separator1+groupId+this.separator1+this.formId+this.separator1+controlItemId+this.separator1+recId+this.separator1+executeFuncName+this.separator1;
  var url=this.actOra+"?proc="+proc+"&func="+callbackFuncName+"&param="+param+"&setting="+serverFuncName+"&userid="+this.sessionId+"&random="+Math.random().toString();
  //alert(url); toClipboard(url); return false;
  queryXmlHttp(url,'GET',1);
}
//
function formPrint(param) {
  if (typeof(parent.Container)=="object") parent.Container.print(param);
}
//
function callbackQuery(param) {
  var text=csvFormat(param,Form.separator1);
  var arr=getCsvArr(text,Form.separator1);
  if (arr.length>0) {
    var func=(arr[3])?arr[3]:"";
    if (func.length>0) exec(func,arr[0]);
    else alert("function name is null");
  }
}
//
Form.createContainer=function(containerTypeId,recId) {
  containerTypeId=(!containerTypeId&&typeof(parent.Container)=="object")?parent.Container.containerTypeId:null;
  if (containerTypeId) this.action(containerTypeId,recId);
}
// показать элемент в зоне видимости окна
Form.elementScrollView=function(id,obj) {
  if (!obj) obj=document.getElementById(id);
  if (obj)  obj.scrollIntoView(true);
  return false;
}
//
Form.groupScrollView=function(id) {
  if (id) {
    id=(id||"")+"";
    id=(id.indexOf(GroupConfig.prefGroupId)<0)?GroupConfig.prefGroupId+id:id;
    var Group=document.getElementById(id);
    // визуализируем невидимую группу или collapse-предка
    if (Group&&isHidden(Group)) ExpandGroup.expandByElement(Group);
    this.elementScrollView(id,Group);
//    parent.frames["formCanvas"].scrollBy(0,-10);
//    window.scrollBy(0,200);
//    this.setFocusGroup(Group.id);
  }
  return true;
}
// callback для смены статуса
function callbackChangeStatus(text) {
  alert(text);
}
// смена статуса
Form.changeStatus=function(containerTypeId,containerId,status) {
  status=parseInt(status);
  if (isNaN(status)) return false;
  var sep=this.separator1;
  var cbFuncName="callbackChangeStatus";
  if (this.recId>0) {
    var param=sep+this.recId+sep+this.formId+sep+containerId+sep+containerTypeId+sep+status+sep;
    var url=this.actOra+"?proc=STATUS"+"&func="+cbFuncName+"&param="+param+"&setting="+""+"&userid="+this.objForm.elements["USER_CODE"].value+"&random="+Math.random().toString();
    queryXmlHttp(url,'GET',1);
  }
}
//
Form.popupRegistr=function(Element,type) {
  if (Element) {
    this.PopupElement.obj=Element;
    this.PopupElement.type=type;
  }
}
//
Form.popupCancel=function() {
  if (this.PopupElement.obj) {
    if (this.PopupElement.type=="LOOKUP")   Lookup.cancel(null,this.PopupElement.obj);
    if (this.PopupElement.type=="CALENDAR") Calendar.close(domNodeNext(this.PopupElement.obj));
    if (this.PopupElement.type=="COMBOBOX") Combobox.cancel(null,this.PopupElement.obj);
  }
}
