const Path=require('path')
const fs=require('fs')
function scanCallbak(file) {
    //删除build文件夹里面 .map .es2015

    if (file.indexOf('.min.js.es2015')!=-1){
        let filename=file.split('.min.js.es2015')[0]
        let js1=filename+'.min.js.map'
        let js2=filename+'.js'
        let js3=file
        console.log('scanCallbak:'+file,'\n',js1+'['+fs.existsSync(js1)+']','\n', js2+'['+fs.existsSync(js2)+']')
        if (fs.existsSync(js1)&&fs.existsSync(js2)){
            console.log('需要删除的 js:',js1)
            console.log('需要删除的 js:',js2)
            console.log('需要删除的 js:',js3)
            fs.unlink(js1,function (err) {
                if (err) console.log(err)
                //console.log('删除成功：'+js1)
            })
            fs.unlink(js2,function (err) {
                if (err) console.log(err)
                //console.log('删除成功：'+js2)
            })
            fs.unlink(js3,function (err) {
                if (err) console.log(err)
                //console.log('删除成功：'+js3)
            })
        }
    }
    if (file.indexOf('.min.css')!=-1){
        let filename=file.split('.min.css')[0]
        let css1=filename+'.css'
        let css2=filename+'.less'
        console.log('scanCallbak:'+file,'\n',css1+'['+fs.existsSync(css1)+']','\n', css2+'['+fs.existsSync(css2)+']')
        if (fs.existsSync(css1)&&fs.existsSync(css2)){
            console.log('需要删除的 css1:',css1)
            console.log('需要删除的 css2:',css2)
            fs.unlink(css1,function (err) {
                if (err) console.log(err)
                //console.log('删除成功：'+css1)
            })
            fs.unlink(css2,function (err) {
                if (err) console.log(err)
                //console.log('删除成功：'+css2)
            })
        }
    }
}
module.exports={
    describe:"合并admin的公共代码",
    merge:[
        {
            files:[
                {from:'../node_modules/staticmpa/pubassets/dist/es5-shim/es5-shim.min.js',toResolve:true},
                {from:'../node_modules/staticmpa/pubassets/dist/es5-shim/es5-sham.min.js',toResolve:true},
                //{from:'../node_modules/staticmpa/pubassets/dist/polyfill.min.js',toResolve:true},
                {from:'../node_modules/staticmpa/pubassets/dist/jquery/jquery-1.12.4.min.js',toResolve:true},
                {from:'../node_modules/staticmpa/pubassets/dist/jquery/jquery.cookie.js',toResolve:true},
                {from:'../node_modules/staticmpa/pubassets/dist/layer/layer.js',toResolve:true},
                {from:'../node_modules/staticmpa/pubassets/dist/require.js',toResolve:true},
             ],
            name:{file:'../node_modules/staticmpa/pubassets/dist/layer/merge.js',toResolve:true}
        }/*,
        {
            files:[
                {from:'../admin/assets/component/FC_select/js.min.js',toResolve:true},
             ],
            name:{file:'../admin/assets/component/cc1.js',toResolve:true}
        },*/

    ],
    scan:{
        dir:[
            {from:'../build/demo',toResolve:true,callback:scanCallbak},
        ],
        ignoreScan:[/node_modules/,/\.git/,/\.idea/]
    }
}