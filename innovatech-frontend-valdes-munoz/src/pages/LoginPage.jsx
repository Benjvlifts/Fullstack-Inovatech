import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../services/authService.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { setError('Completa todos los campos.'); return }
    setLoading(true)
    try {
      const res = await login(form)
      // ms-auth devuelve: { token, userId, name, email, role }
      authLogin({ id: res.userId, name: res.name, email: res.email, role: res.role }, res.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.status === 401 ? 'Email o contraseña incorrectos.' : (err.message ?? 'Error inesperado.'))
    } finally {
      setLoading(false)
    }
  }

  const s = {
    page: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg, #0d1b2a, #1c3554)' },
    card: { background:'#fff', borderRadius:'12px', padding:'2.5rem', width:'100%', maxWidth:'400px', boxShadow:'0 8px 32px rgba(0,0,0,0.25)' },
    brand: { textAlign:'center', marginBottom:'1.5rem' },
    brandTitle: { fontSize:'1.5rem', fontWeight:700, color:'#1c3554' },
    brandSub: { fontSize:'0.8rem', color:'#607d8b', marginTop:'2px' },
    title: { textAlign:'center', fontSize:'1.15rem', fontWeight:600, color:'#1a2a3a', marginBottom:'1.5rem' },
    group: { marginBottom:'1rem' },
    label: { display:'block', fontSize:'0.85rem', fontWeight:600, color:'#37474f', marginBottom:'0.35rem' },
    input: { width:'100%', padding:'0.65rem 0.85rem', border:'1.5px solid #cfd8dc', borderRadius:'6px', fontSize:'0.9rem', outline:'none' },
    btn: { width:'100%', padding:'0.75rem', background: loading ? '#90cad4' : '#0d7c8f', color:'#fff', border:'none', borderRadius:'6px', fontSize:'1rem', fontWeight:600, cursor: loading ? 'not-allowed' : 'pointer', marginTop:'0.5rem' },
    err: { background:'#fdecea', border:'1px solid #f5c6c6', borderRadius:'6px', padding:'0.65rem', color:'#c62828', fontSize:'0.87rem', marginBottom:'1rem' },
    link: { textAlign:'center', marginTop:'1rem', fontSize:'0.87rem', color:'#607d8b' },
    a: { color:'#0d7c8f', fontWeight:600, textDecoration:'none' },
  }

  return (
    <div style={s.page}>
      <div style={s.card}>
        <div style={s.brand}>
          <div style={s.brandTitle}>Innovatech Solutions</div>
          <div style={s.brandSub}>Plataforma de Gestión de Proyectos</div>
        </div>
        <h2 style={s.title}>Iniciar Sesión</h2>
        {error && <div style={s.err} role="alert">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div style={s.group}>
            <label style={s.label} htmlFor="email">Correo electrónico</label>
            <input id="email" name="email" type="email" style={s.input} value={form.email} onChange={handleChange} placeholder="correo@empresa.cl" />
          </div>
          <div style={s.group}>
            <label style={s.label} htmlFor="password">Contraseña</label>
            <input id="password" name="password" type="password" style={s.input} value={form.password} onChange={handleChange} placeholder="Tu contraseña" />
          </div>
          <button type="submit" style={s.btn} disabled={loading}>{loading ? 'Iniciando...' : 'Iniciar Sesión'}</button>
        </form>
        <p style={s.link}>¿No tienes cuenta? <Link to="/register" style={s.a}>Regístrate aquí</Link></p>
      </div>
    </div>
  )
}