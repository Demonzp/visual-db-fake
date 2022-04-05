export interface ICustomError {
  message: string,
}

export interface ICustomValidationError{
  message: string;
  field: string | number;
}

export type TAppValidateError = {[name:string]:{message:string}};