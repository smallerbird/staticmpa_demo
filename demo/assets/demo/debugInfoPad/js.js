require([
    'css!demo/debugInfoPad/css.min',
    'component/DebugInfoPad/js.min',
],(a1,DebugInfoPad)=>{
    $('#debugInfoPad-container').show();


    let DIP=new DebugInfoPad({})
    DIP.log('show div #debugInfoPad-container');
    $('.debugbtn').click(function (e) {
        window.e_preventDefault(e);
        let type=$(this).data('type')
        switch(type){
            case 'log':
                DIP.log(`log test.. ${new Date().getTime()}`);
                break;
            case 'warn':
                DIP.error(`log warn.. ${new Date().getTime()}`);
                break;
        }
    })

});
