class TableInfo {
  TableName: string;
  PrimaryFieldName: string;
  PrimaryIndexName: string;
}


class ManageDatabase {

    private IndxDb: IDBFactory;
    public db: IDBDatabase;

    constructor(public dbName: string, public tInfos: Array<TableInfo>) {
        this.IndxDb = window.indexedDB;
        this.OpenInitDB();
    }
    OpenInitDB() {
        let req: IDBOpenDBRequest;
        req = this.IndxDb.open(this.dbName);
        req.onupgradeneeded = this.AddTables;
        req.onsuccess = function(e: any) {
            md.db = e.target.result;
        }
    }
    AddTables(e: any) {
        md.db = e.target.result;
        var parms: IDBObjectStoreParameters;
        var tInfo: TableInfo;
        for (var it in md.tInfos) {
            tInfo = md.tInfos[it];
            parms = { keyPath: tInfo.PrimaryFieldName };
            var tblLocal: IDBObjectStore;
            tblLocal = md.db.createObjectStore(tInfo.TableName, parms);
            tblLocal.createIndex(tInfo.PrimaryIndexName, tInfo.PrimaryFieldName);
        }
    }
    ResetDB() {
      this.db.close();
      this.IndxDb.deleteDatabase(this.dbName);
      this.OpenInitDB();
  }
}
