import React from 'react';
import styles from './custom-input.module.css';

type Props={
  label?:string,
  value?:string
}

const CustomInput:React.FC<Props> = ({label, value})=>{
  return(
    <div className={styles.cont}>
      {
        label?
        <label className={styles.label}>{label}</label>
        :
        null
      }
      
      <input type='text' value={value}/>
    </div>
  );
};

export default CustomInput;