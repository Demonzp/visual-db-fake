import { createSlice } from '@reduxjs/toolkit';

export enum EFielTypes {
  INT = 'int',
  STRING = 'str',
  VARCHAR = 'varchar',
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
  valueOrLenght?: string | number;
  autoIncrement?: boolean;
  index?: EFieldIndex;
}

export interface ITable {
  name: string;
  fieds: IField[];
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
      type: EFielTypes.STRING
    },
    {
      name: 'second-name',
      type: EFielTypes.STRING
    }
  ]
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
  ]
}

const initialState: IDBState = {
  dialect: EDialects.MySql,
  id: '',
  tables: [tTable, tTable2],
  isLoading: false
};

const sliceDB = createSlice({
  name: 'db',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
  }
});

export default sliceDB;