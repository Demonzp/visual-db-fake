import styles from './component-spiner.module.css';

const ComponentSpiner = ()=>{
  return(
    <div className={styles.cont}>
      <p className={styles.p}>Loading...</p>
    </div>
  );
};

export default ComponentSpiner;