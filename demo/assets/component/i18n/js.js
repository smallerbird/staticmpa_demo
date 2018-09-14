define('component/i18n/js.min', function() {
    class I18n{
        constructor({language='cn',urlbase}) {
            this.urlbase=urlbase;
            this.changLanguage(language);
        }
        changLanguage(language){
            let urlbase=this.urlbase;
            let url=urlbase+language+'.json';
            $.getJSON(url,function(data){
                //console.log('json:',data)
                $('.i18n-hide').each(function () {
                    let $this=$(this);
                    let id=$this.data('i18n-id');
                    $this.show()
                    if (id.indexOf('.')==-1){
                        $this.html(data[id]);
                    }else{
                        //console.log('id:',id)
                        let arrId=id.split('.')
                        let value=data;
                        for (let i=0;i<arrId.length;i++){
                            value=value[arrId[i]];
                            //console.log(value)
                        }
                        $this.html(value);
                    }

                })
            });
        }

    }
    return I18n;
});