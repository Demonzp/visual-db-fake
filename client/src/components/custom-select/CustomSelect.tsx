import React, { ChangeEvent } from 'react';
import { TAppValidateError } from '../../types/errors';

import stylesC from '../custom-input/custom-input.module.css';

type TOption = { value: string, label: string }[];

type Props = {
  name: string;
  options: TOption;
  error?: TAppValidateError,
  label?: string;
  selected?: string;
  onChange: (val: string) => any;
};

const CustomSelect: React.FC<Props> = ({ name, label, options, selected, error, onChange }) => {

  const changeHandle = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={stylesC.cont}>
      <div>
        {label ?
          <label className={stylesC.label}>{label}</label>
          :
          null
        }
        <select
          name={name}
          defaultValue={selected}
          onChange={changeHandle}
        >
          {options.map(o => {
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

export default CustomSelect;