let current_window = chrome.app.window.current();

document.getElementById('minimize').onclick = () => {
    current_window.minimize()
}

document.getElementById('close').onclick = () => {
    current_window.hide()
}

document.getElementById('maximize').onclick = () => {
    current_window.isMaximized() ? current_window.restore():current_window.maximize()
}
