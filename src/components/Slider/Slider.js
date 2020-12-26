import { forwardRef, useEffect, useRef, useState } from 'react';
import './Slider.less';
import mix from '../../lib/mix';

const Dot = forwardRef((props, ref) => {
  return (
    <div className='Dot' ref={ref} {...{ style: props.style }}>
      <i className={props.deadly ? 'fas fa-skull' : 'fas fa-arrows-h'}></i>
    </div>
  );
});

const Value = (props) => {
  const { width, value, maxValue } = props;
  return (
    <div className='Value'>
      <div
        className='value-box'
        style={{ left: `${(value / maxValue) * width}px` }}>
        <span>{props.value}</span>
      </div>
    </div>
  );
};

const Track = (props) => {
  const { width, setWidth, value, setValue, maxValue } = props;
  const trackRef = useRef();
  const dotRef = useRef();

  //is this needed?
  useEffect(() => {
    const handleResize = () => {
      setWidth(trackRef.current.offsetWidth - dotRef.current.offsetWidth);
    };
    setWidth(trackRef.current.offsetWidth - dotRef.current.offsetWidth);
    window.addEventListener('resize', handleResize);
  }, [trackRef, dotRef, setWidth]);

  const handleMouseDown = (e) => {
    //ignore right click
    if (e.which === 3 || e.button === 2) return;
    //remove text selection
    e.preventDefault();

    console.log('Clicking Track');
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    handleMouseMove(e);
  };

  const handleMouseMove = (e) => {
    //compare to track
    //track offset = distance from left edge
    const trackOffest = trackRef.current.getBoundingClientRect().left;
    //track width = track width
    const trackWidth = trackRef.current.offsetWidth;
    //clientx - track offest = pixles between mouse and left edge
    let mouseTrackDif = e.clientX - trackOffest;
    //limit mouse track dif to left/right edge of track
    if (mouseTrackDif < 0) {
      mouseTrackDif = 0;
    } else if (mouseTrackDif > trackWidth) {
      mouseTrackDif = trackWidth;
    }
    //(clientx - track offest)/track width = percent of track used
    const percentTrackUsed = mouseTrackDif / trackWidth;
    //percent of trac used * maxValue = value
    setValue(Math.floor(percentTrackUsed * maxValue));
  };

  const handleMouseUp = (e) => {
    console.log('Releasing Track');
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  let deadly = (value / maxValue) * 100 > 80;
  return (
    <div className='Track' ref={trackRef} onMouseDown={handleMouseDown}>
      <div className='min endcap'>
        <span>0</span>
      </div>
      <Dot
        ref={dotRef}
        style={{
          left: `${(value / maxValue) * width}px`,
          color: `${
            deadly ? '#444' : mix('FF333A', '8AC926', (value / maxValue) * 100)
          }`,
        }}
        deadly={deadly}></Dot>
      <div className='max endcap'>
        <span>{maxValue}</span>
      </div>
    </div>
  );
};

const Ledgend = (props) => {
  const { width, maxValue } = props;
  let ticks = [];
  for (let i = 0; i < 4; i++) {
    let fifth = Math.floor((i + 1) * 0.2 * maxValue);
    //this next bit is bad..
    if (fifth > 0) {
      ticks.push(
        <div
          key={i}
          className='tick-box'
          style={{
            left: `${(fifth / maxValue) * width}px`,
          }}>
          <span key={i}>{fifth}</span>
        </div>
      );
    }
  }
  return (
    <div className='Ledgend'>
      {ticks.map((tick) => {
        return tick;
      })}
    </div>
  );
};

const Slider = (props) => {
  const { value, setValue, maxValue } = props;
  const [width, setWidth] = useState(0);

  return (
    <div className='Slider'>
      <Value {...{ width, setWidth, value, setValue, maxValue }}></Value>
      <Track {...{ width, setWidth, value, setValue, maxValue }}></Track>
      <Ledgend {...{ width, maxValue }}></Ledgend>
    </div>
  );
};

export default Slider;
