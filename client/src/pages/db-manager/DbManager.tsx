import LeftPanel from '../../components/left-panel';
import styles from './db-manager.module.css';

const DbManager = () => {
  return (
    <div className={styles.cont}>
      <LeftPanel />
      <div>
        DbCreator
      </div>
    </div>

  );
};

export default DbManager;