import { createSlice } from '@reduxjs/toolkit';
import { ICustomError } from '../../types/errors';
import { changeTableFieldType, createDBTable, getDBTables } from '../actions/db';
import { getDbList } from '../actions/dbList';

export enum EFielTypes {
  INT = 'int',
  STRING = 'str',
  DATE = 'date'
}

export enum EFieldIndex {
  NONE = 'none',
  PRIMERY = 'prymery',
  UNIQUE = 'unique',
  INDEX = 'index'
}

export enum EDialects {
  MySql = 'mysql',
  Postgress = 'postgress'
}

export enum EFieldKeys {
  NAME = 'name',
  TYPE = 'type',
  VALUE_OR_LENGTH = 'valueOrLenght',
  DEFAULT_VALUE = 'defaultValue',
  AUTO_INCREMENT = 'autoIncrement',
  INDEX = 'index'
}

export interface IField {
  [EFieldKeys.NAME]: string;
  [EFieldKeys.TYPE]: EFielTypes;
  [EFieldKeys.VALUE_OR_LENGTH]: string;
  [EFieldKeys.DEFAULT_VALUE]: string | number | null | boolean;
  [EFieldKeys.AUTO_INCREMENT]: boolean;
  [EFieldKeys.INDEX]: EFieldIndex;
}

export interface ITable {
  name: string;
  fields: IField[];
  version: number;
  rows: number;
}

export interface IDB {
  dialect: EDialects;
  id: string;
  createAt: number;
  changeAt: number;
  version: number;
}

export interface IDBState {
  dbInfo: IDB;
  tables: ITable[];
  isLoading: boolean;
}

const initialState: IDBState = {
  dbInfo: {
    dialect: EDialects.MySql,
    id: '',
    createAt: 0,
    changeAt: 0,
    version: 0,
  },
  tables: [],
  isLoading: false
};

const sliceDB = createSlice({
  name: 'db',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder.addCase(getDbList.pending, (state) => {
      state.dbInfo = {
        ...initialState.dbInfo
      };
    });

    builder.addCase(changeTableFieldType.fulfilled, (state, { payload }) => {
      state.tables = state.tables.map(t => {
        if (t.name === payload.name) {
          return payload;
        }
        return t;
      });
    });

    builder.addCase(getDBTables.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getDBTables.fulfilled, (state, { payload }) => {
      state.dbInfo = {
        ...payload.db
      };

      state.tables = payload.tables;
      state.isLoading = false;
    });

    builder.addCase(getDBTables.rejected, (state) => {
      //const payload = action.payload as ICustomError;
      //state.errors.push(payload);
      state.isLoading = false;
    });

    builder.addCase(createDBTable.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(createDBTable.fulfilled, (state, { payload }) => {
      state.dbInfo = {
        ...payload.db
      };

      state.tables.push(payload.table);
      state.isLoading = false;
      console.log('тут!!!!!!!!!');
    });

    builder.addCase(createDBTable.rejected, (state) => {
      //const payload = action.payload as ICustomError;
      //state.errors.push(payload);
      state.isLoading = false;
    });
  }
});

export default sliceDB;