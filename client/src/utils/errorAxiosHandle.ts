import { AxiosError } from 'axios';
import CustomValidationError from './customValidationError';

export const errorHandle = <T>(error: AxiosError) => {

  if (error.response) {
    console.log(error.response.status);
    if(Number(error.response.status)===412){
      throw new CustomValidationError<T>(error.response.data.errors);
    }else{
      //console.log('err = ', error.message);
      if(error.response.data.message){
        throw new Error(error.response.data.message);
      }else{
        throw error;
      }
    }
    
  }
  //console.log('err = ', error.message);
  throw error;
}