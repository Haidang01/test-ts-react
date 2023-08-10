import { ChangeEvent, useState, FormEvent } from 'react';
import { IProduct } from '../interfaces/product';
import { productSchema } from '../validators/product';
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';
type Props = {};

const AddProduct = (props: Props) => {
  const [product, setProduct] = useState<IProduct>({} as IProduct);
  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value.trim() }));
  };
  const notyf = new Notyf();
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = productSchema.validate(product, { abortEarly: false });
    if (error) {
      const errorString = error.details.map((e) => e.message).join('<br/>');
      notyf.error(errorString);
      return;
    }
    fetch('http://localhost:3000/products', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    }).then(() => {
      notyf.success('Thêm thành công ');
      navigate('/admin/products');
    });
  };
  return (
    <div className='container'>
      <h1 className='text-center'>Add product</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label
            htmlFor='name'
            className='form-label'>
            Name
          </label>
          <input
            type='text'
            className='form-control'
            id='name'
            onChange={handleChangeInput}
            name='name'
          />
        </div>
        <div className='mb-3'>
          <label
            htmlFor='price'
            className='form-label'>
            Price
          </label>
          <input
            type='number'
            className='form-control'
            id='price'
            onChange={handleChangeInput}
            name='price'
          />
        </div>
        <div className='mb-3'>
          <label
            htmlFor='img'
            className='form-label'>
            Image
          </label>
          <input
            type='text'
            className='form-control'
            id='img'
            name='img'
            onChange={handleChangeInput}
          />
        </div>
        <button
          type='submit'
          className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
