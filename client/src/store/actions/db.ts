import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICustomError } from '../../types/errors';
import { fetchChangeTableFieldType } from '../../utils/fetchTable';
import { EFielTypes, ITable } from '../slices/sliceDB';
import { RootState } from '../store';

type TChangeFieldType = {
  tableName: string,
  fieldName: string,
  value: EFielTypes
}

export const changeTableFieldType = createAsyncThunk<ITable, TChangeFieldType, {state: RootState, rejectWithValue: ICustomError}>(
  'db/changeTable',
  async (data, {getState}) => {
    const table = getState().db.tables.find(t=>t.name===data.tableName);
    if(table){
      const field = table.fieds.map(f=>f.name===data.fieldName);
      if(field){
        const res = await fetchChangeTableFieldType(data);
        return res;
      }
    }
  }
);