import axios, { AxiosError } from 'axios';
import { TReqChangeTable, TReqCreateTable } from '../types/dbReq';
import { TResDataDbCreateTable, TResDataDbTables } from '../types/dbRes';
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
}