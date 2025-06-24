import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar.jsx';
import Chart from '../components/Chart.jsx';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(()=>{fetchQueries();},[]);

  const fetchQueries = async () => {
    const { data } = await axios.get('/api/query', { headers: authHeader() });
    setHistory(data);
  };

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post('/api/query', { prompt }, { headers: authHeader() });
    setResponse(data.response);
    fetchQueries();
  };

  const authHeader = () => ({ Authorization: 'Bearer ' + localStorage.getItem('token') });

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Dashboard</h1>
      <form onSubmit={submit} className="mb-4 flex">
        <input className="border p-2 flex-1" value={prompt} onChange={(e)=>setPrompt(e.target.value)} placeholder="Ask the AI" />
        <button className="bg-blue-500 text-white px-4" type="submit">Send</button>
      </form>
      {response && <div className="mb-4 p-2 border bg-white">{response}</div>}
      <SearchBar authHeader={authHeader} />
      <div className="my-4">
        <Chart data={history.map(h=>h.prompt.length)} />
      </div>
      <h2 className="text-xl mt-6 mb-2">History</h2>
      <ul>
        {history.map(q=> (
          <li key={q._id}>{q.prompt} - {q.response}</li>
        ))}
      </ul>
    </div>
  );
}
