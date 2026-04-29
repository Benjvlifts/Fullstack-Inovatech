/**
 * BFF (Backend For Frontend) - Innovatech Solutions
 * DSY1106 Desarrollo Fullstack III | Evaluación Parcial 2
 *
 * Actúa como capa intermedia entre el frontend React y los microservicios
 * ms-auth y ms-proyectos. Implementa Circuit Breaker para resiliencia.
 *
 * @author Benjamin Valdes, Ignacio Munoz
 */

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./routes/authRoutes');
const projectRoutes = require('./routes/projectRoutes');
const errorHandler = require('./middleware/errorHandler');
const { httpClient } = require('./services/httpClient');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware global ─────────────────────────────────────────────────────────
app.use(helmet());
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());
app.use(morgan('combined'));

// Rate limiting: 100 solicitudes por IP por 15 minutos
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Demasiadas solicitudes. Intente más tarde.' },
}));

// ── Rutas ─────────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// ── Salud y estado de circuit breakers ───────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    service: 'innovatech-bff',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    circuitBreakers: httpClient.getBreakersStatus(),
  });
});

// ── Manejo de errores ─────────────────────────────────────────────────────────
app.use(errorHandler);

// ── Inicio del servidor ───────────────────────────────────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`✅ BFF Innovatech corriendo en http://localhost:${PORT}`);
    console.log(`   ms-auth     → ${process.env.MS_AUTH_URL || 'http://localhost:8081'}`);
    console.log(`   ms-proyectos → ${process.env.MS_PROYECTOS_URL || 'http://localhost:8082'}`);
  });
}

module.exports = app;
