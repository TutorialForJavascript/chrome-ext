var url_base = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
var APPID = '&APPID=18dbbbf626b02a618ed8a6536a20341d';
var city = localStorage.getItem('city') !== null ? localStorage.getItem('city') : 'beijing';
var url = url_base + city + ',china&lang=zh_cn' + APPID;
function httpRequest(url, callback) {
    $.get(url, function (data, state) {
        if (state === "success") {
            console.log(data);
            callback(data);
        }
    });
}
function showWeather(result) {
    var list = result["list"];
    console.log(list);
    var title = '<h2>' + result['city']['name'] + '</h2>';
    var table = '<table><tr><th>日期</th><th>天气</th><th>最低温度</th><th>最高温度</th></tr>';
    for (var i in list) {
        var d = new Date(list[i].dt * 1000);
        table += '<tr>';
        table += '<td>' + d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + '</td>';
        table += '<td>' + list[i].weather[0].description + '</td>';
        table += '<td>' + Math.round(list[i].temp.min - 273.15) + ' °C</td>';
        table += '<td>' + Math.round(list[i].temp.max - 273.15) + ' °C</td>';
        table += '</tr>';
    }
    table += '</table>';
    $('#weather').html(title + table);
}
httpRequest(url, showWeather);
//# sourceMappingURL=weather.js.map