import { createDb } from '../../store/actions/dbList';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import styles from './db-manager-main.module.css';

const DbManagerMain = () => {
  const {errors} = useAppSelector(state=>state.dbList);
  const dispatch = useAppDispatch();

  const createHandle = ()=>{
    dispatch(createDb());
  }

  return (
    <div className={styles.cont}>
      {errors.length<=0?
        <div>
          <button onClick={createHandle}>create DB</button>
        </div>
        :
        null
      }
      
    </div>
  );
};

export default DbManagerMain;