import React, { useEffect, useState } from 'react';
import useSimpleForm, { TReturn } from '../../hooks/useSimpleForm';
import Joi from 'joi';
import * as yup from 'yup';
import { EFieldIndex, EFieldKeys, EFielTypes, IField } from '../../store/slices/sliceDB';
import { getOptionsFromEnum } from '../../utils/getOptions';
import CustomInput from '../custom-input';
import CustomSelect from '../custom-select';
import CustomCheckbox from '../custom-checkbox';
import { TChangeField } from '../../store/slices/sliceTableStructure';

type Props = {
  i: string,
  field: IField,
  isSubmit: boolean,
  change: (d:TChangeField)=>void
  onSubmit: (d:TReturn<IField>)=>void
  onDel: (d:string)=>void
}


const DbManagerTableItem: React.FC<Props> = ({i, field, isSubmit, onSubmit, change, onDel }) => {

  const {data, onChange, handleSubmit, errors} = useSimpleForm<IField>({
    state: field,
    joiShema: Joi.object({
      name: Joi.string().max(30).required(),
      type: Joi.string().required(),
      valueOrLenght: Joi.string().allow(''),
      index: Joi.string(),
      autoIncrement: Joi.boolean(),
      defaultValue: Joi.string().allow('')
    })
  });

  const changeHandle = (data:{name:string, value:any})=>{
    change({
      ...data,
      fieldId: i
    });
  };

  useEffect(()=>{
    if(isSubmit){
      onSubmit(handleSubmit());
    }
  }, [isSubmit]);

  return (
    <tr>
      <td>
        <CustomInput
          name={EFieldKeys.NAME}
          value={data.name}
          error={errors}
          onChange={(value)=>changeHandle({name:EFieldKeys.NAME, value})}
        />
      </td>
      <td>
        <CustomSelect
          name={EFieldKeys.TYPE}
          options={getOptionsFromEnum(EFielTypes)}
          selected={data.type}
          onChange={(value)=>changeHandle({name:EFieldKeys.TYPE, value})}
        />
      </td>
      <td>
        <CustomInput 
          name={EFieldKeys.VALUE_OR_LENGTH}
          value={data.valueOrLenght}
          error={errors}
          onChange={(value)=>changeHandle({name:EFieldKeys.VALUE_OR_LENGTH, value})}
        />
      </td>
      <td>
        <CustomInput
          name={EFieldKeys.DEFAULT_VALUE}
          value={data.defaultValue}
          error={errors}
          onChange={(value)=>changeHandle({name:EFieldKeys.DEFAULT_VALUE, value})}
        />
      </td>
      <td>
        <CustomSelect
          name={EFieldKeys.INDEX}
          options={getOptionsFromEnum(EFieldIndex)}
          selected={data.index}
          onChange={() => { }}
        />
      </td>
      <td>
        <CustomCheckbox
          name={EFieldKeys.AUTO_INCREMENT}
          value={data.autoIncrement}
          error={errors}
          onChange={(value)=>changeHandle({name:EFieldKeys.AUTO_INCREMENT, value})}
        />
      </td>
      <td>
        <button onClick={()=>onDel(i)}>Del</button>
      </td>
    </tr>
  );
};

export default DbManagerTableItem;