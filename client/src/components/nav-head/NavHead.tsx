import React from 'react';
import {
  Link,
  LinkProps,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';

import { ERoutes } from '../../types/rotutes';
import styles from './nav-head.module.css';

const CustomLink: React.FC<LinkProps> = ({ children, to, ...props }) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={match ? styles.active : ''}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

const NavHead = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <CustomLink to={ERoutes.HOME}>Home</CustomLink>
        <CustomLink to={ERoutes.DB_CREATOR}>Db-Creator</CustomLink>
      </div>
    </nav>
  );
}
export default NavHead;