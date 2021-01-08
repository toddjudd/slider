import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxCheck } from '@fortawesome/pro-regular-svg-icons';
import { Button, Modal, Table } from 'react-bootstrap';
import { usePickState } from './pick-state';

const LocationModal = () => {
  const [pick, dispatch] = usePickState();
  const handleSelection = (e, actualSourceLocation) => {
    dispatch({
      type: 'FORM_CHANGE',
      change: { actualSourceLocation, showLocSearch: false },
    });
  };

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
                    return handleSelection(e, 'AH631303');
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
                    return handleSelection(e, 'AB654851');
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
                    return handleSelection(e, 'AH848888');
                  }}>
                  <FontAwesomeIcon icon={faBoxCheck} />
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>
    </Modal>
  );
};

export default LocationModal;
