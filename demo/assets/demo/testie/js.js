define('admin.component.FC_mouseoverout',[],function () {
    class FC_mouseoverout{
        constructor({$target}){
            var THIS=this;
            this._$target=$target;
            this.$body=$('body')
            this.$pad=null;
            this._$target.on('mouseover',function () {
                console.log('FC_mouseoverout..')
                THIS._createPad();
            })
        }
        _createPad(){
            this.removePad();
            let html=$('<div>弹出面板</div>');
            html.css('position','fixed')
            this.$body.append(html);
        }
        removePad(){
            if (this.$pad){
                this.$pad.remove()
                this.$pad=null;
            }
        }
    }
    return FC_mouseoverout;
})
require([
    'css!demo/testie/css.min',
    'admin.component.FC_mouseoverout'
],(a1,FC_mouseoverout)=>{
    $('#testie-container').show();
    console.log('testie-container...');
    $('body').on('click','#testie-container #test1 .btn1',function(e){
        window.e_preventDefault(e);
        let $this=$(this);
        let html=`<ul>
       [:for(var i=0;i<data.length;i++){
       var item=data[i];
       :]
       <li>[:=item.label:]</li>
       [:}:]
</ul>`;
        html = window.renderTemplete(html, {
            data:[
                {label:'标题1'},
                {label:'标题2'},
                {label:'标题3'},
                {label:'标题4'},
                {label:'标题5'},
                {label:'标题6'},
                {label:'标题7'}
            ]
        })
        console.log('apeend html 123:',html)
        $('#test1container').append($(html))
        console.log($this.html());
    })

    new FC_mouseoverout({$target:$('#test3container #btn1')})

    function getRectInfo($target) {
        var offset = $target.offset();
        let width=$target.width();
        let height=$target.width();
        let x=offset.left;
        let y=offset.top;
        return {x, y, width,height}
    }
    function collideRect(rect1,rect2) {
        var maxX,maxY,minX,minY

        maxX = rect1.x+rect1.width >= rect2.x+rect2.width ? rect1.x+rect1.width : rect2.x+rect2.width
        maxY = rect1.y+rect1.height >= rect2.y+rect2.height ? rect1.y+rect1.height : rect2.y+rect2.height
        minX = rect1.x <= rect2.x ? rect1.x : rect2.x
        minY = rect1.y <= rect2.y ? rect1.y : rect2.y

        if(maxX - minX <= rect1.width+rect2.width && maxY - minY <= rect1.height+rect2.height){
            return true
        }else{
            return false
        }
    }
    function hitArea($target,$targetTo){
        var t1=getRectInfo($target);
        var t2=getRectInfo($targetTo);
        return collideRect(t1,t2);

    }
    var $mousebox=$('#test4container #mousebox')
    var $hitarea=$('#test4container #hitarea')
    var isStartDrag=false;
    var $window=$('body');//ie8只支持body
    var mouseOnOff=false;
    document.onkeydown=function(event){
        //http://www.w3school.com.cn/jsref/dom_obj_event.asp
        var e = event || window.event || args.callee.caller.args[0];
        console.log(e.keyCode);
        /*if(e &&e.ctrlKey&&e.altKey&&e.keyCode==68){
        }*/
        if(e &&e.shiftKey&&e.altKey&&e.keyCode==79){
            //alt+shift+o 开/关
            mouseOnOff=!mouseOnOff;
            if (mouseOnOff){
                $('#test4container .onoff').html('开')
            }else{
                $('#test4container .onoff').html('关')
            }
        }
    };
    function chekHit() {
        let isHit=hitArea($mousebox,$hitarea);
        if (isHit){
            $hitarea.css('background-color','#f00')
            $hitarea.css('color','#fff')
        }else{
            $hitarea.css('background-color','#666')
            $hitarea.css('color','#000')
        }
        console.log('isHit:'+isHit)
    }
    $window.on('mousedown',function (e) {
        if (!mouseOnOff) return;
        console.log('mousedown..')
        $mousebox.css('position','fixed')
        $mousebox.css('left',e.clientX)
        $mousebox.css('top',e.clientY)
        isStartDrag=true;
        chekHit()
    })

    $window.on('mousemove',function (e) {
        if (!mouseOnOff) return;
        if (!isStartDrag) return;
        //console.log('mousemove..')
        //clientX相对窗口左边缘
        // pageX相对文档左边缘
        var sPosPage = "(" + e.pageX + "," + e.pageY + ")";
        var sPosScreen = "(" + e.screenX + "," + e.screenY + ")";
        var sclient = "(" + e.clientX + "," + e.clientY + ")";
        $mousebox.html("Page: " + sPosPage + "<br>Screen: " + sPosScreen+"<br>sclient:"+sclient)
        /*$mousebox.css('left',e.pageX)
        $mousebox.css('top',e.screenY)*/
        $mousebox.css('left',e.clientX)
        $mousebox.css('top',e.clientY)
        chekHit();


    })
    $window.on('mouseup',function () {
        if (!mouseOnOff) return;
        isStartDrag=false;
        //console.log('mouseup..')
        $mousebox.css('position','static')
        $mousebox.html("按下开始鼠标跟踪");
        chekHit();
    })
});
