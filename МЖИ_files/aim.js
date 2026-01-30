/* IFRAME транспорт AIM */
AIM = {
  frame : function(c) {
    var n = 'f' + Math.floor(Math.random() * 99999);
    var d = document.createElement('DIV');
    d.innerHTML = '<iframe style="display:inline" src="about:blank" id="'+n+'" name="'+n+'" width="1px" height="1px" onload="AIM.loaded(\''+n+'\')"></iframe>';
    document.body.appendChild(d);
    var i = document.getElementById(n);
    if (c && typeof(c.onComplete) == 'function') {i.onComplete = c.onComplete;}
    return n;
  },
  form : function(f, name) {
    f.setAttribute('target', name);
  },
  submit : function(f, c) {
    AIM.form(f, AIM.frame(c));
    if (c && typeof(c.onStart) == 'function') {return c.onStart();} 
    else {return true;}
  },
  loaded : function(id) {
    var i = document.getElementById(id);
    if (i.contentDocument) {var d = i.contentDocument;} 
    else {
      if (i.contentWindow) {var d = i.contentWindow.document;} 
      else {var d = window.frames[id].document;}
    }
    if (d.location.href == "about:blank") {return;}
    if (typeof(i.onComplete) == 'function') {i.onComplete(id,d.body.innerHTML);}
  },

  // mode - режим 0/1 - обычный транспорт/ стандарт STANDARD вызов MAIN-процедуры
  create : function(url,c,mode) {
    mode=mode||0;
    var ps=c.onStart+"", pc=c.onComplete+"";
    ps=ps.replace("function ","");
    ps=ps.substr(0,ps.indexOf("("));
    pc=pc.replace("function ","");
    pc=pc.substr(0,pc.indexOf("("));
    var n = 'form' + Math.floor(Math.random()*99999);
    var d = document.createElement('DIV');
    if (mode==0) {
      var f='<form id="'+n+'" action="'+url+'" method="post" onsubmit="return AIM.submit(this, '+"{"+"'onStart' : "+ps+", 'onComplete' : "+pc+"}"+')"><input style="display:none" id="btn_'+n+'" type=submit></form>';
    } else {
      var srvProcParams="";
      // параметры вызова сервер-процедуры (main)
      srvProcParams=srvProcParams+'<input id="pcode" name="pcode" type="hidden" value="">';
      srvProcParams=srvProcParams+'<input id="params" name="params" type="hidden" value="">';
      srvProcParams=srvProcParams+'<input id="settings" name="settings" type="hidden" value="">';
      srvProcParams=srvProcParams+'<input id="bind" name="bind" type="hidden" value="">';
      srvProcParams=srvProcParams+'<input id="stage" name="stage" type="hidden" value="">';
      srvProcParams=srvProcParams+'<input id="buffer2" name="buffer2" type="hidden" value="">';
      srvProcParams=srvProcParams+'<input style="display:none" id="btn_'+n+'" type=submit>';  // кнопка
      var f='<form id="'+n+'" action="'+url+'" method="post" onsubmit="return AIM.submit(this, '+"{"+"'onStart' : "+ps+", 'onComplete' : "+pc+"}"+')">'+srvProcParams+'</form>';
    }
    d.innerHTML = f;
    document.body.appendChild(d);
    return document.getElementById(n);
  },
  get : function(url,c) {
    var f=AIM.create(url,c);
    var btn=document.getElementById('btn_'+f.id);
    btn.click();
  },
  // вызов стандартной (main) сервер-процедуры (standarT)
  standart : function(c) {
    var f=AIM.create(prm.srvPath,c,1);
    f.pcode.value=frmSrv.pcode.value;
    f.params.value=frmSrv.params.value;
    f.settings.value=frmSrv.settings.value;
//    f.bind.value=frmSrv.bind.value;
    f.bind.value=getTagValues();
    f.stage.value=frmSrv.stage.value;
    f.buffer2.value=frmSrv.buffer2.value;
//alert(frmSrv.pcode.value+"&"+frmSrv.params.value+"&"+frmSrv.settings.value+"&"+f.bind.value+"&"+frmSrv.stage.value+"&"+frmSrv.buffer2.value);
    var btn=document.getElementById('btn_'+f.id);
    btn.click();
  }
}
