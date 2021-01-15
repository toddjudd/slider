import { Button, Form, InputGroup } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowToLeft, faSearch } from '@fortawesome/pro-regular-svg-icons';
import './TopBar.less';

const TopBar = () => {
  const history = useHistory();
  const location = useLocation();

  const handleGoBack = (e) => {
    history.goBack();
  };

  return (
    <div className='TopBar'>
      {location.pathname !== '/' ? (
        <Button variant='dark' onClick={handleGoBack}>
          <FontAwesomeIcon icon={faArrowToLeft} /> Back
        </Button>
      ) : (
        <span></span>
      )}
      <h1>Assigned Picks</h1>
      <Form.Group>
        <InputGroup>
          <Form.Control type='text' placeholder='Search'></Form.Control>
          <InputGroup.Append>
            <Button>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </Form.Group>
    </div>
  );
};

export default TopBar;
