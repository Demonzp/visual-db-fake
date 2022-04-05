export default class CustomValidationError extends Error{
  field: string;
  constructor(args:{message:string, field: string}){
    super(args.message);
    this.field = args.field;
  }
}