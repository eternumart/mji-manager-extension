//*** File Upload Blob (загрузка файла в BLOB поле таблицы через процедуру, заявленных в DAD)
//  Зависимости: 
//    aim.js
//  Предполагает наличие:
//        формы-контейнера на странице для отправки frmUploadFileBlob (pls: html.proc=file_upload_blob_container)
//        процедуры web.file_upload
//        пакета file_load_tools
//  Акция - click на старт-элементе
//        правила именования интерфейсных элементов:
//         input type="file" : префикс src_NAME
//         старт-элемент     : префикс btn_NAME
function classFileUploadBlob(imagePath,separator,prefResultBox) {
  var procDownload="file_load_tools.download?id=";

  var frmUploadFileBlob = "frmUploadFileBlob"; // форма multipart/form-data
  var btnUploadFileBlob = "btnUploadFileBlob"; // кнопка submit (display=none) формы frmUploadFileBlob
  var sep = separator||"@";
  var progressId=null;
  // префиксы
  var prefInputFile="src_";            // источник
  var prefProgress="prg_";             // контейнер progress bar
  var prefResult=prefResultBox||"res"; // input с ID закаченного файла в name
  var prefText="txt_";                 // имя файла
  var prefBtnShow="doc_";              // кнопки Показать
  var prefBtnDel="del_";               // кнопка Удалить

  var prefBeforeLoad="fileUploadBefore_";

  // визуализирует результат закачки
  //   objData: input элемент-носитель ID закаченного файла и иконки типа
  //   fileName: имя закаченного файла
  var setVisualResult = function (objData,fileName) {
    file = fileName + "";
    if (file.length==0) return;
    var fileTitle = file.replace(/.*\\(.*)/, "$1");
    var ext = fileTitle.replace(/.*\.(.*)/, "$1");
    objData.style.display="";
//    objData.style.background = 'url('+homepath+'/images/file_types.png) no-repeat 0 -'+get_file_type_ico_pos(ext)+'px';
    objData.style.background="url("+imagePath+"fileTypes.png) no-repeat 0 -"+get_file_type_ico_pos(ext)+"px";
  }

  // возвращает url иконки как результат закачки
  //   fileName: имя закаченного файла
  var getVisualResult=function(fileName) {
    var file=fileName+"";
    if (file.length==0) return;
    var fileTitle=file.replace(/.*\\(.*)/, "$1");
    var ext=fileTitle.replace(/.*\.(.*)/, "$1");
//    objData.style.display="";
//    objData.style.background = 'url('+homepath+'/images/file_types.png) no-repeat 0 -'+get_file_type_ico_pos(ext)+'px';
//    objData.style.background="url("+imagePath+"fileTypes.png) no-repeat 0 -"+get_file_type_ico_pos(ext)+"px";
    return "url("+imagePath+"fileTypes.png) no-repeat 0 -"+get_file_type_ico_pos(ext)+"px";
  }


  // проверка допустимости формата файла по расширению
  var checkExtFile=function(fileName,format) {
    fileName=fileName||""; fileName=fileName+"";
    format=format||""; format=format+"";
    if ((fileName.length==0)||(format.length==0)) return true; // не проверяем
    var res=false;
    var pos=fileName.lastIndexOf(".");
    if (pos>-1) {
      var ext=(fileName.substr(pos+1)).toUpperCase()+"";
      if ((ext.length>0)&&(format.indexOf(ext)>-1)) res=true;
    }
    return res;
  }
  // возвращает имя файла из строки полного пути
  var extractFileName=function(path) {
    var res="";
    path=path||""; path=path+"";
    if (path.length>0) {
      res=path.replace(/\\/g,"/");
      var pos=res.lastIndexOf("/");
      res=(pos>-1)?res.substr(pos+1):res;
    }
    return res;
  }
  // загрузка
  //   settings: список допустимых расширений файлов
  this.submit=function(InputFile,settings) {
    if (InputFile.value.length==0) return false;
    settings=settings||""; settings=settings+"";
    // буфер элемента для восстановления
    var bufInputFile=InputFile.cloneNode(true);
    // форма отправки файла
    var frmFile=document.getElementById(frmUploadFileBlob);
    var btnFile=document.getElementById(btnUploadFileBlob);
    // контейнер элемента
    var cntInput=domNodeParent(InputFile);
    domNodeParent(cntInput).focus();
    var compId=domNodeFirstChild(domNodeParent(cntInput)).id;
    var parentProgressId=prefProgress+compId;
    // вставка элемента в форму отправки
    InputFile.setAttribute("id","");
    InputFile.setAttribute("name","filename");
    var n=frmFile.replaceChild(InputFile,domNodeFirstChild(frmFile));
    // link параметры формы recId, formId, compId - 2,3,4 элементы формы, а firstChild - <input type=file>
    frmFile.elements[0].name="filename";
    frmFile.elements[0].style.display="none";
    frmFile.elements[1].value=(Form.recId==null)?"":Form.recId;
    frmFile.elements[2].value=(Form.formId==null)?"":Form.formId;
    frmFile.elements[3].value=compId;
    // загрузка
    btnFile.click();
    // восстановление элемента на форме
    cntInput.appendChild(bufInputFile);
    // спрятать
    cntInput.style.display="none";
    // показать progress bar
    progressCreate(parentProgressId,5,"");
    progressId=progressStart(parentProgressId);
  }
  // перед отправкой
  this.callbackStart = function () {
    return true;
  }
  // конфигурация элементов управления в зависимости от наличия contentId
  var setControlAfterLoad = function(compId,fileName,docSize,mimeType) {
    var contentId, resultBox, textBox;
    resultBox=document.getElementById(compId);
    if (resultBox) {
      contentId=resultBox.name+"";
      // файл загружен
      if (contentId.length>0) {
        setVisualResult(resultBox,fileName);
        resultBox.style.display="inline";
        // текст-контейнер: имя закаченоого файла, размер, тип
        textBox=document.getElementById(prefText+compId);
        textBox.innerHTML=fileName+", размер: "+docSize+" байт ";
        textBox.style.display="inline";
        // кнопка Показать
        document.getElementById(prefBtnShow+compId).style.display="inline";
        // кнопка Удалить
        document.getElementById(prefBtnDel+compId).style.display="inline";
        // спрятать элементы Before
        document.getElementById(prefBeforeLoad+compId).style.display="none";
      }
    }
  }

  // обработка результата
  this.callbackComplete = function (frameId,response) {
    var compId; var contentId; var fileName; var docSize; var mimeType; var ResultBox; var TextBox;
    var frmResult=document.getElementById(frameId);
    response=response+"";
    // завершение акции
    if (frmResult) {
      // очистка фрейма
      var DIV=domNodeParent(frmResult);
      DIV.parentNode.removeChild(DIV);
      // очистка формы
      // разбор параметров
      if (response.length>0) {
        compId=csvGetVal(response,sep,1);
        contentId=csvGetVal(response,sep,2);
        fileName=csvGetVal(response,sep,3);
        docSize=csvGetVal(response,sep,4);
        mimeType=csvGetVal(response,sep,5);
        // остановить progress bar и убрать его контейнер
        progressStop(prefProgress+compId,progressId);
        // обработка ошибки закачки
        if (contentId=="-1") {
          contentId="";
          document.getElementById(prefBeforeLoad+compId).style.display="block";
        } else {
          // показать result input
          ResultBox=document.getElementById(compId);
          // Результат: ID закаченного файла
          ResultBox.value=contentId;
//          onChangeData(resultBox,resultBox.name);
          // текст-контейнер: имя закаченоого файла, размер, тип
          TextBox=domNodeNext(domNodeNext(domNodeNext(ResultBox))); // a href
          var FileContent=domNodeFirstChild(TextBox);               // span
          FileContent.style.background=getVisualResult(fileName);
          FileContent.innerHTML=fileName+", "+docSize+" byte ";
          TextBox.style.display="";
          TextBox.focus();
          // кнопка Удалить
          domNodeNext(TextBox).style.display="";
        }
      }
    }
    document.body.style.cursor="default";
  }
  // удаление
  this.clear = function (btn) {
    var container=domNodeParent(btn);
    var LoadContainer=domNodeLastChild(container);
    if (!LoadContainer) return true;
    var ResultBox=domNodeFirstChild(container);
    if (confirm(arrFormMessage[101])) {                  // Удалить прикрепленный файл?
      // спрятать
      for (key in container.children) {
        if (container.children[key].tagName) container.children[key].style.display="none";
      }
      ResultBox.value="";
      LoadContainer.style.display="";
      var InputBox=domNodeFirstChild(LoadContainer);
      InputBox.style.display="";
      InputBox.removeAttribute("disabled");
      InputBox.removeAttribute("name");
      InputBox.focus();
      Form.setEditMode(true);
    }
  }
  // монитор для просмотра документа
  this.show = function (ev,control,title) {
    if (control) {
      if (control.tagName=="A") id=domNodeFirstChild(domNodeParent(control)).value; else id=control.value;
      if (parseInt(id)>0) openWindow(Form.pathOra+procDownload+id,null,null,title,"CENTER");
    }
    return false;
  }
  //
  this.changeId=function(InputResult) {
    if (InputResult&&InputResult.tagName=="INPUT") {
      var c=domNodeParent(InputResult);
      if (c&&c.tagName=="DIV") {
        // box progress
        var el=c.getElementsByTagName("SPAN")[1];
        if (el) el.id=prefProgress+InputResult.id;
        // input file
        var el=c.getElementsByTagName("INPUT")[1];
        if (el) el.id=prefInputFile+InputResult.id;
      }
    }
  }
}

// показать документ
//  url: вызов document show
//  id:  ID из табл.BLOB_CONTENTS
function documentShowById(id) {
  id=parseInt(id);
  if (id>0) {
    var url=getSrvProc(prm.csDownloadBlob,prm.separator+id+prm.separator+prm.separator,"",getTagValues(),null,"");
    if (isModalDialog()) {
      var result=window.showModalDialog(url,[],getModDialogSettings(parseInt(screen.width),parseInt(screen.height)-40));
    } else {
      openWindow(url,null,null,"Просмотр прикрепленного файла");
    }
  }
  else return false;
}
