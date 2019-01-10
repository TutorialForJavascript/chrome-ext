function option_func() {
    let db: IDBDatabase
    let name = "mydb"
    let version = 1
    let storeName = "city"
    let request = window.indexedDB.open(name, version)
    let city: string
    request.onerror = (event) => {
        alert('open error 1')
    }
    request.onsuccess = (event) => {
        db = (<IDBOpenDBRequest>event.target).result
    }

    let transaction = db.transaction([storeName], 'readwrite')
    let store = transaction.objectStore(storeName)
    let request_val = store.get(1001)

    request_val.onsuccess = (e: any) => {
        city = e.target.result.name
    }
    request_val.onerror = (e: any) => {
        store.add({ "id": 1001, "name": "beijing" })
        alert('保存成功。为北京')
        city = 'beijing'
    }
    $('#cu_city').text(city)

    $('#save').click(() => {
        let request = store.get(1001)
        let city = $('#city').val()
        request.onsuccess = function(e: any) {
            let store_city = e.target.result.name
            store_city.name = "beijing"
            store.put(store_city)
        }
    })
}

option_func()
