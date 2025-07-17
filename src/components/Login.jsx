import React, { useState, useContext } from 'react';
import { AuthContext } from '../config/AuthContext.jsx';



function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    console.log(result, 'result from login');
    if (!result) {
      setError('Invalid email or password');
    } else {
      setError('');
      // Optionally redirect or show success
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="shadow-xl w-96 p-8 rounded-lg bg-white flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="text"
            className="bg-gray-200 rounded px-3 py-2"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            className="bg-gray-200 rounded px-3 py-2"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type='submit' className="bg-blue-600 text-white rounded px-4 py-2 mt-2 hover:bg-blue-700">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;