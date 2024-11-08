import './App.css';
import React, { useRef, useState } from 'react';
import axios from 'axios';

function App() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const inputRef = useRef();

  const fetchProducts = (n) => {
    axios.get('https://fakestoreapi.com/products/category/electronics')
      .then((response) => {
        const electronics = response.data.slice(0, n);
        setProducts(electronics);
        saveProducts(electronics);
      })
      .catch((err) => {
        setError('Error to get this product: ' + err.message);
      });
  };

  const saveProducts = (products) => {
    products.forEach((product) => {
      axios.post('http://localhost:3001/products', product)
        .then(() => {
          setError('');
        })
        .catch((err) => {
          setError((prevError) => prevError + 'Error to save this product ' + product.title + ': ' + err.message);
        });
    });
  };

  const handleFetchProducts = () => {
    const n = parseInt(inputRef.current.value);
    if (isNaN(n) || n <= 0) {
      setError('Enter a valid number');

      return;
    }
    fetchProducts(n);
  };

  return (

    <>
      <h1>Electronics</h1>
      <input type="number" ref={inputRef} placeholder="Products" />
      <button onClick={handleFetchProducts}>Get Products</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Stored Products:</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <img src={product.image} alt={product.title} style={{ width: '150px' }} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
