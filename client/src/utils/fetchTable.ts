import axios, { AxiosError } from 'axios';
import { ITable } from '../store/slices/sliceDB';
import { TReqCreateTable } from '../types/dbReq';
import { TResDataDbCreateTable, TResDataDbTables } from '../types/dbRes';
import { errorHandle } from './errorAxiosHandle';

export const fetchChangeTableFieldType = async (data: any): Promise<any> => {
  return new Promise((resolve) => {
    setTimeout(() => {

      const table = {
        name: 'user',
        fieds: [
          {
            name: 'first-name',
            type: 'str',
          },
          {
            name: 'second-name',
            type: 'str'
          }
        ],
        length: 0
      };

      return resolve(table);
    }, 1000);
  });
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