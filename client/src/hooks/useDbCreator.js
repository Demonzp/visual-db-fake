import { useAppSelector } from '../store/hooks';

const UseDbCreator = ()=>{
  const {isLoading, dbInfo, tables} = useAppSelector(state=>state.db);

  return {
    isLoading,
    id: dbInfo.id,
    tables
  }
};

export default UseDbCreator;