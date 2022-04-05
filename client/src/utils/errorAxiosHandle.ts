import { AxiosError } from 'axios';
import CustomValidationError from './customValidationError';

export const errorHandle = (error: AxiosError) => {

  if (error.response) {
    console.log(error.response.status);
    if(Number(error.response.status)===412){
      throw new CustomValidationError({
        message: error.response.data.message,
        field: error.response.data.field
      });
    }else{
      throw new Error(error.response.data.message);
    }
    
  }

  throw error;
}