const axios = require('axios');
const { CircuitBreaker } = require('./CircuitBreaker');

const MS_AUTH_URL = process.env.MS_AUTH_URL || 'http://localhost:8081/api/auth';
const MS_PROYECTOS_URL = process.env.MS_PROYECTOS_URL || 'http://localhost:8082/api/projects';
const CB_THRESHOLD = parseInt(process.env.CIRCUIT_BREAKER_THRESHOLD || '5', 10);
const CB_TIMEOUT = parseInt(process.env.CIRCUIT_BREAKER_TIMEOUT || '30000', 10);

const authBreaker = new CircuitBreaker({ name: 'ms-auth', failureThreshold: CB_THRESHOLD, timeout: CB_TIMEOUT });
const proyectosBreaker = new CircuitBreaker({ name: 'ms-proyectos', failureThreshold: CB_THRESHOLD, timeout: CB_TIMEOUT });

const authClient = axios.create({ baseURL: MS_AUTH_URL, timeout: 5000 });
const proyectosClient = axios.create({ baseURL: MS_PROYECTOS_URL, timeout: 5000 });

const httpClient = {
  auth: {
    register: (data) =>
      authBreaker.execute(() => authClient.post('/register', data).then(r => r.data)),
    login: (data) =>
      authBreaker.execute(() => authClient.post('/login', data).then(r => r.data)),
    validate: (token) =>
      authBreaker.execute(
        () => authClient.post('/validate', { token }).then(r => r.data),
        () => ({ valid: false })
      ),
    getUsers: (headers) =>
      authBreaker.execute(() => authClient.get('/users', { headers }).then(r => r.data)),
    getUserById: (id, headers) =>
      authBreaker.execute(() => authClient.get(`/users/${id}`, { headers }).then(r => r.data)),
  },
  projects: {
    create: (data, headers) =>
      proyectosBreaker.execute(() => proyectosClient.post('', data, { headers }).then(r => r.data)),

    getAll: (params, headers) =>
      proyectosBreaker.execute(
        () => proyectosClient.get('', { params, headers }).then(r => r.data),
        () => []
      ),

    getById: (id, headers) =>
  // Debe ser solo '/${id}' porque el baseURL ya tiene el resto
    proyectosBreaker.execute(() => proyectosClient.get(`/${id}`, { headers }).then(r => r.data)),

    updateStatus: (id, data, headers) =>
      proyectosBreaker.execute(() => proyectosClient.patch(`/${id}/status`, data, { headers }).then(r => r.data)),

    delete: (id, headers) =>
      proyectosBreaker.execute(() => proyectosClient.delete(`/${id}`, { headers }).then(r => r.data)),
  },
  getBreakersStatus: () => ({
    auth: authBreaker.getStatus(),
    proyectos: proyectosBreaker.getStatus(),
  }),
};

module.exports = { httpClient, authBreaker, proyectosBreaker };