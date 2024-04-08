import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://kryzen-task-builder-backend.vercel.app/user/login', {
        email: email,
        password: password
      });
      const token = res.data.token;
      sessionStorage.setItem('token', token);
      if (token) {
        alert(res.data.msg); 
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        alert(res.data.msg); 
      }
    } catch (error) {
      console.log(error);
      if (error.response) {
        alert('Login Failed: ' + error.response.data.msg); 
      } else {
        alert('Login Failed: Something went wrong. Please try again later.'); 
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl text-center mb-6">Login</h2>
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
      <button onClick={handleLogin} className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
        Login
      </button>
      <div className="text-center mt-2">
        <h5>
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500">
            Signup
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
