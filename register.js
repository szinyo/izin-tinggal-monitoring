import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

const dbPath = path.resolve('./data/db.json')
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { email, password, name } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })

  // read db
  let db = { users: [], residences: [] }
  if (fs.existsSync(dbPath)) db = JSON.parse(fs.readFileSync(dbPath))

  if (db.users.find(u => u.email === email)) return res.status(400).json({ error: 'Email already' })
  const hashed = await bcrypt.hash(password, 8)
  const user = { id: Date.now(), email, password_hash: hashed, name }
  db.users.push(user)
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2))
  res.json({ id: user.id, email: user.email, name: user.name })
}
