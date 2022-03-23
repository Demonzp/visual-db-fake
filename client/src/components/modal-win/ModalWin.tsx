import React, { useCallback, useEffect, useRef, useState } from 'react';
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

  const useOnHide = useCallback(()=>onHide(),[]);
  const useOnHideKey = useCallback((e:KeyboardEvent)=>{
    if(e.code==='Escape'){
      onHide();
    }
  }, []);

  useEffect(()=>{
    if(children){
      setNewChild(React.cloneElement(children, { onHide: useOnHide }));
    }
  }, [children, useOnHide]);

  useEffect(()=>{
    const node = modal.current as HTMLElement|null;
    if(show){     
      if(node){
        document.body.addEventListener('keyup', useOnHideKey);

        node.firstChild!.addEventListener('click', useOnHide);

        document.body.append(node);
      }
    }else{
      if(node){
        node.firstChild!.removeEventListener('click', useOnHide);
        document.body.removeEventListener('keyup', useOnHideKey);
        node.remove();
      }
    }
    
  }, [show, modal]);

  return(
    <div ref={modal} className={styles.cont}>
      <div ref={fon} className={styles.fon}></div>
      {newChild}
    </div>
  );
};

export default ModalWin;