import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/authService.js'
import { useAuth } from '../context/AuthContext.jsx'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { login: authLogin } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'EMPLOYEE' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm(p => ({ ...p, [e.target.name]: e.target.value }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { setError('Completa todos los campos.'); return }
    if (form.password.length < 6) { setError('La contraseña debe tener al menos 6 caracteres.'); return }
    setLoading(true)
    try {
      const res = await register(form)
      authLogin({ id: res.userId, name: res.name, email: res.email, role: res.role }, res.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.status === 400 ? 'El email ya está registrado.' : (err.message ?? 'Error inesperado.'))
    } finally {
      setLoading(false)
    }
  }

  const s = {
    page: { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'linear-gradient(135deg, #0d1b2a, #1c3554)', padding:'1rem' },
    card: { background:'#fff', borderRadius:'12px', padding:'2.5rem', width:'100%', maxWidth:'440px', boxShadow:'0 8px 32px rgba(0,0,0,0.25)' },
    brand: { textAlign:'center', marginBottom:'1.5rem' },
    brandTitle: { fontSize:'1.4rem', fontWeight:700, color:'#1c3554' },
    brandSub: { fontSize:'0.8rem', color:'#607d8b' },
    title: { textAlign:'center', fontSize:'1.1rem', fontWeight:600, color:'#1a2a3a', marginBottom:'1.5rem' },
    group: { marginBottom:'0.9rem' },
    label: { display:'block', fontSize:'0.82rem', fontWeight:600, color:'#37474f', marginBottom:'0.35rem' },
    input: { width:'100%', padding:'0.6rem 0.8rem', border:'1.5px solid #cfd8dc', borderRadius:'6px', fontSize:'0.9rem', outline:'none' },
    select: { width:'100%', padding:'0.6rem 0.8rem', border:'1.5px solid #cfd8dc', borderRadius:'6px', fontSize:'0.9rem', background:'#fff', outline:'none' },
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
          <div style={s.brandSub}>Crear nueva cuenta</div>
        </div>
        <h2 style={s.title}>Registro de Usuario</h2>
        {error && <div style={s.err} role="alert">{error}</div>}
        <form onSubmit={handleSubmit} noValidate>
          <div style={s.group}>
            <label style={s.label} htmlFor="name">Nombre completo</label>
            <input id="name" name="name" type="text" style={s.input} value={form.name} onChange={handleChange} placeholder="Ej: Juan Pérez" />
          </div>
          <div style={s.group}>
            <label style={s.label} htmlFor="email">Correo electrónico</label>
            <input id="email" name="email" type="email" style={s.input} value={form.email} onChange={handleChange} placeholder="correo@empresa.cl" />
          </div>
          <div style={s.group}>
            <label style={s.label} htmlFor="password">Contraseña (mín. 6 caracteres)</label>
            <input id="password" name="password" type="password" style={s.input} value={form.password} onChange={handleChange} placeholder="Tu contraseña" />
          </div>
          <div style={s.group}>
            <label style={s.label} htmlFor="role">Perfil</label>
            <select id="role" name="role" style={s.select} value={form.role} onChange={handleChange}>
              <option value="EMPLOYEE">Empleado</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>
          <button type="submit" style={s.btn} disabled={loading}>{loading ? 'Registrando...' : 'Crear Cuenta'}</button>
        </form>
        <p style={s.link}>¿Ya tienes cuenta? <Link to="/login" style={s.a}>Inicia sesión aquí</Link></p>
      </div>
    </div>
  )
}