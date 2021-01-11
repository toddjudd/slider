import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowToRight, faCheck } from '@fortawesome/pro-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
const PickNav = (props) => {
  const { pick } = props;
  return (
    <div className='PickNav'>
      {/* <Button variant='outline-secondary'>
        <FontAwesomeIcon icon={faArrowToLeft} /> Back
      </Button> */}
      <Button
        type='submit'
        variant={pick.submitting ? 'secondary' : 'success'}
        disabled={pick.submitting}>
        {pick.submitting ? 'Loading...' : 'Complete Task and Next Task'}{' '}
        <FontAwesomeIcon icon={faArrowToRight} />{' '}
      </Button>
      <span className='flexBreak'></span>
      <Button
        type='submit'
        variant={pick.submitting ? 'secondary' : 'success'}
        disabled={pick.submitting}>
        <FontAwesomeIcon icon={faCheck} />{' '}
        {pick.submitting ? 'Loading...' : 'Complete Task'}
      </Button>
      <Button variant='outline-danger'>
        <FontAwesomeIcon icon={faExclamationCircle} /> Reject Task
      </Button>
    </div>
  );
};

export default PickNav;
