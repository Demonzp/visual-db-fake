import { createSlice, PayloadAction } from '@reduxjs/toolkit';
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
  isSave: boolean;
  fields: IStructureField[];
  isQuestion: boolean;
}

const initialState: IInitState = {
  isLoading: false,
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