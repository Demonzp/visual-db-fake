import React, { useState } from 'react';
import { useLocation, useParams, Location } from 'react-router-dom';
import { TUrlParamsDbManager } from '../../App';
import { ITable } from '../../store/slices/sliceDB';
import BtnLink from '../btn-link';
import styles from './table-panel-item.module.css';

type Props = {
  table: ITable;
} 

const getURL = (params:TUrlParamsDbManager, location:Location, tableName:string):string=>{
  let link = location.pathname;
  if(params.tableName){
    const idx = link.indexOf('/'+params.tableName);
    link = location.pathname.slice(0, idx);
  }
  return link+'/'+tableName;
};

const TablePanelItem: React.FC<Props> = ({table})=>{
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const params = useParams<TUrlParamsDbManager>();

  const openHandle = ()=>{
    setIsOpen(prev=>!prev);
  };

  return(
  <div>
    <button onClick={openHandle}>{isOpen?'-':'+'}</button>
    <BtnLink to={getURL(params, location, table.name)}>
      {table.name}
    </BtnLink>
    {isOpen?
      <div>
        {table.fieds.map(f=>{
          return(
            <div key={f.name} className={styles.field}>
              <label>{f.name}</label>
            </div>
          )
        })}
      </div>:
      null
    }
  </div>
  );
};

export default TablePanelItem;