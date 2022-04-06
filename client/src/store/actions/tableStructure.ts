import { createAsyncThunk } from '@reduxjs/toolkit';
import { TReqChangeTable } from '../../types/dbReq';
import { TResDataDbCreateTable } from '../../types/dbRes';
import { ETypeCustomErrors, ICustomError, ICustomValidationError } from '../../types/errors';
import CustomValidationError from '../../utils/customValidationError';
import { fetchChangeTable } from '../../utils/fetchTable';
import { ITable } from '../slices/sliceDB';
import { IDBList } from '../slices/sliceDBList';
import { IStructureField } from '../slices/sliceTableStructure';
import { RootState } from '../store';

interface IReturnDateChangeTable{
  db: IDBList,
  table: ITable,
  fields: IStructureField []
}

type TDataChangeFields = {
  dbId: string;
  tableName: string;
  fields: IStructureField [];
}

export const changeFields = createAsyncThunk<IReturnDateChangeTable, TDataChangeFields, { state: RootState, rejectWithValue: ICustomError | ICustomValidationError }>(
  'tableStructure/changeFields',
  async (data, {getState, rejectWithValue }) => {
    try {
      const table = getState().db.tables.find(t=>t.name===data.tableName);

      if(table){
        const resData:TResDataDbCreateTable = await fetchChangeTable({
          dbId: data.dbId,
          table: {
            tableName: data.tableName,
            v: table.version
          },
          fields: data.fields
        });

        const dataTrue = {
          ...resData,
          fields: data.fields
        };
        
        return dataTrue;
      }else{
        throw new Error('Client Error changeFields');
      }

    } catch (error) {
      const err = error as Error;
      if(err.name===ETypeCustomErrors.VALID_ERROR){
        return rejectWithValue({ errorName: ETypeCustomErrors.VALID_ERROR, errors: (err as CustomValidationError).errors });
      }
      return rejectWithValue({errorName: ETypeCustomErrors.CUSTOM_ERROR, message: (error as Error).message });
    }
  }
);