import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function Dashboard(){
  const [res, setRes] = useState([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(()=> {
    const token = localStorage.getItem('token')
    if (!token) return router.push('/')
    fetch('/api/residences', { headers: { Authorization: 'Bearer ' + token } })
      .then(r=>r.json())
      .then(data=>{
        if (data.error) { localStorage.removeItem('token'); router.push('/'); return }
        setRes(data)
      })
      .catch(()=>{})
      .finally(()=>setLoading(false))
  },[])

  function logout(){ localStorage.removeItem('token'); router.push('/') }

  if (loading) return <p style={{padding:20}}>Loading...</p>

  return (
    <div style={{padding:20}}>
      <header style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
        <h1>Dashboard — Residence Monitor</h1>
        <div>
          <button onClick={logout} style={{padding:'8px 12px'}}>Logout</button>
        </div>
      </header>

      <section style={{marginBottom:20}}>
        <h3>Statistik</h3>
        <div style={{display:'flex', gap:12}}>
          <StatCard title="Total" value={res.length}/>
          <StatCard title="Expired" value={res.filter(r => new Date(r.expire_date) < new Date()).length}/>
          <StatCard title="Urgent (<=30d)" value={res.filter(r => { const diff=(new Date(r.expire_date)-new Date())/86400000; return diff>=0 && diff<=30 }).length}/>
        </div>
      </section>

      <section>
        <h3>Daftar Izin</h3>
        <table style={{width:'100%', borderCollapse:'collapse'}}>
          <thead><tr style={{textAlign:'left'}}><th>Nama</th><th>No Izin</th><th>Kewarganegaraan</th><th>Mulai</th><th>Expired</th></tr></thead>
          <tbody>
            {res.map(r => (
              <tr key={r.id} style={{borderTop:'1px solid #eee'}}>
                <td style={{padding:8}}>{r.name}</td>
                <td>{r.permit_number}</td>
                <td>{r.nationality}</td>
                <td>{r.start_date}</td>
                <td>{r.expire_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  )
}

function StatCard({title,value}){
  return <div style={{background:'#fff', padding:12, borderRadius:8, boxShadow:'0 2px 6px rgba(0,0,0,0.05)'}}><div style={{fontSize:12,color:'#6b7280'}}>{title}</div><div style={{fontSize:20,fontWeight:700}}>{value}</div></div>
}
