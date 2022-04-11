import { ETypeCustomErrors } from "../types/errors";

export default class CustomValidationError<T> extends Error{
  errors: T[];
  constructor(args: T[]){
    super(ETypeCustomErrors.VALID_ERROR);
    this.name = ETypeCustomErrors.VALID_ERROR;
    console.log('args = ', args);
    this.errors = args;
  }
}