function printConsolidatedDoc(button) {
  var dt = domNodeFirstChild(domNodeParent(button,4).rows[0].cells[1]).getElementsByTagName('INPUT')[0].value;
  parent.Container.query(button,'printConsolidatedDocCB',dt);
}

function printConsolidatedDocCB(reportPath) {
  actionHREF(Form.pathBI + reportPath, '_blank');
}