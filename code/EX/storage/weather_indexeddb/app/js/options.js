function option_func() {
    var db;
    var name = "mydb";
    var version = 1;
    var storeName = "city";
    var request = window.indexedDB.open(name, version);
    var city;
    request.onerror = function (event) {
        alert('open error 1');
    };
    request.onsuccess = function (event) {
        db = event.target.result;
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
    $('#cu_city').text(city);
    $('#save').click(function () {
        var request = store.get(1001);
        var city = $('#city').val();
        request.onsuccess = function (e) {
            var store_city = e.target.result.name;
            store_city.name = "beijing";
            store.put(store_city);
        };
    });
}
option_func();
//# sourceMappingURL=options.js.map