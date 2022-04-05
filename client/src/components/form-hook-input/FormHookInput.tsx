import React from 'react';
import { UseFormRegister } from 'react-hook-form';

type Props = {
  name: string;
  register: UseFormRegister<any>;
  errors?: {};
  onChange?: (e:React.ChangeEvent<HTMLInputElement>)=>any;
  value?: string; 
  label?: string;
}

const FormHookInput:React.FC<Props> = ({label, name, onChange, errors, register, ...rest})=>{
  //console.log('errors = ', errors);
  const error = errors as {[name: string]:{message:string}};
  return (
    <div >
    {
      label ?
        <label>{label}</label>
        :
        null
    }

    <input type='text' {...register(name, {onChange})} {...rest} />
    {
      error?
        error[name]?
        <p>{error[name].message}</p>
        :
        null
      :
      null
    }
    {/* <p>{error[name].message}</p> */}
  </div>
  );
};

export default FormHookInput;