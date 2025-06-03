import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useAppSelector } from './redux/Hooks';
import { Link } from 'react-router-dom';

function TextLinkExample() {
  const username = useAppSelector((state) => state.auth.username);
  return (
    <Navbar
      className="header"
      expand="lg"
      style={{
        backgroundColor: '#2d225a',
        borderBottom: '1px solid #3a2e7c',
        padding: '10px 0',
      }}
    >
      <Container>
        <Navbar.Brand style={{ fontSize: '28px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Link to="/" style={{ color: '#b3b8ff', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <svg
              width="32"
              height="32"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ marginRight: '8px' }}
            >
              <circle cx="32" cy="32" r="28" stroke="#b3b8ff" strokeWidth="4" />
              <circle cx="32" cy="32" r="12" fill="#5a4bd6" />
              <path
                d="M5 32c15 0 20 20 54 20"
                stroke="#7360f2"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
            Продажа планет
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {username === 'guest' ? (
              <Link to="/user/signup" style={{ color: '#b3b8ff', textDecoration: 'none' }}>
                Войти
              </Link>
            ) : (
              <Link to="/user/account" style={{ color: '#b3b8ff', textDecoration: 'none' }}>
                Аккаунт: {username}
              </Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TextLinkExample;
