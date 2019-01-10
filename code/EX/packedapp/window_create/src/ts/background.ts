chrome.app.runtime.onLaunched.addListener(function() {
    chrome.app.window.create(
        'main.html', {
        id: 'main',
        bounds: {
            width: 800,//默认宽度
            height: 600,//默认高度
            left: 100,//顶点出现位置
            top: 100,//顶点出现位置


        },
        //resizable: false,//如果不希望用户调整窗口尺寸可以指定窗口的resizable属性值为false：
        minWidth: 900,//最小宽度
        minHeight: 700,//最小高度
        maxWidth: 600,//最大宽度
        maxHeight: 400,//最大高度
        frame: 'none', //如此设置窗口将不显示标题栏
        state: 'normal'//初始状态,可以设为全屏还可以是fullscreen,normal、maximized和minimized
        //alwaysOnTop: true//可以设置为总在顶部
        //hidden: true //可以设为隐藏,这样就可以相当于后台运行
    },function(appWindow:any){
        console.log(appWindow)
    })
})
