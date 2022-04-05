import React, { Fragment, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UseDbCreator from '../../hooks/useDbCreator';
import CustomInput from '../custom-input';
import FormHookInput from '../form-hook-input';
import ModalCard from '../modal-card';
import ModalCardActions from '../modal-card-actions/ModalCardActions';
import ModalWin from '../modal-win';
import TablePanelItem from '../table-panel-item';

import styles from './left-panel.module.css';
import ComponentSpiner from '../component-spiner';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createDBTable } from '../../store/actions/db';
import { ICustomValidationError } from '../../types/errors';
import CustomValidationError from '../../utils/customValidationError';

interface IFormInputs {
  nameTable: string
}

const schema = yup.object({
  nameTable: yup.string().max(30),
}).required();

const LeftPanel = () => {
  const { tables, id, isLoading } = UseDbCreator();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [nameTable, setNameTable] = useState('');
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setError, formState: { errors } } = useForm<IFormInputs>({
    resolver: yupResolver(schema)
  });

  const toggle = () => setShow(prev => !prev);


  const onSubmit: SubmitHandler<IFormInputs> = (data) => {
    //console.log('data = ', data);
    dispatch(createDBTable(data.nameTable))
      .unwrap()
      .then(()=>{
        console.log('then');
      })
      .catch((error)=>{
        if(error.field){
          setError((error.field as 'nameTable'),{
            type: "manual",
            message: error.message
          })
        }
      });
  }

  const cancelHandle = () => {
    setNameTable('');
    toggle();
  };

  return (
    <Fragment>
      {id ?
        <div className={styles['left-panel']}>
          <ModalWin show={show} onHide={toggle}>
            <ModalCard title='Create new Table'>
              {isLoading?
                <ComponentSpiner />
                :
                <Fragment>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <FormHookInput 
                      label='name of table: ' 
                      name='nameTable' 
                      value={nameTable}
                      errors={errors}
                      onChange={(e)=>setNameTable(e.target.value)}
                      register={register}
                    />
                  </form>
                  <ModalCardActions>
                    <button onClick={handleSubmit(onSubmit)}>Create</button>
                    <button onClick={cancelHandle}>Cancel</button>
                  </ModalCardActions>
                </Fragment>
              }
            </ModalCard>
          </ModalWin>
          <div className={styles.head}>
            <label>{id}</label>
          </div>
          <button onClick={toggle}>create table</button>
          <br></br>
          {tables.map(t => {
            return <TablePanelItem key={t.name} table={t} />
          })}
        </div>
        :
        null
      }
    </Fragment>

  )
};

export default LeftPanel;