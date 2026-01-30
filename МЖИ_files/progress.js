/* ProgressBar индикатор */
//   крейт: progressCreate(containerId, size, text) - id контейнера, кол-во индикаторов, текст за индикатором
//   старт: progressStart(containerId)
//   стоп:  progressStop(containerId,processId), id контейнера, id для setInterval
// Ширина индикатора в css: progress_box
var progressIntervalId=null; // ID процесса
function progressChange(containerId) {
  var c=document.getElementById(containerId);
  var size=c.children.length;
  var lastcolor=c.children[size-1].style.backgroundColor;
  for(i=(size-1); i>0; i--) c.children[i].style.backgroundColor=c.children[i-1].style.backgroundColor;
  c.children[0].style.backgroundColor=lastcolor;
}
function progressCreate(containerId,size,text) {
  size=size-1;
  text=text+"";
  var j; var str=""; var p=document.getElementById(containerId);
  for(var i=0; i<(size+1); i++) {
    j=(i>4)?size-i:i;
    str=str+'<span class="progress_box" style="background-color:#'+(159-j*(42-j*4)).toString(16)+(197-j*(37-j*2)).toString(16)+(237-j*25).toString(16)+'">__</span>'
  }
  p.innerHTML=str+"&nbsp;"+text;
}
function progressStart(containerId) {
  var pid, c=document.getElementById(containerId);
  document.getElementById(containerId).style.display="inline";
  progressIntervalId=pid=window.setInterval('progressChange("'+containerId+'")',40);
  return pid;
}
function progressStop(containerId,processId) {
  var processId, c=document.getElementById(containerId);
  if (c) {
    processId=processId||progressIntervalId;
    window.clearInterval(processId);
//    pc.innerHTML="";
    c.style.display="none";
  }
}
