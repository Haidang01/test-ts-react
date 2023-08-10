import React, { ChangeEvent, useEffect, useState } from 'react';
import { IRole, IUser } from '../interfaces/product';
import { userSchema } from '../validators/user';
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Login = (props: Props) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    setUser((prev) => ({ ...prev, [name]: value.trim() }));
  };
  const notyf = new Notyf();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = userSchema.validate(user, { abortEarly: false });
    if (error) {
      const errorString = error.details.map((e) => e.message).join('<br/>');
      notyf.error(errorString);
      return;
    }
    fetch('http://localhost:3000/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then((data) => data.json())
      .then((data) => {
        if (!data.user) {
          notyf.error(data);
          return;
        }
        notyf.success('Đăng nhập thành công ');

        if (+data.user.role === 1) {
          navigate('/admin/products');
        } else if (+data.user.role === 0) {
          navigate('/');
        }
      });
  };
  return (
    <div className='container'>
      <h1 className='text-center'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label
            htmlFor='email'
            className='form-label'>
            email
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            onChange={handleChange}
            name='email'
          />
        </div>
        <div className='mb-3'>
          <label
            htmlFor='password'
            className='form-label'>
            password
          </label>
          <input
            type='password'
            className='form-control'
            id='password'
            onChange={handleChange}
            name='password'
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

export default Login;
