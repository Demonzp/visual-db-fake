import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { TUrlParamsDbManager } from '../../App';
import { useAppSelector } from '../../store/hooks';
import { ITable } from '../../store/slices/sliceDB';
import DbManagerTableItem from '../db-manager-table-item';

const DbManagerTable = ()=>{
  const {tableName} = useParams<TUrlParamsDbManager>();
  const {tables}=useAppSelector(state=>state.db);
  const [table, setTable] = useState<ITable|null>(null);

  useEffect(()=>{
    if(tableName){
      const tempTable = tables.find(t=>t.name===tableName);
      if(tempTable){
        setTable(tempTable);
      }
    }
  }, [tableName]);

  return(
    <div>
      {table?
        <table>
          <thead>
            <tr>
              <th>NAME</th>
              <th>TYPE</th>
              <th>VALUE/LENGTH</th>
              <th>DEFAULT</th>
              <th>INDEX</th>
              <th>AI</th>
            </tr>
          </thead>
          <tbody>
            {table.fieds.map(f=>{
              return <DbManagerTableItem key={f.name} field={f}/>
            })}
          </tbody>
        </table>
        :
        null
      }
    </div>
  )
};

export default DbManagerTable;