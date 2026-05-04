import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getProjects, createProject, deleteProject, updateProjectStatus } from '../services/projectService.js'


const STATUS_COLORS = {
  PLANNING:    { bg:'#e3f2fd', color:'#1565c0' },
  IN_PROGRESS: { bg:'#e8f5e9', color:'#1e8449' },
  COMPLETED:   { bg:'#f3e5f5', color:'#6a1b9a' },
  ON_HOLD:     { bg:'#fff3e0', color:'#e65100' },
}

const defaultProj = { name:'', description:'', type:'SOFTWARE', status:'PLANNING' }

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [newProj, setNewProj] = useState(defaultProj)
  const [saving, setSaving] = useState(false)

  // Determinar si es administrador basándose en el contexto de auth
  const isAdmin = user?.role === 'ADMIN';
  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = () => {
    getProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false))
  }

  const handleLogout = () => { logout(); navigate('/login') }

  const handleCreate = async () => {
    if (!newProj.name.trim()) return
    setSaving(true)
    try {
      const created = await createProject(newProj)
      setProjects(p => [created, ...p])
      setShowModal(false)
      setNewProj(defaultProj)
    } catch { alert('Error al crear proyecto') }
    finally { setSaving(false) }
  }

  // --- NUEVA LÓGICA DE ELIMINACIÓN ---
  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este proyecto?')) return
    try {
      await deleteProject(id)
      setProjects(prev => prev.filter(p => p.id !== id))
    } catch { alert('No se pudo eliminar el proyecto') }
  }

  // --- NUEVA LÓGICA DE CAMBIO DE ESTADO ---
  const handleToggleStatus = async (id, currentStatus) => {
    const statuses = Object.keys(STATUS_COLORS)
    const currentIndex = statuses.indexOf(currentStatus)
    const nextStatus = statuses[(currentIndex + 1) % statuses.length]
    
    try {
      const updated = await updateProjectStatus(id, nextStatus)
      setProjects(prev => prev.map(p => p.id === id ? updated : p))
    } catch { alert('Error al actualizar el estado') }
  }

  const s = {
    // ... Tus estilos anteriores se mantienen iguales ...
    page: { minHeight:'100vh', background:'#f0f4f8' },
    nav: { background:'#1c3554', padding:'0 2rem', height:'56px', display:'flex', alignItems:'center', justifyContent:'space-between', boxShadow:'0 2px 8px rgba(0,0,0,0.2)' },
    navBrand: { color:'#fff', fontWeight:700, fontSize:'1.1rem' },
    navRight: { display:'flex', alignItems:'center', gap:'1rem' },
    navUser: { color:'#c8e8f0', fontSize:'0.87rem' },
    navRole: { background:'#0d7c8f', color:'#fff', padding:'2px 10px', borderRadius:'12px', fontSize:'0.75rem', fontWeight:600 },
    btnLogout: { background:'transparent', border:'1px solid #607d8b', color:'#90cad4', padding:'4px 14px', borderRadius:'6px', cursor:'pointer', fontSize:'0.85rem' },
    main: { maxWidth:'1100px', margin:'0 auto', padding:'2rem 1.5rem' },
    h1: { fontSize:'1.4rem', fontWeight:700, color:'#1c3554', marginBottom:'1.5rem' },
    statsRow: { display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(160px, 1fr))', gap:'1rem', marginBottom:'2rem' },
    stat: { background:'#fff', borderRadius:'8px', padding:'1.2rem', textAlign:'center', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
    statN: { fontSize:'2rem', fontWeight:700, color:'#0d7c8f' },
    statL: { fontSize:'0.82rem', color:'#607d8b', marginTop:'4px' },
    section: { background:'#fff', borderRadius:'8px', padding:'1.5rem', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' },
    secHeader: { display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1rem' },
    secTitle: { fontSize:'1rem', fontWeight:600, color:'#1c3554' },
    btnPrimary: { background:'#0d7c8f', color:'#fff', border:'none', padding:'0.5rem 1.2rem', borderRadius:'6px', cursor:'pointer', fontWeight:600, fontSize:'0.87rem' },
    table: { width:'100%', borderCollapse:'collapse' },
    th: { textAlign:'left', padding:'0.6rem 0.8rem', borderBottom:'2px solid #e0e0e0', fontSize:'0.8rem', fontWeight:600, color:'#37474f', textTransform:'uppercase' },
    td: { padding:'0.7rem 0.8rem', borderBottom:'1px solid #f0f0f0', fontSize:'0.9rem' },
    badge: { padding:'2px 10px', borderRadius:'12px', fontSize:'0.75rem', fontWeight:600 },
    empty: { textAlign:'center', padding:'2.5rem', color:'#90a4ae' },
    // --- ESTILOS PARA LOS BOTONES DE ACCIÓN ---
    actionBtn: { background:'none', border:'none', cursor:'pointer', fontSize:'1.1rem', padding:'2px', marginLeft:'8px' },
    statusContainer: { display:'flex', alignItems:'center', justifyContent:'space-between' },
    // ... Resto de estilos del modal ...
    overlay: { position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000 },
    modal: { background:'#fff', borderRadius:'10px', padding:'2rem', width:'100%', maxWidth:'460px', boxShadow:'0 8px 32px rgba(0,0,0,0.25)' },
    mTitle: { fontSize:'1.1rem', fontWeight:700, color:'#1c3554', marginBottom:'1.2rem' },
    mGroup: { marginBottom:'0.9rem' },
    mLabel: { display:'block', fontSize:'0.82rem', fontWeight:600, color:'#37474f', marginBottom:'0.35rem' },
    mInput: { width:'100%', padding:'0.55rem 0.75rem', border:'1.5px solid #cfd8dc', borderRadius:'6px', fontSize:'0.9rem', outline:'none' },
    mSelect: { width:'100%', padding:'0.55rem 0.75rem', border:'1.5px solid #cfd8dc', borderRadius:'6px', fontSize:'0.9rem', background:'#fff', outline:'none' },
    mActions: { display:'flex', gap:'0.8rem', justifyContent:'flex-end', marginTop:'1.2rem' },
    btnSecondary: { background:'transparent', border:'1.5px solid #cfd8dc', color:'#37474f', padding:'0.5rem 1.2rem', borderRadius:'6px', cursor:'pointer', fontWeight:600, fontSize:'0.87rem' },
  }

  const stats = {
    total: projects.length,
    activos: projects.filter(p => p.status === 'IN_PROGRESS').length,
    completados: projects.filter(p => p.status === 'COMPLETED').length,
  }

  return (
    <div style={s.page}>
      <nav style={s.nav}>
        <span style={s.navBrand}>Innovatech Solutions</span>
        <div style={s.navRight}>
          <span style={s.navUser}>Hola, <strong>{user?.name}</strong></span>
          <span style={s.navRole}>{user?.role}</span>
          <button style={s.btnLogout} onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </nav>

      <main style={s.main}>
        <h1 style={s.h1}>Panel de Gestión de Proyectos</h1>

        <div style={s.statsRow}>
          {[['Total', stats.total], ['En progreso', stats.activos], ['Completados', stats.completados]].map(([l, n]) => (
            <div key={l} style={s.stat}>
              <div style={s.statN}>{n}</div>
              <div style={s.statL}>{l}</div>
            </div>
          ))}
        </div>

        <div style={s.section}>
          <div style={s.secHeader}>
            <span style={s.secTitle}>Proyectos</span>
            <button style={s.btnPrimary} onClick={() => setShowModal(true)}>+ Nuevo Proyecto</button>
          </div>
          {loading ? (
            <p style={s.empty}>Cargando proyectos...</p>
          ) : projects.length === 0 ? (
            <p style={s.empty}>No hay proyectos registrados. ¡Crea el primero!</p>
          ) : (
            <table style={s.table}>
              <thead>
                <tr>
                  {['Nombre','Descripción','Tipo','Estado'].map(h => <th key={h} style={s.th}>{h}</th>)}
                </tr>
              </thead>
              <tbody>
                {projects.map((p, i) => (
                  <tr key={p.id ?? i}>
                    <td style={s.td}><strong>{p.name}</strong></td>
                    <td style={s.td}>{p.description}</td>
                    <td style={s.td}>{p.type}</td>
                    <td style={s.td}>
                      <div style={s.statusContainer}>
                        <span style={{ ...s.badge, ...(STATUS_COLORS[p.status] ?? { bg:'#eee', color:'#333' }) }}>
                          {p.status?.replace('_', ' ')}
                        </span>
                        
                        {/* --- SOLO SE MUESTRA SI ES ADMIN --- */}
                        {isAdmin && (
                          <div>
                            <button 
                              title="Cambiar Estado" 
                              style={s.actionBtn} 
                              onClick={() => handleToggleStatus(p.id, p.status)}
                            >
                              🔄
                            </button>
                            <button 
                              title="Eliminar Proyecto" 
                              style={{...s.actionBtn, color: '#c62828'}} 
                              onClick={() => handleDelete(p.id)}
                            >
                              🗑️
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Modal de creación (se mantiene igual) */}
      {showModal && (
        <div style={s.overlay} onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div style={s.modal}>
            <h3 style={s.mTitle}>Nuevo Proyecto</h3>
            {[['name','Nombre *','text'],['description','Descripción','text']].map(([f,l,t]) => (
              <div key={f} style={s.mGroup}>
                <label style={s.mLabel}>{l}</label>
                <input type={t} style={s.mInput} value={newProj[f]} onChange={e => setNewProj(p => ({...p,[f]:e.target.value}))} />
              </div>
            ))}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem' }}>
              <div style={s.mGroup}>
                <label style={s.mLabel}>Tipo</label>
                <select style={s.mSelect} value={newProj.type} onChange={e => setNewProj(p => ({...p,type:e.target.value}))}>
                  {['SOFTWARE','CONSULTING','INFRASTRUCTURE'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div style={s.mGroup}>
                <label style={s.mLabel}>Estado</label>
                <select style={s.mSelect} value={newProj.status} onChange={e => setNewProj(p => ({...p,status:e.target.value}))}>
                  {['PLANNING','IN_PROGRESS','COMPLETED','ON_HOLD'].map(st => <option key={st} value={st}>{st.replace('_',' ')}</option>)}
                </select>
              </div>
            </div>
            <div style={s.mActions}>
              <button style={s.btnSecondary} onClick={() => setShowModal(false)}>Cancelar</button>
              <button style={s.btnPrimary} onClick={handleCreate} disabled={saving}>{saving ? 'Guardando...' : 'Crear'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}