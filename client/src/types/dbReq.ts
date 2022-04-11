import { IStructureField } from "../store/slices/sliceTableStructure";
import { TObjAny } from "./global";

export type TReqCreateTable = {
  nameTable: string;
  dbId: string;
}

export type TReqChangeTable = {
  table: {
    tableName: string,
    v: number
  };
  fields: IStructureField[];
  dbId: string;
}

export type TReqGetTable = {
  dbId: string;
  tableName: string;
  page?: number;
}

export type TReqAddRow = {
  dbId: string;
  tableName: string;
  data: TObjAny;
}

export type TReqClearTable = {
  dbId: string;
  tableName: string;
}

export type TReqDelRow = {
  dbId: string;
  tableName: string;
  rowId: string;
}