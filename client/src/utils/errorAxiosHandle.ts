import { AxiosError } from 'axios';

export const errorHandle = (error: AxiosError) => {

  if (error.response) {
    throw new Error(error.response.data.message);
  }

  throw error;
}