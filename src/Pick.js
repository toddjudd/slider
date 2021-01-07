import { useEffect, useReducer, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faHandPointUp,
  faBoxCheck,
} from '@fortawesome/pro-regular-svg-icons';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  Badge,
  OverlayTrigger,
  Popover,
  Modal,
  Table,
} from 'react-bootstrap';
import './pick.less';
//utils.js
const loadPickDetails = () => {
  //use taskid in get request
  return axios.get('http://localhost:7900/picks').catch((err) => {
    console.log(err);
  });
};

//utils.js
const capitalize = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

//material-popover.js
const popright = (props) => (
  <Popover id='popover-basic' placement='right'>
    <Popover.Title as='h3'>{props.title}</Popover.Title>
    <Popover.Content>{props.content}</Popover.Content>
  </Popover>
);

//pick.js
let taskState = null;
const Pick = () => {
  const [formState, setFormState] = useState({
    from: null,
    quantity: null,
    sourceLp: null,
    sourceLpSearch: false,
    sourceLoc: null,
    sourceLocSearch: false,
    submitting: false,
  });

  const [pick, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LOAD_TASK':
          return {
            ...state,
            ...action.task,
            actualQuantity: action.task.expectedQuantity,
            actualSourceLocation: action.task.expectedSourceLocation,
          };
        case 'FORM_CHANGE':
          return { ...state, ...action.change };
        default: {
        }
      }
    },
    taskState || {
      taskId: null,
      materialLookup: null,
      materialDescription: null,
      expectedQuantity: null,
      actualQuantity: null,
      expectedSourceLocation: null,
      actualSourceLocation: null,
      actualSourceLicensePlate: null,
      project: null,
      owner: null,
      waveId: null,
      shippingContainerId: null,
      shipmentId: null,
      orderId: null,
      pickslipId: null,
      created: null,
    }
  );

  useEffect(() => {
    taskState = pick;
  });

  useEffect(() => {
    let current = true;
    loadPickDetails(pick.taskId).then(({ data: task }) => {
      if (current) {
        dispatch({ type: 'LOAD_TASK', task });
      }
    });
    return () => {
      current = false;
    };
  }, [pick.taskId]); //this is a weird depencancy?
  // likely it would be the 'selected task id of some parent?

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const form = e.currentTarget;
    if (!/^\d+$/.test(form['quantity'].value)) {
      setFormState({ ...formState, form: false, quantity: true });
      return;
    }
    setFormState({ ...formState, form: true, submitting: true });
  };

  const handleChange = (e, change) => {
    return dispatch({
      type: 'FORM_CHANGE',
      change: { [change]: e.target.value },
    });
  };

  const handleLocationSelection = (e, actualSourceLocation) => {
    dispatch({
      type: 'FORM_CHANGE',
      change: { actualSourceLocation },
    });
    setFormState({ ...formState, sourceLocSearch: false });
  };

  const handleLPSelection = (e, actualSourceLicensePlate) => {
    dispatch({
      type: 'FORM_CHANGE',
      change: { actualSourceLicensePlate },
    });
    setFormState({ ...formState, sourceLpSearch: false });
    validateLp(actualSourceLicensePlate);
  };

  const validateLp = (lp) => {
    //do something then set formState validation
    return setFormState({ ...formState, sourceLp: /^LP.+/.test(lp) });
  };

  return (
    <div className='Pick'>
      <div className='PickActions'>
        <Button variant='outline-danger'>
          <FontAwesomeIcon icon={faExclamationCircle} /> Reject Task
        </Button>
      </div>
      <div className='Material'>
        <h1 className='material-label'>
          Material:
          <OverlayTrigger
            trigger={['hover', 'focus']}
            overlay={popright({
              title: 'Descrtiption',
              content: pick.materialDescription,
            })}
            placement='right'>
            <Badge
              variant='primary'
              className='material-detail'
              delay={{ show: 250, hide: 300 }}>
              {pick.materialLookup}
            </Badge>
          </OverlayTrigger>
        </h1>
        <h3 className='pick-quantity-label'>
          Quantity:{' '}
          <span className='pick-quantity-detail'>{pick.expectedQuantity}</span>
          <Badge className='pick-unitOfMeasure-detail'>
            {capitalize(pick.uom)}
          </Badge>
        </h3>
      </div>
      <div className='PickForm'>
        <Form
          noValidate
          validated={formState.form}
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
                isInvalid={formState.sourceLoc}
                value={pick.actualSourceLocation}
                onChange={(e) => {
                  handleChange(e, 'actualSourceLocation');
                }}
              />
              <InputGroup.Append>
                <Button
                  variant='primary'
                  onClick={(e) => {
                    return setFormState({
                      ...formState,
                      sourceLocSearch: true,
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
                isInvalid={
                  formState.sourceLp === null ? false : !formState.sourceLp
                }
                isValid={formState.sourceLp}
                value={pick.actualSourceLicensePlate}
                onChange={(e) => {
                  handleChange(e, 'actualSourceLicensePlate');
                  validateLp(e.target.value);
                }}
              />
              <InputGroup.Append>
                <Button
                  variant='primary'
                  onClick={(e) => {
                    return setFormState({ ...formState, sourceLpSearch: true });
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
                isInvalid={formState.quantity}
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
            variant={formState.submitting ? 'secondary' : 'success'}
            disabled={formState.submitting}>
            {formState.submitting ? 'Loading...' : 'Submit'}
          </Button>
        </Form>
      </div>
      <div className='PickDetails'>
        <div className='project'>
          <span className='title'>Project:</span> {pick.project}
        </div>
        <div className='created'>
          <span className='title'>Created:</span> {pick.created}
        </div>
        <div className='waveId'>
          <span className='title'>Wave #:</span> {pick.waveId}
        </div>
        <div className='shipmentId'>
          <span className='title'>Shipment #:</span> {pick.shipmentId}
        </div>
        <div className='horizontal-offset'></div>
        <div className='expectedSourceLocation'>
          <span className='title'>Location:</span> {pick.expectedSourceLocation}
        </div>
        <div className='horizontal-offset'></div>
        <div className='pickslipId'>
          <span className='title'>Pickslip #:</span> {pick.pickslipId}
        </div>
        <div className='orderId'>
          <span className='title'>Order #:</span> {pick.orderId}
        </div>
      </div>
      <Modal
        size='lg'
        show={formState.sourceLocSearch}
        onHide={() => {
          setFormState({ ...formState, sourceLocSearch: false });
        }}
        centered>
        <Modal.Header closeButton>
          <Modal.Title>Search Avaliable Locations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* data needs to be loaded */}
          <Table striped bordered hover size='sm'>
            <thead>
              <tr>
                <th>Location</th>
                <th>Avaliable</th>
                <th>Allocated</th>
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
                <td>AH631303</td>
                <td>106</td>
                <td>106</td>
                <td>
                  <Button
                    variant='outline-primary'
                    onClick={(e) => {
                      return handleLocationSelection(e, 'AH631303');
                    }}>
                    <FontAwesomeIcon icon={faBoxCheck} />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>AB654851</td>
                <td>68</td>
                <td
                  //difference too great? set class to show red
                  style={{ color: 'var(--red)' }}>
                  68
                </td>
                <td>
                  <Button
                    //difference too great? set disabled
                    disabled={true}
                    variant='outline-primary'
                    onClick={(e) => {
                      return handleLocationSelection(e, 'AB654851');
                    }}>
                    <FontAwesomeIcon icon={faBoxCheck} />
                  </Button>
                </td>
              </tr>
              <tr>
                <td>AH848888</td>
                <td>75</td>
                <td>0</td>
                <td>
                  <Button
                    variant='outline-primary'
                    onClick={(e) => {
                      return handleLocationSelection(e, 'AH848888');
                    }}>
                    <FontAwesomeIcon icon={faBoxCheck} />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>

      <Modal
        size='lg'
        show={formState.sourceLpSearch}
        onHide={() => {
          setFormState({ ...formState, sourceLpSearch: false });
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
