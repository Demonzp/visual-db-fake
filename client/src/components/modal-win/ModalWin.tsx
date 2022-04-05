import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react';
import styles from './modal-win.module.css';

type Props={
  show: Boolean;
  onHide: ()=>any,
  children?: React.ReactElement; 
}


const ModalWin: React.FC<Props> = ({show, onHide, children})=>{

  const modal = useRef(null);
  const fon = useRef(null);

  const [newChild, setNewChild] = useState<React.ReactElement|undefined>();

  useEffect(()=>{
    if(children){
      setNewChild(React.cloneElement(children, { onHide }));
    }
  }, [children, onHide]);

  return(
    <Fragment>
      {
        show?
        <div ref={modal} className={styles.cont}>
          <div ref={fon} className={styles.fon} onClick={onHide}></div>
          {newChild}
          {/* {children} */}
        </div>
        :
        null
      }   
    </Fragment>
  );
};

export default ModalWin;