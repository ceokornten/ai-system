import React, { useState } from 'react';
import axios from 'axios';

export default function SearchBar({ authHeader }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState([]);

  const search = async (e) => {
    e.preventDefault();
    const { data } = await axios.get('/api/search?q=' + encodeURIComponent(q), { headers: authHeader() });
    setResults(data);
  };

  return (
    <div className="mb-4">
      <form onSubmit={search} className="flex mb-2">
        <input className="border p-2 flex-1" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search documents" />
        <button className="bg-green-500 text-white px-4" type="submit">Search</button>
      </form>
      <ul>
        {results.map(r => (
          <li key={r._id}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}
