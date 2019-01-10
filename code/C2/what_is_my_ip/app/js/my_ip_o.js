var url = 'http://1212.ip138.com/ic.asp';
function httpRequest(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    };
    xhr.send();
}
httpRequest(url, function (text) {
    document.getElementById('ip_div').innerHTML = text;
});
//# sourceMappingURL=my_ip_o.js.map