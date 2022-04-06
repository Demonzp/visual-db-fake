import { useAppSelector } from '../../store/hooks';
import ComponentSpiner from '../component-spiner';
import DbManagerTablesItem from '../db-manager-tables-item';

const DbManagerTables = () => {
  const { tables,isLoading } = useAppSelector(state => state.db);
  
  return (
    <div>
      {
        isLoading?
        <ComponentSpiner />
        :
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
            {tables.map(t=>{
              return <DbManagerTablesItem key={t.name} table={t}/>
            })}
          </tbody>
        </table>
      }
    </div>
  );
};

export default DbManagerTables;