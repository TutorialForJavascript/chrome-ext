var _this = this;
var current_window = chrome.app.window.current();
document.getElementById('minimize').onclick = function () {
    current_window.minimize();
};
document.getElementById('close').onclick = function () {
    current_window.close();
};
document.getElementById('maximize').onclick = function () {
    current_window.isMaximized() ? current_window.restore() : current_window.maximize();
};
var textarea = document.getElementById("sendMSG");
textarea.onkeyup = function (e) {
    if (e.keyCode == 13) {
        chrome.runtime.sendMessage({
            action: 'send',
            msg: encodeURIComponent(textarea.value)
        });
        _this.value = "";
    }
};
chrome.runtime.onMessage.addListener(function (message, sender, callback) {
    if (message.action == 'receive') {
        var el = document.createElement('div');
        el.innerText = decodeURIComponent(message.msg);
        document.getElementById('history').appendChild(el);
    }
});
//# sourceMappingURL=main.js.map