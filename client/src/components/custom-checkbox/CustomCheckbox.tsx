import React from 'react';
import stylesC from '../custom-input/custom-input.module.css';

type Props = {
  name: string,
  onChange: (data:boolean)=>any,
  error?:{[name:string]:{message:string}},
  label?: string,
  value?: boolean,
}

const CustomCheckbox: React.FC<Props> = ({name, label, value, onChange, error})=>{
  const changeHandle = (e:React.ChangeEvent<HTMLInputElement>)=>{
    onChange(e.target.checked);
  };

  return(
    <div className={stylesC.cont}>
      {
        label ?
          <label className={stylesC.label}>{label}</label>
          :
          null
      }

      <input 
        type='checkbox' 
        checked={value}
        onChange={changeHandle} 
      />
      {error?
        error[name]?
          <p className={stylesC.error}>{error[name].message}</p>
        :
          null
        :
        null
      }
    </div>
  );
};

export default CustomCheckbox;