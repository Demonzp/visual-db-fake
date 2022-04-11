export interface ICustomError {
  errorName: ETypeCustomErrors,
  message: string,
}

export interface ICustomValidationError{
  message: string;
  field: string | number;
}

export interface IStructurValidationError extends ICustomValidationError{
  rowId: string;
}

export type TAppValidateError = {[name:string]:{message:string}};

export enum ETypeCustomErrors {
  VALID_ERROR = 'ValidError',
  CUSTOM_ERROR = 'CustomError'
}