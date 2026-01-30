var TextTemplate = {
  prefix                               : "TextTemplate",
  boxFragmentName         : "boxTextTemplate",
  templateSourcesName  : "TextTemplateSource",
  templateResultName    : "TextTemplateResult",
  callbackListFuncName     : "callbackTextTemplateList",  // имя js-функции, возвращающей список шаблонов
  targetBackgroundColor :  "#dee5e9",      // #EAF4FF
  EditBox                            : null,

  /*** Элементы ***/
  // возвращает ссылку на контейнер-владелец исходного фрагмента
  container : function() {
    return document.getElementById(this.boxFragmentName);
  },
  // возвращает div-контейнер для source-фрагментов
  PanelSourceById : function() {
    return domNodeFirstChild(document.getElementById(this.templateSourcesName));
  },
  // возвращает div-контейнер для source-фрагментов
  PanelSourceByControl : function(PanelControl) {
    var SourcePanel;
    if (PanelControl) {
      var Canvas=domNodeNext(PanelControl);
      if (Canvas&&Canvas.tagName=="TABLE") {
        SourcePanel=domNodeFirstChild(Canvas.rows[0].cells[0]);
      }
    }
    return SourcePanel;
  },
  // значение lookup раздела шаблонов
  Lookup : function(ControlPanel) {
    var res;
    if (ControlPanel) {
      var collect=ControlPanel.getElementsByTagName("TABLE");
      for (var i=0;i<collect.length;i++) {
        if (collect[i].id==Lookup.lookupName) {
          res=Lookup.getResultBox(collect[i]);
          break;
        }
      }
    }
    return res;
  },
  /*** Операции ***/
  show : function(Control,width,height,title) {
    if (Control) {
      BoxAlert.cancel();
      this.EditBox=domNodeParent(Control,2).getElementsByTagName("textarea")[0];
      var Container=this.container();
      if (Container) {
        var DIV=domNodeFirstChild(Container);  // drag container
        // ширина
        if (parseInt(width)>0) DIV.style.width=width;
        // высота (table canvas)
        if (parseInt(height)>0) {
          var table=domNodeNext(domNodeFirstChild(DIV)); // container(div) - control panel(table) - canvas data(table)
          table.style.height=height;                                                                     // высота таблицы
          domNodeFirstChild(table.rows[0].cells[0]).style.height=height;    // высота div-контейнера текстов шаблонов
        }
        BoxAlert.message(DIV);
        BoxAlert.title(title);
      }
      this.init(this.EditBox);
    }
  },
  // подготовка контейнеров
  start : function(SourcePanel) {
    if (SourcePanel) {
      var dragObjects=SourcePanel.getElementsByTagName("div");
      for(var i=0; i<dragObjects.length; i++) {
        if (dragObjects[i].id.length==0) new TextTemplateDragObject(dragObjects[i]);
      }
//      new TextTemplateDropTarget(document.getElementById(this.templateResultName));
      var TR=domNodeParent(SourcePanel,2);
      new TextTemplateDropTarget(TR.cells[1]);
    }
  },
  // инициализация
  init : function(EditBox) {
    if (!EditBox) return false;
    this.start(this.PanelSourceById());  // контент в drag-mode
    var container=document.getElementById(this.prefix);
    var area=container.getElementsByTagName("textarea")[0];
    area.value=EditBox.value;
    var TD=domNodeParent(area);
    var bounds=getBounds(TD);
    area.style.width=(bounds.width-8)+"px";
    area.style.height=bounds.height+"px";
    area.style.display="";
    // коррекция на отступы
    var d=getBounds(TD).height-bounds.height;
    if (d>0) area.style.height=(parseInt(area.style.height)-d)+"px";
  },
  // возвращает исходный фрагмент в свой контейнер после использования
  reset : function(Fragment) {
    if (Fragment&&Fragment.id==this.boxFragmentName+"Container") {
      var Container=this.container();
      Container.appendChild(Fragment);
    }  
  },
  // отменить
  cancel : function(ev,Control) {
    BoxAlert.cancel();
    this.EditBox.focus();
    this.EditBox=null;
  },
  // применить
  apply : function(ev,Control) {
    if (this.EditBox) {
      var Panel=domNodeParent(Control,4);
      var Table=(Panel)?domNodeNext(Panel):null;
      if (Table&&Table.tagName=="TABLE") {
        this.EditBox.value=domNodeFirstChild(Table.rows[0].cells[1]).value;
        this.EditBox.onchange();
        this.EditBox.focus();
      }
    }
    BoxAlert.cancel();
  },
  // загрузить шаблоны
  load : function(Control) {
    if (Control) {
      var PanelSource=this.PanelSourceByControl(domNodeParent(Control,4));
      var L=this.Lookup(domNodeParent(Control));
      var patternValue=parseInt((L)?L.value:"0");
      // обращение за списком шаблонов
      if (patternValue>0) execSrvFunc(Control,this.callbackListFuncName,patternValue);
    }
  }
}
// callback для заполнения списка шаблонов
function callbackTextTemplateList(text) {
  var SourcePanel=TextTemplate.PanelSourceById();
  if (SourcePanel&&SourcePanel.tagName=="DIV") {
    SourcePanel.innerHTML=text;
    TextTemplate.start(SourcePanel);
  }
}

function TextTemplateDragObject(element) {
	element.dragObject = this
	TextTemplateDragMaster.makeDraggable(element)
	var rememberPosition
	var mouseOffset
	this.onDragStart = function(offset) {
		var s = element.style;
		rememberPosition = {top: s.top, left: s.left, position: s.position}
		s.position="absolute";
        s.opacity=0.6;
		mouseOffset=offset;
        // ширина drag-элемента
        var parentRect=domNodeParent(element,2).getBoundingClientRect();
        s.width=Math.round(parentRect.right-parentRect.left-32)+"px";
	}
	this.hide = function() {
		element.style.display="none";
        return element;
	}
	this.show = function() {
		element.style.display=""; 
	}
	this.onDragMove = function(x, y) {
		element.style.top =  y - mouseOffset.y +'px'
		element.style.left = x - mouseOffset.x +'px'
	}
	this.onDragSuccess = function(dropTarget) { }
	this.onDragFail = function() {
		var s=element.style;
		s.top=rememberPosition.top;
		s.left=rememberPosition.left;
        s.width="";  // отмена фикс. ширины при отмене переноса
		s.position=rememberPosition.position;
        s.opacity=1;
	}
	this.toString = function() {
		return element.id
	}
}

/***************************************************************************************/
function TextTemplateDropTarget(element) {
	element.dropTarget = this
	this.canAccept = function(dragObject) {
		return true
	}
	this.accept = function(dragObject) {
		this.onLeave()
		var dragObjectElement=dragObject.hide();
        // результат в textarea.value
        var area=domNodeFirstChild(element);
        area.value=(area.value.length>0)?area.value+"\n":area.value;
        area.value=area.value+dragObjectElement.innerHTML;
        area.focus();
//element.innerHTML=element.innerHTML+" "+dragObjectElement.innerHTML;
//alert("Акцептор '"+this+"', объект '"+dragObject+"'")
	}
	this.onLeave = function() {
		element.className="";
                               domNodeFirstChild(element).style.backgroundColor="";
	}
	this.onEnter = function() {
		element.className="reception";
                               domNodeFirstChild(element).style.backgroundColor=TextTemplate.targetBackgroundColor;
	}
	this.toString = function() {
		return element.id;
	}
}

/***************************************************************************************/
var TextTemplateDragMaster = (function() {
    var dragObject
    var mouseDownAt
	var currentDropTarget
	function mouseDown(e) {
		e = fixEvent(e)
		if (e.which!=1) return
 		mouseDownAt = { x: e.pageX, y: e.pageY, element: this }
		addDocumentEventHandlers()
		return false
	}
	function mouseMove(e){
		e = fixEvent(e)
		// (1)
		if (mouseDownAt) {
			if (Math.abs(mouseDownAt.x-e.pageX)<5 && Math.abs(mouseDownAt.y-e.pageY)<5) {
				return false
			}
			// Начать перенос
			var elem  = mouseDownAt.element
			// текущий объект для переноса
			dragObject = elem.dragObject
			// запомнить, с каких относительных координат начался перенос
			var mouseOffset = getMouseOffset(elem, mouseDownAt.x, mouseDownAt.y)
			mouseDownAt = null // запомненное значение больше не нужно, сдвиг уже вычислен
			dragObject.onDragStart(mouseOffset) // начали
		}
		// (2)
		dragObject.onDragMove(e.pageX, e.pageY)
		// (3)
		var newTarget = getCurrentTarget(e)
		// (4)
		if (currentDropTarget != newTarget) {
			if (currentDropTarget) {
				currentDropTarget.onLeave()
			}
			if (newTarget) {
				newTarget.onEnter()
			}
			currentDropTarget = newTarget
		}
		// (5)
		return false
    }
    function mouseUp(){
		if (!dragObject) { // (1)
			mouseDownAt = null
		} else {
			// (2)
			if (currentDropTarget) {
				currentDropTarget.accept(dragObject)
				dragObject.onDragSuccess(currentDropTarget)
			} else {
				dragObject.onDragFail()
			}
			dragObject = null
		}
		// (3)
		removeDocumentEventHandlers()
    }
	function getMouseOffset(target, x, y) {
		var docPos	= getOffset(target)
		return {x:x - docPos.left, y:y - docPos.top}
	}
	function getCurrentTarget(e) {
		// спрятать объект, получить элемент под ним - и тут же показать опять
		if (navigator.userAgent.match('MSIE') || navigator.userAgent.match('Gecko')) {
			var x=e.clientX, y=e.clientY
		} else {
			var x=e.pageX, y=e.pageY
		}
		// чтобы не было заметно мигание - максимально снизим время от hide до show
		dragObject.hide()
		var elem = document.elementFromPoint(x,y)
		dragObject.show()
		// найти самую вложенную dropTarget
		while (elem) {
			// которая может принять dragObject 
			if (elem.dropTarget && elem.dropTarget.canAccept(dragObject)) {
				return elem.dropTarget
			}
			elem = elem.parentNode
		}
		// dropTarget не нашли
		return null
	}
	function addDocumentEventHandlers() {
		document.onmousemove = mouseMove
		document.onmouseup = mouseUp
		document.ondragstart = document.body.onselectstart = function() {return false}
	}
	function removeDocumentEventHandlers() {
		document.onmousemove = document.onmouseup = document.ondragstart = document.body.onselectstart = null
	}
    return {
		makeDraggable: function(element){
			element.onmousedown = mouseDown
		}
    }
}())

/********************************************************************************/
function fixEvent(e) {
	e = e || window.event
	if ( e.pageX == null && e.clientX != null ) {
		var html = document.documentElement
		var body = document.body
		e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0)
		e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0)
	}
	if (!e.which && e.button) {
		e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) )
	}
	return e
}

function getOffset(elem) {
    if (elem.getBoundingClientRect) {
//        var rect=getOffsetRect(elem);
//        return {top:rect.scrollTop,left:rect.scrollLeft}
        return getOffsetRect_(elem)
    } else {
        return getOffsetSum(elem)
    }
}

function getOffsetRect_(elem) {
    var box = elem.getBoundingClientRect()
    var body = document.body
    var docElem = document.documentElement
    var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop
    var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft
    var clientTop = docElem.clientTop || body.clientTop || 0
    var clientLeft = docElem.clientLeft || body.clientLeft || 0
//1.    var top  = box.top +  scrollTop - findPosY(elem) //200
//    var left = box.left + scrollLeft - clientLeft - findPosX(elem) //400
//2.    var top  = box.top +  scrollTop - clientTop - 200
//    var left = box.left + scrollLeft - clientLeft - 400
    // с учетом абсолютного позиционирования предка
    var parentElem=elem.offsetParent;
    parentBox=(parentElem)?parentElem.getBoundingClientRect():{top:0,left:0};
    var top=box.top-clientTop-parentBox.top;
    var left=box.left-clientLeft-parentBox.left;

    return { top: Math.round(top), left: Math.round(left) }
}

function getOffsetSum(elem) {
    var top=0, left=0
    while(elem) {
        top = top + parseInt(elem.offsetTop)
        left = left + parseInt(elem.offsetLeft)
        elem = elem.offsetParent        
    }
    return {top: top, left: left}
}

function findPosX(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        while (1) {
            curleft+=obj.offsetLeft;
            if (!obj.offsetParent) {
                break;
            }
            obj=obj.offsetParent;
        }
    } else if (obj.x) {
        curleft+=obj.x;
    }
    return curleft;
} 

function findPosY(obj) {
    var curtop = 0;
    if (obj.offsetParent) {
        while (1) {
            curtop+=obj.offsetTop;
            if (!obj.offsetParent) {
                break;
            }
            obj=obj.offsetParent;
        }
    } else if (obj.y) {
        curtop+=obj.y;
    }
    return curtop;
}
