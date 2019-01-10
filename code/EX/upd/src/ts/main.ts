

let current_window = chrome.app.window.current();

document.getElementById('minimize').onclick = () => {
    current_window.minimize()
}

document.getElementById('close').onclick = () => {
    current_window.close()
}

document.getElementById('maximize').onclick = () => {
    current_window.isMaximized() ? current_window.restore() : current_window.maximize()
}

let textarea = <HTMLInputElement>document.getElementById("sendMSG")
textarea.onkeyup = (e) => {

    if (e.keyCode == 13) {
        chrome.runtime.sendMessage({
            action: 'send',
            msg: encodeURIComponent(textarea.value)
            //msg:textarea.value
        })
        this.value = ""
    }
}
chrome.runtime.onMessage.addListener(function(message, sender, callback){
    if(message.action == 'receive'){
        let el = document.createElement('div')
        el.innerText = decodeURIComponent(message.msg)
        document.getElementById('history').appendChild(el)
    }
})
