/* 
возвращает результат акции в формате: @callbackFunctionName@resultString
  callbackFunction: function(data)
*/
var xmlhttp;

// name_: имя callback функции
function exec(name_,param_) {
  name_=name_||"";
  if (name_.length>0) window[name_](param_);
}

function getXmlHttp(){
  var XMLHttp = null;  
  if (window.XMLHttpRequest) try {XMLHttp = new XMLHttpRequest()} catch(e) {}
  else {
    if (window.ActiveXObject) {  
      try {XMLHttp = new ActiveXObject("Msxml2.XMLHTTP")} catch(e) {
        try {XMLHttp = new ActiveXObject("Microsoft.XMLHTTP")} catch(e) {}
      }
    }  
  }
  return XMLHttp;  
}

// возврат значения в формате: @func_name@params@
function queryXmlHttpResult(resultText) {
  document.body.style.cursor="default";
  if (resultText.length>0) {
    resultText=resultText.substr(1);
    var separator1=(typeof(Form)=="object")?Form.separator1:Container.separator1;
    var pos=resultText.indexOf(separator1);
    if (pos>-1) exec(resultText.substr(0,pos),resultText.substr(pos+1));
  }
}

// method: GET/POST
// mode:   0/1 - sync/asinc
function queryXmlHttp(url,method,mode,errorFuncName,valueTimeout){
//toClipboard(url);
  valueTimeout=parseInt(valueTimeout);
  valueTimeout=(isNaN(valueTimeout))?25000:valueTimeout;
  var resultText=""; var pos;
  if (url.length>0) {
    if (!xmlhttp) xmlhttp=getXmlHttp();
    if (mode==0) {
      // sync
      if (method=="GET") {
        xmlhttp.open('GET',url,false);
        xmlhttp.send(null);
        document.body.style.cursor="wait";
      }
      if (xmlhttp.status==200) queryXmlHttpResult(xmlhttp.responseText.replace(/\n/g," "));
//    } else {
    }
    if (mode==1) {
      // asinc
      if (method=="POST") {
        xmlhttp.open('POST',url,true);
        //xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        //header('Content-Type: text/plain; charset=windows-1251');
      } 
      else {
//        xmlhttp.open('GET', url+encodeURIComponent(src.value), true);
        xmlhttp.open('GET',url,true);
      }
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState==4) {
//          clearTimeout(timeout); // очистить таймаут при наступлении readyState 4
//          if(xmlhttp.status==200) queryXmlHttpResult(xmlhttp.responseText.replace(/\n/g," "));
          if(xmlhttp.status==200) {
            clearTimeout(timeout); // очистить таймаут при наступлении readyState 4
            queryXmlHttpResult(xmlhttp.responseText.replace(/\n/g," "));
          }
        }
      };
      xmlhttp.send(null);
//      var timeout=setTimeout(function(){handleError(-1,"Time out",errorFuncName) },valueTimeout);
      var timeout=setTimeout(function(){xmlhttp.abort(); handleError(-1,"Time out",errorFuncName)},valueTimeout);
    }
  }
}

// обработчик ошибки
function handleError(errCode,errMessage,errFuncName) {
  if (typeof(errFuncName)=="function") errFuncName();
  xmlhttp.abort();
}
