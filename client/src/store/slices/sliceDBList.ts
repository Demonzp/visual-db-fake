import { createSlice } from '@reduxjs/toolkit';
import { ICustomError } from '../../types/errors';
import { createDb, getDbList } from '../actions/dbList';
import { IDB } from './sliceDB';

export interface IDBList extends IDB{
  tables: string[];
}

export interface IDBListState {
  dbList: IDBList[];
  isLoading: boolean;
  errors: ICustomError[];
}

const initialState: IDBListState = {
  dbList: [],
  isLoading: false,
  errors: []
};

const sliceDBList = createSlice({
  name: 'dbList',
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

    builder.addCase(createDb.fulfilled, (state, { payload }) => {
      state.dbList.push(payload);
      console.log('payload = ', payload);
      state.isLoading = false;
    });

    builder.addCase(createDb.rejected, (state, action) => {
      const payload = action.payload as ICustomError;
      state.errors.push(payload);
      state.isLoading = false;
    });
  }
});

export default sliceDBList;