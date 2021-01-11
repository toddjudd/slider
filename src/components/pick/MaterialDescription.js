import { forwardRef } from 'react';
import { Popover } from 'react-bootstrap';

const MaterialDescription = forwardRef((props, ref) => {
  return (
    <Popover id='popover-basic' placement='right' {...props} ref={ref}>
      <Popover.Title as='h3'>{props.title}</Popover.Title>
      <Popover.Content>{props.content}</Popover.Content>
    </Popover>
  );
});

export default MaterialDescription;
