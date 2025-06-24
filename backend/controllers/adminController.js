import User from '../models/User.js';

export async function listUsers(req, res) {
  const users = await User.find();
  res.json(users);
}

export async function setRole(req, res) {
  const { id } = req.params;
  const { role } = req.body;
  await User.findByIdAndUpdate(id, { role });
  res.json({ message: 'updated' });
}
