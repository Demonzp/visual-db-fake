import { useAppSelector } from '../store/hooks';

const UseDbCreator = ()=>{
  const {isLoading, id, tables} = useAppSelector(state=>state.db);

  return {
    isLoading,
    id,
    tables
  }
};

export default UseDbCreator;