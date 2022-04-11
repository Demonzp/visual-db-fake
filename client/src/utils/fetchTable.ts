import axios, { AxiosError } from 'axios';
import { TReqAddRow, TReqChangeTable, TReqClearTable, TReqCreateTable, TReqDelRow, TReqGetTable } from '../types/dbReq';
import { TResDataAddRow, TResDataDbCreateTable, TResDataDbTables, TResDataGetTable, TResSuccesText } from '../types/dbRes';
import { IStructurValidationError } from '../types/errors';
import { errorHandle } from './errorAxiosHandle';

export const fetchChangeTable = async (data: TReqChangeTable): Promise<TResDataDbCreateTable> => {
  try {
    const res = await axios.post<TResDataDbCreateTable>('/api/db/table/change', data);

    return res.data;
  } catch (error) {
    return errorHandle<IStructurValidationError>(error as AxiosError);
  }
};

export const fetchCreateTable = async (data: TReqCreateTable): Promise<TResDataDbCreateTable> => {
  try {
    const res = await axios.post('/api/db/table', data);

    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
};

export const fetchTables = async (data: string): Promise<TResDataDbTables> => {
  try {
    const res = await axios.get<TResDataDbTables>('/api/db', {
      params: {
        id: data
      }
    });

    return res.data;
  } catch (error) {

    return errorHandle(error as AxiosError);
  }
};

export const fetchTableData = async (data: TReqGetTable): Promise<TResDataGetTable> => {
  try {
    const res = await axios.get<TResDataGetTable>('/api/db/table', {
      params: {
        ...data,
        page: data.page?data.page:1
      }
    });

    return res.data;
  } catch (error) {

    return errorHandle(error as AxiosError);
  }
};

export const fetchTableAddRow = async (data:TReqAddRow):Promise<TResDataAddRow> =>{
  try {
    const res = await axios.post<TResDataAddRow>('/api/db/table/add-row', data);

    return res.data;
  } catch (error) {

    return errorHandle(error as AxiosError);
  }
};

export const fetchClearTable = async (data:TReqClearTable):Promise<TResSuccesText>=>{
  try {
    const res = await axios.delete<TResSuccesText>('/api/db/table/clear', {
      params:data
    });

    return res.data;
  } catch (error) {

    return errorHandle(error as AxiosError);
  }
}

export const fetchDelRow = async (data:TReqDelRow):Promise<TResSuccesText>=>{
  try {
    const res = await axios.delete<TResSuccesText>('/api/db/table/row', {
      params:data
    });

    return res.data;
  } catch (error) {

    return errorHandle(error as AxiosError);
  }
}