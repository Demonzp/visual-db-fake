import axios, { AxiosError } from 'axios';
import { IDBList } from '../store/slices/sliceDBList';
import { errorHandle } from './errorAxiosHandle';

type resData = {
  dbs: IDBList[]
}

export const fetchDbList = async ()=>{
  try {
    const res = await axios.get<resData>('/api/dbs');
    //console.log(res.data);
    return res.data.dbs;
  } catch (error) {
    //console.log(error);
    return errorHandle(error as AxiosError);
  }
}

export const fetchDbCreate = async ()=>{
  try {
    const res = await axios.post<{db:IDBList}>('/api/db');
    return res.data.db;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
}