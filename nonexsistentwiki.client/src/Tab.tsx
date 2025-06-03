import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';

function BasicExample() {
  return (
    <Nav
      className="header"
      activeKey="/"
      style={{
        marginTop: '20px',
        backgroundColor: '#2d225a',
        padding: '10px 0',
        justifyContent: 'center',
        borderTop: '1px solid #3a2e7c'
      }}
    >
      <Nav.Item style={{ margin: '0 15px' }}>
        <Link to="/" style={{ color: '#b3b8ff', textDecoration: 'none' }}>На главную</Link>
      </Nav.Item>
      <Nav.Item style={{ margin: '0 15px' }}>
        <Link to="/wiki" style={{ color: '#b3b8ff', textDecoration: 'none' }}>Вики</Link>
      </Nav.Item>
      <Nav.Item style={{ margin: '0 15px' }}>
        <Link to="/user/account" style={{ color: '#b3b8ff', textDecoration: 'none' }}>Аккаунт</Link>
      </Nav.Item>
    </Nav>
  );
}

export default BasicExample;
