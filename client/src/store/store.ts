import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import sliceDB from './slices/sliceDB';
import sliceDBList from './slices/sliceDBList';
import sliceTableStructure from './slices/sliceTableStructure';

export const store = configureStore({
  reducer: {
    db: sliceDB.reducer,
    dbList: sliceDBList.reducer,
    tableStructure: sliceTableStructure.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
