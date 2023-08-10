import React from 'react';
import { useState, useEffect } from 'react';
import { IProduct } from '../interfaces/product';

type Props = {};

const ProductPage = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((data) => data.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div>
      <h1 className='text-center'>List Product</h1>
      <table className='table'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>name</th>
            <th scope='col'>price</th>
            <th scope='col'>image</th>
            <th scope='col'>Handle</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <th scope='row'>{product.id}</th>
              <th scope='row'>{product.name}</th>
              <td>{product.price}</td>
              <td>
                <img
                  src={product.img}
                  alt=''
                />
              </td>
              <td>
                <a
                  className='btn btn-primary'
                  href={`/detail/${product.id}`}>
                  View
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductPage;
