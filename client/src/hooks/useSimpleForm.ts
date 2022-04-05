import { useEffect, useState } from 'react';
import joi from 'joi';
import * as yup from 'yup';
import { TAppValidateError} from '../types/errors';

export type TReturn<T> = {errors?:TAppValidateError, values:T}

type TOnChange<T> = (d:{name:keyof T, value: string|number|boolean})=>void

type THandleSubmit<T> = ()=> TReturn<T>;

const useSimpleForm = <T extends {}>({state, joiShema, yupShema}:{
  state: T,
  joiShema?: joi.AnySchema,
  yupShema?: yup.AnySchema
}):{
  data: T,
  errors: TAppValidateError,
  onChange: TOnChange<T>,
  handleSubmit: THandleSubmit<T>
}=>{
  const [data, setData] = useState<T>(state);
  const [errors, setErrors] = useState<TAppValidateError>({});

  useEffect(()=>{
    setData(state);
  }, [state]);

  const onChange:TOnChange<T> = ({name, value})=>{
    setData(prev=>{
      return {
        ...prev,
        [name]: value
      }
    });

    setErrors(prev=>{
      const newErrors = {...prev};
      delete newErrors[name as string];
      return newErrors;
    })
  };

  const handleSubmit:THandleSubmit<T> = ()=>{
    console.log('data = ', data);
    if(joiShema){
      const tempRes = joiShema.validate(data, {abortEarly: false});
      let res:TReturn<T> = {
        values: tempRes.value
      };
      console.log('res = ', tempRes);
      if(tempRes.error){
        const errors:TAppValidateError = {};
        tempRes.error.details.forEach(d=>{
          errors[d.path[0]] = {message: d.message};
        });
        // const errors = tempRes.error.details.map(d=>{
        //   return {
        //     field: d.path[0],
        //     message: d.message
        //   }
        // });
        setErrors(errors);
        res = {
          ...res,
          errors
        }
      }
      return res;
    }else if(yupShema){
      try {
        const res = yupShema.validateSync(data);
        return res;
      } catch (error) {
        console.log('error = ', (error as yup.ValidationError).errors);
        return error;
      }
      
    }
    
  };

  return{
    data,
    errors,
    onChange,
    handleSubmit
  };
}

export default useSimpleForm;