import { ITable } from "../store/slices/sliceDB";
import { IDBList } from "../store/slices/sliceDBList";

export type TResDataDbTables = {
  db: IDBList,
  tables: ITable[]
};

export type TResDataDbCreateTable = {
  db: IDBList,
  table: ITable
};