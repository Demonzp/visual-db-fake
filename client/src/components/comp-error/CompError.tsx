import React from 'react';
import { ICustomError } from '../../types/errors';

type Props={
  errors: ICustomError[];
}

const CompError:React.FC<Props> = ({errors})=>{
  return(
    <div>
      {errors.map((err, i)=>{
        return (
          <div key={i}>
            <p>{err.message}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CompError;