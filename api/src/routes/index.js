const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

const countries = require('./countries');
const activities = require('./activities');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countries);
router.use('/activity', activities);

module.exports = router;
