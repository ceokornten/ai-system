#!/usr/bin/env node
import crypto from 'crypto';

const secret = process.env.CONFIG_SECRET;
if (!secret) {
  console.error('CONFIG_SECRET environment variable is required');
  process.exit(1);
}

const value = process.argv[2];
if (!value) {
  console.error('Usage: node scripts/encrypt.js "VALUE"');
  process.exit(1);
}

const iv = crypto.randomBytes(16);
const key = crypto.createHash('sha256').update(secret).digest();
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()]);

const output = Buffer.concat([iv, encrypted]).toString('base64');
console.log(output);

