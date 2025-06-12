const mongoose = require('mongoose');

const trainingLogSchema = new mongoose.Schema({
  triggeredAt: { type: Date, default: Date.now },
  summary: String,
});

module.exports = mongoose.model('TrainingLog', trainingLogSchema);

