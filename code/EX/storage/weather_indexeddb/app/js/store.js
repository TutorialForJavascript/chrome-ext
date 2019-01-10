function openDB(name, version) {
    if (version === void 0) { version = 1; }
    var db;
    var request = window.indexedDB.open(name, version);
    request.onerror = function (event) {
        alert('open error');
    };
    request.onsuccess = function (event) {
        db = event.target.result;
    };
    request.onupgradeneeded = function (e) {
        if (!db.objectStoreNames.contains('city')) {
            db.createObjectStore('city', { keyPath: "id" });
        }
        console.log('DB version changed to ' + version);
    };
    return db;
}
export function addData(db, storeName, data) {
    try {
        var transaction = db.transaction(storeName, 'readwrite');
        var store = transaction.objectStore(storeName);
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var i = data_1[_i];
            store.add(i);
        }
        return "success";
    }
    catch (error) {
        return "fail";
    }
}
//# sourceMappingURL=store.js.map