import { useState } from 'react';
import Slider from '../Slider/Slider';
import AllSelector from '../AllSelector/AllSelector';
import AssigneeSelector from '../AssigneeSelector/AssigneeSelector';
import Button from 'react-bootstrap/Button';

import './TaskSelector.less';

const assignees = ['Todd J.', 'Alex J.', 'Keith S.', 'Taylor E.', 'Spencer D.'];

const TaskSelector = (props) => {
  const [value, setValue] = useState(0);
  const [currentAssignee, setCurrentAssignee] = useState(assignees[0]);
  const { maxValue, carrierTitle } = props;
  const minValue = 0;

  const handleSubmit = (e) => {
    console.log({
      ACTION: 'Submit',
      e,
      props,
      value,
      assignee: currentAssignee,
    });
  };
  return (
    <div className='TaskSelector'>
      <span className='carrierTitle'>{carrierTitle}</span>
      <Slider {...{ value, setValue, maxValue, minValue }}></Slider>
      <AllSelector {...{ value, setValue, minValue, maxValue }}></AllSelector>
      <AssigneeSelector
        {...{
          currentAssignee,
          setCurrentAssignee,
          assignees,
        }}></AssigneeSelector>
      <div className='ConfirmAssignee'>
        <Button variant='success' onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default TaskSelector;
