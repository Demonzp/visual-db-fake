import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styles from './custom-tabs.module.css';

type Props = {
  tabs: string[];
  children?: JSX.Element[] | JSX.Element | React.ReactElement
};

const setActive:NavLinkProps["className"] = ({isActive})=>isActive ? styles['active-tab-btn'] : undefined;

const CustomTabs: React.FC<Props> = ({tabs}) => {
  return (
    <div>
      {
        tabs.map(t=>{
          return(
            <NavLink 
              key={t} 
              to={t}
              className={(args)=>[setActive(args), styles['tab-btn']].join(' ')}
            >{t}</NavLink>
          );
        })
      }
    </div>
  );
};

export default CustomTabs;