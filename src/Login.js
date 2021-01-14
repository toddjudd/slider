import { useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/pro-regular-svg-icons';
import axios from 'axios';
import './Login.less';
import { useAuthState } from './auth-state';

const Login = (props) => {
  const [, dispatch] = useAuthState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async (pin) => {
    await axios
      .post('http://localhost:7900/login', {
        pin,
      })
      .then(({ data: auth }) => {
        dispatch({ type: 'AUTH_CHANGE', auth });
      })
      .catch((err) => {
        setLoading(false);
        setError({ ...err, pin: "Oops.. That Pin didn't seam to work." });
      });
  };

  const handleChange = (e) => {
    if (error) return setError(null);
  };

  const handleShowPassword = (e) => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    let pin = e.target.pin.value;

    if (!pin.match(/^\d{4}$/i)) {
      setError({ pin: 'Your pin must be exactly 4 digits [0-9]' });
      setLoading(false);
      return;
    }
    try {
      return login(pin);
    } catch (err) {
      setLoading(false);
      setError({ ...err, pin: "Oops.. That Pin didn't seam to work." });
    }
  };

  return (
    <div className='Login'>
      <div className='SideBanner'>
        <img src='./xlogo.svg' alt='' className='xLogo' />
      </div>
      <Form onSubmit={handleSubmit} action='/'>
        <h1>Login</h1>
        {/* <Form.Group controlId='formUsername'>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text'></Form.Control>
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password'></Form.Control>
        </Form.Group> */}
        <Form.Group controlId='pin'>
          <Form.Label>User Pin</Form.Label>
          <InputGroup>
            <Form.Control
              isInvalid={error}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}></Form.Control>
            <Form.Control.Feedback tooltip type='invalid'>
              {error ? error.pin : null}
            </Form.Control.Feedback>
            <InputGroup.Append>
              <Button variant='secondary' onClick={handleShowPassword}>
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} />
                ) : (
                  <FontAwesomeIcon icon={faEye} />
                )}
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
        <div className='actions'>
          {/* <Button variant='secondary'>Forgot Password</Button> */}
          <span></span>
          <Button disabled={loading} type='submit'>
            {loading ? 'Loading' : 'Log in'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
