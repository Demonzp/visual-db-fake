import { useState } from 'react';
import { useAppSelector } from '../../store/hooks';
import CompError from '../comp-error';
import ComponentSpiner from '../component-spiner';
import CustomInput from '../custom-input';
import DbManagerTablesItem from '../db-manager-tables-item';
import ModalCard from '../modal-card';
import ModalCardActions from '../modal-card-actions/ModalCardActions';
import ModalWin from '../modal-win';


const DbManagerTables = () => {
  const { tables, isLoading, errors } = useAppSelector(state => state.db);
  const [show, setShow] = useState(false);
  const [oldNameTable, setOldNameTable] = useState<string>();
  const [newTableName, setNewNameTable] = useState<string>();

  const toggle = ()=>setShow(prev=>!prev);

  const renameHandle = (nameTable: string)=>{
    setOldNameTable(nameTable);
    toggle();
  }

  return (
    <div>
      <ModalWin show={show} onHide={toggle}>
        <ModalCard title="rename Table">
          <CustomInput 
            name="nameTable" 
            label="name" 
            value={newTableName}
            onChange={()=>{}}
          />
          <ModalCardActions>
            <button>Save</button>
            <button onClick={toggle}>Cancel</button>
          </ModalCardActions>
        </ModalCard>
      </ModalWin>
      {
        !isLoading ?
          errors.length <= 0 ?
            <table>
              <thead>
                <tr>
                  <th>TABLE</th>
                  <th>CREATE_AT</th>
                  <th>CHANGE_AT</th>
                  <th>VERSION</th>
                  <th>ACTIONS</th>
                  <th>ROWS</th>
                </tr>
              </thead>
              <tbody>
                {tables.map(t => {
                  return <DbManagerTablesItem key={t.name} table={t} onRename={renameHandle}/>
                })}
              </tbody>
            </table>
            :
            <CompError errors={errors} />
          :
          <ComponentSpiner />
      }
    </div>
  );
};

export default DbManagerTables;