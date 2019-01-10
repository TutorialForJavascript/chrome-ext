var TableInfo = (function () {
    function TableInfo() {
    }
    return TableInfo;
}());
var ManageDatabase = (function () {
    function ManageDatabase(dbName, tInfos) {
        this.dbName = dbName;
        this.tInfos = tInfos;
        this.IndxDb = window.indexedDB;
        this.OpenInitDB();
    }
    ManageDatabase.prototype.OpenInitDB = function () {
        var req;
        req = this.IndxDb.open(this.dbName);
        req.onupgradeneeded = this.AddTables;
        req.onsuccess = function (e) {
            md.db = e.target.result;
        };
    };
    ManageDatabase.prototype.AddTables = function (e) {
        md.db = e.target.result;
        var parms;
        var tInfo;
        for (var it in md.tInfos) {
            tInfo = md.tInfos[it];
            parms = { keyPath: tInfo.PrimaryFieldName };
            var tblLocal;
            tblLocal = md.db.createObjectStore(tInfo.TableName, parms);
            tblLocal.createIndex(tInfo.PrimaryIndexName, tInfo.PrimaryFieldName);
        }
    };
    ManageDatabase.prototype.ResetDB = function () {
        this.db.close();
        this.IndxDb.deleteDatabase(this.dbName);
        this.OpenInitDB();
    };
    return ManageDatabase;
}());
//# sourceMappingURL=managedb.js.map