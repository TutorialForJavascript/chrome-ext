function weather() {
    var url_base = 'http://api.openweathermap.org/data/2.5/forecast/daily?q=';
    var APPID = '&APPID=18dbbbf626b02a618ed8a6536a20341d';
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
    var db;
    var name = "mydb";
    var version = 1;
    var request = window.indexedDB.open(name, version);
    var city;
    var storeName = "city";
    request.onerror = function (event) {
        alert('open error 2');
    };
    request.onsuccess = function (event) {
        db = event.target.result;
        alert(db.name);
    };
    request.onupgradeneeded = function (e) {
        if (!db.objectStoreNames.contains(storeName)) {
            db.createObjectStore(storeName, { keyPath: "id" });
        }
        console.log('DB version changed to ' + version);
    };
    var transaction = db.transaction([storeName], 'readwrite');
    var store = transaction.objectStore(storeName);
    var request_val = store.get(1001);
    request_val.onsuccess = function (e) {
        city = e.target.result.name;
    };
    request_val.onerror = function (e) {
        store.add({ "id": 1001, "name": "beijing" });
        alert('保存成功。为北京');
        city = 'beijing';
    };
    var url = url_base + city + ',china&lang=zh_cn' + APPID;
    httpRequest(url, showWeather);
}
weather();
//# sourceMappingURL=weather.js.map