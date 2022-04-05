import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TUrlParamsDbManager } from '../../App';
import { TReturn } from '../../hooks/useSimpleForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { EFieldIndex, EFielTypes, IField, ITable } from '../../store/slices/sliceDB';
import { addField, changeField, delField, IStructureField, setFields, TChangeField } from '../../store/slices/sliceTableStructure';
import { createId } from '../../utils/global';
import DbManagerTableItem from '../db-manager-table-item';

import styles from './table-structure.module.css';

const createField:()=>IStructureField = ()=>{
  return {
    id: createId(8),
    name: '',
    type: EFielTypes.STRING,
    valueOrLenght: '',
    index: EFieldIndex.NONE,
    autoIncrement: false,
    defaultValue: ''
  }
};

const TableStructure = () => {
  const { tables } = useAppSelector(state => state.db);
  const { tableName } = useParams<TUrlParamsDbManager>();
  const [table, setTable] = useState<ITable | undefined>();
  const { fields, isSave } = useAppSelector(state => state.tableStructure);
  const [isSubmit, setIsSubmit] = useState(false);
  let numCallback = 0;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tableName) {
      setTable(tables.find(t => t.name === tableName));
    }
  }, [tableName, tables]);

  useEffect(() => {
    if (table) {
      if (table.fields.length === 0 && isSave) {
        dispatch(addField(createField()));
      } else if(isSave) {
        dispatch(setFields(table.fields.map(f=>{
          return{
            ...f,
            id: createId(8)
          }
        })));
      }
    }
  }, [table]);

  const onSubmit = (data: TReturn<IField>) => {
    numCallback++;
    if (numCallback >= fields.length) {
      setIsSubmit(false);
    }
    console.log('data = ', data);
  }

  const changeHandle = (data:TChangeField)=>{
    //console.log('data = ', data);
    dispatch(changeField(data));
  }

  return (
    <div>
      {table ?
        <Fragment>
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>TYPE</th>
                <th>VALUE/LENGTH</th>
                <th>DEFAULT</th>
                <th>INDEX</th>
                <th>AI</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {fields.map(f => {
                return <DbManagerTableItem
                  i={f.id}
                  key={f.id}
                  field={f}
                  change={changeHandle}
                  isSubmit={isSubmit}
                  onSubmit={onSubmit}
                  onDel={(id)=>dispatch(delField(id))}
                />
              })}
            </tbody>
          </table>
          <div className={styles['cont-action']}>
            <button onClick={()=>dispatch(addField(createField()))}>Add Field</button>
            <button onClick={() => setIsSubmit(true)}>Save</button>
          </div>
        </Fragment>

        :
        null
      }
    </div>
  );
};

export default TableStructure;