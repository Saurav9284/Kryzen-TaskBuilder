import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const res = await axios.post('https://kryzen-task-builder-backend.vercel.app/user/register', {
        name: name,
        email: email,
        password: password
      });
      if (res.data.msg === 'Signup successfull') {
        alert(res.data.msg); 
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else if (res.data.msg === 'User already exist, Please login') {
        alert(res.data.msg); 
      } else if (res.data.msg === 'All fields required!') {
        alert(res.data.msg); 
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert('Signup Failed: ' + error.response.data.msg); 
      } else {
        alert('Signup Failed: Something went wrong. Please try again later.'); 
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-50px p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl text-center mb-6">Signup</h2>
      <div className="mb-4">
        <label htmlFor="name" className="block">Name</label>
        <input
          id="name"
          type="text"
          placeholder="Enter your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <button onClick={handleSignup} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Register
      </button>
      <div className="text-center mt-2">
        <h5>
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Signup;
