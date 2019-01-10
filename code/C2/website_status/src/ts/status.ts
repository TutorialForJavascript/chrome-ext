const url='http://www.google.cn/'

function httpRequest(url:string, callback:(status:boolean)=>void){
    let xhr = new XMLHttpRequest()
    xhr.open("GET", url, true)
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(true)
        }
    }
    xhr.onerror = function(){
        callback(false)
    }
    xhr.send()
}

function checkStatus(){
    httpRequest(url, (status)=>{
        chrome.browserAction.setIcon({path: 'images/'+(status?'online.png':'offline.png')})
        setTimeout(checkStatus, 5000)
    })
}

checkStatus()
