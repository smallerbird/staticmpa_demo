require(['css!demo/getpost/css.min'],()=>{
    $('#getpost-container').show();
    console.log('show div #getpost-container');

    function debug(t, o) {
        alert(t + JSON.stringify(o))
    }
    $('.btnDebug').click(function (e) {
        window.e_preventDefault(e)
        let $this=$(this);
        let type=$this.data('type');
        switch(type){
            case 'get':
                window.WebAPI.get({url: "testapi_get", params: {a: 1, b: 2}}).then(function (o) {
                    debug("[get ok:]", o)
                }, function (o) {
                    debug("[get error:]", o)
                })
                break;
            case 'post':
                window.WebAPI.post({url: "testapi_post", body: {msg: "hi~form post"}, params: {c: 1, d: 2}}).then(function (o) {
                    debug("[post ok:]", o)
                }, function (o) {
                    debug("[post error:]", o)
                })
                break;
            case 'post':
                window.WebAPI.put({url: "testapi_put", body: {msg: "hi~form put"}, params: {e: 1, f: 2}}).then(function (o) {
                    debug("[put ok:]", o)
                }, function (o) {
                    debug("[put error:]", o)
                })
                break;
            case 'deletet':
                window.WebAPI.put({
                    url: "testapi_deletet",
                    body: {msg: "hi~form deletet"},
                    params: {g: 1, h: 2}
                }).then(function (o) {
                    debug("[deletet ok:]", o)
                }, function (o) {
                    debug("[deletet error:]", o)
                })
                break;
            case 'response401':{
                let callbackStatusCode = function (t) {
                    console.log("StatusCode:" + t), 401 == t && alert("收到401返回")
                };
                window.WebAPI.post({
                    url: "testapi_401",
                    body: {msg: "hi~form response401"},
                    params: {c: 1, d: 2},
                    callbackStatusCode
                }).then(function (o) {
                    debug("[post ok:]", o)
                }, function (o) {
                    debug("[post error:]", o)
                })
                break;
            }
            case 'response403':{
                let callbackStatusCode = function (t) {
                    console.log("StatusCode:" + t), 403 == t && alert("收到403返回")
                };
                window.WebAPI.post({
                    url: "testapi_403",
                    body: {msg: "hi~form response403"},
                    params: {c: 1, d: 2},
                    callbackStatusCode: callbackStatusCode
                }).then(function (o) {
                    debug("[post ok:]", o)
                }, function (o) {
                    debug("[post error:]", o)
                })
                break;
            }
        }
    })
    /*function t(t, o) {
        alert(t + JSON.stringify(o))
    }
    window.WebAPI.setCallbackStepStatus(function (t, o) {
        console.log("callbackStepStatus:", t, o)
    });
    var o = {};
    $(".btnDebug").click(function (t) {
        t.preventDefault();
        var e = $(this).data("type");
        o[e]()
    }), o.get = function () {
        console.log("get.."), window.WebAPI.get({url: "testapi_get", params: {a: 1, b: 2}}).then(function (o) {
            t("[get ok:]", o)
        }, function (o) {
            t("[get error:]", o)
        })
    }, o.post = function () {
        window.WebAPI.post({url: "testapi_post", body: {msg: "hi~form post"}, params: {c: 1, d: 2}}).then(function (o) {
            t("[post ok:]", o)
        }, function (o) {
            t("[post error:]", o)
        })
    }, o.put = function () {
        window.WebAPI.put({url: "testapi_put", body: {msg: "hi~form put"}, params: {e: 1, f: 2}}).then(function (o) {
            t("[put ok:]", o)
        }, function (o) {
            t("[put error:]", o)
        })
    }, o.deletet = function () {
        window.WebAPI.put({
            url: "testapi_deletet",
            body: {msg: "hi~form deletet"},
            params: {g: 1, h: 2}
        }).then(function (o) {
            t("[deletet ok:]", o)
        }, function (o) {
            t("[deletet error:]", o)
        })
    }, o.response401 = function () {
        var o = function (t) {
            console.log("StatusCode:" + t), 401 == t && alert("收到401返回")
        };
        window.WebAPI.post({
            url: "testapi_401",
            body: {msg: "hi~form response401"},
            params: {c: 1, d: 2},
            callbackStatusCode: o
        }).then(function (o) {
            t("[post ok:]", o)
        }, function (o) {
            t("[post error:]", o)
        })
    }, o.response403 = function () {
        var o = function (t) {
            console.log("StatusCode:" + t), 403 == t && alert("收到403返回")
        };
        window.WebAPI.post({
            url: "testapi_403",
            body: {msg: "hi~form response403"},
            params: {c: 1, d: 2},
            callbackStatusCode: o
        }).then(function (o) {
            t("[post ok:]", o)
        }, function (o) {
            t("[post error:]", o)
        })
    }*/
});
