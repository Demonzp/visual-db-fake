import { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ETableTab, TUrlParamsDbManager } from '../../App';
import { useAppSelector } from '../../store/hooks';
import { ITable } from '../../store/slices/sliceDB';

const TableManager = ()=>{
  const {tables} = useAppSelector(state=>state.db);
  const {tableName} = useParams<TUrlParamsDbManager>();
  const [table, setTable] = useState<ITable|undefined>();
  const navigate = useNavigate();

  useEffect(()=>{
    const tempTable = tables.find(t=>t.name===tableName);
    if(tempTable){
      setTable(tempTable);
    }
  }, [tables]);

  return(
    <div>
      {
        table?.fields.length===0?
          <Fragment>
            <p>table dont has any fields</p>
            <button onClick={()=>navigate('../'+ETableTab.STRUCTURE)}>create fields</button>
          </Fragment>
        :
          <div>data</div>
      }
    </div>
  );
};

export default TableManager;