import React, { ChangeEvent, useEffect, useState } from 'react';
import { IRole, IUser } from '../interfaces/product';
import { userSchema } from '../validators/user';
import { Notyf } from 'notyf';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Register = (props: Props) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [roles, setRoles] = useState<IRole[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/roles')
      .then((data) => data.json())
      .then((data) => setRoles(data));
  }, []);

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
    fetch('http://localhost:3000/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then(() => {
      notyf.success('Đăng kí thành công ');
      navigate('/login');
    });
  };
  return (
    <div className='container'>
      <h1 className='text-center'>Update product</h1>
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
        <select
          className='form-select'
          name='role'
          onChange={handleChange}>
          <option>Chọn quyền </option>
          {roles.map((role) => (
            <option
              key={role.id}
              value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <button
          type='submit'
          className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
