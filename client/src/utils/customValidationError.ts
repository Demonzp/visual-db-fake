import { ETypeCustomErrors, ICustomValidationError } from "../types/errors";

export default class CustomValidationError extends Error{
  errors: ICustomValidationError[];
  constructor(args: ICustomValidationError[]){
    super(ETypeCustomErrors.VALID_ERROR);
    this.name = ETypeCustomErrors.VALID_ERROR;
    console.log('args = ', args);
    this.errors = args;
  }
}