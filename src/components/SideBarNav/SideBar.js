import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faList, faBoxOpen } from '@fortawesome/pro-regular-svg-icons';
import { Link } from 'react-router-dom';
const shouldExpand = () => {
  return document.body.offsetWidth > 1000;
};

const SideBar = ({ children }) => {
  const [expand, setExpand] = useState(shouldExpand());

  //is this needed?
  useEffect(() => {
    const handleResize = () => {
      setExpand(shouldExpand());
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className='SideBar' style={{ minWidth: expand ? '300px' : '80px' }}>
      <Link to='/'>
        <img src='./xlogo.svg' alt='' className='xLogo' />
      </Link>
      <div className='divider'></div>
      <div className='actions'>
        <Link to='/assign'>
          <FontAwesomeIcon icon={faList} />
        </Link>
        <Link to='/pick'>
          <FontAwesomeIcon icon={faBoxOpen} />
        </Link>
      </div>
      <div className='settingsLink'>
        <Link to='settings'>
          <FontAwesomeIcon icon={faCog} />
        </Link>
      </div>
      {/* 
      assign tasks
      pick assigned tasks
      pick arbitraty tasks
      */}
    </div>
  );
};

export default SideBar;
