import mongoose from 'mongoose';

const querySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  prompt: String,
  response: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Query', querySchema);
