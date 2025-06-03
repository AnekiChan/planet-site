import { useEffect, useState } from 'react';

interface Pet {
  id: number;
  name: string;
  age: number;
}

export function useGetData() {
  const [data, setData] = useState<Pet[]>([]);

  useEffect(() => {
    fetch('http://localhost:5185/pet/getall')
      .then((res) => res.json())
      .then((json) => setData(json))
    console.log(data);
  }, []);

  return data;
};