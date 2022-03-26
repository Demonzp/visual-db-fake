const { Router } = require('express');
const { createDb, getAllDb } = require('../controllers/dbController');

const router = Router();

router.post('/db', createDb);
router.get('/db', getAllDb);

module.exports = router;