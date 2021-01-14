import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faList, faBoxOpen } from '@fortawesome/pro-regular-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './SideBar.less';
import useAuth from '../../useAuth';
import { useAuthState } from '../../auth-state';
// const shouldExpand = () => {
//   return document.body.offsetWidth > 1000;
// };

const SideBar = ({ children }) => {
  // const [expand, setExpand] = useState(shouldExpand());
  const [expand, setExpand] = useState(false);
  const [{ auth }, dispatch] = useAuthState();

  // //is this needed?
  // useEffect(() => {
  //   const handleResize = () => {
  //     setExpand(shouldExpand());
  //   };
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  const handleLogout = (e) => {
    dispatch({ type: 'AUTH_CHANGE', auth: null });
  };

  return (
    <div className='SideBar' style={{ minWidth: expand ? '300px' : '80px' }}>
      {/* <Link to='http://xship.com'> */}
      <img src='./xlogo.svg' alt='' className='xLogo' />
      <div className='divider'></div>
      <div className='actions'>{children}</div>
      {/* <div className='settingsLink'>
        <Link to='settings'>
          <FontAwesomeIcon icon={faCog} />
        </Link>
      </div> */}
      <div className='profile' onClick={handleLogout}>
        <img src={auth.photoURL} loading='lazy' alt='' />
      </div>
      {/* 
      assign tasks
      pick assigned tasks
      pick arbitraty tasks
    */}
    </div>
  );
};

const Action = ({ to, faIcon, children }) => {
  let location = useLocation();
  let locationArr = location.pathname.split('/');
  locationArr.find((location) => {
    return location === to;
  });
  return (
    <Link
      to={to || '/'}
      className={classNames({
        selected: locationArr.find((location) => location === to),
      })}>
      {faIcon ? <FontAwesomeIcon icon={faIcon} /> : null}
    </Link>
  );
};

SideBar.Action = Action;
export default SideBar;
