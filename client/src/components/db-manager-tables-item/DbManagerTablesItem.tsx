import React from 'react';
import { useLocation } from 'react-router-dom';
import { ITable } from '../../store/slices/sliceDB';
import BtnLink from '../btn-link';

type Props = {
  table: ITable;
};

const DbManagerTablesItem: React.FC<Props> = ({table})=>{
  const location = useLocation();

  return(
    <tr>
      <td>
        <BtnLink to={location.pathname+'/'+table.name}>
          {table.name}
        </BtnLink>
      </td>
      <td>Actions</td>
      <td>{table.rows}</td>
    </tr>
  );
};

export default DbManagerTablesItem;