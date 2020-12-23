import { atom, useAtom } from 'jotai';
import mix from './mix';
import './Slider.less';
import './Dot.less';
import { forwardRef, useEffect, useRef } from 'react';

const getCount = (percentage, max) => (max / 100) * percentage;

const diffAtom = atom(0);
const widthAtom = atom(0);

const Dot = forwardRef((props, ref) => {
  let { count, percentage } = props;
  let countDeadly = percentage > 80;
  let color = countDeadly ? '#444' : mix('FF333A', '8AC926', percentage);
  return (
    <>
      <div className='Dot' {...props} ref={ref}>
        <span>{count}</span>
        <i
          className={countDeadly ? 'fas fa-skull' : 'fas fa-arrows-h'}
          style={{
            color,
          }}></i>
      </div>
    </>
  );
});

const Slider = (props) => {
  const dotRef = useRef();
  const sliderRef = useRef();

  const { countAtom, maxCountAtom } = props.atoms;
  const [count, setCount] = useAtom(countAtom);
  const [maxCount] = useAtom(maxCountAtom);
  const [width, setWidth] = useAtom(widthAtom);

  // const [position, setPosition] = useAtom(positionAtom);
  // const [percentage, setPercentage] = useAtom(percentageAtom);
  const [diff, setDiff] = useAtom(diffAtom);

  const handleMouseDown = (e) => {
    //diff between mouse click and dot left edge. Where did you click on the box?
    e.preventDefault();
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
    console.log(sliderRef.current.offsetWidth);
    console.log(dotRef.current.offsetWidth);

    const start = 0;

    if (newX < start) {
      newX = 0;
    }

    if (newX > end) {
      newX = end;
    }

    console.log(`newX ${newX}`);
    console.log(`end ${end}`);
    // setPercentage((newX / end) * 100);
    setCount(Math.floor(getCount((newX / end) * 100, maxCount)));
    // setPosition(newX);
  };

  useEffect(() => {
    setWidth(sliderRef.current.offsetWidth - dotRef.current.offsetWidth);
  }, [sliderRef, dotRef, setWidth]);

  let ticks = [];
  for (let i = 0; i < 4; i++) {
    let fifth = Math.floor((i + 1) * 0.2 * maxCount);
    ticks.push(
      <div
        key={i}
        style={{
          left: `${(fifth / maxCount) * width + 13}px`,
          position: 'absolute',
          display: 'inline',
        }}>
        {fifth}
      </div>
    );
  }

  return (
    <div className='wrapper '>
      <div className='endCap first'></div>
      <div className='Slider' ref={sliderRef}>
        <Dot
          count={count}
          ref={dotRef}
          percentage={(count / maxCount) * 100}
          onMouseDown={handleMouseDown}
          style={{ left: `${(count / maxCount) * width}px` }}></Dot>
      </div>
      <div className='endCap last'></div>
      {/* {ticks.map((tick) => tick)} */}
    </div>
  );
};

export default Slider;
