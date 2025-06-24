import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');
  const header = { Authorization: 'Bearer ' + token };

  useEffect(()=>{ load(); },[]);

  const load = async () => {
    const { data } = await axios.get('/api/admin/users', { headers: header });
    setUsers(data);
  };

  const setRole = async (id, role) => {
    await axios.put('/api/admin/users/' + id + '/role', { role }, { headers: header });
    load();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Admin Panel</h1>
      <table className="table-auto w-full">
        <thead><tr><th>User</th><th>Role</th><th>Actions</th></tr></thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b">
              <td>{u.username}</td>
              <td>{u.role}</td>
              <td>
                <button className="mr-2 text-blue-500" onClick={()=>setRole(u._id,'user')}>User</button>
                <button className="text-blue-500" onClick={()=>setRole(u._id,'admin')}>Admin</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
