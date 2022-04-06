import { IStructureField } from "../store/slices/sliceTableStructure";

export type TReqCreateTable = {
  nameTable: string;
  dbId: string;
}

export type TReqChangeTable = {
  table: {
    tableName: string,
    v: number
  };
  fields: IStructureField [];
  dbId: string;
}