import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";
import { useAppDispatch } from "../../redux/Hooks";
import { addAToken, login, setUsername, setRole } from "../../redux/Auth";
import { useState } from "react";
import { Link } from "react-router-dom";

export function AuthWindow() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useAppDispatch();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => { setEmail(e.target.value) };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { setPassword(e.target.value) };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5185/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to login');
      }

      const data = await response.json();
      console.log(data);
      dispatch(addAToken(data.access_token))
      dispatch(setUsername(email))
      dispatch(setRole(data.role));
      setIsAuthenticated(true);
      dispatch(login());
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Неверный логин или пароль");
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: 'auto',
      textAlign: 'left',
      backgroundColor: '#1a1a2e',
      padding: '20px',
      borderRadius: '8px',
      color: '#b3b8ff',
      boxShadow: '0 0 10px #5a4bd6'
    }}>
      {isAuthenticated ? (
        <>
          <Alert variant="success" style={{
            marginTop: '10px',
            backgroundColor: '#2c2c4c',
            color: '#b3b8ff',
            borderColor: '#5a4bd6'
          }}>
            Вы вошли в систему
          </Alert>
          <Link to="/">
            <Button className="button" variant="primary" style={{
              backgroundColor: '#5a4bd6',
              borderColor: '#3d39a3',
              color: '#e0e6ff',
              marginTop: '10px'
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7360f2';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#5a4bd6';
              }}
            >
              Перейти к вики
            </Button>
          </Link>
        </>
      ) : (
        <>
          <Form.Label className="mb-3 custom-big-label" style={{ fontSize: '1.8rem' }}>
            Войти
          </Form.Label>
          {errorMessage && (
            <Alert variant="danger" style={{
              marginTop: '10px',
              backgroundColor: '#5a2a2a',
              color: '#ffb3b3',
              borderColor: '#d14b4b'
            }}>
              {errorMessage}
            </Alert>
          )}
          <Form.Group>
            <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3" style={{ color: '#b3b8ff' }}>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={handleEmailChange}
                style={{
                  backgroundColor: '#2c2c4c',
                  borderColor: '#5a4bd6',
                  color: '#b3b8ff'
                }}
              />
            </FloatingLabel>
          </Form.Group>

          <Form.Group>
            <FloatingLabel controlId="floatingPassword" label="Password" style={{ color: '#b3b8ff' }}>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                style={{
                  backgroundColor: '#2c2c4c',
                  borderColor: '#5a4bd6',
                  color: '#b3b8ff'
                }}
              />
            </FloatingLabel>
          </Form.Group>

          <div className="mt-2 text-left">
            <Link to="/user/register" style={{ color: '#b3b8ff' }}>
              Регистрация
            </Link>
          </div>

          <Button
            variant="primary"
            onClick={handleLogin}
            style={{
              marginTop: '10px',
              backgroundColor: '#5a4bd6',
              borderColor: '#3d39a3',
              color: '#e0e6ff',
              width: '100%'
            }}
            className="button"
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7360f2';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#5a4bd6';
            }}
          >
            Войти
          </Button>
        </>
      )}
    </div>
  )
}
