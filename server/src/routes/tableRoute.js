const { Router } = require('express');
const { createTable, changeTable, getTableData, addRowToTable } = require('../controllers/tableController');

const router = Router();

router.post('/db/table', createTable);
router.post('/db/table/change', changeTable);
router.get('/db/table', getTableData);
router.post('/db/table/add-row', addRowToTable);

module.exports = router;