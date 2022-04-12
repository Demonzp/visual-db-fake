import { IDB, ITable } from "../store/slices/sliceDB";
import { IDBList } from "../store/slices/sliceDBList";
import { TObjAny } from "./global";

export type TResDataDbTables = {
  db: IDBList;
  tables: ITable[];
};

export type TResDataDbCreateTable = {
  db: IDBList;
  table: ITable;
};

export type TResDataGetTable = {
  table: ITable;
  data: any[];
}

export type TResDataAddRow = {
  table: ITable;
  data: TObjAny;
}

export type TResSuccesText = {succes: string};

export type TResRenameTable = {
  db: IDB;
  table: ITable;
}