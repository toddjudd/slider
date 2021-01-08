import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBoxCheck } from '@fortawesome/pro-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  Modal,
  Table,
} from 'react-bootstrap';

import './pick.less';
import { usePickState } from './pick-state';
import useGetPicks from './useGetPicks';
import LocationModal from './LocationModal';
import { capitalize, trueIfNull } from './util';
import PickMaterial from './PickMaterial';
import PickDetails from './PickDetails';

//License Plate Selector.js

//pick.js
let taskState = null;
const Pick = () => {
  const [pick, dispatch] = usePickState();

  useEffect(() => {
    taskState = pick;
  });

  useGetPicks(); //this is a weird depencancy?
  // likely it would be the 'selected task id of some parent?

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({ type: 'FORM_SUBMIT', form: e.currentTarget });
  };

  const handleChange = (e, change) => {
    return dispatch({
      type: 'FORM_CHANGE',
      change: { [change]: e.target.value },
    });
  }; //this might be able to be used for the handle location selection?

  const handleLPSelection = (e, actualSourceLP) => {
    // validateLp(actualSourceLP);
    // need to make sure validation of the lp takes place on form change
    //should validation happen only once??
    dispatch({
      type: 'FORM_CHANGE',
      change: { actualSourceLP, showLpSearch: false },
    });
  };

  // const validateLp = (lp) => {
  //   //do something then set formState validation
  //   return setFormState({ ...formState, sourceLp: /^LP.+/.test(lp) });
  // };

  return (
    <div className='Pick'>
      <div className='PickActions'>
        <Button variant='outline-danger'>
          <FontAwesomeIcon icon={faExclamationCircle} /> Reject Task
        </Button>
      </div>
      <PickMaterial pick={pick} />
      <div className='PickForm'>
        <Form
          noValidate
          validated={pick.fromIsValid}
          onSubmit={handleSubmit}
          autoComplete='off'>
          <Form.Group>
            <Form.Label>Source Loc</Form.Label>
            <InputGroup>
              <FormControl
                type='text'
                name='sourceLoc'
                id='sourceLoc'
                placeholder='Source Loc'
                aria-label='Source Location'
                isInvalid={trueIfNull(pick.actualSourceLocationisValid)}
                value={pick.actualSourceLocation}
                onChange={(e) => {
                  handleChange(e, 'actualSourceLocation');
                }}
              />
              <InputGroup.Append>
                <Button
                  variant='primary'
                  onClick={(e) => {
                    return dispatch({
                      type: 'SHOW_LOC_MODAL',
                    });
                  }}>
                  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </Button>
              </InputGroup.Append>
              {/* <InputGroup.Append>
                <Button variant='success'>Confirm</Button>
              </InputGroup.Append> */}
            </InputGroup>
          </Form.Group>{' '}
          <Form.Group>
            <Form.Label>Source LP</Form.Label>
            <InputGroup>
              <FormControl
                type='text'
                name='sourceLP'
                id='sourceLP'
                placeholder='Source LP'
                aria-label='Source License Plate'
                isInvalid={trueIfNull(pick.actualSourceLPIsValid)}
                isValid={pick.actualSourceLPIsValid}
                value={pick.actualSourceLP}
                onChange={(e) => {
                  handleChange(e, 'actualSourceLP');
                }}
              />
              <InputGroup.Append>
                <Button
                  variant='primary'
                  onClick={(e) => {
                    return dispatch({
                      type: 'SHOW_LP_MODAL',
                    });
                  }}>
                  <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
                </Button>
              </InputGroup.Append>
              {/* <InputGroup.Append>
                <Button variant='success'>Confirm</Button>
              </InputGroup.Append> */}
            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor='quantity'>Quantity</Form.Label>
            <InputGroup>
              <FormControl
                type='number'
                name='quantity'
                placeholder='quantity'
                isInvalid={trueIfNull(pick.actualQuantityIsValid)}
                value={pick.actualQuantity}
                onChange={(e) => {
                  handleChange(e, 'actualQuantity');
                }}
              />
              <InputGroup.Append>
                <InputGroup.Text>{capitalize(pick.uom)}</InputGroup.Text>
              </InputGroup.Append>
            </InputGroup>
          </Form.Group>
          <Button
            type='submit'
            variant={pick.submitting ? 'secondary' : 'success'}
            disabled={pick.submitting}>
            {pick.submitting ? 'Loading...' : 'Submit'}
          </Button>
        </Form>
      </div>
      <PickDetails pick={pick} />
      <LocationModal />
      <Modal
        size='lg'
        show={pick.showLpSearch}
        onHide={() => {
          dispatch({ type: 'HIDE_LP_MODAL' });
        }}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Search Avaliable License Plates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* data needs to be loaded */}
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th>License Plate</th>
                <th>Quantity</th>
                <th>
                  {/* <Button disabled variant='outline-secondary'>
                    Select <FontAwesomeIcon icon={faHandPointUp} />
                  </Button> */}
                  Select
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>LP#12345</td>
                <td>106</td>
                <td>
                  <Button
                    variant='outline-primary'
                    onClick={(e) => {
                      return handleLPSelection(e, 'LP#12345');
                    }}>
                    <FontAwesomeIcon icon={faBoxCheck} />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>LP#1345899</td>
                <td>68</td>
                <td>
                  <Button
                    variant='outline-primary'
                    onClick={(e) => {
                      return handleLPSelection(e, 'LP#1345899');
                    }}>
                    <FontAwesomeIcon icon={faBoxCheck} />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>LP#987654</td>
                <td>75</td>
                <td>
                  <Button
                    variant='outline-primary'
                    onClick={(e) => {
                      return handleLPSelection(e, 'LP#987654');
                    }}>
                    <FontAwesomeIcon icon={faBoxCheck} />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Pick;
