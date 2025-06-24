import React, { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', { username, password });
    localStorage.setItem('token', res.data.token);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={submit} className="bg-white p-6 rounded shadow w-80">
        <h1 className="text-xl mb-4">Login</h1>
        <input className="border p-2 w-full mb-3" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder="Username" />
        <input type="password" className="border p-2 w-full mb-3" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Password" />
        <button className="bg-blue-500 text-white px-4 py-2 w-full" type="submit">Login</button>
      </form>
    </div>
  );
}
