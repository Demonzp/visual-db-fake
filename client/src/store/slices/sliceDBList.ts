import { createSlice } from '@reduxjs/toolkit';
import { ICustomError } from '../../types/errors';
import { createDb, getDbList } from '../actions/dbList';

export interface IDB {
  id: string,
  createAt: Date,
  changeAt: Date,
  version: number,
  tables: string[]
}

export interface IDBList {
  dbList: IDB[];
  isLoading: boolean;
  errors: ICustomError[];
}

const initialState: IDBList = {
  dbList: [],
  isLoading: false,
  errors: []
};

const sliceDBList = createSlice({
  name: 'db',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getDbList.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getDbList.fulfilled, (state, { payload }) => {
      state.dbList = payload;
      console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(getDbList.rejected, (state, action) => {
      //console.log('payload = ', action.payload);
      const payload = action.payload as ICustomError;
      if(payload.message === 'no any DataBases'){
        console.log('can Create Db!');
      }else{
        state.errors.push(payload);
      }
      state.isLoading = false;
    });

    builder.addCase(createDb.pending, (state) => {
      state.isLoading = true;
    });
  }
});

export default sliceDBList;