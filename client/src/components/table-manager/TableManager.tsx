import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ETableTab, TUrlParamsDbManager } from '../../App';
import { addTableRow, getTableData } from '../../store/actions/tableManager';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { EFielTypes, IField, ITable } from '../../store/slices/sliceDB';
import { TObjAny } from '../../types/global';
import ComponentSpiner from '../component-spiner';
import CustomCheckbox from '../custom-checkbox';
import CustomInput from '../custom-input';
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
          onChange={(value) => setFormData(prev => { return { ...prev, [field.name]: value } })}
        />
        break;

      case EFielTypes.BOOLEAN:
        el = <CustomCheckbox
          key={field.name}
          name={field.name}
          label={field.name}
          onChange={() => { }}
        />
        break;

      default:
        el = null;
        break;
    }

    return el;
  };

  const submitHandle = ()=>{
    //console.log('data = ', formData);

    if(!table){
      return;
    }

    dispatch(addTableRow({
      tableName: table.name,
      data: formData
    })).then(()=>toggle());
  };

  // useEffect(()=>{
  //   console.log('errorsValid = ', errorsValid);
  // },[errorsValid]);

  return (
    <div>
      <ModalWin show={show} onHide={toggle}>
        <ModalCard title='add Row'>
          <div>
            {table?.fields.map(f => {
              return getInputElement(f);
            })}
          </div>
          <ModalCardActions>
            <button onClick={submitHandle}>Continue</button>
            <button onClick={toggle}>Cancel</button>
          </ModalCardActions>
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
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                      {data.map((row, i)=>{
                        return(
                        <tr key={i}>
                          {
                            Object.entries(row).map(([key, val])=>{
                              return (
                                <td key={key}>{val}</td>
                              );
                            })
                          }
                        </tr>
                        );
                        
                      })}
                  </tbody>
                </table>
                <div className={stylesS['cont-action']}>
                  <button onClick={toggle}>Add Row</button>
                  <button onClick={() => { }}>Clear Table</button>
                </div>
              </div>
            }
          </Fragment>
      }
    </div>
  );
};

export default TableManager;