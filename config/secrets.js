import crypto from 'crypto';

export function getSecret(name) {
  if (process.env[name]) {
    return process.env[name];
  }
  const enc = process.env[`${name}_ENC`];
  if (!enc) {
    return undefined;
  }
  const secret = process.env.CONFIG_SECRET;
  if (!secret) {
    throw new Error('CONFIG_SECRET is required to decrypt secrets');
  }
  const data = Buffer.from(enc, 'base64');
  const iv = data.subarray(0, 16);
  const cipherText = data.subarray(16);
  const key = crypto.createHash('sha256').update(secret).digest();
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const decrypted = Buffer.concat([decipher.update(cipherText), decipher.final()]);
  return decrypted.toString('utf8');
}
