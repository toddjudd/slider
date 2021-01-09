import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import { faBoxCheck } from '@fortawesome/pro-regular-svg-icons';
import { usePickState } from './pick-state';
import { useGetLp } from './useAPI';

const LicensePlateModal = () => {
  const [pick, dispatch] = usePickState();
  const [licensePlates, setLicensePlates] = useState([]);
  const handleSelection = (e, actualSourceLP) => {
    dispatch({
      type: 'FORM_CHANGE',
      change: { actualSourceLP, showLpSearch: false },
    });
  };

  useGetLp(pick.taskId, pick.actualSourceLocation, setLicensePlates);

  return (
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
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {licensePlates.map((lp, i) => {
              return (
                <tr key={i}>
                  <td>{lp.name}</td>
                  <td>{lp.quantity}</td>
                  <td>
                    <Button
                      variant='outline-primary'
                      onClick={(e) => {
                        return handleSelection(e, lp.name);
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

export default LicensePlateModal;
