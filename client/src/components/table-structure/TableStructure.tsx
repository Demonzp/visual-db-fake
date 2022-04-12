import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TUrlParamsDbManager } from '../../App';
import { TReturn } from '../../hooks/useSimpleForm';
import { changeFields } from '../../store/actions/tableStructure';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { EFieldIndex, EFielTypes, IField, ITable } from '../../store/slices/sliceDB';
import { addField, changeField, delField, IStructureField, setFields, TChangeField } from '../../store/slices/sliceTableStructure';
import { createId } from '../../utils/global';
import CompError from '../comp-error';
import ComponentSpiner from '../component-spiner';
import DbManagerTableItem from '../db-manager-table-item';

import styles from './table-structure.module.css';

const createField: () => IStructureField = () => {
  return {
    id: createId(8),
    name: '',
    type: EFielTypes.STRING,
    valueOrLenght: '',
    index: EFieldIndex.NONE,
    autoIncrement: false,
    allowNull: false,
    defaultValue: ''
  }
};

const TableStructure = () => {
  const { tables } = useAppSelector(state => state.db);
  const { tableName, dbId } = useParams<TUrlParamsDbManager>();
  const [table, setTable] = useState<ITable | undefined>();
  const { fields, isSave, errors, isLoading } = useAppSelector(state => state.tableStructure);
  const [isSubmit, setIsSubmit] = useState(false);
  //const [allData, setAllData] = useState<IField[]>([]);
  const allData: IStructureField[] = [];
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
        dispatch(setFields([createField()]));
      } else if (isSave) {
        dispatch(setFields(table.fields.map(f => {
          return {
            ...f
          }
        })));
      }
    }
  }, [table]);

  const onSubmit = (data: TReturn<IStructureField>) => {
    numCallback++;
    console.log('data = ', data);
    if(!data.errors){
      console.log('errors = ', data.errors);
      allData.push(data.values);
    }
    if (numCallback >= fields.length) {
      setIsSubmit(false);
      if(allData.length===fields.length){
        console.log('allData = ', allData);
        if(dbId && tableName){
          dispatch(changeFields({
            dbId,
            tableName,
            fields: allData
          }));
        }
      }
    }
  };

  const changeHandle = (data: TChangeField) => {
    //console.log('data = ', data);
    dispatch(changeField(data));
  }

  const delHandle = (id: string)=>{
    console.log('id = ', id);
    dispatch(delField(id));
  }

  return (
    <div>
      {table ?
        isLoading?
        <ComponentSpiner />
        :
        <Fragment>
          <div>
            <CompError errors={errors}/>
          </div>
          <table>
            <thead>
              <tr>
                <th>NAME</th>
                <th>TYPE</th>
                <th>VALUE/LENGTH</th>
                <th>DEFAULT</th>
                <th>ALLOW_NULL</th>
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
                  onDel={delHandle}
                />
              })}
            </tbody>
          </table>
          <div className={styles['cont-action']}>
            <button onClick={() => dispatch(addField(createField()))}>Add Field</button>
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