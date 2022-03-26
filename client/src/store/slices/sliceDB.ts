import { createSlice } from '@reduxjs/toolkit';
import { changeTableFieldType } from '../actions/db';

export enum EFielTypes {
  INT = 'int',
  STRING = 'str',
  DATE = 'date'
}

export enum EFieldIndex {
  PRIMERY = 'prymery',
  UNIQUE = 'unique',
  INDEX = 'index'
}

export enum EDialects {
  MySql = 'mysql',
  Postgress = 'postgress'
}

export interface IField {
  name: string;
  type: EFielTypes;
  valueOrLenght?: string;
  defaulValue?: string | number | null | boolean;
  autoIncrement?: boolean;
  index?: EFieldIndex;
}

export interface ITable {
  name: string;
  fieds: IField[];
  length: number;
}

export interface IDBState {
  dialect: EDialects;
  id: string;
  tables: ITable[];
  isLoading: boolean;
}

const tTable:ITable = {
  name:'user',
  fieds:[
    {
      name: 'first-name',
      type: EFielTypes.STRING,
    },
    {
      name: 'second-name',
      type: EFielTypes.STRING
    }
  ],
  length: 0
}

const tTable2:ITable = {
  name:'korzina',
  fieds:[
    {
      name: 'product',
      type: EFielTypes.STRING
    },
    {
      name: 'price',
      type: EFielTypes.INT
    }
  ],
  length: 0
}

const initialState: IDBState = {
  dialect: EDialects.MySql,
  id: '',
  tables: [],
  isLoading: false
};

const sliceDB = createSlice({
  name: 'db',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(changeTableFieldType.fulfilled, (state, { payload }) => {
      state.tables = state.tables.map(t=>{
        if(t.name===payload.name){
          return payload;
        }
        return t;
      });
    });
  }
});

export default sliceDB;