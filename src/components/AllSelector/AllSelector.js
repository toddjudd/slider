import { useState } from 'react';
import './AllSelector.less';

const AllSelector = (props) => {
  const { value, setValue, minValue, maxValue } = props;
  const [prevValue, setPrevValue] = useState(0);

  const handleChange = (e) => {
    if (e.target.checked) {
      setValue(maxValue);
      setPrevValue(value);
    } else {
      setValue(prevValue);
      setPrevValue(minValue);
    }
  };
  return (
    <div className='AllSelector'>
      <input
        type='checkbox'
        onChange={handleChange}
        checked={value === maxValue}
      />
      <span>Select All</span>
    </div>
  );
};

export default AllSelector;
