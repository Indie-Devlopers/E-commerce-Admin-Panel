import { useEffect, useState } from 'react';
import axios from 'axios';

const Getdata = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Define the async function to fetch data
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products/get-products');
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        setError('Error fetching data');
        console.error('Error', error)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Data</h1>
      <ul>
        {/* {data.map((item) => (
          <li key={item.id}>{item.productName}</li>
        ))} */}
      </ul>
    </div>
  );
};

export default Getdata;
