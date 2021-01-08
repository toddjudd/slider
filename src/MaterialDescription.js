import { Popover } from 'react-bootstrap';

const MaterialDescription = (props) => (
  <Popover id='popover-basic' placement='right' {...props.props}>
    <Popover.Title as='h3'>{props.title}</Popover.Title>
    <Popover.Content>{props.content}</Popover.Content>
  </Popover>
);

export default MaterialDescription;
