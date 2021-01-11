import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { faBoxCheck } from '@fortawesome/pro-regular-svg-icons';
import classNames from 'classnames';
import { usePickState } from './pick-state';
import { useGetLocations } from '../../util';

const LocationModal = () => {
  const [pick, dispatch] = usePickState();
  const handleSelection = (e, actualSourceLocation) => {
    dispatch({
      type: 'FORM_CHANGE',
      change: { actualSourceLocation, showLocSearch: false },
    });
  };

  const [locations, setLocations] = useState([]);

  useGetLocations(pick.taskId, setLocations);

  return (
    <Modal
      size='lg'
      show={pick.showLocSearch}
      onHide={() => {
        dispatch({ type: 'HIDE_LOC_MODAL' });
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
              <th>Total</th>
              <th>Allocated</th>
              <th>Avaliable</th>
              <th>
                {/* <Button disabled variant='outline-secondary'>
                Select <FontAwesomeIcon icon={faHandPointUp} />
              </Button> */}
                Select
              </th>
            </tr>
          </thead>
          <tbody>
            {/* isExpectedSource: true, */}
            {locations.map((location, i) => {
              const notSelectable =
                !location.isExpectedSource && location.avaliableQuantity <= 0;
              return (
                <tr
                  key={i}
                  className={classNames({
                    notSelectable,
                  })}>
                  <td>{location.name}</td>
                  <td>{location.quantity}</td>
                  <td>{location.allocatedQuantity}</td>
                  <td>{location.avaliableQuantity}</td>
                  <td>
                    <Button
                      disabled={notSelectable}
                      variant='outline-primary'
                      onClick={(e) => {
                        return handleSelection(e, location.name);
                      }}>
                      <FontAwesomeIcon icon={faBoxCheck} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default LocationModal;
