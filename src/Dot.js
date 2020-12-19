import './Dot.less';
import mix from './mix';

const Dot = (props) => {
  let { count, maxCount } = props;
  let countPercent = (count / maxCount) * 100;
  let countDeadly = countPercent > 80 || count >= 100;
  let color = countDeadly ? '#444' : mix('FF333A', '8AC926', countPercent);
  console.log(color);
  return (
    <div className='Dot' {...props}>
      <i
        className={countDeadly ? 'fas fa-skull' : 'fas fa-arrows-h'}
        style={{
          color,
        }}></i>
    </div>
  );
};

export default Dot;
