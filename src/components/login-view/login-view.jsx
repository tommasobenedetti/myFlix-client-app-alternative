import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Col, Container, Form, Row } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username required');
      isReq = false;
    } else if (username.length < 8) {
      setUsernameErr('Username must be at least 8 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password required');
      isReq = false;
    } else if (password.length < 8) {
      setPasswordErr('Password must be at least 8 characters long');
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      try {
        // Send a request to the server for authentication
        let { data } = await axios.post('https://quiet-savannah-08380.herokuapp.com/login',
          {
            Username: username,
            Password: password,
          }
        );
        props.onLoggedIn(data);
      } catch (e) {
        console.log('No such user');
      }
    }
  };

  return (
    <Container id="login-form">
      <Row className="justify-content-center">
        <h2>Log in to myFlix</h2>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col sm="10" md="8" lg="6">
          <Form>
            <Form.Group controlId="formUsername">
              <Form.Label>Username:</Form.Label>
              <Form.Control type="text" onChange={e => setUsername(e.target.value)} placeholder="Username" />
              {/* display validation error */}
              {usernameErr && <p>{usernameErr}</p>}
            </Form.Group>
            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control type="password" onChange={e => setPassword(e.target.value)} placeholder="Password" />
              {/* display validation error */}
              {passwordErr && <p>{passwordErr}</p>}
            </Form.Group>
            <Row className="mt-4 justify-content-start">
              <Col sm="10" md="8" lg="6">
                <Button variant="warning" type="submit" onClick={handleSubmit}>Login</Button>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};