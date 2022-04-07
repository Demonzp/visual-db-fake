import { Outlet } from 'react-router-dom';
import LeftPanel from '../left-panel';
import styles from './db-manager-tables.module.css';

const DbManagerTablesMain = ()=>{

  return(
    <div className={styles.cont}>
      <LeftPanel />
      <Outlet />
    </div>
  );
};

export default DbManagerTablesMain;