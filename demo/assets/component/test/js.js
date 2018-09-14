define('component/test/js.min',[
    'bootstrap',
    'layer'
], function() {
    //页面运行代码放入到这里--------------------
    class Test{
        hi({msg=''}){
            console.log('hi~ :'+msg)
        }

    }
    /*function Test(){
        function hi({msg=''}){
            let {a,b,c}={a:1,b:2,c:3}
            console.log('hi~ :'+msg,a, b,c)
            console.log(`abc:${msg}`)
        }
        this.hi=hi;
    }*/
    return Test;
});