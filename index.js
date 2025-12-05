import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleLogin(e) {
    e.preventDefault()
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (res.ok) {
      localStorage.setItem('token', data.token)
      router.push('/dashboard')
    } else {
      alert(data.error || 'Login failed')
    }
  }

  return (
    <div style={{display:'flex', alignItems:'center', justifyContent:'center', minHeight:'100vh', background:'#f3f4f6'}}>
      <form onSubmit={handleLogin} style={{background:'#fff', padding:24, borderRadius:8, boxShadow:'0 2px 8px rgba(0,0,0,0.1)', width:360}}>
        <h2 style={{marginBottom:16}}>Masuk — Residence Monitor</h2>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} style={inputStyle}/>
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} style={inputStyle}/>
        <button style={btnStyle}>Masuk</button>
        <p style={{marginTop:12, fontSize:14}}>Belum punya akun? <a href="/register">Daftar</a></p>
      </form>
    </div>
  )
}

const inputStyle = {width:'100%', padding:10, marginBottom:10, borderRadius:6, border:'1px solid #ddd'}
const btnStyle = {width:'100%', padding:10, borderRadius:6, border:'none', background:'#111827', color:'#fff'}
