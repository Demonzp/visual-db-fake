import React from 'react';
import styles from './modal-card-actions.module.css';

type Props = {
  children?: JSX.Element[] | JSX.Element | React.ReactElement
}

const ModalCardActions: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles['card-action']}>
      {children}
    </div>
  );
};

export default ModalCardActions;