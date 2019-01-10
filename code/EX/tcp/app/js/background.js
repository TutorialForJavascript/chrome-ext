chrome.app.runtime.onLaunched.addListener(function () {
    chrome.app.window.create('main.html', {
        id: 'main',
        bounds: {
            width: 800,
            height: 600,
            left: 100,
            top: 100,
        },
        minWidth: 900,
        minHeight: 700,
        maxWidth: 600,
        maxHeight: 400,
        state: 'normal'
    }, function (appWindow) {
        console.log(appWindow);
    });
});
function receiveMsg(info) {
    console.log(info.data);
    var utf8decoder = new TextDecoder();
    var msg = utf8decoder.decode(new Uint8Array(info.data));
    console.log(msg);
    chrome.runtime.sendMessage({ action: 'receive', msg: msg });
}
var tcpSocket = new ChromeAppSocket.TCP(undefined, receiveMsg, undefined, function () {
    tcpSocket.connect("0.0.0.0", 9997, function () {
        console.log("connnected to 0.0.0.0:9997");
    });
});
chrome.runtime.onMessage.addListener(function (message, sender, callback) {
    if (message.action == 'send') {
        var utf8encoder = new TextEncoder();
        var buf = utf8encoder.encode(message.msg).buffer;
        console.log("message.msg");
        console.log(message.msg);
        console.log(buf);
        tcpSocket.send(buf, function (info) {
            console.log(info);
        });
    }
});
//# sourceMappingURL=background.js.map