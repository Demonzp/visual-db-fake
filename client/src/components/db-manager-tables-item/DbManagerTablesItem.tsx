import React from 'react';
import { useLocation } from 'react-router-dom';
import { ITable } from '../../store/slices/sliceDB';
import BtnLink from '../btn-link';

type Props = {
  table: ITable;
  onRename: (d:string)=>void
};

const DbManagerTablesItem: React.FC<Props> = ({table, onRename})=>{
  const location = useLocation();

  const renameHandle = ()=>{
    onRename(table.name);
  }

  return(
    <tr>
      <td>
        <BtnLink to={location.pathname+'/'+table.name}>
          {table.name}
        </BtnLink>
      </td>
      <td>{table.createAt}</td>
      <td>{table.changeAt}</td>
      <td>{table.version}</td>
      <td>
        <button onClick={renameHandle}>rename</button>
        <button>Del</button>
      </td>
      <td>{table.rows}</td>
    </tr>
  );
};

export default DbManagerTablesItem;