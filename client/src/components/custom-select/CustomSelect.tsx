import React, { ChangeEvent } from 'react';

type TOption = {value:string, label:string}[];

type Props = {
  name:string;
  options: TOption;
  label?:string;
  selected?: string;
  onChange:(val:string)=>any;
};

const CustomSelect:React.FC<Props> = ({name, label, options, selected, onChange})=>{

  const changeHandle = (e:ChangeEvent<HTMLSelectElement>)=>{
    onChange(e.target.value);
  };

  return(
    <div>
      {label?
        <label>{label}</label>
        :
        null
      }
      <select 
        name={name}
        defaultValue={selected}
        onChange={changeHandle}
      >
        {options.map(o=>{
          return (
            <option 
              key={o.value} 
              value={o.value}
            >
              {o.label}
            </option>
          );
        })}
      </select>
    </div>
    
  );
};

export default CustomSelect;