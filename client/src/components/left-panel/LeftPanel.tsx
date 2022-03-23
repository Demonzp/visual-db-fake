import { Fragment, useState } from 'react';
import UseDbCreator from '../../hooks/useDbCreator';
import CustomInput from '../custom-input';
import ModalCard from '../modal-card';
import ModalWin from '../modal-win';
import TablePanelItem from '../table-panel-item';
import styles from './left-panel.module.css';

const LeftPanel = () => {
  const { tables } = UseDbCreator();
  const [show, setShow] = useState(false);

  const toggle = ()=>setShow(prev=>!prev);

  return (
    <div className={styles['left-panel']}>
      <ModalWin show={show} onHide={toggle}>
        <ModalCard title='Create new Table'>
         <CustomInput label='name table:'/>
        </ModalCard>
      </ModalWin>
      <div className={styles.head}>
        <label>DBId</label>
      </div>
      <button onClick={toggle}>create table</button>
      <br></br>
      {tables.map(t=>{
        return <TablePanelItem key={t.name} table={t}/>
      })}
    </div>
  )
};

export default LeftPanel;