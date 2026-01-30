Menu = {

subPosition : function(Obj) {
                          if (Obj) {
                            var UL=domNodeNext(Obj)
                            if (UL&&UL.tagName=="UL") UL.style.left=getBounds(Obj).width+"px";
                          }
                        }


}
