import { useAppSelector } from "../../store/hooks";
import DbManagerTablesItem from "../db-manager-tables-item";

const DbManagerTables = () => {
  const { tables } = useAppSelector(state => state.db);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>TABLE</th>
            <th>ACTIONS</th>
            <th>LENGTH</th>
          </tr>
        </thead>
        <tbody>
          {tables.map(t=>{
            return <DbManagerTablesItem key={t.name} table={t}/>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DbManagerTables;