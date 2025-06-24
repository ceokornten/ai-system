import Document from '../models/Document.js';

export async function searchDocuments(req, res) {
  const { q } = req.query;
  const results = await Document.find({ $text: { $search: q } }).limit(20);
  res.json(results);
}
