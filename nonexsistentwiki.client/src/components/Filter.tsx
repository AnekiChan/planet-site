import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap';

interface FilterProps {
  onChange: (type: string) => void;
}

const Filter: React.FC<FilterProps> = ({ onChange }) => {
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');

  useEffect(() => {
    fetch('http://localhost:5185/api/Posts/types')
      .then((res) => res.json())
      .then((data) => setTypes(data))
      .catch((error) => console.error('Error fetching types:', error));
  }, []);

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = event.target.value;
    setSelectedType(selectedType);
    onChange(selectedType);
  };

  return (
    <>
      <div style={{ margin: '20px' }} />
      <Form.Select
        value={selectedType}
        onChange={handleTypeChange}
        style={{
          backgroundColor: '#1a1a2e',
          color: '#b3b8ff',
          border: '1px solid #5a4bd6',
          boxShadow: '0 0 5px #7360f2',
        }}
      >
        <option value="" style={{ backgroundColor: '#1a1a2e', color: '#b3b8ff' }}>
          Все типы
        </option>
        {types.map((type, index) => (
          <option
            key={index}
            value={type}
            style={{ backgroundColor: '#1a1a2e', color: '#b3b8ff' }}
          >
            {type}
          </option>
        ))}
      </Form.Select>
    </>
  );
};

export default Filter;
