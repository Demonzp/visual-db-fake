import { createDb } from '../../store/actions/dbList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import DbManagerMainItem from '../db-manager-main-item';
import styles from './db-manager-main.module.css';
import stylesIndex from '../../index.module.css';

const DbManagerMain = () => {
  const { dbList } = useAppSelector(state => state.dbList);
  const dispatch = useAppDispatch();

  const createHandle = () => {
    dispatch(createDb());
  }

  return (
    <div className={[styles.cont, stylesIndex.col].join(' ')}>
      <table>
        <thead>
          <tr>
            <th>NAME</th>
            <th>TABLES</th>
            <th>VERSION</th>
            <th>CREATE_AT</th>
            <th>CHANGE_AT</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
        {
          dbList.map(db => {
            return (<DbManagerMainItem key={db.id} db={db}/>);
          })
        }
        </tbody>
      </table>
      
      <div className={[styles.cont, styles.actions].join(' ')}>
        <button onClick={createHandle}>create DB</button>
      </div>

    </div>
  );
};

export default DbManagerMain;