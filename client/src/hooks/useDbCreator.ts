import { useAppSelector } from '../store/hooks';

const UseDbCreator = ()=>{
  const {isLoading, dbInfo, tables, errors} = useAppSelector(state=>state.db);

  return {
    isLoading,
    id: dbInfo.id,
    tables,
    errors
  }
};

export default UseDbCreator;