const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const Chat = require('../models/Chat');
const TrainingLog = require('../models/TrainingLog');

const router = express.Router();

router.get('/stats/messages', async (req, res) => {
  try {
    const chats = await Chat.find().sort({ timestamp: -1 }).limit(100);
    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

router.get('/stats/learning', async (req, res) => {
  try {
    const logs = await TrainingLog.find().sort({ triggeredAt: -1 });
    res.json(logs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch training logs' });
  }
});

router.post('/train-now', (req, res) => {
  const child = spawn('npm', ['run', 'learn'], {
    cwd: path.resolve(__dirname, '..', '..'),
    stdio: 'inherit',
    shell: true,
  });

  child.on('error', (err) => {
    console.error('Failed to start training:', err);
  });

  res.json({ status: 'started' });
});

module.exports = router;

