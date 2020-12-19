import { atom, useAtom } from 'jotai';
import mix from './mix';
import './Slider.less';
import './Dot.less';
import { forwardRef, useRef } from 'react';

const getPercentage = (current, max) => (100 * current) / max;
const getCount = (percentage, max) => (max / 100) * percentage;
const getLeft = (percentage) => `calc(${percentage}% - 5px)`;

const maxCountAtom = atom(500);
const positionAtom = atom(0);
const percentageAtom = atom(0);
const diffAtom = atom(0);

const Dot = forwardRef((props, ref) => {
  let { count, percentage } = props;
  let countDeadly = percentage > 80;
  let color = countDeadly ? '#444' : mix('FF333A', '8AC926', percentage);
  return (
    <div className='Dot' {...props} ref={ref}>
      <i
        className={countDeadly ? 'fas fa-skull' : 'fas fa-arrows-h'}
        style={{
          color,
        }}></i>
    </div>
  );
});

const Slider = (props) => {
  const dotRef = useRef();
  const sliderRef = useRef();

  const [count, setCount] = useAtom(props.countAtom);
  const [maxCount, setMaxCount] = useAtom(maxCountAtom);
  const [position, setPosition] = useAtom(positionAtom);
  const [percentage, setPercentage] = useAtom(percentageAtom);
  const [diff, setDiff] = useAtom(diffAtom);

  const handleMouseDown = (e) => {
    //diff between mouse click and dot left edge. Where did you click on the box?
    setDiff(e.clientX - dotRef.current.getBoundingClientRect().left);
    console.log(diff);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseUp = (e) => {
    document.removeEventListener('mouseup', handleMouseUp);
    document.removeEventListener('mousemove', handleMouseMove);
  };

  const handleMouseMove = (e) => {
    let newX =
      e.clientX - diff - sliderRef.current.getBoundingClientRect().left;

    const end = sliderRef.current.offsetWidth - dotRef.current.offsetWidth;

    const start = 0;

    if (newX < start) {
      newX = 0;
    }

    if (newX > end) {
      newX = end;
    }

    console.log(`newX ${newX}`);
    console.log(`end ${end}`);
    console.log(`position ${position}`);
    console.log(`percentage ${percentage}`);
    setPercentage((newX / end) * 100);
    setPosition(getCount((newX / end) * 100, maxCount));
    setCount(getCount((newX / end) * 100, maxCount));
  };

  return (
    <div className='Slider' ref={sliderRef}>
      <Dot
        count={count}
        ref={dotRef}
        percentage={percentage}
        onMouseDown={handleMouseDown}
        style={{ left: position }}></Dot>
    </div>
  );
};

export default Slider;
