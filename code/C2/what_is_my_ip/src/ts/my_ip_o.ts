const url:string = 'http://1212.ip138.com/ic.asp'



function httpRequest(url:string, callback:(url:string)=>void){
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}

httpRequest(url,
(text:string)=>{
    document.getElementById('ip_div').innerHTML = text}
)
