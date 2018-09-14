require(['css!demo/i18n/css.min',
    'component/i18n/js.min'
],(a1,I18n)=>{
    $('#i18n-container').show();
    console.log('show div #i18n-container');
    let i18n=new I18n({language:'cn',urlbase:'/assets/demo/i18n/language/'})
    $('.debugbtn').click(function (e) {
        window.e_preventDefault(e)
        let $this = $(this);
        let type = $this.data('type');
        i18n.changLanguage(type)
    });
});
