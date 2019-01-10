chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create(
        'main.html', {
        "id": 'main',
        "bounds": {
            'width': 542,
            'height': 360
        },
        'resizable': false,
        "frame": 'none' //如此设置窗口将不显示标题栏
        //alwaysOnTop: true//可以设置为总在顶部
        //hidden: true //可以设为隐藏,这样就可以相当于后台运行
    },function(appWindow:any){
        console.log(appWindow)
    })
})
