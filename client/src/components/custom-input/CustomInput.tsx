import React from 'react';
import styles from './custom-input.module.css';

type Props={
  label?:string
}

const CustomInput:React.FC<Props> = ({label})=>{
  return(
    <div className={styles.cont}>
      {
        label?
        <label className={styles.label}>{label}</label>
        :
        null
      }
      
      <input type='text'/>
    </div>
  );
};

export default CustomInput;