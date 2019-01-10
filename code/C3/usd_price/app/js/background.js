var url = 'http://query.yahooapis.com/v1/public/yql?q=select%20Rate%20from%20yahoo.finance.xchange%20where%20pair%20in%20(%22USDCNY%22)&env=store://datatables.org/alltableswithkeys&format=json';
var price;
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
function updateAmount(amount, exchange) {
    httpRequest(url, function (result) {
        var result_json = JSON.parse(result);
        var price = Number(result_json["query"]["results"]["rate"]["Rate"]);
        amount = Number(amount);
        if (isNaN(amount) || !amount) {
            exchange([{
                    'content': '$1 = ¥' + price.toString(),
                    'description': '$1 = ¥' + price.toString()
                }, {
                    'content': '¥1 = $' + (1 / price).toFixed(6).toString(),
                    'description': '¥1 = $' + (1 / price).toFixed(6).toString()
                }]);
        }
        else {
            exchange([{
                    'content': '$' + amount.toString() + ' = ¥' + (amount * price).toFixed(2).toString(),
                    'description': '$' + amount.toString() + ' = ¥' + (amount * price).toFixed(2).toString()
                }, {
                    'content': '¥' + amount.toString() + ' = $' + (amount / price).toFixed(6).toString(),
                    'description': '¥' + amount.toString() + ' = $' + (amount / price).toFixed(6).toString()
                }]);
        }
    });
}
function gotoYahoo(text) {
    window.open('http://finance.yahoo.com/q?s=USDCNY=X');
}
chrome.omnibox.setDefaultSuggestion({ 'description': 'Find current USD price.' });
chrome.omnibox.onInputChanged.addListener(updateAmount);
chrome.omnibox.onInputEntered.addListener(gotoYahoo);
//# sourceMappingURL=background.js.map