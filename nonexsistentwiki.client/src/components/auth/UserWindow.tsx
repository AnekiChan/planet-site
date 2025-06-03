import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useAppSelector } from '../../redux/Hooks';

function UserPage() {
  const email = useAppSelector((state) => state.auth.username);
  const recentPosts = useAppSelector((state) => state.posts.recentPosts);

  const handleLogout = () => {
    window.location.href = '/';
  };

  return (
    <Container
      className="mt-4"
      style={{
        textAlign: 'left',
        color: '#b3b8ff',
        backgroundColor: '#1a1a2e',
        minHeight: '100vh',
        padding: '20px',
        borderRadius: '8px'
      }}
    >
      <h2 style={{ color: '#9a91ff' }}>Информация о пользователе</h2>
      <p>Почта: {email}</p>
      <Button
        className='button'
        variant="primary"
        onClick={handleLogout}
        style={{ backgroundColor: '#5a4bd6', borderColor: '#3b3794' }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#7b6ffb')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#5a4bd6')}
      >
        Выйти
      </Button>

      <h3 className="mt-4" style={{ color: '#9a91ff' }}>Недавно просмотренные</h3>
      <Row xs={1} md={2} lg={3} className="g-4">
        {recentPosts.map(post => (
          <Col key={post.id}>
            <Card
              style={{
                backgroundColor: '#2c2c4c',
                color: '#b3b8ff',
                borderColor: '#5a4bd6',
                boxShadow: '0 0 10px #5a4bd6'
              }}
            >
              <Card.Img
                variant="top"
                src={`/images/${post.title}.png`}
                style={{ borderBottom: '1px solid #5a4bd6' }}
              />
              <Card.Body>
                <Card.Title style={{ color: '#d3d3ff' }}>{post.title}</Card.Title>
                <Card.Text>Цена: {post.score} ₽/м²</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default UserPage;
