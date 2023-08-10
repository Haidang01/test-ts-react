import React from 'react';
import { useState, useEffect } from 'react';
import { IProduct } from '../interfaces/product';
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';
type Props = {};

const ListProduct = (props: Props) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  useEffect(() => {
    fetch('http://localhost:3000/products')
      .then((data) => data.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);
  const navigate = useNavigate();
  const notyf = new Notyf();
  const handleDelete = (id: number) => {
    const comfirm = window.confirm('Bạn muốn xóa ?');
    if (!comfirm) return;
    fetch(`http://localhost:3000/products/${id}`, {
      method: 'DELETE',
    }).then(() => {
      notyf.success('Đã xóa thành công.');
      setProducts(products.filter((p) => p.id != id));
      navigate('/admin/products');
    });
  };
  return (
    <div>
      <h1 className='text-center'>List Product</h1>
      <a
        href='/admin/add-product'
        className='btn btn-primary'>
        Add product
      </a>
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
                  href={`/admin/update-product/${product.id}`}>
                  edit
                </a>
                <button
                  onClick={() => handleDelete(product.id!)}
                  className='btn btn-danger'>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListProduct;
