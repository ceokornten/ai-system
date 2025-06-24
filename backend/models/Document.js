import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
  title: String,
  content: String
});

documentSchema.index({ title: 'text', content: 'text' });

export default mongoose.model('Document', documentSchema);
