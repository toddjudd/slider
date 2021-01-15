import { Badge, OverlayTrigger } from 'react-bootstrap';
import TitledPopup from './TitledPopup';
import { capitalize } from '../../util';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/pro-regular-svg-icons';

const PickMaterial = (props) => {
  const { pick } = props;
  return (
    <div className='PickMaterial'>
      <h1 className='material-label'>
        Material:
        <OverlayTrigger
          overlay={
            // (x) => {
            //   console.log(x);
            // }
            <TitledPopup
              title='Descrtiption'
              content={pick.materialDescription}
            />
          }
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
        <OverlayTrigger
          overlay={
            // (x) => {
            //   console.log(x);
            // }
            <TitledPopup
              title='Base Packaging'
              content={`${pick.expectedBasePackagedQuantity} ${capitalize(
                pick.expectedBasePackagedUOM
              )}`}
            />
          }
          placement='right'>
          <Badge
            variant='warning'
            className='material-detail'
            delay={{ show: 250, hide: 300 }}>
            <FontAwesomeIcon icon={faInfoCircle} />
          </Badge>
        </OverlayTrigger>
      </h3>
    </div>
  );
};

export default PickMaterial;
