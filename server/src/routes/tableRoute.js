const { Router } = require('express');
const { createTable } = require('../controllers/tableController');

const router = Router();

router.post('/db/table', createTable);

module.exports = router;