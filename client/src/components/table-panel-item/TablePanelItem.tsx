import React, { useState } from 'react';
import { ITable } from '../../store/slices/sliceDB';
import styles from './table-panel-item.module.css';

type Props = {
  table: ITable;
} 

const TablePanelItem: React.FC<Props> = ({table})=>{
  const [isOpen, setIsOpen] = useState(false);

  const openHandle = ()=>{
    setIsOpen(prev=>!prev);
  };

  return(
  <div>
    <button onClick={openHandle}>{isOpen?'-':'+'}</button>
    <label>{table.name}</label>
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