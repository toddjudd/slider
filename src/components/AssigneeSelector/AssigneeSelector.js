import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

const AssigneeSelector = (props) => {
  const { currentAssignee, setCurrentAssignee, assignees } = props;

  return (
    <div className='AssigneeSelector'>
      <Dropdown>
        <Dropdown.Toggle>{currentAssignee}</Dropdown.Toggle>
        <Dropdown.Menu>
          {assignees.map((assignee, i) => (
            <Dropdown.Item
              id={i}
              key={i}
              onClick={() => setCurrentAssignee(assignee)}>
              {assignee}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default AssigneeSelector;
