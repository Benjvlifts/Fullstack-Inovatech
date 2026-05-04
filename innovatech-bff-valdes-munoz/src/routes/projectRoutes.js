const express = require('express');
const router = express.Router();
const { httpClient } = require('../services/httpClient');

// GET todos los proyectos
router.get('/', async (req, res, next) => {
  try {
    const headers = { Authorization: req.headers.authorization };
    const data = await httpClient.projects.getAll({}, headers);
    res.status(200).json(data);
  } catch (err) { next(err); }
});

// GET proyecto por ID
router.get('/:id', async (req, res, next) => {
  try {
    const headers = { Authorization: req.headers.authorization };
    const data = await httpClient.projects.getById(req.params.id, headers);
    res.status(200).json(data);
  } catch (err) { next(err); }
});

// POST crear proyecto
router.post('/', async (req, res, next) => {
  try {
    const headers = { Authorization: req.headers.authorization };
    const data = await httpClient.projects.create(req.body, headers);
    res.status(201).json(data);
  } catch (err) { next(err); }
});

// PATCH actualizar estado
router.patch('/:id/status', async (req, res, next) => {
  try {
    const headers = { Authorization: req.headers.authorization };
    const data = await httpClient.projects.updateStatus(req.params.id, req.body, headers);
    res.status(200).json(data);
  } catch (err) { next(err); }
});

// DELETE eliminar proyecto
router.delete('/:id', async (req, res, next) => {
  try {
    const headers = { Authorization: req.headers.authorization };
    await httpClient.projects.delete(req.params.id, headers);
    res.status(204).send();
  } catch (err) { next(err); }
});

module.exports = router;