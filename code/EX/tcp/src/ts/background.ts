/// <reference path="lib/libChromeAppSocket.ts" />

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
        //frame: 'none', //如此设置窗口将不显示标题栏
        state: 'normal'//初始状态,可以设为全屏还可以是fullscreen,normal、maximized和minimized
        //alwaysOnTop: true//可以设置为总在顶部
        //hidden: true //可以设为隐藏,这样就可以相当于后台运行
    },function(appWindow:any){
        console.log(appWindow)
    })
})
function receiveMsg(info:ChromeAppSocket.TCPReceiveEventArgs){
    console.log(info.data)
    let utf8decoder = new TextDecoder()
    let msg = utf8decoder.decode(new Uint8Array(info.data))
    console.log(msg)
    chrome.runtime.sendMessage({action:'receive', msg:msg})
}

let tcpSocket = new ChromeAppSocket.TCP(undefined,receiveMsg,undefined,()=>{
    tcpSocket.connect("0.0.0.0",9997,()=>{
        console.log("connnected to 0.0.0.0:9997" )
    })
})

chrome.runtime.onMessage.addListener((message, sender, callback)=>{
    if(message.action == 'send'){
        let utf8encoder = new TextEncoder()
        let buf = utf8encoder.encode(message.msg).buffer
        console.log("message.msg")
        console.log(message.msg)
        console.log(buf)
        tcpSocket.send( buf,function(info:ChromeAppSocket.SendInfo){
            console.log(info)
        })
    }
})
