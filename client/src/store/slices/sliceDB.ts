import { createSlice } from '@reduxjs/toolkit';

export enum EFielTypes {
  INT='int',
  STRING='str',
  VARCHAR='varchar',
  DATE='date'
}

export enum EFieldIndex {
  PRIMERY = 'prymery',
  UNIQUE = 'unique',
  INDEX='index'
}

export enum EDialects {
  MySql = 'mysql',
  Postgress = 'postgress'
}

export interface IField {
  type: EFielTypes,
  valueOrLenght: 'string'|number,
  autoIncrement?:boolean,
  index?: EFieldIndex
}

export interface ITable {
  name: string;
  fieds: IField[];
}

export interface IDBState {
  dialect: EDialects;
  tables: ITable[];
}

const initialState: IDBState = {
  dialect: EDialects.MySql,
  tables: []
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