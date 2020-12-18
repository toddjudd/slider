function Bar(props) {
  let { startAisle, endAisle, pickCount } = props.bar;
  return (
    <div className='Segment'>
      <div className='aisle-wrapper'>
        <div className='aisle start-aisle'>{startAisle}</div>
        <span></span>
        <div className='aisle end-aisle'>{endAisle}</div>
      </div>
      <div className='bar-wrapper'>
        <div className='circle'></div>
        <div className='bar'></div>
        <span className='pick-count'>{pickCount}</span>
        <div className='bar'></div>
        <div className='circle'></div>
      </div>
    </div>
  );
}

export default Bar;
