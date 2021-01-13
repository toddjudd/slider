import { Button, Form } from 'react-bootstrap';
import './login.less';

const Login = (props) => {
  return (
    <div className='Login'>
      <div className='SideBanner'>
        <img src='./xlogo.svg' alt='' className='xLogo' />
      </div>
      <Form>
        <h1>Login</h1>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text'></Form.Control>
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password'></Form.Control>
        </Form.Group>
        <div className='actions'>
          <Button variant='secondary'>Forgot Password</Button>
          <Button>Log in</Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
