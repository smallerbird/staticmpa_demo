define('component/DebugInfoPad/js.min', function() {
class DebugInfoPad{
    constructor({containerSelect='body'}){
        var THIS=this;
        this.$=$;
        this.$containerSelect=this.$(containerSelect);
        this._isInit=false;
        this.$htmlPad=null;

        /**
         * 让一个对像可以拖动
         * @param bar
         * @param target
         * @param callback
         * //http://www.zhangxinxu.com/wordpress/2010/03/javascript%E5%AE%9E%E7%8E%B0%E6%9C%80%E7%AE%80%E5%8D%95%E7%9A%84%E6%8B%96%E6%8B%BD%E6%95%88%E6%9E%9C/
         */
        window.startDrag=function(bar, target, callback){
            var params = {
                left: 0,
                top: 0,
                currentX: 0,
                currentY: 0,
                flag: false
            };
            //获取相关CSS属性
            var getCss = function(o,key){
                return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
            };
            if(getCss(target, "left") !== "auto"){
                params.left = getCss(target, "left");
            }
            if(getCss(target, "top") !== "auto"){
                params.top = getCss(target, "top");
            }
            //o是移动对象
            bar.onmousedown = function(event){
                params.flag = true;
                if(!event){
                    event = window.event;
                    //防止IE文字选中
                    bar.onselectstart = function(){
                        return false;
                    }
                }
                var e = event;
                params.currentX = e.clientX;
                params.currentY = e.clientY;
            };
            document.onmouseup = function(){
                params.flag = false;
                if(getCss(target, "left") !== "auto"){
                    params.left = getCss(target, "left");
                }
                if(getCss(target, "top") !== "auto"){
                    params.top = getCss(target, "top");
                }
            };
            document.onmousemove = function(event){
                var e = event ? event: window.event;
                if(params.flag){
                    var nowX = e.clientX, nowY = e.clientY;
                    var disX = nowX - params.currentX, disY = nowY - params.currentY;
                    target.style.left = parseInt(params.left) + disX + "px";
                    target.style.top = parseInt(params.top) + disY + "px";
                }

                if (typeof callback == "function") {
                    callback(parseInt(params.left) + disX, parseInt(params.top) + disY);
                }
            }
        };
        //ctrl+alt+d
        document.onkeydown=function(event){
            var e = event || window.event || args.callee.caller.args[0];
            if(e &&e.ctrlKey&&e.altKey&&e.keyCode==68){
                THIS._init();
                THIS.$htmlPad.toggle();
            }
        };
    }
    _init(){
        //
        if(this._isInit)  return;
        this._isInit=true;
        var THIS=this;
        let $htmlPad=this.$(`<div class="debug_info_pad">
                        <div class="title">
                            <div class="tip">调试页面(*点击删除一行)</div>
                            <a href="#" class="close">关闭</a>
                            <a href="#" class="show">隐藏</a>
                        </div>
                        <div class="container">
                        </div>
                    </div>`);
        this.isShowContainer=false;
        this.$htmlPad=$htmlPad;

        this.$container=$htmlPad.find('.container');

        $htmlPad.find('.close').click(function(e){
            window.e_preventDefault(e);
            $htmlPad.hide();
        });
        $htmlPad.find('.show').click(function(e){
            window.e_preventDefault(e);
            if(THIS.isShowContainer){
                THIS.$container.hide();
                $(this).html('显示');
            }else{
                THIS.$container.show();
                $(this).html('隐藏');
            }
            THIS.isShowContainer=!THIS.isShowContainer;
        });
        this.$containerSelect.append($htmlPad);
        //开始拖动
        window.startDrag($htmlPad.find('.title')[0],$htmlPad[0]);

    }
    _print(args,type){
        this._init();
        let $=this.$;
        for (let i = 0; i < args.length; i++) {
            let item=JSON.stringify(args[i]);
            let itemHtml=$(`<a href="#" class="debug_row ${type}">
                        ${item}
                        </a>`);
            this.$container.append(itemHtml);
            itemHtml.click(function(e){
                window.e_preventDefault(e);
                $(this).remove();
            });
        }
    }
    log() {
        this._print(arguments,'log')
    }
    error() {
        this._print(arguments,'error')
    }
}
    return DebugInfoPad;
});