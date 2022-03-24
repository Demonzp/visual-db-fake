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
  id: 'argaerg21',
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