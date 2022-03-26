import React, { useEffect, useState } from 'react';
import { EFieldIndex, EFielTypes, IField } from '../../store/slices/sliceDB';
import { getOptionsFromEnum } from '../../utils/getOptions';
import CustomInput from '../custom-input';
import CustomSelect from '../custom-select';

type Props = {
  field: IField;
}

const DbManagerTableItem:React.FC<Props> = ({field})=>{

  const selectTypeHandle = (value:string)=>{
    console.log(value);
  };

  return (
    <tr>
      <td>{field.name}</td>
      <td>
        <CustomSelect
          name='type'
          options={getOptionsFromEnum(EFielTypes)} 
          selected={field.type}
          onChange={selectTypeHandle}
        />
      </td>
      <td>
        <CustomInput value={field.valueOrLenght}/>
      </td>
      <td>
        <CustomInput value={field.defaulValue?.toString()}/>
      </td>
      <td>
        <CustomSelect
          name='index'
          options={[{value:'none', label:'---'},...getOptionsFromEnum(EFieldIndex)]} 
          selected={field.index}
          onChange={()=>{}}
        />
      </td>
      <td>
        <input 
          type="checkbox" 
          name="AI"
          checked={field.autoIncrement?true:false}
        />
      </td>
    </tr>
  );
};

export default DbManagerTableItem;