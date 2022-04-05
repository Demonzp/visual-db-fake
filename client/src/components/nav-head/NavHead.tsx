import {
  NavLinkProps,
} from 'react-router-dom';

import { ERoutes } from '../../types/rotutes';
import CustomLink from '../custom-link/CustomLink';
import styles from './nav-head.module.css';

const setActive:NavLinkProps["className"] = ({isActive})=>isActive ? styles.active : undefined;

const NavHead = () => {
  return (
    <nav className={styles.nav}>
      <div>
        <CustomLink to={ERoutes.HOME} className={setActive}>Home</CustomLink>
        <CustomLink to={ERoutes.DB_CREATOR} className={setActive}>Db-Creator</CustomLink>
      </div>
    </nav>
  );
}
export default NavHead;