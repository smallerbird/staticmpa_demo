require(['css!demo/layer/css.min'],()=>{
    $('#layer-container').show();
    $('.btnDebug').click(function (e) {
        window.e_preventDefault(e)
        let $this = $(this);
        let type = $this.data('type');
        switch (type) {
            case 'loading':
                window.SMPA.DialogLoading(), setTimeout(function () {
                    window.SMPA.DialogLoadingClose()
                }, 3000)
                break;
            case 'alert':
                window.SMPA.alert("alert", function () {
                    alert("点击确定了")
                })
                break;
            case 'confirm':
                window.SMPA.confirm("是否要删除", function (t) {
                    alert(t)
                }, ["删除", "不删除"])
                break;
            case 'layer':
                layer.prompt({title: "输入任何口令，并确认", formType: 1}, function (t, e) {
                    layer.close(e), layer.prompt({title: "随便写点啥，并确认", formType: 2}, function (e, n) {
                        layer.close(n), layer.msg("演示完毕！您的口令：" + t + "<br>您最后写下了：" + e)
                    })
                })
                break;
        }
    });

});
