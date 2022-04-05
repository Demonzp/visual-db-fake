import { createAsyncThunk } from '@reduxjs/toolkit';
import { TReqCreateTable } from '../../types/dbReq';
import { TResDataDbCreateTable, TResDataDbTables } from '../../types/dbRes';
import { ICustomError, ICustomValidationError } from '../../types/errors';
import { fetchChangeTableFieldType, fetchCreateTable, fetchTables } from '../../utils/fetchTable';
import { EFielTypes, ITable } from '../slices/sliceDB';
import { RootState } from '../store';

type TChangeFieldType = {
  tableName: string,
  fieldName: string,
  value: EFielTypes
}

export const changeTableFieldType = createAsyncThunk<ITable, TChangeFieldType, { state: RootState, rejectWithValue: ICustomError }>(
  'db/changeTable',
  async (data, { getState }) => {
    const table = getState().db.tables.find(t => t.name === data.tableName);
    if (table) {
      const field = table.fields.map(f => f.name === data.fieldName);
      if (field) {
        const res = await fetchChangeTableFieldType(data);
        return res;
      }
    }
  }
);

export const getDBTables = createAsyncThunk<TResDataDbTables, string, { state: RootState, rejectWithValue: ICustomError }>(
  'db/getDBTables',
  async (data, { rejectWithValue }) => {
    try {
      const res = await fetchTables(data);
      return res;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message });
    }
  }
); 

export const createDBTable = createAsyncThunk<TResDataDbCreateTable, string, { state: RootState, rejectWithValue: ICustomValidationError }>(
  'db/createDBTable',
  async (data, { getState, rejectWithValue }) => {
    try {
      //const isLoading = getState().db.isLoading;
      const dbId = getState().db.dbInfo.id;
      // if(isLoading){
      //   throw new Error('operation createDBTable is stoped');
      // }
      const res = await fetchCreateTable({
        nameTable: data,
        dbId
      });
      return res;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable'});
    }
  }
);