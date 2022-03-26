import axios, { AxiosError } from 'axios';
import { IDB } from '../store/slices/sliceDBList';
import { errorHandle } from './errorAxiosHandle';

type resData = {
  dbs: IDB[]
}

export const fetchDbList = async ()=>{
  try {
    const res = await axios.get<resData>('/api/db');
    //console.log(res.data);
    return res.data.dbs;
  } catch (error) {
    //console.log(error);
    return errorHandle(error as AxiosError);
  }
}

export const fetchDbCreate = async ()=>{
  try {
    const res = await axios.post('/api/db');
    return res.data;
  } catch (error) {
    return errorHandle(error as AxiosError);
  }
}