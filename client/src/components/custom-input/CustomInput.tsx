import React from 'react';
import { TAppValidateError } from '../../types/errors';
import styles from './custom-input.module.css';

type Props = {
  name: string,
  onChange: (data:string)=>any,
  error?:TAppValidateError,
  label?: string,
  value?: string | number | null | boolean,
}

const CustomInput: React.FC<Props> = ({name, label, value, onChange, error}) => {
  return(
    <div className={styles.cont}>
      <div>
        {
          label ?
            <label className={styles.label}>{label}</label>
            :
            null
        }

        <input 
          type='text' 
          value={value?.toString()} 
          onChange={(e)=>onChange(e.target.value)} 
        />
      </div>
      {error?
        error[name]?
          <p className={styles.error}>{error[name].message}</p>
        :
          null
        :
        null
      }
    </div>
  );
};

export default CustomInput;