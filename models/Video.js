import mongoose from 'mongoose';

const VideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  transcript: { type: String, required: true },
  sourceUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Video', VideoSchema);