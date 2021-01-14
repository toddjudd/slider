import { Badge, OverlayTrigger } from 'react-bootstrap';
import MaterialDescription from './MaterialDescription';
import { capitalize } from '../../util';

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
            <MaterialDescription title='Descrtiption' content={pick.materialDescription} />
          }
          placement='right'
        >
          <Badge variant='primary' className='material-detail' delay={{ show: 250, hide: 300 }}>
            {pick.materialLookup}
          </Badge>
        </OverlayTrigger>
      </h1>
      <h3 className='pick-quantity-label'>
        Quantity: <span className='pick-quantity-detail'>{pick.expectedQuantity}</span>
        <Badge className='pick-unitOfMeasure-detail'>{capitalize(pick.uom)}</Badge>
        <span>## of Eaches</span>
      </h3>
    </div>
  );
};

export default PickMaterial;
