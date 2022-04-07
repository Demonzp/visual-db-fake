import { useAppSelector } from '../../store/hooks';
import CompError from '../comp-error';
import ComponentSpiner from '../component-spiner';
import DbManagerTablesItem from '../db-manager-tables-item';


const DbManagerTables = () => {
  const { tables, isLoading, errors } = useAppSelector(state => state.db);

  return (
    <div>
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
                  return <DbManagerTablesItem key={t.name} table={t} />
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