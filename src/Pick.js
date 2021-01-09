//package import
// import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/pro-regular-svg-icons';
import { Button, InputGroup, FormControl, Form } from 'react-bootstrap';

import { capitalize, trueIfNull } from './util';
//effects
import { usePickState } from './pick-state';
import { useGetPicks, useValidateLp } from './useAPI';
//components
import LocationModal from './LocationModal';
import PickMaterial from './PickMaterial';
import PickDetails from './PickDetails';
import PickNav from './PickNav';
//css import
import './pick.less';
import LicensePlateModal from './LicensePlateModal';
//pick.js
// let taskState = null;

const masterTaskId = 0;
const Pick = () => {
  const [pick, dispatch] = usePickState();

  // useEffect(() => {
  // taskState = pick;
  // });

  useGetPicks(masterTaskId);

  useValidateLp();

  const handleSubmit = (e) => {
    console.log(e);
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

  // const validateLp = (lp) => {
  //   //do something then set formState validation
  //   return setFormState({ ...formState, sourceLp: /^LP.+/.test(lp) });
  // };

  return (
    <div className='Pick'>
      <Form
        noValidate
        validated={pick.fromIsValid}
        onSubmit={handleSubmit}
        autoComplete='off'>
        <PickNav pick={pick} />
        <PickMaterial pick={pick} />
        <PickDetails pick={pick} />
        <LocationModal />
        <LicensePlateModal />
        <div className='PickForm'>
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
        </div>
      </Form>
    </div>
  );
};

export default Pick;
