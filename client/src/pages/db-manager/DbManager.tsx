import { Fragment, useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { EUrlParamsDbManager } from '../../App';
import DbManagerMain from '../../components/db-manager-main';
import LeftPanel from '../../components/left-panel';
import { getDbList } from '../../store/actions/dbList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './db-manager.module.css';

const DbManager = () => {
  const { id } = useAppSelector(state => state.db);
  const { errors, isLoading } = useAppSelector(state => state.dbList);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<EUrlParamsDbManager>();
  const dispatch = useAppDispatch();
  //console.log('navigate = ', navigate);

  useEffect(() => {
    console.log('params = ', params);
    if (!params.dbId && !params.tableName) {
      console.log('must on server for allDb!!!');
      dispatch(getDbList());
    }
    //navigate(`/db-creator/${id}`);
  }, [params]);

  return (
    <div className={styles.cont}>
      {!isLoading ?
        <Fragment>
          <LeftPanel />
          <DbManagerMain />
          <div>
            <Outlet />
          </div>
        </Fragment>
        :
        <div>Loading...</div>
      }

    </div>

  );
};

export default DbManager;