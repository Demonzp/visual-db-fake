import { useParams } from 'react-router-dom';
import { ETableTab, TUrlParamsDbManager } from '../../App';
import TableManager from '../table-manager';
import TableStructure from '../table-structure';

const DbManagerTableTabs = ()=>{
  const {tableTab} = useParams<TUrlParamsDbManager>();

  switch (tableTab) {
    case ETableTab.MANAGER:
      return (<TableManager />);
    case ETableTab.STRUCTURE:
      return (<TableStructure />);
    default:
      return null;
  }

  
};

export default DbManagerTableTabs;