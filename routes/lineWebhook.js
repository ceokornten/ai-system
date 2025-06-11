import express from 'express';
import { middleware, Client } from '@line/bot-sdk';
import aiReplyController from '../controllers/aiReply.js';

const router = express.Router();

// LINE SDK config
const lineConfig = {
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_ACCESS_TOKEN,
};

// Register LINE middleware (signature validation)
router.use(middleware(lineConfig));

// Handle webhook events
router.post('/', async (req, res) => {
  const client = new Client(lineConfig);
  const events = req.body.events || [];
  await Promise.all(
    events.map((event) => aiReplyController.handleEvent(event, client))
  );
  res.sendStatus(200);
});

export default router;