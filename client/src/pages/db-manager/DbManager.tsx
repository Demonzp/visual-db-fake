import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import LeftPanel from '../../components/left-panel';
import { useAppSelector } from '../../store/hooks';
import styles from './db-manager.module.css';

const DbManager = () => {
  const {id} = useAppSelector(state=>state.db);
  const navigate = useNavigate();
  const location = useLocation();
  //console.log('navigate = ', navigate);

  // useEffect(() => {
  //   navigate(`/db-creator/${id}`);
  // }, [navigate]);

  return (
    <div className={styles.cont}>
      <LeftPanel />
      <div>
        <Outlet />
      </div>
    </div>

  );
};

export default DbManager;