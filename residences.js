import fs from 'fs'
import path from 'path'
import jwt from 'jsonwebtoken'

const dbPath = path.resolve('./data/db.json')
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

function getTokenFromHeader(req) {
  const h = req.headers.authorization || ''
  const parts = h.split(' ')
  return parts[1] || null
}

export default function handler(req, res) {
  const token = getTokenFromHeader(req)
  if (!token) return res.status(401).json({ error: 'No token' })
  try {
    const payload = jwt.verify(token, JWT_SECRET)
    let db = { users: [], residences: [] }
    if (fs.existsSync(dbPath)) db = JSON.parse(fs.readFileSync(dbPath))
    // only return residences created by the user (demo)
    const list = db.residences.filter(r => r.created_by === payload.id)
    return res.json(list)
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' })
  }
}
