import { createAsyncThunk } from '@reduxjs/toolkit';
import { ICustomError } from '../../types/errors';
import { fetchDbCreate, fetchDbList } from '../../utils/fetchDb';
import { IDB } from '../slices/sliceDBList';
import { RootState } from '../store';

export const getDbList = createAsyncThunk<IDB[], void, { state: RootState, rejectWithValue: ICustomError }>(
  'dbList/getDbList',
  async (_, { rejectWithValue }) => {
    try {
      const dbList = await fetchDbList();
      return dbList;
    } catch (error) {
      console.error('error = ', (error as Error).message);
      return rejectWithValue({ message: (error as Error).message });
    }
  }
);

export const createDb = createAsyncThunk<any, void, { state: RootState }>(
  'dbList/createDb',
  async () => {
    try {
      const res = await fetchDbCreate();
      console.log('res = ', res);
      return res;
    } catch (error) {
      
    }
  }
);