const { Router } = require('express');
const { createDb, getAllDb, getDb } = require('../controllers/dbController');

const router = Router();

router.post('/db', createDb);
router.get('/dbs', getAllDb);
router.get('/db', getDb);

module.exports = router;