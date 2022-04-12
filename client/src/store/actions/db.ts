import { createAsyncThunk } from '@reduxjs/toolkit';
import { TResDataDbCreateTable, TResDataDbTables, TResRenameTable } from '../../types/dbRes';
import { ICustomError, ICustomValidationError } from '../../types/errors';
import { fetchRenameTable } from '../../utils/fetchDb';
import { fetchCreateTable, fetchTables } from '../../utils/fetchTable';
import { EFielTypes, ITable } from '../slices/sliceDB';
import { RootState } from '../store';

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

export const renameTable = createAsyncThunk<TResRenameTable, {nameTable:string, oldNameTable:string}, { state: RootState, rejectWithValue: ICustomValidationError }>(
  'db/renameTable',
  async (data, {getState, rejectWithValue}) => {
    try {
      const dbId = getState().db.dbInfo.id;

      const res = await fetchRenameTable({
        ...data,
        dbId
      });

      return res;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message, field: 'nameTable'});
    }
  }
);