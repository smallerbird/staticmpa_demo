require([
    'css!demo/templete/css.min',
    'component/fc_select/js.min',
    //'css!component/fc_select/css.min'
],(a1,FC_select)=>{
    $('#fc_select-container').show();
    console.log('show div #templete-container');
    //console.log('新的加载方式..')
    //code that requires the stylesheet: styles/main.css
    $('#fc_select-container').show();
    let targetSelector='#selecttestContainer1';
    let id='testSelect';

    let data=[
        {label:'2018',value:'2018'},
        {label:'2017',value:'2017'},
        {label:'2016',value:'2016'},
        {label:'2015',value:'2015'}
    ]
    let cssoffset={'selectList':{left:40,width:135}}
    let value=0;
    new FC_select({targetSelector,id,data,value,cssoffset,$})

    targetSelector='#selecttestContainer2';
    id='testSelect2';
    data=[
        {label:'1很长很长很长很长很长很长很长',value:1},
        {label:'2很长很长很长很长很长很长很长',value:2},
        {label:'3很长很长很长很长很长很长很长',value:3},
        {label:'4很长很长很长很长很长很长很长',value:4}
    ]
    cssoffset={'selectList':{left:200,width:135}}
    value=2;
    new FC_select({targetSelector,id,data,value,cssoffset,$})
});
