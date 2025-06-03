import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Row, Col, Form, FormControl } from 'react-bootstrap';
import { ObjectModel, addRecentPost } from '../redux/postsSlice';
import '../App.css';
import { useAppDispatch, useAppSelector } from '../redux/Hooks';

interface PostCardProps {
  post: ObjectModel;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const [editedPost, setEditedPost] = useState(post);
  const [types, setTypes] = useState<string[]>([]);
  const userRole = useAppSelector((state) => state.auth.role);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(addRecentPost(post));
    setShowModal(true);
  };

  useEffect(() => {
    fetch('http://localhost:5185/api/Posts/types')
      .then((res) => res.json())
      .then((data) => setTypes(data))
      .catch((error) => console.error('Error fetching types:', error));
  }, []);

  const handleUpdate = (updatedPost: any) => {
    fetch('http://localhost:5185/api/posts', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPost),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to update post');
        }
      })
      .catch(error => {
        console.error('Error updating post:', error);
      });
  };

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setEditedPost({ ...editedPost, [name]: value });
  };
  const handleSave = () => {
    handleUpdate(editedPost);
    handleCloseModal();
  };

  return (
    <>
      <div style={{ margin: '20px' }} />
      <Row xs={1} md={1} className="g-4">
        {Array.from({ length: 1 }).map((_, idx) => (
          <Col key={idx}>
            <Card style={{
              backgroundColor: '#1a1a2e',
              color: '#b3b8ff',
              border: '1px solid #5a4bd6'
            }}>
              <Card.Img
                variant="top"
                src={`/images/${post.title}.png`}
                style={{ borderBottom: '1px solid #5a4bd6' }}
              />
              <Card.Body>
                <Card.Title>{editedPost.title}</Card.Title>
                <Card.Text>Цена: {post.score} ₽/м²</Card.Text>
                <Button
                  className="button"
                  onClick={handleOpenModal}
                  style={{
                    backgroundColor: '#5a4bd6',
                    borderColor: '#3d39a3',
                    color: '#e0e6ff'
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7360f2';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#5a4bd6';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#5a4bd6';
                    (e.currentTarget as HTMLButtonElement).style.borderColor = '#3d39a3';
                  }}
                >
                  Подробнее
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {userRole === 'admin' ? (
        <>
          <Modal
            className="my-modal"
            show={showModal}
            onHide={handleCloseModal}
            dialogClassName="modal-dark"
            contentClassName="modal-content-dark"
          >
            <Modal.Header closeButton style={{ backgroundColor: '#1a1a2e', color: '#b3b8ff' }}>
              <Modal.Title>Изменить</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#1a1a2e', color: '#b3b8ff' }}>
              <Form>
                <Form.Group controlId="title" className="mb-3">
                  <Card.Title>{post.title}</Card.Title>
                </Form.Group>
                <Form.Group controlId="description" className="mb-3">
                  <Form.Label>Описание</Form.Label>
                  <FormControl
                    as="textarea"
                    rows={3}
                    name="description"
                    value={editedPost.description}
                    onChange={handleChange}
                    style={{
                      backgroundColor: '#2c2c4c',
                      color: '#b3b8ff',
                      border: '1px solid #5a4bd6'
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="type" className="mb-3">
                  <Form.Label>Тип</Form.Label>
                  <Form.Control
                    as="select"
                    name="type"
                    value={editedPost.type}
                    onChange={handleChange}
                    style={{
                      backgroundColor: '#2c2c4c',
                      color: '#b3b8ff',
                      border: '1px solid #5a4bd6'
                    }}
                  >
                    {types.map((type, index) => (
                      <option
                        key={index}
                        value={type}
                        style={{ backgroundColor: '#1a1a2e', color: '#b3b8ff' }}
                      >
                        {type}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="score" className="mb-3">
                  <Form.Label>Цена</Form.Label>
                  <FormControl
                    type="number"
                    name="score"
                    value={editedPost.score}
                    onChange={handleChange}
                    style={{
                      backgroundColor: '#2c2c4c',
                      color: '#b3b8ff',
                      border: '1px solid #5a4bd6'
                    }}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#1a1a2e' }}>
              <Button
                className='button'
                variant="secondary"
                onClick={handleCloseModal}
                style={{
                  backgroundColor: '#4c4c7a',
                  borderColor: '#36365a',
                  color: '#b3b8ff'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#636399';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#4c4c7a';
                }}
              >
                Закрыть
              </Button>
              <Button
                className='button'
                variant="primary"
                onClick={handleSave}
                style={{
                  backgroundColor: '#5a4bd6',
                  borderColor: '#3d39a3',
                  color: '#e0e6ff'
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#7360f2';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#5a4bd6';
                }}
              >
                Сохранить
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <Modal
            className="my-modal"
            show={showModal}
            onHide={handleCloseModal}
            dialogClassName="modal-dark"
            contentClassName="modal-content-dark"
          >
            <Modal.Header closeButton style={{ backgroundColor: '#1a1a2e', color: '#b3b8ff' }}>
              <Modal.Title>Информация</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#1a1a2e', color: '#b3b8ff' }}>
              <Form>
                <Form.Group controlId="title" className="mb-3">
                  <Card.Title>{post.title}</Card.Title>
                </Form.Group>
                <Form.Group controlId="description" className="mb-3">
                  <Card.Text>{post.description}</Card.Text>
                </Form.Group>
                <Form.Group controlId="type" className="mb-3">
                  <Card.Text><strong>Тип:</strong> {post.type}</Card.Text>
                </Form.Group>
                <Form.Group controlId="score" className="mb-3">
                  <Card.Text><strong>Цена:</strong> {post.score} ₽/м²</Card.Text>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default PostCard;
