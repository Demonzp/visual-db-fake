const { Router } = require('express');
const { createTable, changeTable } = require('../controllers/tableController');

const router = Router();

router.post('/db/table', createTable);
router.post('/db/table/change', changeTable);

module.exports = router;