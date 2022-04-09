import { createSlice } from '@reduxjs/toolkit';
import { ICustomError } from '../../types/errors';
import { createDBTable, getDBTables } from '../actions/db';
import { getDbList } from '../actions/dbList';
import { getTableData } from '../actions/tableManager';
import { changeFields } from '../actions/tableStructure';

export enum EFielTypes {
  INT = 'int',
  STRING = 'str',
  DATE = 'date',
  BOOLEAN = 'boolean'
}

export enum EFieldIndex {
  NONE = 'none',
  PRIMERY = 'primery',
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
  ALLOW_NULL = 'allowNull',
  INDEX = 'index'
}

export interface IField {
  [EFieldKeys.NAME]: string;
  [EFieldKeys.TYPE]: EFielTypes;
  [EFieldKeys.VALUE_OR_LENGTH]: string;
  [EFieldKeys.DEFAULT_VALUE]: string | number | null | boolean;
  [EFieldKeys.AUTO_INCREMENT]: boolean;
  [EFieldKeys.ALLOW_NULL]: boolean;
  [EFieldKeys.INDEX]: EFieldIndex;
}

export interface ITable {
  fields: IField[];
  name: string;
  createAt: number;
  changeAt: number;
  version: number;
  rows: number
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
  errors: ICustomError[];
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
  errors: [],
  isLoading: true
};

const sliceDB = createSlice({
  name: 'db',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {

    builder.addCase(getTableData.fulfilled, (state, { payload }) => {
      state.tables = state.tables.map(t=>{
        if(t.name===payload.table.name){
          return payload.table;
        }
        return t;
      });
    });

    builder.addCase(getDbList.pending, (state) => {
      state.dbInfo = {
        ...initialState.dbInfo
      };
    });

    builder.addCase(getDBTables.pending, (state) => {
      state.errors = [];
      state.isLoading = true;
    });

    builder.addCase(getDBTables.fulfilled, (state, { payload }) => {
      state.dbInfo = {
        ...payload.db
      };

      state.tables = payload.tables;
      state.isLoading = false;
      console.log('get getDBTables');
    });

    builder.addCase(getDBTables.rejected, (state, { payload }) => {

      //const payload = action.payload as ICustomError;
      state.errors.push(payload as ICustomError);
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
      state.isLoading = false;
    });

    builder.addCase(changeFields.fulfilled, (state, { payload }) => {
      state.dbInfo = payload.db;
      state.tables = state.tables.map(t => {
        if (t.name === payload.table.name) {
          return payload.table;
        }
        return t;
      });
    });
  }
});

export default sliceDB;