import axios, { AxiosError } from 'axios';
import { TReqAddRow, TReqChangeTable, TReqCreateTable, TReqGetTable } from '../types/dbReq';
import { TResDataAddRow, TResDataDbCreateTable, TResDataDbTables, TResDataGetTable } from '../types/dbRes';
import { TObjAny } from '../types/global';
import { errorHandle } from './errorAxiosHandle';

export const fetchChangeTable = async (data: TReqChangeTable): Promise<TResDataDbCreateTable> => {
  try {
    const res = await axios.post<TResDataDbCreateTable>('/api/db/table/change', data);

    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
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