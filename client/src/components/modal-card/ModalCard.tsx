import React, { useEffect, useRef, useState } from 'react';
import styles from './modal-card.module.css';

type Props = {
  children?: JSX.Element[] | JSX.Element | React.ReactElement,
  onHide?: () => any,
  title?: string
};

const ModalCard: React.FC<Props> = ({ title, onHide = () => { }, children }) => {

  const node = useRef(null);

  useEffect(() => {
    const btn = node.current as HTMLButtonElement | null;
    if (btn) {
      btn.addEventListener('click', onHide);
    }

  }, [node]);

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <label>{title}</label>
        <button ref={node}>X</button>
      </div>
      {children}
    </div>
  );
};

export default ModalCard;