import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowToLeft } from '@fortawesome/pro-regular-svg-icons';
import './TopBar.less';

const TopBar = () => {
  return (
    <div className='TopBar'>
      <Button variant='light'>
        <FontAwesomeIcon icon={faArrowToLeft} /> Back to List
      </Button>
      <h1>Picking</h1>
      <h3>search?</h3>
    </div>
  );
};

export default TopBar;
