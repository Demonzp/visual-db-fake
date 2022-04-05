import React from 'react';
import { useLinkClickHandler, NavLink, NavLinkProps, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setQuestion } from '../../store/slices/sliceTableStructure';

const CustomLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { onClick, replace = false, state, target, to, children, ...rest }, ref
  ) => {

    const {isSave} = useAppSelector(state=>state.tableStructure);
    const dispatch = useAppDispatch();
    const location = useLocation();

    const handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target
    });

    const preHandleClick = (e:React.MouseEvent<HTMLAnchorElement, MouseEvent>)=>{
      e.preventDefault();
      if(isSave){
        handleClick(e);
      }else{
        location.state = {from:{pathname:to}};
        dispatch(setQuestion(true));
      }
      //console.log('tytyt!!!!!');
    };

    return (
      <NavLink
        {...rest}
        to={to}
        onClick={preHandleClick}
        ref={ref}
        target={target}
      >
        {children}
      </NavLink>
    )
  }
);

export default CustomLink;