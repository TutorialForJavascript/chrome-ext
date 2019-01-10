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
//# sourceMappingURL=control.js.map