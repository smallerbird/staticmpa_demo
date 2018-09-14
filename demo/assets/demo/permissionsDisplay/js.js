require(['css!demo/permissionsDisplay/css.min'],()=>{
    $('#permissionsDisplay-container').show();
    console.log('show div #permissionsDisplay-container....');

    function debug(n, i) {
        window.SMPA.alert(n + JSON.stringify(i))
    }
    window.WebAPI.get({url: "testapi_permissions"}).then(function (n) {
        window.WebAPI.permissions.setValue(n.data, !0)
    }, function (i) {
        debug("[get error:]", i)
    })
});
