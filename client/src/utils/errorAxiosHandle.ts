import { AxiosError } from 'axios';
import CustomValidationError from './customValidationError';

export const errorHandle = (error: AxiosError) => {

  if (error.response) {
    console.log(error.response.status);
    if(Number(error.response.status)===412){
      throw new CustomValidationError(error.response.data.errors);
    }else{
      throw new Error(error.response.data.message);
    }
    
  }

  throw error;
}