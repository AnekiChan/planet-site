import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PostCard from './PostCard';
import { useGetData } from './useGetData';
import Filter from './Filter';

const PostsList: React.FC = () => {
  const { data, loading, error } = useGetData();
  const [filterType, setFilterType] = useState<string>('');

  const handleFilterChange = (type: string) => {
    setFilterType(type);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Применяем фильтр к данным
  const filteredData = filterType ? data.filter(post => post.type === filterType) : data;

  return (
    <Container className='background2'>
      <Row>
        <Col>
          {/* Передаем обработчик событий для изменения фильтра в компонент Filter */}
          <Filter onChange={handleFilterChange} />
        </Col>
      </Row>
      <Row>
        {/* Отображаем только отфильтрованные данные */}
        {filteredData.map((post) => (
          <Col key={post.id} md={4}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PostsList;
