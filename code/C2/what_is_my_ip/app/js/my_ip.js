define(["require", "exports", "jquery"], function (require, exports, $) {
    "use strict";
    console.log("main");
    var url = 'http://1212.ip138.com/ic.asp';
    function httpRequest(url, callback) {
        $.get(url, function (data, status) {
            if (status === "success") {
                callback(data);
            }
        });
    }
    httpRequest(url, function (text) { return $('#ip_div').html(text); });
});
//# sourceMappingURL=my_ip.js.map