import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { EUrlParamsDbManager } from '../../App';
import CompError from '../../components/comp-error';
import { getDBTables } from '../../store/actions/db';
import { getDbList } from '../../store/actions/dbList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './db-manager.module.css';

const DbManager = () => {
  const { errors, isLoading } = useAppSelector(state => state.dbList);
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams<EUrlParamsDbManager>();
  const dispatch = useAppDispatch();
  //console.log('navigate = ', navigate);

  useEffect(() => {
    console.log('params = ', params);
    if (!params.dbId) {
      console.log('must on server for allDb!!!');
      dispatch(getDbList());
    }else{
      console.log('must on server for Db!!!');
      dispatch(getDBTables(params.dbId));
    }
    //navigate(`/db-creator/${id}`);
  }, [params.dbId]);

  return (
    <div className={styles.cont}>
      {!isLoading ?
          errors.length<=0?
              <div>
                <Outlet />
              </div>
            :
            <CompError errors={errors}/>
          :
          <div>Loading...</div>
      }

    </div>

  );
};

export default DbManager;