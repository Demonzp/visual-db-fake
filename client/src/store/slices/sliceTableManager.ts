import { createSlice } from '@reduxjs/toolkit';
import { ETypeCustomErrors, ICustomError, TAppValidateError } from '../../types/errors';
import { TObjAny } from '../../types/global';
import CustomValidationError from '../../utils/customValidationError';
import { addTableRow, getTableData } from '../actions/tableManager';

type TFieldsKye = string[];

interface IInitState {
  isLoading: boolean;
  errors: ICustomError[];
  errorsValid: TAppValidateError;
  fieldsKye: TFieldsKye;
  data: TObjAny[];
}

const initialState: IInitState = {
  isLoading: true,
  errorsValid:{} as TAppValidateError,
  errors: [],
  fieldsKye: [],
  data: []
};

const sliceTableManager = createSlice({
  name: 'tableManager',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getTableData.pending, (state) => {
      state.errors = [];
      state.errorsValid = {} as TAppValidateError;
      state.isLoading = true;
    });

    builder.addCase(getTableData.fulfilled, (state, { payload }) => {
      state.fieldsKye = payload.table.fields.map(f=>f.name);
      state.data = payload.data;
      state.isLoading = false;
    });

    builder.addCase(getTableData.rejected, (state, action) => {
      state.errors = action.payload as ICustomError[];
      state.isLoading = false;
    });

    builder.addCase(addTableRow.pending, (state) => {
      state.errors = [];
      state.errorsValid = {} as TAppValidateError;
      state.isLoading = true;
    });

    builder.addCase(addTableRow.fulfilled, (state, { payload }) => {
      state.data.push(payload.data);
      state.isLoading = false;
    });

    builder.addCase(addTableRow.rejected, (state, action) => {
      
      if((action.payload as ICustomError).errorName===ETypeCustomErrors.VALID_ERROR){
        const err = (action.payload as CustomValidationError).errors[0];
        const parseErr = {} as TAppValidateError;
        for (const [key, val] of Object.entries(err)) {
          parseErr[key] = {message: val.message};
        }
        state.errorsValid = parseErr;
        console.log('rejected.action.payload = ', action.payload);
      }else{
        state.errors = action.payload as ICustomError[];
      }

      state.errors = action.payload as ICustomError[];
      state.isLoading = false;
    });
  }
});

export const { 

} = sliceTableManager.actions;

export default sliceTableManager;