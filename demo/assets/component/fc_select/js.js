define('component/fc_select/js.min',[],function () {
//define(function (require, exports, module) {
    class FC_select{
        /**
         *
         * @param targetSelector jquery选择器字符串
         * @param id select id
         * @param data 数据
         * @param value 默认选中值
         * @param cssoffset css微调   {'selectList':{left:下拉面板左右微调;width: 下拉面板的宽度，默认169px;}}
         *
         */
        constructor({targetSelector,id,data,value=0,cssoffset={},$}) {
            this.id=id;
            this.$targetContainer=$(targetSelector)
            let cssoffset_selectList=''
            if (typeof cssoffset.selectList!='undefined'){
                let left=cssoffset.selectList.left;
                let width=cssoffset.selectList.width;
                cssoffset_selectList=` style="left: ${left}px;width: ${width}px;"`
            }
            let index=0;
            for (let i=0;i<data.length;i++){
                if (data[i].value==value){
                    index=i;
                    break;
                }
            }
            let label=data[index].label;
            let currentValue=data[index].value;
            let tpl=`
                <div class="FC-select" id="${id}">
                    <div class="title"><span>${label}</span><input type="hidden" id="${id}_value" value="${currentValue}" /></div>
                    <div class="select-list"${cssoffset_selectList}>
                        [:for(var i=0;i<data.length;i++){:]
                            <a href="#" data-value="[:=data[i].value:]">[:=data[i].label:]</a>
                        [:}:]
                    </div>
                    <div class="clearfix"></div>
                </div>
            `;
            //console.log('tpl:',tpl)
            let html=window.renderTemplete(tpl,{data});
            //this.$target=$(html)
            this.$targetContainer.append(html);
            this.$target=this.$targetContainer.find('#'+id);
            this._init();
        }
        _init(){
            var THIS=this;
            var $this=this.$target;
            //初始化点击状态
            $this.click((e)=>{
                window.e_preventDefault(e);
                $this.addClass('fcselectopen')
            })
            $this.mouseleave(function(e){
                window.e_preventDefault(e);
                $this.removeClass("fcselectopen");
            });
            var $title=$this.find('.title>span');
            var $value=$this.find('.title>input');
            $this.on('click','.select-list>a',function(e){
                window.e_preventDefault(e);
                window.e_stopPropagation(e)
                $this.removeClass("fcselectopen");
                console.log($this.html())
                var $thisT=$(this)
                var value=$thisT.data('value')
                var title=$thisT.html();
                $title.html(title);
                $value.html(value);
                //console.log(value,title)
            })
        }

    }

    //exports.FC_select=FC_select;
    return FC_select;
});
