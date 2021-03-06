import { createAsyncThunk } from '@reduxjs/toolkit';
import { TResDataAddRow, TResDataGetTable, TResSuccesText } from '../../types/dbRes';
import { ETypeCustomErrors, ICustomError, ICustomValidationError } from '../../types/errors';
import { TObjAny } from '../../types/global';
import CustomValidationError from '../../utils/customValidationError';
import { fetchClearTable, fetchDelRow, fetchTableAddRow, fetchTableData } from '../../utils/fetchTable';
import { RootState } from '../store';

type TGetTableData = {
  tableName: string;
  page?: number;
};

export const getTableData = createAsyncThunk<TResDataGetTable, TGetTableData, { state: RootState, rejectWithValue: ICustomError }>(
  'tableManager/getTableData',
  async (data, {getState, rejectWithValue }) => {
    try {
      const dbId = getState().db.dbInfo.id;

      const res = await fetchTableData({...data, dbId});

      return res;
    } catch (error) {
      return rejectWithValue({ message: (error as Error).message });
    }
  }
);

type TAddTableRow = {
  tableName: string;
  data: TObjAny;
}

export const addTableRow = createAsyncThunk<TResDataAddRow, TAddTableRow, { state: RootState, rejectWithValue: ICustomError }>(
  'tableManager/addTableRow',
  async (data, {getState, rejectWithValue }) => {
    try {
      const dbId = getState().db.dbInfo.id;

      const res = await fetchTableAddRow({...data, dbId});

      return res;
    } catch (error) {
      const err = error as Error;
      if(err.name===ETypeCustomErrors.VALID_ERROR){
        return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
      }
      return rejectWithValue({errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
    }
  }
);

export const clearTable = createAsyncThunk<TResSuccesText, {tableName:string}, { state: RootState, rejectWithValue: ICustomError }>(
  'tableManager/clearTable',
  async (data, {getState, rejectWithValue }) => {
    try {
      const dbId = getState().db.dbInfo.id;

      const res = await fetchClearTable({...data, dbId});

      return res;
    } catch (error) {
      const err = error as Error;
      if(err.name===ETypeCustomErrors.VALID_ERROR){
        return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
      }
      return rejectWithValue({errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
    }
  }
);

export const delTableRow = createAsyncThunk<TResSuccesText, {tableName:string, rowId: string}, { state: RootState, rejectWithValue: ICustomError }>(
  'tableManager/delTableRow',
  async (data, {getState, rejectWithValue }) => {
    try {
      const dbId = getState().db.dbInfo.id;

      const res = await fetchDelRow({...data, dbId});

      return res;
    } catch (error) {
      const err = error as Error;
      if(err.name===ETypeCustomErrors.VALID_ERROR){
        return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError<ICustomValidationError>).errors });
      }
      return rejectWithValue({errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
    }
  }
);