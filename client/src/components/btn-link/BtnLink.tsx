import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './btn-link.module.css';

type Props = {
  to: string,
  children?: string;
}

const setActive:NavLinkProps["className"] = ({isActive})=>isActive ? styles['btn-link-active'] : undefined;

const BtnLink:React.FC<Props> = ({to, children})=>{
  return(
    <NavLink to={to} className={setActive}>
      {children}
    </NavLink>
  );
};

export default BtnLink;