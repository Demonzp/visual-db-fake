import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ETableTab, TUrlParamsDbManager } from '../../App';
import { addTableRow, clearTable, delTableRow, getTableData } from '../../store/actions/tableManager';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { EFielTypes, IField, ITable } from '../../store/slices/sliceDB';
import { TObjAny } from '../../types/global';
import ComponentSpiner from '../component-spiner';
import CustomCheckbox from '../custom-checkbox';
import CustomInput from '../custom-input';
import CustomInputDate from '../custom-input-date';
import ModalCard from '../modal-card';
import ModalCardActions from '../modal-card-actions/ModalCardActions';
import ModalWin from '../modal-win';
import stylesS from '../table-structure/table-structure.module.css';

const TableManager = () => {
  const { tables } = useAppSelector(state => state.db);
  const { tableName } = useParams<TUrlParamsDbManager>();
  const [table, setTable] = useState<ITable | undefined>();
  const { isLoading, fieldsKye, data, errorsValid } = useAppSelector(state => state.tableManager);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const toggle = () => setShow(prev => !prev);

  useEffect(() => {
    const tempTable = tables.find(t => t.name === tableName);
    if (tempTable) {
      setTable(tempTable);
    }
  }, [tables]);

  useEffect(() => {
    if (!isLoaded && table) {
      dispatch(getTableData({
        tableName: table.name,
        page
      })).then(() => setIsLoaded(true));
    }
  }, [table, isLoaded]);
  
  const [formData, setFormData] = useState<TObjAny>({});

  useEffect(()=>{
    const obj:TObjAny = {};
    fieldsKye.forEach(f=>{
      obj[f] = '';
    });
    setFormData(obj);
  }, [fieldsKye]);

  const getInputElement: (field: IField) => JSX.Element | null = (field) => {
    let el;

    if (field.autoIncrement) {
      return null;
    }

    switch (field.type) {
      case EFielTypes.INT:
      case EFielTypes.STRING:
        el = <CustomInput
          key={field.name}
          name={field.name}
          label={field.name}
          error={errorsValid}
          value={formData[field.name]}
          onChange={(value) => setFormData(prev => { return { ...prev, [field.name]: value } })}
        />
        break;

      case EFielTypes.BOOLEAN:
        el = <CustomCheckbox
          key={field.name}
          name={field.name}
          label={field.name}
          value={formData[field.name]}
          onChange={(value) => setFormData(prev => { return { ...prev, [field.name]: value } })}
        />
        break;
      case EFielTypes.DATE:
        el = <CustomInputDate
          key={field.name}
          name={field.name}
          label={field.name}
          error={errorsValid}
          value={formData[field.name]}
          onChange={(value) => setFormData(prev => { return { ...prev, [field.name]: value } })}
        />
        break;
      default:
        el = null;
        break;
    }

    return el;
  };

  const submitHandle = ()=>{
    console.log('data = ', formData);

    if(!table){
      return;
    }

    dispatch(addTableRow({
      tableName: table.name,
      data: formData
    })).unwrap().then(()=>toggle());
  };

  const delHandle = (rowId:string)=>{
    if(!table){
      return;
    }
    dispatch(delTableRow({tableName:table.name, rowId}));
  };

  // useEffect(()=>{
  //   console.log('errorsValid = ', errorsValid);
  // },[errorsValid]);

  return (
    <div>
      <ModalWin show={show} onHide={toggle}>
        <ModalCard title='add Row'>
          {isLoading?
            <ComponentSpiner />
            :
            <Fragment>
              <div>
                {table?.fields.map(f => {
                  return getInputElement(f);
                })}
              </div>
              <ModalCardActions>
                <button onClick={submitHandle}>Continue</button>
                <button onClick={toggle}>Cancel</button>
              </ModalCardActions>
            </Fragment>
          }
        </ModalCard>
      </ModalWin>
      {
        table?.fields.length === 0 ?
          <Fragment>
            <p>table dont has any fields</p>
            <button onClick={() => navigate('../' + ETableTab.STRUCTURE)}>create fields</button>
          </Fragment>
          :
          <Fragment>
            {
              !table?.keyField?
              <div>
                <p>table '{table?.name}' has no unique field, operation of change or delite rows inposible</p>
              </div>
              :
              null
            }
            {isLoading ?
              <ComponentSpiner />
              :
              <div>
                <table>
                  <thead>
                    <tr>
                      {
                        fieldsKye.map(fK => {
                          return <th key={fK}>{fK.toUpperCase()}</th>
                        })
                      }
                      {
                        table?.keyField?
                        <th>ACTIONS</th>
                        :
                        null
                      }
                    </tr>
                  </thead>
                  <tbody>
                      {
                        table?
                          data.map((row, i)=>{
                            return(
                            <tr key={table.keyField?row[table.keyField]:i}>
                              {
                                fieldsKye.map(key=>{
                                  if(row.hasOwnProperty(key)){
                                    return(
                                      <td key={key}>{row[key]}</td>
                                    );
                                  }else{
                                    return <td key={key}></td>;
                                  }
                                })
                              }
                              {
                                table.keyField?
                                <td>
                                  <button onClick={()=>{}}>change</button>
                                  <button onClick={()=>delHandle(row[table.keyField])}>del</button>
                                </td>
                                :
                                null
                              }
                            </tr>
                            );
                          })
                          :
                          null
                      }
                  </tbody>
                </table>
                <div className={stylesS['cont-action']}>
                  <button onClick={toggle}>Add Row</button>
                  <button onClick={()=>table?dispatch(clearTable({tableName:table.name})):null}>Clear Table</button>
                </div>
              </div>
            }
          </Fragment>
      }
    </div>
  );
};

export default TableManager;