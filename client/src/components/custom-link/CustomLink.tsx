import React from 'react';
import { useLinkClickHandler, NavLink, NavLinkProps, useLocation, useHref } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setQuestion } from '../../store/slices/sliceTableStructure';

const CustomLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (
    { onClick, replace = false, state, target, to, children, ...rest }, ref
  ) => {

    const {isSave} = useAppSelector(state=>state.tableStructure);
    const dispatch = useAppDispatch();
    const location = useLocation();
    const href = useHref(to);

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
        console.log(to);
        location.state = {from:{pathname:href}};
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