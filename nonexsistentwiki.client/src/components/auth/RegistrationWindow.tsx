import React, { useState } from 'react';
import { Alert, Button, FloatingLabel, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../redux/Hooks';
import { addAToken, login, setRole, setUsername } from '../../redux/Auth';

export function RegisterWindow() {
  const [email, setEmailState] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmailState(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Пароли не соответствуют');
      return;
    }

    try {
      const response = await fetch('http://localhost:5185/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register');
      }

      const data = await response.json();
      console.log(data);
      dispatch(addAToken(data.access_token));
      dispatch(login());
      dispatch(setUsername(email));
      dispatch(setRole(data.role));
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Пользователь уже зарегистрирован');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', textAlign: 'left', color: '#b3b8ff', backgroundColor: '#1a1a2e', padding: '20px', borderRadius: '8px' }}>
      {isAuthenticated ? (
        <>
          <Alert variant="success" style={{ marginTop: '10px', backgroundColor: '#3a3f69', borderColor: '#5a4bd6', color: '#b3b8ff' }}>
            Вы зарегистрированы
          </Alert>
          <Link to="/">
            <Button
              className='button'
              variant="primary"
              style={{ backgroundColor: '#5a4bd6', borderColor: '#3b3794', marginTop: '10px' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#7b6ffb')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#5a4bd6')}
            >
              Перейти к вики
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Form.Label className="mb-3 custom-big-label" style={{ color: '#9a91ff' }}>Регистрация</Form.Label>
          {errorMessage && (
            <Alert variant="danger" style={{ backgroundColor: '#693a3a', borderColor: '#d65a5a', color: '#ffd6d6' }}>
              {errorMessage}
            </Alert>
          )}
          <Form>
            <Form.Group controlId="formEmail">
              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" style={{ color: '#b3b8ff' }}>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  style={{ backgroundColor: '#2c2c4c', borderColor: '#5a4bd6', color: '#b3b8ff' }}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="formPassword">
              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3" style={{ color: '#b3b8ff' }}>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePasswordChange}
                  style={{ backgroundColor: '#2c2c4c', borderColor: '#5a4bd6', color: '#b3b8ff' }}
                />
              </FloatingLabel>
            </Form.Group>
            <Form.Group controlId="formConfirmPassword">
              <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-3" style={{ color: '#b3b8ff' }}>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  style={{ backgroundColor: '#2c2c4c', borderColor: '#5a4bd6', color: '#b3b8ff' }}
                />
              </FloatingLabel>
            </Form.Group>
            <Button
              className='button'
              variant="primary"
              onClick={handleRegister}
              style={{ backgroundColor: '#5a4bd6', borderColor: '#3b3794', marginTop: '10px' }}
              onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#7b6ffb')}
              onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#5a4bd6')}
            >
              Зарегистрироваться
            </Button>
          </Form>
        </>
      )}
    </div>
  );
}
