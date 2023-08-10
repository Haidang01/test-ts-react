import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IProduct } from '../interfaces/product';
type Props = {};

const DetailProduct = (props: Props) => {
  const [product, setProduct] = useState<IProduct>();
  const { id } = useParams();
  useEffect(() => {
    fetch(`http://localhost:3000/products/${id}`)
      .then((data) => data.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <h1>Detail product</h1>
      <h1>{product?.name}</h1>
      <h1>{product?.price}</h1>
      <h1>
        <img
          src={product?.img}
          alt=''
        />
      </h1>
    </div>
  );
};

export default DetailProduct;
