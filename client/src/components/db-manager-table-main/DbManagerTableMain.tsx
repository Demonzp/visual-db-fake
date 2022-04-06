import { useEffect, useState } from 'react';
import { Outlet, useHref, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ETableTab, TUrlParamsDbManager } from '../../App';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { clearState, setQuestion } from '../../store/slices/sliceTableStructure';
import CustomTabs from '../custom-tabs';
import ModalCard from '../modal-card';
import ModalCardActions from '../modal-card-actions/ModalCardActions';
import ModalWin from '../modal-win';

const DbManagerTableMain = () => {
  const { dbId, tableName, tableTab } = useParams<TUrlParamsDbManager>();
  const navigate = useNavigate();
  const location = useLocation();
  const { isQuestion } = useAppSelector(state => state.tableStructure);
  const { isLoading, tables } = useAppSelector(state => state.db);
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);

  const toggle = () => setShow(prev => !prev);

  useEffect(() => {
    if (!show) {
      dispatch(setQuestion(false));
    }
  }, [show]);

  useEffect(() => {
    if (!tableTab) {
      navigate(ETableTab.MANAGER);
    }
  }, [tableTab]);

  useEffect(() => {
    if (!isLoading && tableName) {
      console.log('isLoading = ', isLoading);
      if(!tables.find(t=>t.name===tableName)){
        if(dbId){
          navigate(`../../${dbId}`);
        }
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (isQuestion) {
      //console.log('isQuestion = ', location);
      toggle();
    }
  }, [isQuestion]);

  const continueHandle = () => {
    toggle();
    dispatch(clearState());
    const path = (location.state as { from: { pathname: string } }).from.pathname;
    //console.log('path = ', path);
    navigate(path, { replace: true });
  };

  return (
    <div>
      <ModalWin show={show} onHide={toggle}>
        <ModalCard title='warning'>
          <p>You have unsaved data. Are you sure you want to continue?</p>
          <ModalCardActions>
            <button onClick={continueHandle}>Continue</button>
            <button onClick={toggle}>Cancel</button>
          </ModalCardActions>
        </ModalCard>
      </ModalWin>
      <CustomTabs tabs={[ETableTab.MANAGER, ETableTab.STRUCTURE]} />
      <Outlet />
    </div>
  )
};

export default DbManagerTableMain;