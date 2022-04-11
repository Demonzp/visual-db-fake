const { Router } = require('express');
const { createTable, changeTable, getTableData, addRowToTable, clearTable, delTableRow } = require('../controllers/tableController');

const router = Router();

router.post('/db/table', createTable);
router.post('/db/table/change', changeTable);
router.get('/db/table', getTableData);
router.post('/db/table/add-row', addRowToTable);
router.delete('/db/table/clear', clearTable);
router.delete('/db/table/row', delTableRow);

module.exports = router;