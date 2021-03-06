import { Fragment, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useHref, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import UseDbCreator from '../../hooks/useDbCreator';
import FormHookInput from '../form-hook-input';
import ModalCard from '../modal-card';
import ModalCardActions from '../modal-card-actions/ModalCardActions';
import ModalWin from '../modal-win';
import TablePanelItem from '../table-panel-item';

import styles from './left-panel.module.css';
import ComponentSpiner from '../component-spiner';
import { useAppDispatch } from '../../store/hooks';
import { createDBTable, getDBTables } from '../../store/actions/db';
import { ETableTab } from '../../App';
import BtnLink from '../btn-link';

interface IFormInputs {
  nameTable: string
}

const schema = yup.object({
  nameTable: yup.string().max(30),
}).required();

const LeftPanel = () => {
  const { tables, id, isLoading, errors: compErrors } = UseDbCreator();
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const href = useHref(id);
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
      .then((data) => {
        //console.log('then = ', data);
        setNameTable('');
        toggle();
        navigate(`../${data.db.id}/${data.table.name}/${ETableTab.STRUCTURE}`);
      })
      .catch((error) => {
        if (error.field) {
          setError((error.field as 'nameTable'), {
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

  const refreshHandle = ()=>{
    dispatch(getDBTables(id));
  };

  return (

    <div className={styles['left-panel']}>
      <ModalWin show={show} onHide={toggle}>
        <ModalCard title='Create new Table'>
          {isLoading ?
            <ComponentSpiner />
            :
            <Fragment>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormHookInput
                  label='name of table: '
                  name='nameTable'
                  value={nameTable}
                  errors={errors}
                  onChange={(e) => setNameTable(e.target.value)}
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
      {
        id?
        <div className={styles.head}>
          <BtnLink to={`../${id}`}>{id}</BtnLink>
          <button onClick={refreshHandle}>refresh</button>
        </div>
        :
        null
      }
      {/* <div className={styles.head}>
        <BtnLink to={`../${id}`}>{id}</BtnLink>
        <button>refresh</button>
      </div> */}
      {!isLoading ?
          compErrors.length<=0?
          <Fragment>
            <button onClick={toggle}>create table</button>
            <br></br>
            {tables.map(t => {
              return <TablePanelItem key={t.name} table={t} />
            })}
          </Fragment>
          :
          null
        :
        <ComponentSpiner />
      }

    </div>

  )
};

export default LeftPanel;