function textareaCountLines(text,cols) {
  var qty=1; var pos=0;
  while (pos>-1) {
    pos=text.indexOf("\n",pos+1);
    if (pos<0||qty>30) break;
    qty++;
  }
  var soft=Math.ceil(text.length/(cols-1));
  return (qty>soft)?qty:soft;
}
function textareaAutosize(textarea,minRows) {
  if (textarea&&textarea.tagName=="TEXTAREA") textarea.rows=Math.max(minRows,textareaCountLines(textarea.value,textarea.cols)+1);
}
