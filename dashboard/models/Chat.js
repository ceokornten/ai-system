const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  channelId: String,
  userId: String,
  role: { type: String, enum: ['user', 'assistant'], required: true },
  message: String,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Chat', chatSchema);

