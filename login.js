import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const dbPath = path.resolve('./data/db.json')
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  let db = { users: [], residences: [] }
  if (fs.existsSync(dbPath)) db = JSON.parse(fs.readFileSync(dbPath))
  const user = db.users.find(u => u.email === email)
  if (!user) return res.status(400).json({ error: 'Invalid credentials' })
  const ok = await bcrypt.compare(password, user.password_hash)
  if (!ok) return res.status(400).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, user: { id: user.id, email: user.email, name: user.name } })
}
