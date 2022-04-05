import React, { Fragment, useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { ETableTab, TUrlParamsDbManager } from '../App';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setQuestion } from '../store/slices/sliceTableStructure';

type Props = {
  children: JSX.Element
}

const UnSave: React.FC<Props> = ({ children }) => {
  const location = useLocation();
  const [lastPath, setLastPath] = useState<string>();
  const [lastChi, setLastChi] = useState<JSX.Element>();
  const [lastTable, setLastTable] = useState<string>();
  const [renderEl, setRenderEl] = useState<JSX.Element>();
  const { tableName } = useParams<TUrlParamsDbManager>();
  const { isSave } = useAppSelector(state => state.tableStructure);
  const dispatch = useAppDispatch();
  //let isBack = false;
  //console.log('here!!!', renderEl);
  useEffect(()=>{
    if (!isSave && tableName!==lastTable ||
        !isSave && !tableName
    ) {
      console.log('не сохраненнный!!!');
      //isBack = true;
      dispatch(setQuestion(true));
      setRenderEl(lastChi);
      //setRenderEl(<Navigate to={lastPath as string} state={{ from: location }}/>);
      return;
      //
    }
    // if(location.pathname!==lastPath){

    // }

    setRenderEl(children);
    setLastTable(tableName);
    setLastChi(children);
    setLastPath(location.pathname);
  }, [location]);

  return (
    <Fragment>
      {renderEl}
    </Fragment>
  );
};

export default UnSave;