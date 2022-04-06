import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ETypeCustomErrors, ICustomError, ICustomValidationError } from '../../types/errors';
import CustomValidationError from '../../utils/customValidationError';
import { changeFields } from '../actions/tableStructure';
import { IField } from './sliceDB';

export interface IStructureField extends IField{
  id: string
}

export type TChangeField = {
  fieldId: string,
  name: string,
  value: any
}

interface IInitState {
  isLoading: boolean;
  errors: ICustomError[];
  errorsValid: ICustomValidationError []; 
  isSave: boolean;
  fields: IStructureField[];
  isQuestion: boolean;
}

const initialState: IInitState = {
  isLoading: true,
  errorsValid: [],
  errors: [],
  fields: [],
  isSave: true,
  isQuestion: false
};

const sliceTableStructure = createSlice({
  name: 'tableStructure',
  initialState,
  reducers: {
    setFields(state, action: PayloadAction<IStructureField[]>) {
      state.fields = action.payload;
    },

    addField(state, action: PayloadAction<IStructureField>) {
      state.isSave = false;
      state.fields.push(action.payload);
    },

    delField(state, action: PayloadAction<string>) {
      state.fields = state.fields.filter(f => f.id !== action.payload);
      state.isSave = false;
    },

    changeField(state, action: PayloadAction<TChangeField>) {
      state.isSave = false;
      state.fields = state.fields.map(f => {

        if (f.id === action.payload.fieldId) {
          return {
            ...f,
            [action.payload.name]: action.payload.value
          };
        }

        return f;
      });
    },

    setQuestion(state, action: PayloadAction<boolean>) {
      state.isQuestion = action.payload;
    },

    clearState(state){
      //console.log('Ochistil');
      state.fields = [];
      state.isLoading = false;
      state.isQuestion = false;
      state.isSave = true;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(changeFields.pending, (state) => {
      state.errors = [];
      state.errorsValid = [];
      state.isLoading = true;
    });

    builder.addCase(changeFields.fulfilled, (state, { payload }) => {
      state.fields = payload.fields;
      state.isLoading = false;
      state.isSave = true;
    });

    builder.addCase(changeFields.rejected, (state, action) => {
      //console.log('rejected.action.payload = ', action.payload);
      if((action.payload as ICustomError).errorName===ETypeCustomErrors.VALID_ERROR){
        state.errorsValid = (action.payload as CustomValidationError).errors;
        console.log('rejected.action.payload = ', action.payload);
      }else{
        state.errors = action.payload as ICustomError[];
      }

      state.isLoading = false;
    });
  }
});

export const { 
  setFields,
  addField,
  delField,
  changeField,
  setQuestion,
  clearState
} = sliceTableStructure.actions;

export default sliceTableStructure;