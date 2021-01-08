import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowToLeft } from '@fortawesome/pro-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
const PickNav = () => {
  return (
    <div className='PickNav'>
      <Button variant='outline-secondary'>
        <FontAwesomeIcon icon={faArrowToLeft} /> Back
      </Button>
      <Button variant='outline-danger'>
        <FontAwesomeIcon icon={faExclamationCircle} /> Reject Task
      </Button>
    </div>
  );
};

export default PickNav;
