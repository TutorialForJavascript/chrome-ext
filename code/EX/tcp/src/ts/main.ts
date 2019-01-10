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
