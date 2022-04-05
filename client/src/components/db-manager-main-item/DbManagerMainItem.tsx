import React from 'react';
import { useLocation } from 'react-router-dom';
import { IDBList } from '../../store/slices/sliceDBList';
import BtnLink from '../btn-link';

type Props = {
  db: IDBList
}

const DbManagerMainItem: React.FC<Props> = ({db})=>{
  const location = useLocation();

  return(
    <tr>
      <td>
        <BtnLink to={location.pathname+'/'+db.id}>
          {db.id}
        </BtnLink>
      </td>
      <td>
        <ul>
          {db.tables.map(t=>{
          return (
            <li key={t}>
              {t}
            </li>
            )
          } 
          )}
        </ul>
      </td>
      <td>{db.version}</td>
      <td>{db.createAt}</td>
      <td>{db.changeAt}</td>
      <td><button>DEL</button></td>
    </tr>
  );
};

export default DbManagerMainItem;