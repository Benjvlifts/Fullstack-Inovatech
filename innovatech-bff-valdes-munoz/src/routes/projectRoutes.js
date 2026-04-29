const express = require('express');
const router = express.Router();
const { httpClient } = require('../services/httpClient');

// En tu archivo de rutas de proyectos del BFF
router.get('/:id', async (req, res) => {
  try {
    const project = await projectsService.getById(req.params.id, req.headers.authorization);
    res.json(project);
  } catch (error) {
    // Manejo de error
  }
});

router.post('/', async (req, res, next) => {
  try {
    const headers = { Authorization: req.headers.authorization };
    const data = await httpClient.projects.create(req.body, headers);
    res.status(201).json(data);
  } catch (err) { next(err); }
});

module.exports = router;